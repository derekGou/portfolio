import Image from "next/image";
import Links from "../../links/links";
import ListItem from "../../listItem/listItem";

export default function HomeContent() {
    return (
        <div className="flex flex-col pt-4 md:pr-8 md:pt-0 lg:pr-16 w-fit h-fit items-center md:items-start">
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
            <div className="flex flex-col mb-4">
                <ListItem>SWE &apos;30 @ UWaterloo</ListItem>
                <ListItem>Frontend specialist</ListItem>
                <ListItem>Co-founder @ SproutHacks</ListItem>
                <ListItem>4x hackathon winner</ListItem>
            </div>
            <Links />
        </div>
    );
};