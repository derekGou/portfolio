"use client"
import { IconContext } from "react-icons";
import Link from "next/link";
import { FaGithubSquare, FaLinkedin, FaEnvelopeSquare } from "react-icons/fa";
import { FaSquarePollHorizontal } from "react-icons/fa6";

export default function Links() {
    return (
        <div className="flex flex-col gap-2">
            <div className="h-[36px]">
                <IconContext.Provider value={{ color: "#eee", size: "36" }}>
                    <div className="flex flex-row items-center justify-center gap-4 h-fit w-fit">
                        <Link href="https://github.com/derekGou" target="_blank" rel="noopener noreferrer" className="transition-all cursor-pointer hover:brightness-110">
                            <FaGithubSquare />
                        </Link>
                        <Link href="http://linkedin.com/in/derek-gou" target="_blank" rel="noopener noreferrer" className="transition-all cursor-pointer hover:brightness-110">
                            <FaLinkedin />
                        </Link>
                        <Link href="mailto:derekgou19@gmail.com" target="_blank" className="transition-all cursor-pointer hover:brightness-110">
                            <FaEnvelopeSquare />
                        </Link>
                        <Link href="/Derek_Gou___Resume.pdf" target="_blank" className="transition-all cursor-pointer hover:brightness-110">
                            <FaSquarePollHorizontal />
                        </Link>
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    );
}