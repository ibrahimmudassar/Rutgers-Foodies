import { useState, useEffect } from "react";
import CardArray from "./CardArray";
import NavigationBar from "./NavigationBar";
import { Card, Skeleton } from "@nextui-org/react";

export default function Events() {
  const [data, setData] = useState(null);
  // Fetch the json data from a url when the component mounts
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ibrahimmudassar/Rutgers-Foodies/main/events.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <NavigationBar />
      <>
        {data ? (
          <div className="size-full">
            <CardArray data={data} className="p-10" />
          </div>
        ) : (
          <div className="p-2 flex flex-row flex-wrap items-center justify-center gap-5">
            {Array.from({ length: 9 }, (_, i) => (
              <Card key={i} className="w-[400px] space-y-5 p-4" radius="lg">
                <Skeleton className="rounded-lg">
                  <div className="h-48 rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="space-y-3">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                  </Skeleton>
                </div>
              </Card>
            ))}
          </div>
        )}
      </>
    </div>
  );
}
