"use client"
import { ReactNode } from "react";
import Glass from "../glass/glass";
import Image from "next/image";
import Link from "next/link";

interface Props {
    name: string;
    image: string;
    dates: string | Date;
    href: string;
    skills: string[];
    children: ReactNode;
    winner?: string;
}

export default function Project({ name, image, dates, href, skills, children, winner }:Props){
    const date = typeof dates === "string"
        ? dates
        : `${dates.getMonth() + 1}/${dates.getFullYear()}`;
    return (
        <>
            <Link className="w-full" href={href} target="_blank">
                <Glass dark={true} className="w-full cursor-pointer hover:brightness-150 transition-all">
                    <div className="w-full p-4 flex flex-col gap-4">
                        <div className="w-full flex flex-row gap-4">
                            <Glass dark={true} className={`${winner ? "shadow-2xl shadow-[#D4AF37]! border-[#D4AF37]! " : "" }aspect-square flex-shrink-0 shadow-[#888c] p-3`}>
                                <Image
                                    src={image}
                                    alt={`${name} project image`}
                                    width={12}
                                    height={12}
                                    className="w-12 h-12"
                                ></Image>
                            </Glass>
                            <div className="flex flex-col gap-2 grow">
                                <div className="flex flex-col">
                                    <div className="flex flex-col lg:flex-row gap-1 lg:gap-3">
                                        <h6 className="grow text-left!">
                                            {
                                                name + (winner ? " — " : "")
                                            }
                                            <span className="text-[#D4AF37]">
                                                {winner}
                                            </span>
                                        </h6>
                                        <p className="text-gray-400 w-auto! text-left!">{date}</p>
                                    </div>
                                    <p className="hidden lg:block text-gray-300 w-auto! text-[0.8rem]!">— {skills.sort().join(", ")}</p>
                                </div>
                                <p className="hidden lg:block">{children}</p>
                            </div>
                        </div>
                        <p className="lg:hidden text-gray-300 w-auto! text-[0.8rem]!">{skills.sort().join(", ")}</p>
                        <p className="lg:hidden">{children}</p>
                    </div>
                </Glass>
            </Link>
        </>
    )
}