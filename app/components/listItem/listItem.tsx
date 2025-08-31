"use client"
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
    indent?: number
}

export default function ListItem({children, indent}: Props) {
    return (
        <div style={(indent && indent >= 1) ? { filter : "brightness(80%)" } : {}} className="transition-opacity flex flex-row gap-2 items-start justify-start">
            <div style={ indent ? { width: (indent*2)+"rem" } : {} }/>
            <Image
                alt="bullet point"
                className="h-4 w-4 invert mt-1"
                src="/bullet.svg"
                width={16}
                height={16}
            />
            <p className="text-left">{children}</p>
        </div>
    )
}