import requests as re
from datetime import datetime
import pandas as pd


def description_deformat(input: str) -> str:
    from bs4 import BeautifulSoup

    soup = BeautifulSoup(input, features="html.parser").text
    soup = soup.replace("\xa0", "")
    soup = soup.replace("\n", "")

    return soup


today = datetime.today().strftime("%Y-%m-%d")

response = re.get(
    f"https://rutgers.campuslabs.com/engage/api/discovery/event/search?endsAfter={today}&orderByField=endsOn&orderByDirection=ascending&status=Approved").json()
count = response["@odata.count"]

response = re.get(
    f"https://rutgers.campuslabs.com/engage/api/discovery/event/search?endsAfter={today}&orderByField=endsOn&orderByDirection=ascending&status=Approved&take={count}").json()


df = pd.Series(dtype="object")

for event in response["value"]:
    if "Free Food" in ", ".join(event["benefitNames"]):

        img = ""
        if event["imagePath"] is not None:
            imgheader = "https://se-images.campuslabs.com/clink/images/"
            img = imgheader + str(event["imagePath"])

        row = pd.Series([event["organizationName"],
                        event["name"],
                        event["startsOn"],
                        ", ".join(event["benefitNames"]),
                         event["location"],
                         description_deformat(event["description"]),
                         img])
        df = pd.concat([df, row.to_frame().T], ignore_index=True)

df = df.set_axis(["organizationName", "name", "startsOn",
                  "benefitNames", "location", "description", "imagePath"], copy=False, axis=1)
df["startsOn"] = pd.to_datetime(df["startsOn"])
df.to_json("events.json", orient="table")
