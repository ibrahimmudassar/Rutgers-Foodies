import json
from pprint import pprint
from dataclasses import dataclass
from math import atan2, cos, radians, sin, sqrt


from geopy.geocoders import Nominatim
from ics import Calendar, Event
from tqdm import tqdm


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
    campuses = [Campus("College Ave", 40.4992699, -74.44746, 'blue'),  # College Ave
                Campus("Livingston", 40.5260255, - \
                       74.4377431, 'red'),  # Livingston
                Campus("Busch", 40.5270353, -74.4563511, 'orange'),  # Busch
                Campus("Cook / Douglass", 40.4846662, -74.4366894,
                       'green'),  # Cook / Douglass
                ]

    distance_to_each_campus = []
    # find how far each campus is from the coordinate
    for campus in campuses:
        distance_to_each_campus.append(
            (distance(lat, lon, campus.lat, campus.lon), campus))

    nearest_campus = min(distance_to_each_campus, key=lambda x: x[0])
    return nearest_campus[1]


# Opening JSON file
f = open('events.json')

# returns JSON object as
# a dictionary
events = json.load(f)['data']

c = Calendar()

# There are duplicate lookups so to speed up the process a dict of already processed coordinates is held
coordinate_dict = {}

for event in tqdm(events):

    e = Event()

    e.name = event['name']
    e.begin = event['startsOn']

    try:
        e.end = event['endsOn']
    except KeyError:
        pass

    e.description = event['description']

    categories = [event['theme']]

    try:
        # This is the longest part
        # Reverse geolocate based on the coordinates so calendar apps can embed address
        # Takes time so as to not hit API limits
        if event['latitude'] is not None and event['longitude'] is not None:
            categories.append(campus_to_icon(
                event['latitude'], event['longitude']).name)

            if coordinate_dict.get((event['latitude'], event['longitude'])) is None:
                geolocator = Nominatim(user_agent='tstign')
                location = geolocator.reverse(
                    f"{event['latitude']}, {event['longitude']}")
                e.location = location.address
                coordinate_dict[(event['latitude'],
                                 event['longitude'])] = location.address
            else:
                e.location = coordinate_dict.get(
                    (event['latitude'], event['longitude']))
        else:
            e.location = event['location']
    except KeyError:
        e.location = event['location']

    e.categories = categories + event['categoryNames']
    e.url = f'https://rutgers.campuslabs.com/engage/account/login?returnUrl=/engage/event/{event["id"]}'
    e.organizer = event['organizationName']

    c.events.add(e)


with open('foodies.ics', 'w') as f:
    f.writelines(c.serialize_iter())
