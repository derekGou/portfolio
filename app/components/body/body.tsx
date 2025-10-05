"use client"

import { ReactNode } from "react";
import Title from "../title/title";

interface Props {
    children?: ReactNode;
}

export default function Body({children}: Props){

    return (
        <>
            <div style={{ scrollbarGutter: "stable" }} className="p-4 md:p-8 w-full md:h-full flex flex-col md:overflow-y-scroll">
                <div className="flex flex-col w-full h-full">
                    <Title/>
                    {children}
                    <div className="h-4 flex-shrink-0"></div>
                </div>
            </div>
        </>
    )
}