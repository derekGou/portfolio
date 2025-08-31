"use client"

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react"

export default function Title(){
    const pathName = usePathname();
    const pathRef = useRef<HTMLButtonElement>(null);
    const latestPathRef = useRef(pathName);

    useEffect(()=>{
        pathRef.current?.click();
        latestPathRef.current = pathName;
        let currTitle = latestPathRef.current
        if (currTitle=="/"){
            currTitle += "home"
        }
        currTitle += ".tsx"
        type(currTitle)
    }, [pathName]);

    const [title, setTitle] = useState("")
    const titleRef = useRef("");
    useEffect(() => {
        titleRef.current = title;
    }, [title]);

    const type = (str: string) => {
        const currTitle = titleRef.current;
        if (str !== currTitle) {
            if (str.startsWith(currTitle)) {
                const newVal = str.slice(0, currTitle.length + 1);
                setTitle(newVal);
            } else {
                const newVal = currTitle.slice(0, -1);
                setTitle(newVal);
            }
            setTimeout(() => type(str), 100);
        }
    };

    return (
        <>
            <div className="p-1 flex flex-row">
                <button ref={pathRef}></button>
                <div className="flex flex-col items-center justify-center gap-0 w-full">
                    <p className="text-center text-[0.8rem]! w-fit h-0 overflow-hidden">/{latestPathRef.current}.tsx</p>
                    <p className="text-center text-[0.8rem]! text-[#eee]">{title}</p>
                </div>
            </div>
        </>
    )
}