import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.06,
            smoothWheel: true,
        });

        // Drive Lenis from GSAP's ticker so ScrollTrigger reads the correct position
        function onTick(time: number) {
            lenis.raf(time * 1000);
        }
        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);

        lenis.on('scroll', ScrollTrigger.update);

        return () => {
            gsap.ticker.remove(onTick);
            lenis.destroy();
        };
    }, []);
}
