"use client"

import { ReactNode } from "react";

interface Props {
    dark?: boolean;
    children?: ReactNode;
    className? : string;
}

export default function Glass({dark, children, className}: Props){

    return (
        <>
            <div className={`
                ${dark ? "bg-[#222c] border-[#8888] border-r-[#8882] border-b-[#8882]" : "bg-[#fff4] border-[#fff8] border-r-[#fff2] border-b-[#fff2]"}
                ${className || ""} 
                will-change-transform transform-gpu relative z-10 overflow-hidden border-solid border shadow-2xl shadow-[#000c] h-fit w-fit flex items-center justify-center rounded-3xl`}
            >
                {children}
            </div>
        </>
    )
}