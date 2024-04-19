import NavigationBar from "./NavigationBar";
import { Listbox, ListboxItem, Snippet, Button } from "@nextui-org/react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useState, useEffect } from "react";
import moment from "moment";

export default function Calendar() {
  const [data, setData] = useState(0);
  const [preview, setPreview] = useState({
    date: "Hover over the calendar!",
    count: "∞",
  });
  // Fetch the json data from a url when the component mounts
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ibrahimmudassar/Rutgers-Foodies/main/events.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error));
  }, []);

  const oneDay = 24 * 60 * 60 * 1000;

  let events_count = {};
  var minDay = new Date();
  var maxDay = new Date();

  if (data !== 0) {
    for (const event of data) {
      const start = moment
        .tz(event.startsOn, "America/New_York")
        .format("YYYY-MM-DD");
      const end = moment
        .tz(event.endsOn, "America/New_York")
        .format("YYYY-MM-DD");
      const difference = Math.ceil(
        (new Date(end) - new Date(start)) / (1000 * 3600 * 24)
      );
      for (let i = 0; i < difference + 1; i++) {
        const s = new Date(start);
        s.setDate(s.getDate() + i);
        events_count[s.toISOString().slice(0, 10)] =
          (events_count[s.toISOString().slice(0, 10)] || 0) + 1;
      }
    }

    maxDay = new Date(
      Math.max.apply(
        null,
        data.map((date) => new Date(date.endsOn))
      )
    );
    minDay = new Date(
      Math.min.apply(
        null,
        data.map((date) => new Date(date.startsOn))
      )
    );
    minDay.setDate(minDay.getDate() - 1);
  }

  return (
    <div>
      <NavigationBar />
      <div className="flex items-center h-screen flex-col p-2 gap-5">
        <h1 className="text-3xl font-bold">Calendar Visualization </h1>
        <div className="w-full flex items-center flex-col">
          <Button color="danger" endContent={<p>{preview.count}</p>}>
            {preview.date}
          </Button>
          <div className="w-full sm:w-2/3 pt-2">
            <CalendarHeatmap
              startDate={minDay}
              endDate={maxDay}
              values={Object.entries(events_count).map(([date, count]) => ({
                date,
                count,
              }))}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return `color-github-${value.count}`;
              }}
              onMouseOver={(event, value) => {
                if (value !== null) {
                  setPreview(value);
                }
              }}
              showWeekdayLabels={true}
            />
          </div>
        </div>
        <div className="flex items-center flex-col gap-2">
          <h1 className="text-3xl font-bold pt-5">Add to Calendar</h1>
          <p>Adding all the events of RUFoodies to your calendar!</p>
          <div className="py-2">
            <Snippet
              color="danger"
              variant="shadow"
              hideSymbol
              codeString="https://raw.githubusercontent.com/ibrahimmudassar/Rutgers-Foodies/main/foodies.ics"
            >
              Click copy!
            </Snippet>
          </div>
          <div className="flex items-center flex-col p-2 pb-10">
            <h1 className="text-lg font-bold">Add to Google Calendar</h1>
            <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
              <Listbox>
                <ListboxItem>1. Log In</ListboxItem>
                <ListboxItem>
                  2. On the bottom left, find “Other Calendars”
                </ListboxItem>
                <ListboxItem>3. Click the + sign & paste the url</ListboxItem>
                <ListboxItem className="text-success" color="success">
                  4. Done!
                </ListboxItem>
              </Listbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
