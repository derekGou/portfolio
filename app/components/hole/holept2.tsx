"use client"

import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
    dark?: boolean;
    children?: ReactNode;
    image: string;
}

export default function Hole({dark, children, image}: Props){
    const parentRef = useRef<HTMLDivElement>(null);
    const elementRef = useRef<HTMLDivElement>(null);
    const animationFrame = useRef<number>(0);
    const myClass = dark ? "bg-transparent border-[#8888] border-r-[#8882] border-b-[#8882]" : "bg-transparent border-[#fff8] border-l-[#fff2] border-t-[#fff2]";
    
    useEffect(() => {
        const parent = parentRef.current;
        const el = elementRef.current;

        if (!parent || !el) return;

        const updatePosition = () => {
            const parentRect = parent.getBoundingClientRect();
            el.style.transform = `translate(${-parentRect.left}px, ${-parentRect.top}px)`;
        };

        const onScroll = () => {
            if (animationFrame.current != null) cancelAnimationFrame(animationFrame.current);
            animationFrame.current = requestAnimationFrame(updatePosition);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        updatePosition();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (animationFrame.current != null) cancelAnimationFrame(animationFrame.current);
        };
    }, []);

    return (
        <>
            <div ref={parentRef} className={`${myClass} relative overflow-hidden border-solid border inset-shadow-sm inset-shadow-[#000c] h-fit w-fit flex items-center justify-center rounded-3xl`}>
                <div ref={elementRef} className="will-change-transform absolute w-screen h-screen left-0 top-0">
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