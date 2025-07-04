"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Props {
    image: string;
}

export default function Background({image}: Props) {

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden -z-50">
            <Image
                src={`/${image}`}
                alt="Background image"
                fill
                priority
                className="object-cover"
            />
        </div>
    )
}
