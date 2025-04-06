"use client"
import { useState, useRef, ReactElement } from "react";
import clsx from "clsx";
import eventBus from "../eventBus/eventBus";

interface Props {
    children?: ReactElement;
}

export default function Hero({ children } : Props ) {
    const refContainer = useRef<HTMLDivElement>(null);
    const [animateClass, setAnimateClass] = useState("")

    eventBus.on("myEvent", (msg) => {
        if (msg=="animated"){
            if (window.innerWidth >= 768) {
                setAnimateClass("animate-slide-left");
            } else {
                setAnimateClass("animate-slide-down");
            }
        }
    });

    return (
        <div ref={refContainer} className={clsx("max-h-0 max-w-0 box-border w-fit overflow-hidden flex flex-row items-end justify-end", animateClass)}>
            {children}
        </div>
    );
};