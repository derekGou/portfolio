"use client"

import { useEffect, useState } from "react"
import eventBus from "../eventBus/eventBus";

export default function Animation(){
    const [opacity, setOpacity] = useState(1)
    useEffect(()=>{
        eventBus.on("myEvent", (payload) => {
            if (payload=="hole"){
                setOpacity(0)
                eventBus.emit("myEvent", "start")
            }
        })
    }, [])

    return (
        <>
            <div style={{ opacity : opacity }} className="pointer-events-none z-200 h-dvh w-dvw transition-opacity duration-500 fixed top-0 left-0 bg-black"/>
        </>
    )
}