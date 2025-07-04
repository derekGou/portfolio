"use client";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import gsap from 'gsap';
import eventBus from "../eventBus/eventBus";
import { usePathname } from "next/navigation";

export default function Three() {
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
        const scene = new THREE.Scene();
        const frustumSize = 20;

        // init camera
        const aspect = window.innerWidth / window.innerHeight;
        const orthocamera = new THREE.OrthographicCamera(
            -frustumSize * aspect,
            frustumSize * aspect,
            frustumSize,
            -frustumSize,
            0.1,
            1000
        );

        // init renderer
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(new THREE.Color("#000000"), 0);
        if (refContainer.current) {
            while (refContainer.current.firstChild) {
                refContainer.current.removeChild(refContainer.current.firstChild);
            }
            refContainer.current.appendChild(renderer.domElement);
        };

        // lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 6);
        scene.add(ambientLight);

        // init group
        const group = new THREE.Group();
        scene.add(group);
        group.position.z -= 10;

        // init point geometry
        const pointGeo = new THREE.BoxGeometry(0.066, 0.066, 0.066);

        // add points to scene
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                const index = (y * imageData.width + x) * 4;
                let color = new THREE.Color(
                    imageData.data[index] / 255,
                    imageData.data[index + 1] / 255,
                    imageData.data[index + 2] / 255
                );
                if (imageData.data[index + 3]==0){
                    if (x<=(0.5*imageData.width)){
                        color = new THREE.Color(
                            13 / 255,
                            187 / 255,
                            228 / 255
                        );
                    } else {
                        color = new THREE.Color(
                            28 / 255,
                            180 / 255,
                            151 / 255
                        );
                    };
                };
                const pointMat = new THREE.MeshStandardMaterial({
                    color: color,
                    metalness: 0.5,
                    roughness: 0.5,
                    transparent: true,
                    opacity: imageData.data[index + 3] === 0 ? 0 : imageData.data[index + 3] / 255,
                });

                const point = new THREE.Mesh(pointGeo, pointMat);
                point.position.set(
                    0.11 * (x - imageData.width / 2),
                    0.11 * ((imageData.height / 2) - y),
                    0
                );

                group.add(point);
            };
        };

        // state management variables
        let state = 0;

        // face animation
        let faceLst = Array.from({ length: 5625 }, (_, index) => index);
        let animationsRemaining = group.children.length;
        function animatePixel(obj: THREE.Mesh, index: number, faceData: ImageData): void {
            if (!faceData) return;
        
            const pos = index * 4;
            const size =
                (Math.pow(
                    (faceData.data[pos] + faceData.data[pos + 1] + faceData.data[pos + 2]) / 765,
                    1.125
                ) * 0.8 + 0.2) * 2 * (faceData.data[pos + 3] / 255);
        
            gsap.to(obj.material as THREE.Material, { 
                opacity: 1, 
                duration: 1.5, 
                ease: "linear",
            });
            gsap.to(obj.scale, {
                x: size,
                y: size,
                z: 0.25,
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
            animationsRemaining = group.children.length;
            faceLst = Array.from({ length: 5625 }, (_, index) => index);
            transitioned = false;
        }

        // animation
        let timeout = false;
        const animate = function () {
            requestAnimationFrame(animate)
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

                    group.children.forEach((child, i) => {
                        if (child instanceof THREE.Mesh) {
                            animatePixel(child, faceLst[i], startImage);
                            checkStateTransition();
                        }
                    });
                    state = 2
                    break;
                case 2: // temp state
                    break;
                case 3: // resize canvas parent
                    state = 4;
                    break;
                case 4:
                    eventBus.emit("myEvent", "animated");
                    state = 5;
                    break;
                case 5:
                    pathRef.current?.addEventListener("click", onNav);
                    state = 6;
                    break;
                case 6:
                    if (animationsRemaining>0){
                        const childrenArray: THREE.Object3D[] = [...group.children];
                        let startImage2 = homeData;
                        if (latestPathRef.current=="/about"){
                            startImage2=aboutData;
                        } else if (latestPathRef.current=="/projects"){
                            startImage2=projectData;
                        }
                        
                        childrenArray.forEach((child, i) => {
                            if (child instanceof THREE.Mesh) {
                                animatePixel(child as THREE.Mesh, faceLst[i], startImage2);
                                checkStateTransition();
                            }
                        });
                    }
                    break;
            };
            renderer.render(scene, orthocamera);
        };
        animate();

        return () => {
            renderer.dispose();
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