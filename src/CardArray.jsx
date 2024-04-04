import { IoMdInformationCircleOutline } from "react-icons/io";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
  ScrollShadow,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ButtonGroup,
  Link,
} from "@nextui-org/react";
import moment from "moment";
import "moment-timezone";
import * as React from "react";
import { useEffect } from "react";
export default function CardArray(props) {
  const [events, setEvents] = React.useState(props.data);

  // .replace(/([A-Z])/g, " $1")
  const themes = [
    ...new Set(props.data.map((element) => element.theme)),
  ].sort();

  const [selectedThemes, setSelectedThemes] = React.useState([]);

  useEffect(() => {
    setEvents(props.data);

    if (Array.from(selectedThemes).length > 0) {
      setEvents((events) =>
        events?.filter((item) =>
          Array.from(selectedThemes).includes(item.theme)
        )
      );
    }
  }, [selectedThemes]);

  return (
    <div className="flex flex-wrap gap-3  m-2 justify-center">
      <Card className="w-[400px] max-h-[700px] border-none">
        <CardHeader className="flex justify-center">
          <h1 className="font-bold text-black text-2xl">Filters</h1>
        </CardHeader>
        <CardBody className="flex items-center gap-3">
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="shadow" color="danger" size="lg">
                  Theme
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="shadow"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={selectedThemes}
                onSelectionChange={setSelectedThemes}
              >
                {themes.map((item) => (
                  <DropdownItem key={item}>
                    {item.replace(/([A-Z])/g, " $1")}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardBody>
      </Card>

      {events.map((event) => (
        <Card
          isBlurred
          shadow="sm"
          key={event.index}
          className="max-w-[400px] max-h-[700px] border-none"
        >
          <CardHeader className="p-0">
            <Image
              isBlurred
              src={event.imagePath}
              alt="NextUI Album Cover"
              classNames="m-5"
              fallbackSrc="https://wallpapers.com/images/hd/rutgers-white-r-logo-uh1s17dgdpw9uhif.jpg"
            />
          </CardHeader>
          <CardBody className="px-3 py-0 text-medium text-default-400">
            <div className="py-1">
              <h1 className="font-bold text-black text-large">{event.name}</h1>
              <h2 className="font-bold text-medium">{event.location}</h2>
              <h2 className="font-bold text-medium flex-row flex">
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      endContent={<IoMdInformationCircleOutline size={20} />}
                      color="danger"
                      size="sm"
                      // radius="full"
                      className="font-bold text-sm "
                    >
                      {moment
                        .tz(event.startsOn, "America/New_York")
                        .format("MMMM Do, h:mm A")}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      endContent={
                        <p>
                          {moment
                            .tz(event.endsOn, "America/New_York")
                            .format("M/D h:mm A")}
                        </p>
                      }
                    >
                      Ends at
                    </DropdownItem>
                    <DropdownItem
                      endContent={
                        <p>
                          {moment
                            .utc(
                              moment(event.endsOn).diff(moment(event.startsOn))
                            )
                            .format("H:mm")}
                        </p>
                      }
                    >
                      Duration
                    </DropdownItem>
                    <DropdownItem
                      endContent={
                        <p>
                          {moment
                            .tz(event.startsOn, "America/New_York")
                            .fromNow()}
                        </p>
                      }
                    >
                      Begins In
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </h2>
            </div>
            <ScrollShadow offset={20}>
              <div>
                <p>{event.description}</p>
              </div>
            </ScrollShadow>
          </CardBody>
          <CardFooter className="gap-3 flex justify-between py-4 flex-none">
            <div className="px-1">
              <Popover>
                <PopoverTrigger>
                  <Avatar
                    isBordered
                    size="md"
                    src={event.organizationProfilePicture}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">
                      {event.organizationName}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <ButtonGroup fullWidth>
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    className="bg-[#CC0033]"
                    fullWidth
                    variant="shadow"
                    size="lg"
                    color="danger"
                  >
                    Schedule it
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with description"
                >
                  <DropdownItem
                    description="Add to Google Calendar"
                    href={`https://rutgers.campuslabs.com/engage/event/${event.id}/googlepublish`}
                    target="_blank"
                    endContent={<p>📅</p>}
                  >
                    GCal
                  </DropdownItem>
                  <DropdownItem
                    description="Download .ics file"
                    href={`https://rutgers.campuslabs.com/engage/event/${event.id}.ics`}
                    target="_blank"
                    endContent={<p>🗂️</p>}
                  >
                    ICS
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button
                className="bg-[#CC0033]"
                fullWidth
                variant="shadow"
                size="lg"
                color="danger"
                as={Link}
                href={`https://rutgers.campuslabs.com/engage/account/login?returnUrl=/engage/event/${event.id}`}
                target="_blank"
              >
                RSVP
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
