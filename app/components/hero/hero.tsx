"use client"

import Image from "next/image"
import FrostedGlass from "../glass/frostedGlass"
import Hole from "../hole/hole"
import Three from "../three/three"
import Links from "../links/links"
import Nav from "../nav/nav"
import { useEffect, useRef, useState } from "react"
import eventBus from "../eventBus/eventBus"

interface Props {
    randomImage: string;
}

export default function Hero({randomImage}:Props){
    const [recalc, setRecalc] = useState(0)

    const [margin, setMargin] = useState(0)
    const boxRef = useRef<HTMLDivElement>(null);

    const recalcMargin = () => {
        if (boxRef.current) {
            const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
            const newMargin = (viewportHeight - boxRef.current.clientHeight) / 2;
            setMargin(prev => (prev !== newMargin ? newMargin : prev));
            setRecalc(prev => prev + 1);
        }
    }

    const setMain = () => {
        if (boxRef.current) {
            const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
            const main = document.getElementsByTagName("main")[0]
            if (viewportWidth >= 768){
                main.style.height = boxRef.current.clientHeight + 'px'
                main.style.width = '100%'
            } else {
                main.style.height = 'auto'
                main.style.width = 'auto'
            }
        }
    }

    const resizeMargin = () => {
        const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
        if (viewportWidth >= 768){
            recalcMargin()
        }
    }

    const resizeMain = () => {
        const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
        if (viewportWidth >= 768){
            setMain()
        }
    }

    useEffect(() => {
        eventBus.on("myEvent", (payload) => {
            if (payload=="start"){
                setMain()
                recalcMargin()
            }
        })

        recalcMargin()
        setMain()

        window.addEventListener("resize", resizeMargin)
        window.addEventListener("resize", resizeMain)

        const observer = new ResizeObserver(() => {
            recalcMargin()
        })

        if (boxRef.current) {
            observer.observe(boxRef.current)
        }

        return () => {
            window.addEventListener("resize", resizeMargin)
            window.addEventListener("resize", resizeMain)
            observer.disconnect()
        }
    }, [])

    return (
        <>
            <div ref={boxRef} style={{ marginTop: `${margin}px` }} className="h-fit">
                <FrostedGlass>
                    <div className="size-fit flex flex-col items-center justify-center">
                        <div className="size-fit m-4 xxs:m-8 flex flex-col gap-8 items-center justify-center"> 
                            <Hole recalc={recalc} setRecalc={setRecalc} image={randomImage}>
                                <div className="h-fit w-fit m-2 xxs:m-4"> 
                                    <FrostedGlass dark={true}>
                                        <Three />
                                    </FrostedGlass>
                                </div>
                            </Hole>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <div className="flex flex-col gap-1 items-center justify-center">
                                    <h1>
                                        <span className="inline-flex items-center">
                                            <Image
                                                src="/LogoPFLeft.svg"
                                                alt="Left Logo"
                                                width={14.4}
                                                height={14.4}
                                                className="mr-1 mb-1 align-middle inline brightness-125"
                                            />
                                            erek
                                        </span>{" "}
                                        <span className="inline-flex items-center">
                                            <Image
                                                src="/LogoPFRight.svg"
                                                alt="Right Logo"
                                                width={14.4}
                                                height={14.4}
                                                className="mr-1 mb-1 align-middle inline brightness-125"
                                            />
                                            ou
                                        </span>
                                    </h1>
                                    <h2>
                                        SWE @ UWaterloo
                                    </h2>
                                    <h6 className="flex-wrap">
                                        Dream. Develop. Deliver.
                                    </h6>
                                </div>
                                <div className="m-3">
                                    <Links/>
                                </div>
                            </div>
                        </div>
                        <Nav/>
                    </div>
                </FrostedGlass>
            </div>
        </>
    )
}