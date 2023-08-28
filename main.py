import json
from datetime import datetime

import folium
import pandas as pd
import requests as re
from bs4 import BeautifulSoup

# this takes the descriptions which have html tags and weird special characters and seeks to normalize them
# this is not perfect but it's just the barebones


def description_deformat(input: str) -> str:

    soup = BeautifulSoup(input, features="html.parser").text
    soup = soup.replace("\xa0", " ")
    soup = soup.replace("\n", " ")

    return soup


# get the date today, will be used for the event gathering
today = datetime.today().strftime("%Y-%m-%d")

# find how many total events there are
response = re.get(
    f"https://rutgers.campuslabs.com/engage/api/discovery/event/search?endsAfter={today}&orderByField=endsOn&orderByDirection=ascending&status=Approved"
).json()
count = response["@odata.count"]

# get all of them
response = re.get(
    f"https://rutgers.campuslabs.com/engage/api/discovery/event/search?endsAfter={today}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take={count}"
).json()

rows = []
for event in response["value"]:
    if "Free Food" in ", ".join(event["benefitNames"]):
        rows.append(event)

df = pd.DataFrame(rows)
df["description"] = df["description"].map(description_deformat)
df["benefitNames"] = [", ".join(i) for i in df["benefitNames"]]
default_background = "https://wallpapers.com/images/hd/rutgers-white-r-logo-uh1s17dgdpw9uhif.jpg"
df["imagePath"] = [
    default_background if img is None else f"https://se-images.campuslabs.com/clink/images/{str(img)}" for img in df["imagePath"]]
df["startsOn"] = pd.to_datetime(df["startsOn"])
df['latitude'] = pd.to_numeric(df['latitude'])
df['longitude'] = pd.to_numeric(df['longitude'])

# makes filtered df with lat and lon available rows only
filtered = df.query('latitude.notnull() and longitude.notnull()')
# Create a centered map
RU_COORDINATES = [40.5, -74.45]
map_sf = folium.Map(location=RU_COORDINATES, zoom_start=13)

# Add markers to the map for each location in the dataframe
for index, row in filtered.iterrows():
    folium.Marker(location=[row['latitude'], row['longitude']],
                  popup=row['name']).add_to(map_sf)

# Save the map as an HTML file
map_sf.save('events_map.html')

with open("events.json", "w") as file:
    unformatted = json.loads(df.to_json(orient="table"))
    json.dump(unformatted, file, indent=4, sort_keys=True)
