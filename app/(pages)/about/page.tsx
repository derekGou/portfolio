"use client"

import Glass from "@/app/components/glass/glass";
import Link from "next/link";
import { GiMonkey } from "react-icons/gi";
import { SiGnubash, SiVercel, SiTensorflow, SiScrapy, SiMediapipe, SiOpencv, SiThreedotjs, SiBlender, SiUnity, SiFigma, SiGit, SiInkscape, SiMysql, SiMongodb, SiFirebase, SiFlask, SiExpress, SiNodedotjs, SiMui, SiVite, SiNextdotjs, SiReact, SiTailwindcss, SiC, SiCplusplus, SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3 } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import Skill from "@/app/components/skill/skill";
import Experience from "@/app/components/experience/experience";
import { experienceList } from "@/app/components/experience/experiencelist";

const languages = [
    { icon: <GiMonkey />, name: "Ook!" },
    { icon: <SiC />, name: "C" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <SiJavascript />, name: "JS" },
    { icon: <SiTypescript />, name: "TS" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiHtml5 />, name: "HTML" },
    { icon: <SiCss3 />, name: "CSS" },
    { icon: <FaJava />, name: "Java" },
];

const frameworks = [
    { icon: <SiReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiVite />, name: "Vite" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <SiMui />, name: "MUI" },
    { icon: <SiNodedotjs />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiFlask />, name: "Flask" },
    { icon: <SiFirebase />, name: "Firebase" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiMysql />, name: "MySQL" },
];

const libraries = [
    { icon: <SiThreedotjs />, name: "Three.js" },
    { icon: <SiOpencv />, name: "OpenCV" },
    { icon: <SiMediapipe />, name: "Mediapipe" },
    { icon: <SiScrapy />, name: "Scrapy" },
    { icon: <SiTensorflow />, name: "Tensorflow" },
];

const tools = [
    { icon: <SiInkscape />, name: "Inkscape" },
    { icon: <SiGit />, name: "Git" },
    { icon: <SiFigma />, name: "Figma" },
    { icon: <SiUnity />, name: "Unity" },
    { icon: <SiBlender />, name: "Blender" },
    { icon: <SiVercel />, name: "Vercel" },
    { icon: <SiGnubash />, name: "Bash" },
];

export default function About() {
    const lst = experienceList

    return (
        <>
            <h3 className="mb-4">About Me</h3>
            <div className="flex flex-col gap-1 items-start justify-start w-full h-fit">
                <p className="mb-4">I'm currently studying <u>Software Engineering (BSE) at the University of Waterloo</u>. In my free time, I'm building <Link href="https://omnivim.org" target="_blank" className="underline">Omnivim</Link>, a tray app for hardcore vim users.</p>
                <Glass className="w-full mb-4">
                    <div className="m-4 w-full flex flex-col gap-2">
                        <h6 className="text-left!">Languages</h6>
                        <div className="flex flex-row flex-wrap gap-2">
                            {languages.map((x, i) => (
                                <Skill key={i} icon={x.icon} name={x.name} />
                            ))}
                        </div>
                    </div>
                </Glass>
                <Glass className="w-full mb-4">
                    <div className="m-4 w-full flex flex-col gap-2">
                        <h6 className="text-left!">Fullstack Tools</h6>
                        <div className="flex flex-row flex-wrap gap-2">
                            {frameworks.map((x, i) => (
                                <Skill key={i} icon={x.icon} name={x.name} />
                            ))}
                        </div>
                    </div>
                </Glass>
                <Glass className="w-full mb-4">
                    <div className="m-4 w-full flex flex-col gap-2">
                        <h6 className="text-left!">Cool Libraries</h6>
                        <div className="flex flex-row flex-wrap gap-2">
                            {libraries.map((x, i) => (
                                <Skill key={i} icon={x.icon} name={x.name} />
                            ))}
                        </div>
                    </div>
                </Glass>
                <Glass className="w-full mb-4">
                    <div className="m-4 w-full flex flex-col gap-2">
                        <h6 className="text-left!">Other Tools</h6>
                        <div className="flex flex-row flex-wrap gap-2">
                            {tools.map((x, i) => (
                                <Skill key={i} icon={x.icon} name={x.name} />
                            ))}
                        </div>
                    </div>
                </Glass>
                <Glass dark={true} className="w-full">
                    <div className="m-4 w-full flex flex-col gap-2">
                        <h6 className="text-left!">Experience</h6>
                        <div className="flex flex-row flex-wrap gap-4">
                            {lst.map((x, i) => (
                                <Experience key={i} name={x.name} org={x.org} dates={x.dates} href={x.href} skills={x.skills}>
                                    {x.children}
                                </Experience>
                            ))}
                        </div>
                    </div>
                </Glass>
            </div>
        </>
    );
}