"use client"

import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import HoleImage from "./holeimage";
import eventBus from "../eventBus/eventBus";
import { usePathname } from "next/navigation";
import { isMobile } from 'react-device-detect';

interface Props {
    dark?: boolean;
    children?: ReactNode;
    image: string;
    recalc?: number;
    setRecalc?: Dispatch<SetStateAction<number>>;
}

export default function Hole({dark, children, image, recalc, setRecalc}: Props){
    const pathName = usePathname();
    const pathRef = useRef<HTMLButtonElement>(null);
    const latestPathRef = useRef(pathName);

    useEffect(()=>{
        if (!setRecalc) return;
        if (isMobile){
            setRecalc(prev => prev + 1)
        }
    }, [])

    useEffect(()=>{
        pathRef.current?.click();
        latestPathRef.current = pathName;
        if (!setRecalc) return;
        if (!isMobile){
            setRecalc(prev => prev + 1)
        }
    }, [pathName]);

    const [dimensions, setDimensions] = useState({ x : 0 , y : 0 })
    const [updates, setUpdates] = useState(0)

    const boxRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x : 0 , y : 0 })

    useEffect(()=>{
        if (!boxRef.current) return
        const rect = boxRef.current.getBoundingClientRect()
        setPosition({x: rect.left, y: rect.top})
        if (dimensions.x!=0 && dimensions.y!=0){
            setUpdates(prev => prev + 1)
            if (updates==1 || isMobile){
                eventBus.emit("myEvent", "hole")
            }
        }
    }, [dimensions])

    return (
        <>
            <div ref={boxRef} style={{
                width: dimensions.x,
                height: dimensions.y,
            }}>

            </div>
            <HoleImage recalc={recalc} image={image} dark={dark} dimensions={setDimensions} position={position}>
                {children}
            </HoleImage>
        </>
    )
}