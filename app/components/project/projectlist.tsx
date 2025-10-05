import { ReactNode } from "react";

type Item =
    | {
        name: string;
        image: string;
        dates: string | Date;
        skills: string[];
        href: string;
        children: ReactNode;
        winner?: string;
    };

export const projectlist:Item[] = [
    {
        name: "derekgou.com", 
        image: "/projects/LogoPF.svg", 
        dates: "Ongoing", 
        skills: ["React", "Typescript", "Tailwind", "NextJS", "Three"].sort(), 
        href: "https://derekgou.com/", 
        children: <>Personal portfolio website</>,
    },
    {
        name: "omnivim", 
        image: "/projects/omnivim.svg", 
        dates: "Ongoing", 
        skills: ["Python", "C++", "Swift"].sort(), 
        href: "https://dorahacks.io/buidl/23072", 
        children: <>Tray app making vim motions global, being rebuilt in C++ & Swift</>,
        winner: "3rd overall @ HackCanada"
    },
    {
        name: "TouchUp", 
        image: "/projects/touchup.svg", 
        dates: new Date(2024, 6, 9), 
        skills: ["Python", "OpenCV"].sort(), 
        href: "https://dorahacks.io/buidl/13414", 
        children: <>Tray app for navigating with hand gestures</>,
        winner: "1st overall @ JamHacks8"
    },
    {
        name: "WCI MApp", 
        image: "/projects/wcimapp.svg", 
        dates: new Date(2024, 12, 2), 
        skills: ["React", "Typescript", "Tailwind", "Vite", "MappedIn"].sort(), 
        href: "https://wcimapp.vercel.app/", 
        children: <>High School wayfinding web app</>,
    },
    {
        name: "ARmatica", 
        image: "/projects/armatica.svg", 
        dates: new Date(2025, 5, 18), 
        skills: ["React", "Typescript", "Tailwind", "Vite", "Flask", "Blender", "Python", "Unity, C#"].sort(), 
        href: "https://dorahacks.io/buidl/26379", 
        children: <>Converts 2d breadboard schematics to 3d models and displays them in AR over breadboards</>,
        winner: "3rd overall @ JamHacks9"
    },
    {
        name: "Warpz", 
        image: "/projects/neodev.svg", 
        dates: new Date(2024, 10, 26), 
        skills: ["React", "Typescript", "Tailwind", "Vite", "Hardware", "Flask", "Python", "C#"].sort(), 
        href: "https://github.com/derekGou/neodev_project", 
        children: <>Fullstack automated photogammetry app</>,
        winner: "1st overall @ NeoDev WRDSB Summit"
    },
    {
        name: "Phishy", 
        image: "/projects/phishy.svg", 
        dates: new Date(2023, 6, 12), 
        skills: ["HTML", "CSS", "Javascript", "Chrome Extension", "Tensorflow", "Python"].sort(), 
        href: "https://devpost.com/software/phishy", 
        children: <>AI phishing-detection chrome extension</>,
        winner: "Best Beginner Hack @ JamHacks7"
    },
]