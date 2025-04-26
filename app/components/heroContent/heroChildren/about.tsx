import ListItem from "../../listItem/listItem";

export default function AboutContent() {
    return (
        <div className="flex flex-col pt-8 md:pr-8 md:pt-0 lg:pr-16 w-fit h-fit items-center md:items-start">
            <p>Derek Gou</p>
            <h1>About Me</h1>
            <div className="flex flex-col">
                <ListItem>I&apos;m a student from Waterloo, Canada</ListItem>
                <ListItem>I love building web and desktop apps</ListItem>
                <ListItem>I&apos;m an avid chess and tennis player</ListItem>
            </div>
        </div>
    );
};