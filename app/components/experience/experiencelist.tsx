import { ReactNode } from "react";

type Item =
    {
        name: string;
        org: string;
        dates: string;
        skills: string[];
        href: string;
        children: ReactNode;
    }

export const experienceList:Item[] = [
    {
        name: "Autonomy Team Member", 
        org: "UWARG", 
        dates: "Sep. 2025 - Present", 
        skills: ["Bash, VirtualBox, Raspberry Pi"].sort(), 
        href: "https://uwarg.com", 
        children: <>Building tech for cutting-edge autonomous drones.</>,
    },
    {
        name: "Co-founder and Director", 
        org: "SproutHacks", 
        dates: "Sep. 2023 - Aug. 2025", 
        skills: ["Leadership", "Finance"].sort(), 
        href: "https://sprouthacks.ca/", 
        children: <>Led a 12-member team to launch a hackathon, raised $18K+, hosted 80+ students, and donated 80+ meals to local shelters.</>,
    },
    {
        name: "Web Dev Intern", 
        org: "The CILC", 
        dates: "Apr. 2024 - Aug. 2025", 
        skills: ["ReactJS", "Vite", "Tailwind", "Javascript"].sort(), 
        href: "https://cilc.ca/", 
        children: <>Built and launched a responsive, accessibility-focused website, contributing to a $10K+ grant increase.</>,
    },
    {
        name: "Web Dev Lead", 
        org: "Mechmania", 
        dates: "Nov. 2024 - Jun. 2025", 
        skills: ["ReactJS", "Vite", "Tailwind", "Javascript", "Firebase"].sort(), 
        href: "https://mechmania.ca/", 
        children: <>Built Mechmania's website, featuring a complex interactive gear animation, generating 1,000+ user interactions.</>,
    },
]