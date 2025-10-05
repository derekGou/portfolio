"use client"
import { MdArrowUpward } from "react-icons/md";
import Glass from "../glass/glass";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import { useScrollY } from "@/app/hooks/scrollY";

export default function Scroll(){
    const [display, setDisplay] = useState("none");
    const scrollY = useScrollY();

    useEffect(()=>{
        if (scrollY>0) setDisplay("block");
        else setDisplay("none");
    }, [scrollY])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <div style={{ display: display }} className="md:hidden fixed h-dvh w-dvw top-0 left-0 z-200 pointer-events-none">
            <div className="absolute bottom-0 right-0 p-4">
                <div onClick={()=>{scrollUp()}}>
                    <Glass dark={true} className="rounded-full cursor-pointer pointer-events-auto border-solid! border-2! border-[#cccc]! hover:brightness-125 transition-all">
                        <div className="p-2">
                            <IconContext.Provider value={{ color: "#ccc", size: "32" }}>
                                <MdArrowUpward/>
                            </IconContext.Provider>
                        </div>
                    </Glass>
                </div>
            </div>
        </div>
    )
}