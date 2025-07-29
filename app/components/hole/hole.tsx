"use client"

import { ReactNode, useEffect, useRef, useState } from "react";
import HoleImage from "./holeimage";

interface Props {
    dark?: boolean;
    children?: ReactNode;
    image: string;
}

export default function Hole({dark, children, image}: Props){
    const [dimensions, setDimensions] = useState({ x : 0 , y : 0 })

    const boxRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x : 0 , y : 0 })

    useEffect(()=>{
        if (!boxRef.current) return
        const rect = boxRef.current.getBoundingClientRect()
        setPosition({x: rect.left, y: rect.top})
    }, [boxRef.current, dimensions])

    return (
        <>
            <div ref={boxRef} style={{
                width: dimensions.x,
                height: dimensions.y,
            }}>

            </div>
            <HoleImage image={image} dark={dark} dimensions={setDimensions} position={position}>
                {children}
            </HoleImage>
        </>
    )
}