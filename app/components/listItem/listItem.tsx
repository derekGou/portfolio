"use client"
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

export default function ListItem({children}: Props) {
    return (
        <div className="transition-opacity flex flex-row gap-4 items-center justify-start">
            <Image
                alt="bullet point"
                className="h-4 w-4"
                src="/LogoPF.svg"
                width={16}
                height={16}
            />
            <p className="text-left">{children}</p>
        </div>
    )
}