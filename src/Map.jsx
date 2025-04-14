import NavigationBar from "./NavigationBar";

export default function Map() {
  return (
    <div className="h-lvh overflow-hidden">
      <NavigationBar />
      <iframe
        className="size-full"
        width="100%"
        height="100%"
        src="https://rawcdn.githack.com/ibrahimmudassar/Rutgers-Foodies/refs/heads/main/events_map.html"
      ></iframe>
    </div>
  );
}
