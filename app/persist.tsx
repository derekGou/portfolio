"use client";
import { memo, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import eventBus from "./components/eventBus/eventBus";
import Three from "./components/three/three";
import Navbar from "./components/navbar/navbar";
import HomeContent from "./components/heroContent/heroChildren/home";
import AboutContent from "./components/heroContent/heroChildren/about";
import ProjectContent from "./components/heroContent/heroChildren/projects";
import Note from "./components/note/note";

function Persist() {
    const pathName = usePathname();
    const [content, setContent] = useState(<></>);
    const [animated, setAnimated] = useState(false);
    const [placeStyle, setPlaceStyle] = useState({ width: "0px", height: "0px" });
    const [style, setStyle] = useState({ width: "0px", height: "0px" });
    const [opacity, setOpacity] = useState(0);

    const measure = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (animated){
            setOpacity(0)
            setTimeout(() => {
                setContent(
                    pathName === "/" ? <HomeContent /> :
                    pathName === "/about" ? <AboutContent /> :
                    pathName === "/projects" ? <ProjectContent /> :
                    <></>
                );
                setTimeout(() => {
                    setOpacity(1)
                }, 600);
            }, 600);
        }
    }, [pathName, animated]);

    useEffect(()=>{
        if (window.innerWidth>=768){
            setStyle({ width: `${(measure.current?.offsetWidth||0)+1}px`, height: "auto" })
        } else {
            setStyle({ width: "auto", height: `${(measure.current?.offsetHeight||0)+1}px` })
        }
    }, [content])

    useEffect(()=>{
        const handler = () => {
            if (window.innerWidth>=768){
                setStyle({ width: `${(measure.current?.offsetWidth||0)+1}px`, height: "auto" })
            } else {
                setStyle({ width: "auto", height: `${(measure.current?.offsetHeight||0)+1}px` })
            }
        }
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [])

    useEffect(()=>{
        const handler = (msg:any) => {
            if (Array.isArray(msg)){
                if (msg[0]=="dimensions"){
                    setPlaceStyle({ width: msg[1][0], height: msg[1][0] })
                }
            }
        }
        eventBus.on("myEvent", handler);
        return () => eventBus.off("myEvent", handler)
    }, [])
        
    useEffect(()=>{
        const handler = (msg:any) => {
            if (msg=="animated"){
                setAnimated(true);
            }
        }
        eventBus.on("myEvent", handler);
        return () => eventBus.off("myEvent", handler)
    }, [])

    return (
        <>
            <div className="fixed top-[-100%] flex flex-col items-center justify-center w-screen h-screen p-6">
                <div className="flex flex-col md:flex-row-reverse items-center justify-center w-fit h-fit">
                    <div style={placeStyle}/>
                    <div className="h-fit w-fit" ref={measure}>
                        {content}
                    </div>
                </div>
            </div>
            <Navbar/>
            <div className="flex flex-col items-center justify-center w-screen h-screen p-6">
                <div className="flex flex-col md:flex-row-reverse items-center justify-center w-fit h-fit">
                    <Three />
                    <div
                        className="box-border w-fit overflow-hidden flex flex-row items-end justify-end"
                    >
                        <div style={{ ...style, opacity: opacity }} className="transition-all duration-400 ease-linear">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
            <Note/>
        </>
    );
}

export default memo(Persist)