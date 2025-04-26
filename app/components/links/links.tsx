"use client"
import { IconContext } from "react-icons";
import Link from "next/link";
import { FaGithubSquare, FaLinkedin, FaInstagramSquare, FaEnvelopeSquare } from "react-icons/fa";

export default function Links() {
    return (
        <div className="h-[40px]">
            <IconContext.Provider value={{ color: "#fff", size: "40" }}>
                <div className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                    <Link href="https://github.com/derekGou" target="_blank" rel="noopener noreferrer">
                        <FaGithubSquare />
                    </Link>
                    <Link href="http://linkedin.com/in/derek-gou" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </Link>
                    <Link href="https://www.instagram.com/derekgou" target="_blank" rel="noopener noreferrer">
                        <FaInstagramSquare />
                    </Link>
                    <Link href="mailto:derekgou19@gmail.com" target="_blank">
                        <FaEnvelopeSquare />
                    </Link>
                </div>
            </IconContext.Provider>
        </div>
    );
}