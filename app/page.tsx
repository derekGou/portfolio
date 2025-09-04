"use client"

import Link from "next/link";
import ListItem from "./components/listItem/listItem";

export default function Home() {

  return (
    <>
      <h3>Hello! Welcome to my website.</h3>
      <br/>
      <div className="flex flex-col gap-1 items-start justify-start w-full h-fit">
        <p>I'm a software dev passionate about building <u>impactful, inviting, intuitive user experiences</u>.</p>
        <br/>
        <h6>Currently, I'm ...</h6>
        <ListItem>studying Software Engineering at the University of Waterloo</ListItem>
        <ListItem>building <Link className="underline" href={"https://omnivim.org"} target="_blank">Omnivim</Link>, a tray app making Vim motions global</ListItem>
        <ListItem>learning C++, Rust and Swift</ListItem>
        <h6>Previously, I ...</h6>
        <ListItem>co-founded <Link className="underline" href={"https://sprouthacks.ca"} target="_blank">SproutHacks</Link>, a non-profit organization that hosts high school hackathons</ListItem>
        <ListItem indent={1}>hosted 80+ students at our March 2025 3-day event</ListItem>
        <ListItem indent={1}>provided meals, prizes and resources 100% free of charge</ListItem>
        <ListItem indent={1}>donated 60+ meals to local homeless shelters</ListItem>
        <ListItem>won 5 hackathons, including 1st overall at <Link className="underline" href={"https://jamhacks.ca"} target="_blank">Canada's largest high school hackathon</Link></ListItem>
        <ListItem>served as web dev intern at <Link className="underline" href={"https://cilc.ca"} target="_blank">The CILC</Link></ListItem>
        <h6>In my free time, I ...</h6>
        <ListItem>🎾 play tennis</ListItem>
        <ListItem>📱 grind Clash Royale</ListItem>
        <ListItem>♟️ dabble in chess</ListItem>
      </div>
    </>
  );
}