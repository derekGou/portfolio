"use client"

import { ReactNode } from "react";
import Title from "../title/title";

interface Props {
    children?: ReactNode;
}

export default function Body({children}: Props){

    return (
        <>
            <div className="p-4 md:p-8 w-full md:h-full flex flex-col md:overflow-y-scroll customScrollbar">
                <div className="flex flex-col w-full h-full">
                    <Title/>
                    {children}
                    <br/>
                </div>
            </div>
        </>
    )
}