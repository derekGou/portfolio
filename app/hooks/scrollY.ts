import { useEffect, useState } from "react";

export function useScrollY() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initialize with current scroll position
        handleScroll();
        console.log(scroll)

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollY;
}