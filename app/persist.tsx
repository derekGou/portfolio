import { memo, ReactNode } from "react";
import Three from "./components/three/three";
import Background from "./components/background/background";
import Glass from "./components/glass/glass";
import Hole from "./components/hole/hole";
import WebNav from "./components/nav/web";
import Image from "next/image";
import FrostedGlass from "./components/glass/frostedGlass";
import Two from "./components/three/two";

interface Props {
    children?: ReactNode;
}

function Persist({children}: Props){
    const images = [
        "3519", "3990", "4222", "4229"
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)]
    return (
        <>
            <Background image={randomImage}/>
            <div className="flex flex-row items-center justify-center min-h-screen w-screen">
                <FrostedGlass>
                    <div className="size-fit flex flex-col">
                        <div className="size-fit m-8 flex flex-col gap-8 items-center justify-center"> 
                            <Hole image={randomImage}>
                                <div className="h-fit w-fit m-4"> 
                                    <FrostedGlass dark={true}>
                                        <Three />
                                    </FrostedGlass>
                                </div>
                            </Hole>
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
                        </div>
                        <WebNav/>
                    </div>
                </FrostedGlass>
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default memo(Persist)