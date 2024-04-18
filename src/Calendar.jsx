import NavigationBar from "./NavigationBar";
import { Snippet } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";

export default function Calendar() {
  return (
    <div>
      <NavigationBar />
      <div className="flex items-center h-screen flex-col p-2">
        <h1 className="text-3xl font-bold">Calendar Visualization </h1>
        <h1 className="text-xl py-3">
          🚧 This section is still under construction! 🚧
        </h1>
        <h1 className="text-3xl font-bold">Add to Calendar</h1>
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
        <div className="flex items-center flex-col p-2">
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
  );
}
