"use client"

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { createPortal } from "react-dom";

interface Props {
    image: string;
    dark?: boolean;
    children?: ReactNode;
    recalc?: number;
    position: {
        x: number;
        y: number;
    };
    dimensions: Dispatch<SetStateAction<{
        x: number;
        y: number;
    }>>;
}

export default function HoleImage({image, dark, children, recalc, dimensions, position}: Props){
    const myClass = dark ? "bg-transparent border-[#8888] border-r-[#8882] border-b-[#8882]" : "bg-transparent border-[#fff8] border-l-[#fff2] border-t-[#fff2]";
    const [el, setEl] = useState<HTMLElement | null>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setEl(document.body);
    }, []);

    useEffect(()=>{
        const w = boxRef.current?.clientWidth || 0;
        const h = boxRef.current?.clientHeight || 0;
        dimensions({ x: w, y: h });
    }, [recalc])

    useEffect(() => {
        function handleResize() {
            if (!isMobile){
                dimensions({ x : boxRef.current?.clientWidth || 0 , y : boxRef.current?.clientHeight || 0 });
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (!el) return null;

    return createPortal(
        <>
            <div style={{
                clipPath: "fill-box",
                top: position.y,
                left: position.x
            }} ref = {boxRef} className={`${myClass} pointer-events-none absolute z-100 overflow-hidden border-solid border inset-shadow-sm inset-shadow-[#000c] h-fit w-fit flex items-center justify-center rounded-3xl`}>
                <div className="will-change-transform fixed w-screen h-dvh top-0 left-0">
                    <img
                        src={`/bg/IMG_${image}.JPG`}
                        alt="Background image"
                        className="pointer-events-none w-full h-screen object-cover -z-10"
                    />
                </div>
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </>,
        el
    )
}