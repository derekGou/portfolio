import Image from "next/image";
import Hero from "./components/hero/hero";
import Links from "./components/links/links";
import ListItem from "./components/listItem/listItem";
import Three from "./components/three/three";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center w-fit h-fit">
        <Hero>
          <div className="flex flex-col pt-8 md:pr-8 md:pt-0 lg:pr-16 w-fit h-fit items-center md:items-start">
            <p>Welcome to my website!</p>
            <h1 className="mb-2 md:mb-4">
              I&apos;m{" "}
              <span className="inline-flex items-center">
                <Image
                  src="/LogoPFLeft.svg"
                  alt="Left Logo"
                  width={12.8}
                  height={12.8}
                  className="mr-1 align-middle inline"
                />
                erek
              </span>{" "}
              <span className="inline-flex items-center">
                <Image
                  src="/LogoPFRight.svg"
                  alt="Right Logo"
                  width={12.8}
                  height={12.8}
                  className="mr-1 align-middle inline"
                />
                ou
              </span>
            </h1>
            <ListItem>SWE &apos;30 @ UW</ListItem>
            <ListItem>Frontend specialist</ListItem>
            <ListItem>Co-founder @ SproutHacks</ListItem>
            <ListItem>4x hackathon winner</ListItem>
          </div>
        </Hero>
        <div className="flex flex-col items-center justify-center">
          <Three />
          <br />
          <Links />
        </div>
      </div>
    </div>
  );
}