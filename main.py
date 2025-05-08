import json
from dataclasses import dataclass
from datetime import datetime
from math import atan2, cos, radians, sin, sqrt
from urllib.parse import quote

import folium
import pandas as pd
import pytz
import httpx
from bs4 import BeautifulSoup
from folium import plugins
from PIL import Image, UnidentifiedImageError
import io  # Added import

# this takes the descriptions which have html tags and weird special characters and seeks to normalize them
# this is not perfect but it's just the barebones


def description_deformat(input: str) -> str:

    soup = BeautifulSoup(input, features="html.parser").get_text()
    soup = soup.replace("\xa0", " ")
    soup = soup.replace("\n", " ")

    return soup


def distance(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of the Earth in kilometers
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance_km = R * c
    distance_m = distance_km * 1000
    return distance_m


@dataclass
class Campus:
    name: str
    lat: float
    lon: float
    color: str


def campus_to_icon(lat, lon):
    # approximations for each campus
    # I basically just used the student centers for each of them
    campuses = [
        Campus("C", 40.4992699, -74.44746, "blue"),  # College Ave
        Campus("L", 40.5260255, -74.4377431, "red"),  # Livingston
        Campus("B", 40.5270353, -74.4563511, "orange"),  # Busch
        Campus("C/D", 40.4846662, -74.4366894, "green"),  # Cook / Douglass
    ]

    distance_to_each_campus = []
    # find how far each campus is from the coordinate
    for campus in campuses:
        distance_to_each_campus.append(
            (distance(lat, lon, campus.lat, campus.lon), campus)
        )

    nearest_campus = min(distance_to_each_campus, key=lambda x: x[0])
    return nearest_campus[1]


# Making events.json
# get the date today, will be used for the event gathering
todayutc = datetime.utcnow()
eastern_tz = pytz.timezone("US/Eastern")  # Rutgers timezone
eastern_now = todayutc.replace(tzinfo=pytz.utc).astimezone(eastern_tz)
today = eastern_now.isoformat()

# find how many total events there are
response = httpx.get(
    f"https://rutgers.campuslabs.com/engage/api/discovery/event/search?endsAfter={today}&orderByField=endsOn&orderByDirection=ascending&status=Approved"
).json()
count = response["@odata.count"]

# get all of them
response = httpx.get(
    f"https://rutgers.campuslabs.com/engage/api/discovery/event/search?endsAfter={today}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take={count}"
).json()


# Only events with Free Food as a benefit
rows = [event for event in response["value"] if "Free Food" in event["benefitNames"]]

df = pd.DataFrame(rows)
# General column formatting
df["description"] = df["description"].map(description_deformat)
df["benefitNames"] = [", ".join(i) for i in df["benefitNames"]]

default_background = (
    "https://wallpapers.com/images/hd/rutgers-white-r-logo-uh1s17dgdpw9uhif.jpg"
)
df["imagePath"] = [
    (
        default_background
        if img is None
        else f"https://se-images.campuslabs.com/clink/images/{str(img)}"
    )
    for img in df["imagePath"]
]
df["organizationProfilePicture"] = [
    (
        default_background
        if img is None
        else f"https://se-images.campuslabs.com/clink/images/{str(img)}"
    )
    for img in df["organizationProfilePicture"]
]

reachable_images = []
for img in df["imagePath"]:
    if img != default_background:
        # cdn to serve the image
        response = httpx.get("https://imagecdn.app/v2/image/" + quote(img, safe=''), timeout=5)
        img_data = response.content

        try:
            img = Image.open(io.BytesIO(img_data))
            reachable_images.append(
                f"https://se-images.campuslabs.com/clink/images/{str(img)}"
            )
        except UnidentifiedImageError:
            reachable_images.append(default_background)
            continue  # Skip this image and move on to the next one
    else:
        reachable_images.append(default_background)

df["imagePath"] = reachable_images

df["startsOn"] = pd.to_datetime(df["startsOn"])
df["endsOn"] = pd.to_datetime(df["endsOn"])
df["latitude"] = pd.to_numeric(df["latitude"])
df["longitude"] = pd.to_numeric(df["longitude"])

# sort by time, nearest event displayed first
df.sort_values(by="startsOn", ascending=True, inplace=True)

with open("events.json", "w") as file:
    unformatted = json.loads(df.to_json(orient="table"))
    json.dump(unformatted, file, indent=4, sort_keys=True)

# Making the map
# makes filtered df with lat and lon available rows only
filtered = df.query("latitude.notnull() and longitude.notnull()")
# Create a centered map
RU_COORDINATES = [40.5, -74.45]
map_sf = folium.Map(location=RU_COORDINATES, zoom_start=13)

# Add markers to the map for each location in the dataframe
for index, row in filtered.iterrows():
    campus_icon = campus_to_icon(row["latitude"], row["longitude"])
    folium.Marker(
        location=[row["latitude"], row["longitude"]],
        popup=row["name"],
        icon=folium.Icon(color=campus_icon.color),
    ).add_to(map_sf)

# plugins
plugins.Fullscreen().add_to(map_sf)
plugins.LocateControl().add_to(map_sf)  # Geolocate

# Save the map as an HTML file
map_sf.save("events_map.html")
