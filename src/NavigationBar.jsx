import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import React from "react";
import { useLocation } from "react-router-dom";

export default function NavigationBar() {
  const location = useLocation().pathname;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Home", link: "/Rutgers-Foodies/" },
    { name: "Calendar", link: "/Rutgers-Foodies/calendar" },
    { name: "Events", link: "/Rutgers-Foodies/events" },
    { name: "Map", link: "/Rutgers-Foodies/map" },
    { name: "About", link: "/Rutgers-Foodies/about" },
  ];

  const filteredMenuItems = menuItems.filter((dict) =>
    ["Calendar", "Events", "Map"].includes(dict["name"])
  );

  return (
    <Navbar
      shouldHideOnScroll
      position={location === "/map" ? "static" : "sticky"}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-danger",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <Link href="/Rutgers-Foodies/" color="foreground">
            <p className="font-bold text-xl text-inherit">
              <span className="text-[#cc0033]">RU</span>Foodies
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {filteredMenuItems.map((item, index) => (
          <>
            {location === item.link ? (
              <NavbarItem isActive key={index} className="font-bold">
                <Link href={item.link} color="danger" className="text-lg">
                  {item.name}
                </Link>
              </NavbarItem>
            ) : (
              <NavbarItem key={index}>
                <Link href={item.link} color="foreground" className="text-lg">
                  {item.name}
                </Link>
              </NavbarItem>
            )}
          </>
        ))}
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            {location === item.link ? (
              <Link
                className="w-full font-bold"
                href={item.link}
                color="danger"
                size="lg"
              >
                {item.name}
              </Link>
            ) : (
              <Link
                className="w-full"
                href={item.link}
                color="foreground"
                size="lg"
              >
                {item.name}
              </Link>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
