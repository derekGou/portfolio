import { ReactNode } from "react";
import Glass from "../glass/glass";
import Link from "next/link";

interface Props {
    name: string;
    org: string;
    dates: string;
    href: string;
    skills: string[];
    children?: ReactNode;
}

export default function Experience({name, org, dates, href, skills, children}: Props){
    return (
        <Link className="w-full" href={href} target="_blank">
            <Glass className="w-full cursor-pointer hover:brightness-150 hover:border-[#fffa]! transition-all">
                <div className="w-full p-4 flex flex-row gap-4">
                    <div className="flex flex-col gap-2 grow">
                        <div className="flex flex-col">
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <p className="text-gray-300 w-auto! text-[0.8rem]!">{dates}</p>
                            </div>
                            <div className="flex flex-row gap-3 items-center">
                                <h6 className="grow text-left!">
                                    {name + " - " + org}
                                </h6>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-4">
                                <p className="text-gray-300 w-auto! text-[0.8rem]!">{skills.sort().join(", ")}</p>
                            </div>
                        </div>
                        <p>{children}</p>
                    </div>
                </div>
            </Glass>
        </Link>
    )
}