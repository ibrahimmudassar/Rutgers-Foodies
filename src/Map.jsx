import NavigationBar from "./NavigationBar";

export default function Map() {
  return (
    <div className="h-svh overflow-hidden">
      <NavigationBar />
      <iframe
        className="size-full"
        src="/Rutgers-Foodies/events_map.html"
      ></iframe>
    </div>
  );
}
