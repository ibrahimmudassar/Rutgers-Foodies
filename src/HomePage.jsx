import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { Button, Link } from "@nextui-org/react";

export default function HomePage() {
  const words = [
    {
      text: "Find",
    },
    {
      text: "events",
    },
    {
      text: "with",
    },
    {
      text: "Rutgers",
      className: "text-[#cc0033] dark:text-[#cc0033]",
    },
    {
      text: "Foodies.",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-dvh  ">
      <Button
        href="/Rutgers-Foodies/about"
        as={Link}
        variant="light"
        color="danger"
        className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base"
      >
        Made by Ibrahim Mudassar
      </Button>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
        <Button
          color="danger"
          variant="ghost"
          size="lg"
          href="/Rutgers-Foodies/calendar"
          as={Link}
        >
          Calendar
        </Button>
        <Button
          color="danger"
          variant="shadow"
          size="lg"
          href="/Rutgers-Foodies/events"
          as={Link}
        >
          Events
        </Button>
        <Button
          color="danger"
          variant="ghost"
          size="lg"
          href="/Rutgers-Foodies/map"
          as={Link}
        >
          Map
        </Button>
      </div>
    </div>
  );
}
