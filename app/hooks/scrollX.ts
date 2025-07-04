import { useEffect, useState } from "react";

export function useScrollX() {
    const [scrollX, setScrollX] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollX(window.scrollX);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        // Initialize with current scroll position
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollX;
}