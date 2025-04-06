"use client";
import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import gsap from 'gsap';
import eventBus from "../eventBus/eventBus";

export default function Three() {
    // init variables
    const refContainer = useRef<HTMLDivElement>(null);
    const [imageData, setImageData] = useState<ImageData | null>(null);
    const [faceData, setFaceData] = useState<ImageData | null>(null);
    const [dimensions, setDimensions] = useState(['100vw', '100vh']);

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

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            setImageData(ctx.getImageData(0, 0, img.width, img.height));
        };
    }, [src]);

    // read face data
    const face = "face.png";
    useEffect(() => {
        const img = new Image();
        img.src = face;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            setFaceData(ctx.getImageData(0, 0, img.width, img.height));
        };
    }, [face]);

    // scene
    useEffect(() => {
        if (!imageData) return;
        if (!faceData) return;

        // init scene
        const scene = new THREE.Scene();
        const frustumSize = 15;

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
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        if (refContainer.current) {
            refContainer.current.innerHTML = "";
            refContainer.current.appendChild(renderer.domElement);
        };

        // resize hook
        const onResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const newAspect = width / height;

            orthocamera.left = -frustumSize * newAspect;
            orthocamera.right = frustumSize * newAspect;
            orthocamera.top = frustumSize;
            orthocamera.bottom = -frustumSize;
            orthocamera.updateProjectionMatrix();

            renderer.setSize(width, height);

            canvasSize();
        };
        window.addEventListener("resize", onResize);

        const onVisibilityChange = () => {
            if (!document.hidden) {
                onResize();
            }
        };
    
        document.addEventListener("visibilitychange", onVisibilityChange);

        const canvasSize = () => {
            const box = new THREE.Box3().setFromObject(group);
            const size = new THREE.Vector3();
            box.getSize(size);
            function getGroupSizeInPixels(
                group: THREE.Group, 
                camera: THREE.Camera, 
                renderer: THREE.WebGLRenderer
            ): { width: number; height: number } {
            
                const box = new THREE.Box3().setFromObject(group);
                if (!box) return { width: 0, height: 0 };
            
                const min = box.min.clone();
                const max = box.max.clone();
            
                const minScreen = worldToScreen(min, camera, renderer);
                const maxScreen = worldToScreen(max, camera, renderer);
                
                const width = Math.abs(maxScreen.x - minScreen.x);
                const height = Math.abs(maxScreen.y - minScreen.y);
                
                return { width, height };
            }
            
            function worldToScreen(
                    pos: THREE.Vector3, 
                    camera: THREE.Camera, 
                    renderer: THREE.WebGLRenderer
                ): { x: number; y: number } {
                
                const canvas = renderer.domElement;
                const vector = pos.clone().project(camera);
                
                return {
                    x: (vector.x + 1) * 0.5 * canvas.width,
                    y: (1 - vector.y) * 0.5 * canvas.height
                };
            }
            const sizeInPixels = getGroupSizeInPixels(group, orthocamera, renderer);
        
            setDimensions([`${sizeInPixels.width}px`, `${sizeInPixels.height}px`]);
        }

        // lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 6);
        scene.add(ambientLight);

        // init group
        const group = new THREE.Group();
        scene.add(group);
        group.rotation.y = Math.PI / 2;
        group.position.z -= 10;

        // init point geometry
        const pointGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);

        // add points to scene
        for (let y = 0; y < imageData.height; y++) {
            for (let x = 0; x < imageData.width; x++) {
                if (x % 2 === 0 && y % 2 === 0) {
                    const index = (y * imageData.width + x) * 4;
                    let color = new THREE.Color(
                        imageData.data[index] / 255,
                        imageData.data[index + 1] / 255,
                        imageData.data[index + 2] / 255
                    );
                    if (imageData.data[index + 3]==0){
                        if (Math.random()<0.5){
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
                        opacity: imageData.data[index + 3] / 255,
                    });

                    const point = new THREE.Mesh(pointGeo, pointMat);
                    point.position.set(
                        0.06 * (x - imageData.width / 2),
                        0.06 * ((imageData.height / 2) - y),
                        (Math.random() - 0.5) * 0.04 * -imageData.height
                    );

                    group.add(point);
                };
            };
        };

        // state management variables
        let state = -1;
        let timeoutTriggered = false;

        // rotation animation
        let t = 0;
        const duration = 2;
        const clock = new THREE.Clock();
        const initialRotation = group.rotation.y;
        function easeInOutCubic(t: number) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        // face animation
        let faceLst = Array.from({ length: 5625 }, (_, index) => index);
        let animationsRemaining = group.children.length;
        function animatePixel(obj: THREE.Mesh, index: number): void {
            if (!faceData) return;
        
            const pos = index * 4;
            const size =
                (Math.pow(
                    (faceData.data[pos] + faceData.data[pos + 1] + faceData.data[pos + 2]) / 765,
                    1.125
                ) * 0.8 + 0.2) * 2 * (faceData.data[pos + 3] / 255);
        
            gsap.to(obj.material as THREE.Material, { 
                opacity: 1, 
                duration: 2, 
                ease: "power4.inOut",
            });
            gsap.to(obj.position, {
                x: (index % 75 - 37) * 0.15,
                y: -(Math.floor(index / 75) - 37) * 0.15,
                z: -10,
                duration: 2,
                ease: "power4.inOut",
            });
            gsap.to(obj.scale, {
                x: size,
                y: size,
                z: 0.25,
                duration: 2,
                ease: "power4.inOut",
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
        
        // animation
        const animate = function () {
            requestAnimationFrame(animate)
            switch (state) {
                case -1: // initial pause
                    if (!timeoutTriggered){
                        timeoutTriggered = true;                
                        setTimeout(() => {
                            state = 0;
                            timeoutTriggered = false;
                        }, 500);
                    };
                    break;
                case 0: // rotate
                    if (group.rotation.y === 0) {
                        state = 1;
                        t = 0;
                        break;
                    };
                    t += clock.getDelta() / duration;
                    if (t > 1) t = 1;
                    group.rotation.y = THREE.MathUtils.lerp(initialRotation, 0, easeInOutCubic(t));
                    break;
                case 1: // morph to face
                    const childrenArray: THREE.Object3D[] = [...group.children];
                    childrenArray.forEach((child) => {
                        if (child instanceof THREE.Mesh) {
                            const tempInd = Math.floor(Math.random()*faceLst.length);
                            animatePixel(child as THREE.Mesh, faceLst[tempInd]);
                            faceLst = faceLst.filter((_, i) => i !== tempInd);
                            checkStateTransition();
                        }
                    });
                    state = 2
                    break;
                case 2: // temp state
                    break;
                case 3: // resize canvas parent
                    canvasSize();
                    state = 4;
                    break;
                case 4:
                    eventBus.emit("myEvent", "animated");
                    state = 5;
                    break;
            };
            renderer.render(scene, orthocamera);
        };
        animate();

        return () => {
            window.removeEventListener("resize", onResize);
            renderer.dispose();
        };
    }, [imageData, faceData]);

    return (
        <div className="flex items-center justify-center overflow-hidden" style={{ width: dimensions[0], height: dimensions[1] }}>
            <div ref={refContainer}></div>
        </div>
    );
};