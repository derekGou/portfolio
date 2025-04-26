import ListItem from "../../listItem/listItem";
import Link from "next/link";

export default function ProjectContent() {
    return (
        <div className="flex flex-col pt-8 md:pr-8 md:pt-0 lg:pr-16 w-fit h-fit items-center md:items-start">
            <p>Derek Gou</p>
            <h1>What I&apos;ve been up to</h1>
            <div className="flex flex-col">
                <ListItem><Link className="underline" href="https://omnivim.org" target="_blank">Omnivim</Link>: Vim motions made global</ListItem>
                <ListItem><Link className="underline" href="https://sprouthacks.ca" target="_blank">SproutHacks</Link>: a high school hackathon</ListItem>
                <ListItem><Link className="underline" href="https://dorahacks.io/buidl/13414" target="_blank">TouchUp</Link>: browse with hand gestures</ListItem>
            </div>
        </div>
    );
};