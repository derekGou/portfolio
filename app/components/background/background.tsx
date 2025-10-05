"use client"

import { useEffect } from "react";

interface Props {
    image: string;
}

export default function Background({image}: Props) {
    useEffect(()=>{
        const img = new Image();
        img.src = `/bg/IMG_${image}.JPG`;
        function getAverageColor(imageElement:HTMLImageElement) {
            if (!imageElement) return;

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = imageElement.width;
            canvas.height = imageElement.height;
            
            if (canvas.width==0 || canvas.height==0) return;

            if (!context) return;
            context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            let r = 0, g = 0, b = 0;

            for (let i = 0; i < data.length; i += 4) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
            }

            const pixelCount = data.length / 4;
            r = Math.round(r / pixelCount);
            g = Math.round(g / pixelCount);
            b = Math.round(b / pixelCount);

            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        }
        img.onload = () => {
            document.body.style.backgroundColor = getAverageColor(img) || 'black'
        }
    }, [])

    return (
        <div className="pointer-events-none fixed top-0 left-0 w-screen h-screen overflow-hidden -z-50">
            <img
                src={`/bg/IMG_${image}.JPG`}
                alt="Background image"
                className="pointer-events-none w-full h-screen object-cover"
            />
        </div>
    )
}
