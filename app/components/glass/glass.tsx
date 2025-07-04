"use client"

import { ReactNode } from "react";

interface Props {
    dark?: boolean;
    children?: ReactNode;
    className? : string;
}

export default function Glass({dark, children, className}: Props){
    const myClass = dark ? "bg-[#222c] border-[#8888] border-r-[#8882] border-b-[#8882]" : "bg-[#fff2] border-[#fff8] border-r-[#fff2] border-b-[#fff2]";
    return (
        <>
            <div className={`${myClass} ${className} overflow-hidden border-solid border shadow-2xl shadow-[#000c] h-fit w-fit flex items-center justify-center rounded-3xl backdrop-blur-xs`}>
                {children}
            </div>
        </>
    )
}