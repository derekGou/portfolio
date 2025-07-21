"use client"
import { useEffect, useRef, useState } from "react";
import Glass from "../glass/glass";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function WebNav(){
    const parent = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(48);

    const pathName = usePathname();
    const [leftBorder, setLeftBorder] = useState(1.5)
    const [rightBorder, setRightBorder] = useState(1.5)
    const [left, setLeft] = useState(100)

    useEffect(()=>{
        if (pathName=="/"){
            setLeftBorder(1.5)
            setRightBorder(0)
            setLeft(0)
        } else if (pathName=="/about"){
            setLeftBorder(0)
            setRightBorder(0)
            setLeft(100)
        } else if (pathName=="/projects"){
            setLeftBorder(0)
            setRightBorder(1.5)
            setLeft(200)
        }
    }, [pathName]);

    useEffect(()=>{
        setHeight(parent.current?.offsetHeight || 48);
    }, [])

    return (
        <>
                <Glass className="w-full">
                    <nav className="w-full relative">
                        <div ref={parent} className="relative flex flex-row h-12 w-full divide-x divide-dotted divide-[#fffa]">
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
                                transform: `translateX(${left}%)`,
                                height: `${height}px`,
                                borderRadius: `${leftBorder}rem ${rightBorder}rem ${rightBorder}rem ${leftBorder}rem`
                            }} className="transition-all w-1/3 absolute border border-solid border-white shadow-[inset_0_0_4px_1px_rgb(255,255,255)]"></div>
                        </div>
                    </nav>
                </Glass>
        </>
    )
}