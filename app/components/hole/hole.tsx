"use client"

import { useScrollX } from "@/app/hooks/scrollX";
import { useScrollY } from "@/app/hooks/scrollY";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
    dark?: boolean;
    children?: ReactNode;
    image: string;
}

export default function Hole({dark, children, image}: Props){
    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)

    const scrollX = useScrollX()
    const scrollY = useScrollY()

    const imageRef = useRef<HTMLDivElement>(null);
    const myClass = dark ? "bg-transparent border-[#8888] border-r-[#8882] border-b-[#8882]" : "bg-transparent border-[#fff8] border-l-[#fff2] border-t-[#fff2]";
    
    useEffect(()=>{
        setLeft((imageRef.current?.getBoundingClientRect().left || 0) - scrollX)
    }, [scrollX])

    useEffect(()=>{
        setTop((imageRef.current?.getBoundingClientRect().top || 0) - scrollY)
    }, [scrollY])

    return (
        <>
            <div className={`${myClass} relative overflow-hidden border-solid border inset-shadow-2xl shadow-[#000c] h-fit w-fit flex items-center justify-center rounded-3xl`}>
                <div style={{
                    transform: `translateX(-${left}px) translateY(-${top}px)`
                }} ref={imageRef} className="absolute w-screen h-screen left-0 top-0">
                    <Image
                        src={`/${image}`}
                        alt="Background image"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                {children}
            </div>
        </>
    )
}