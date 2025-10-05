import { memo, ReactNode } from "react";
import Background from "./components/background/background";
import Hero from "./components/hero/hero";
import FrostedGlass from "./components/glass/frostedGlass";
import Animation from "./components/animation/animation";
import Body from "./components/body/body";
import Scroll from "./components/scroll/scroll";

interface Props {
    children?: ReactNode;
}

function Persist({children}: Props){
    const images = [
        "3519", "4224", "4229"
    ]
    const randomImage = images[Math.floor(Math.random() * images.length)]
    return (
        <>
            <Background image={randomImage}/>
            <div className="flex h-fit w-screen items-center justify-center flex-col md:flex-row gap-6 px-4 md:px-16 pt-4 md:pt-0 overflow-hidden">
                <div className="flex justify-center h-auto md:h-dvh w-full md:w-auto">
                    <Hero randomImage={randomImage}/>
                </div>
                <div className="flex items-center justify-center h-auto md:h-dvh w-full md:w-auto mb-6 md:mb-0">
                    <main>
                        <FrostedGlass className="w-full max-w-200 h-full flex flex-col items-center justify-center">
                            <Body>
                                {children}
                            </Body>
                        </FrostedGlass>
                    </main>
                </div>
            </div>
            <Animation/>
            <Scroll/>
        </>
    )
}

export default memo(Persist)