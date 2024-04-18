import NavigationBar from "./NavigationBar";
import {
  Accordion,
  AccordionItem,
  Button,
  Link,
  Card,
  CardBody,
  Image,
} from "@nextui-org/react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function About() {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center h-svh p-2 gap-4">
        <div className="flex w-5/6 pb-3">
          <p className="font-bold text-3xl">About Me</p>
        </div>
        <Card className="max-w-2xl w-5/6">
          <CardBody>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Image
                  isBlurred
                  alt="My Face"
                  src="https://avatars.githubusercontent.com/u/22484328"
                ></Image>
              </div>

              <div className="flex flex-wrap gap-3 items-center justify-center">
                <h1 className="text-2xl font-bold flex flex-col items-center">
                  👋 Hey! I&apos;m Ibrahim!
                </h1>
                <p className="px-4">
                  Rutgers Foodies is a way to let students find events to enjoy
                  each others company & grab some food too!
                </p>
                <Button
                  className="bg-black text-white"
                  href="https://github.com/ibrahimmudassar"
                  as={Link}
                  target="_blank"
                  endContent={<FaGithub size={20} />}
                >
                  My Github
                </Button>
                <Button
                  className="bg-[#0077B5] text-white"
                  href="https://www.linkedin.com/in/ibrahim-mudassar/"
                  as={Link}
                  target="_blank"
                  endContent={<FaLinkedin size={20} />}
                >
                  My LinkedIn
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="flex w-5/6 pb-3">
          <p className="font-bold text-3xl">FAQ</p>
        </div>
        <div className="w-5/6">
          <Accordion variant="bordered">
            <AccordionItem title="Why did I make Rutgers Foodies?">
              Rutgers Foodies is a spiritual successor to{" "}
              <Button
                color="danger"
                size="sm"
                as={Link}
                href="http://rufreefood.club/"
                target="_blank"
              >
                RUFreeFood Club
              </Button>
              . It does not work anymore and I wanted to make one that did work,
              with more functionality both for my own use and if anyone else
              wanted to as well!
            </AccordionItem>
            <AccordionItem title="Some of these events already happened!">
              The events are updated once every 12 hours. Old events still
              appear as they have not been updated.
            </AccordionItem>
            <AccordionItem title="Sister Sites">
              <div className="space-y-3 flex flex-col">
                <Button
                  color="danger"
                  size="sm"
                  as={Link}
                  href="https://github.com/vinitshenoy26/University-Events-App/"
                  target="_blank"
                >
                  Vinit Shenoy&apos;s
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  as={Link}
                  href="https://yashshah41.github.io/Rutgers-Foodies/"
                  target="_blank"
                >
                  Yash Shah&apos;s
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
