"use client"

import { useScrollX } from "@/app/hooks/scrollX";
import { useScrollY } from "@/app/hooks/scrollY";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import HoleImage from "./holeimage";

interface Props {
    dark?: boolean;
    children?: ReactNode;
    image: string;
}

export default function Hole({dark, children, image}: Props){

    const myClass = dark ? "bg-transparent border-[#8888] border-r-[#8882] border-b-[#8882]" : "bg-transparent border-[#fff8] border-l-[#fff2] border-t-[#fff2]";
    
    const parentRef = useRef<HTMLDivElement>(null);
    const [transforms, setTransforms] = useState({x: 0, y: 0})

    return (
        <>
            <div style={{
                clipPath: "fill-box"
            }} ref={parentRef} className={`${myClass} overflow-hidden border-solid border inset-shadow-sm inset-shadow-[#000c] h-fit w-fit flex items-center justify-center rounded-3xl`}>
                <div style={{}} className="will-change-transform fixed w-screen h-screen top-0">
                    <img
                        src={`/bg/IMG_${image}.JPG`}
                        alt="Background image"
                        className="w-full h-full object-cover -z-10"
                    />
                </div>
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </>
    )
}