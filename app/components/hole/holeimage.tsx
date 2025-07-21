"use client"

import { useScrollX } from "@/app/hooks/scrollX";
import { useScrollY } from "@/app/hooks/scrollY";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
    image: string;
}

export default function HoleImage({image}: Props){
    const [el, setEl] = useState<HTMLElement | null>(null);
    
    const parentRef = useRef<HTMLDivElement>(null);
    const [transforms, setTransforms] = useState({x: 0, y: 0})

    useEffect(() => {
        setEl(document.body);
        console.log("set")
    }, []);

    if (!el) return null;

    return createPortal(
        <>
            <div style={{}} className="z-100 will-change-transform fixed w-screen h-screen top-0">
                <img
                    src={`/bg/IMG_${image}.JPG`}
                    alt="Background image"
                    className="w-full h-full object-cover -z-10"
                />
            </div>
        </>,
        el
    )
}