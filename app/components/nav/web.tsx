"use client"
import { useEffect, useRef, useState } from "react";
import Glass from "../glass/glass";
import Link from "next/link";

export default function WebNav(){
    const [sixRem, setSixRem] = useState(32);

    const parent = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(48);

    const remToPx = (rem: number) => {
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return rem * rootFontSize;
    };

    useEffect(()=>{
        setSixRem(remToPx(6));
        setHeight(parent.current?.offsetHeight || 48);
    }, [])

    return (
        <>
            <Glass className="w-full">
                <nav className="w-full">
                    <div ref={parent} className="flex flex-row h-12 w-full divide-x divide-dotted divide-[#fffa]">
                        <Link href="/" className="w-1/3 flex items-center justify-center cursor-pointer">
                            <h4 className="text-sm">Home</h4>
                        </Link>
                        <Link href="/about" className="w-1/3 flex items-center justify-center cursor-pointer">
                            <h4 className="text-sm">About</h4>
                        </Link>
                        <Link href="/projects" className="w-1/3 flex items-center justify-center cursor-pointer">
                            <h4 className="text-sm">Projects</h4>
                        </Link>
                        <div style={{
                            height: `${height}px`
                        }} className="w-1/3 absolute !border !border-solid border-white inset-shadow-sm inset-shadow-white"></div>
                    </div>
                </nav>
            </Glass>
        </>
    )
}