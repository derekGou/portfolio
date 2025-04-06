"use client"
import { IconContext } from "react-icons";
import { FaGithubSquare, FaLinkedin, FaInstagramSquare, FaEnvelopeSquare } from "react-icons/fa";

export default function Links() {
    return (
        <IconContext.Provider value={{ color: "#fff", size: "3rem" }}>
            <div className="flex flex-row items-center justify-center gap-2 h-fit w-fit">
                <a href="https://github.com/derekGou" target="_blank" rel="noopener noreferrer">
                    <FaGithubSquare />
                </a>
                <a href="http://linkedin.com/in/derek-gou" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
                <a href="https://www.instagram.com/derekgou" target="_blank" rel="noopener noreferrer">
                    <FaInstagramSquare />
                </a>
                <a href="mailto:derekgou19@gmail.com" target="_blank">
                    <FaEnvelopeSquare />
                </a>
            </div>
        </IconContext.Provider>
    );
}