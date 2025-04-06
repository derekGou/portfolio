"use client"
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaGithubSquare, FaLinkedin, FaInstagramSquare, FaEnvelopeSquare } from "react-icons/fa";
import eventBus from "../eventBus/eventBus";

export default function Links() {
    const [size, setSize] = useState("3rem");
    const [opacity, setOpacity] = useState(0)
    
    useEffect(()=>{
        document.addEventListener("resize", function(){
            if (window.innerWidth>=768){
                setSize("3rem");
            } else {
                setSize("2rem");
            }
        });
    }, []);

    eventBus.on("myEvent", (msg) => {
        if (msg=="animated"){
            setOpacity(1);
        }
    });

    return (
        <div style={{ opacity: opacity }} className="transition-opacity">
            <IconContext.Provider value={{ color: "#fff", size: size }}>
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
        </div>
    );
}