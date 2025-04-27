import ListItem from "../../listItem/listItem";

export default function AboutContent() {
    return (
        <div className="flex flex-col pt-4 md:pr-8 md:pt-0 lg:pr-16 w-fit h-fit items-center md:items-start">
            <p>Derek Gou</p>
            <h1>About Me</h1>
            <div className="flex flex-col">
                <ListItem>📍 Waterloo, Ontario, Canada</ListItem>
                <ListItem>💻 building web and desktop apps</ListItem>
                <ListItem>🎮 avid chess and tennis player</ListItem>
            </div>
        </div>
    );
};