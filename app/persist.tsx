import { memo, ReactNode } from "react";
import Three from "./components/three/three";
import Background from "./components/background/background";
import Glass from "./components/glass/glass";
import Hole from "./components/hole/hole";
import WebNav from "./components/nav/web";

interface Props {
    children?: ReactNode;
}

function Persist({children}: Props){
    const images = [
        "3519", "3990", "4222", "4229", "4257"
    ]
    const randomImage = "bg/IMG_" + images[Math.floor(Math.random() * images.length)] + ".JPG"
    return (
        <>
            <Background image={randomImage}/>
            <div className="flex flex-row items-center justify-center h-screen w-screen">
                <Glass>
                    <div className="size-fit flex flex-col">
                        <div className="size-fit m-8 flex flex-col gap-8"> 
                            <Hole image={randomImage}>
                                <div className="h-fit w-fit m-4"> 
                                    <Glass dark={true}>
                                            <Three />
                                    </Glass>
                                </div>
                            </Hole>
                        </div>
                        <WebNav/>
                    </div>
                </Glass>
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default memo(Persist)