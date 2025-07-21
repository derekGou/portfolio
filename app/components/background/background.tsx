"use client"

interface Props {
    image: string;
}

export default function Background({image}: Props) {

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden -z-50">
                <img
                    src={`/bg/IMG_${image}.JPG`}
                    alt="Background image"
                    className="w-full h-full object-cover"
                />
        </div>
    )
}