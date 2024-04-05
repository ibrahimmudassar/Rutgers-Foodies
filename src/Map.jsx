import NavigationBar from "./NavigationBar";

export default function Map() {
  return (
    <div className="h-svh overflow-hidden">
      <NavigationBar />
      <iframe
        className="size-full"
        src="https://rawcdn.githack.com/ibrahimmudassar/Rutgers-Foodies/5531ee88da737707a843a7b9dc7d6b1695600430/events_map.html"
      ></iframe>
    </div>
  );
}
