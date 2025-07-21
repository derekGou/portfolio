"use client";
import { useRef, useEffect, useState } from "react";
import gsap from 'gsap';
import eventBus from "../eventBus/eventBus";
import { usePathname } from "next/navigation";
import * as PIXI from "pixi.js";
import { Application, Particle, ParticleContainer } from "pixi.js";

export default function Two() {
    // init variables
    const refContainer = useRef<HTMLDivElement>(null);
    const [imageData, setImageData] = useState<ImageData | null>(null);
    const [homeData, setHomeData] = useState<ImageData | null>(null);
    const [aboutData, setAboutData] = useState<ImageData | null>(null);
    const [projectData, setProjectData] = useState<ImageData | null>(null);
    const pathName = usePathname();
    const pathRef = useRef<HTMLButtonElement>(null);
    const latestPathRef = useRef(pathName);

    useEffect(()=>{
        pathRef.current?.click();
        latestPathRef.current = pathName;
    }, [pathName]);

    // read logo data
    const src = "LogoPF.svg";
    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            canvas.width = 75
            canvas.height = 75
            ctx.drawImage(img, 0, 0, 75, 75);

            setImageData(ctx.getImageData(0, 0, 75, 75));
        };
    }, [src]);

    // read face data
    const home = "faces/home.png";
    useEffect(() => {
        const img = new Image();
        img.src = home;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = 75
            canvas.height = 75
            ctx.drawImage(img, 0, 0, 75, 75);

            setHomeData(ctx.getImageData(0, 0, 75, 75));
        };
    }, [home]);

    // read about data
    const about = "faces/about.png";
    useEffect(() => {
        const img = new Image();
        img.src = about;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = 75
            canvas.height = 75
            ctx.drawImage(img, 0, 0, 75, 75);

            setAboutData(ctx.getImageData(0, 0, 75, 75));
        };
    }, [about]);

    // read project data
    const project = "faces/project.png";
    useEffect(() => {
        const img = new Image();
        img.src = project;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = 75
            canvas.height = 75
            ctx.drawImage(img, 0, 0, 75, 75);

            setProjectData(ctx.getImageData(0, 0, 75, 75));
        };
    }, [project]);

    // scene
    useEffect(() => {
        if (!imageData) return;
        if (!homeData) return;
        if (!aboutData) return;
        if (!projectData) return;
       

        // init scene
        const app = new Application();

        (async () => {
            await app.init({
                background: "#111111",
                backgroundAlpha: 0,
                width: 200,
                height: 200,
            })

            console.log("hi")

            if (refContainer.current){
                refContainer.current.appendChild(app.canvas)
            } else {
                console.log("broken")
            }

            const container = new ParticleContainer({
                dynamicProperties: {
                    position: true,
                    scale: true,
                    rotation: false,
                    color: true,
                },
            });

            // add points to scene
            for (let y = 0; y < imageData.height; y++) {
                for (let x = 0; x < imageData.width; x++) {
                    const index = (y * imageData.width + x) * 4;
                    let color = [
                        imageData.data[index],
                        imageData.data[index + 1],
                        imageData.data[index + 2]
                    ];
                    if (imageData.data[index + 3]==0){
                        color = (x<=(0.5*imageData.width)) ? [
                                13 / 255,
                                187 / 255,
                                228 / 255
                            ] : [
                                28 / 255,
                                180 / 255,
                                151 / 255
                            ];
                    }

                    const size =
                        (Math.pow(
                            (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 765,
                            1.125
                        ) * 0.8 + 0.2) * 2 * (imageData.data[index + 3] / 255);

                    const particle = new Particle({
                        texture: PIXI.Texture.WHITE,
                        x: x*200/75,
                        y: y*200/75,
                        scaleX: 20/75*size,
                        scaleY: 20/75*size,
                        tint: color
                    })

                    container.addParticle(particle)
                    console.log(particle)
                };
            };
            app.stage.addChild(container);

            // state management variables
            let state = 0;

            // face animation
            let faceLst = Array.from({ length: 5625 }, (_, index) => index);
            let animationsRemaining = container.children.length
            function animatePixel(obj: PIXI.Particle, index: number, faceData: ImageData): void {
                if (!faceData) return;
            
                const pos = index * 4;
                const size =
                    (Math.pow(
                        (faceData.data[pos] + faceData.data[pos + 1] + faceData.data[pos + 2]) / 765,
                        1.125
                    ) * 0.8 + 0.2) * 2 * (faceData.data[pos + 3] / 255);
            
                gsap.to(obj, {
                    scaleX: 20/75*size,
                    scaleY: 20/75*size,
                    duration: 1.5,
                    ease: "linear",
                });
            };
            let transitioned = false;
            function checkStateTransition() {
                animationsRemaining--;
                if (animationsRemaining === 0 && !transitioned) {
                    transitioned = true;
                    setTimeout(() => {
                        state = 3;
                    }, 2000);
                }
            }
            
            function onNav() {
                animationsRemaining = container.children.length;
                faceLst = Array.from({ length: 5625 }, (_, index) => index);
                transitioned = false;
            }

            // animation
            let timeout = false;

            app.ticker.add(()=>{
                switch (state) {
                    case 0:
                        if (!timeout){
                            setTimeout(() => {
                                state = 1;
                            }, 1000);
                            timeout = true;
                        }
                        break
                    case 1: // morph to face
                        const startImage =
                            pathName === "/about" ? aboutData :
                            pathName === "/projects" ? projectData :
                            homeData;

                        container.children.forEach((child, i) => {
                            if (child instanceof PIXI.Particle) {
                                animatePixel(child, faceLst[i], startImage);
                                checkStateTransition();
                            }
                        });
                        state = 2
                        break;
                    case 2: // temp state
                        break;
                    case 3:
                        eventBus.emit("myEvent", "animated");
                        state = 4;
                        break;
                    case 4:
                        pathRef.current?.addEventListener("click", onNav);
                        state = 5;
                        break;
                    case 5:
                        if (animationsRemaining>0){
                            const childrenArray: PIXI.ContainerChild[] = [...container.children];
                            let startImage2 = homeData;
                            if (latestPathRef.current=="/about"){
                                startImage2=aboutData;
                            } else if (latestPathRef.current=="/projects"){
                                startImage2=projectData;
                            }

                            childrenArray.forEach((child, i) => {
                                if (child instanceof PIXI.Particle) {
                                    animatePixel(child, faceLst[i], startImage);
                                    checkStateTransition();
                                }
                            });
                        }
                        break;
                };
                container.update();
            })
    })();

        return () => {
            app?.destroy(true, { children: true });
        };
    }, [imageData, homeData, aboutData, projectData]);

    return (
        <>
            <div className="w-[220px] h-[220px] flex items-center justify-center overflow-hidden">
                <div ref={refContainer}></div>
            </div>
            <button ref={pathRef}></button>
        </>
    );
};