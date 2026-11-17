import { gsap } from "./gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);




export function initNavAnims() {

    const ctx = gsap.context(() => {

        const bg = document.querySelector(".nav-bg");
        const trigger = document.querySelector(`[data-anim="nav-trigger"]`);

        const logoLight = document.querySelector(".nav-brand-img");
        const logoDark = document.querySelector(".nav-brand-img.absolute");

        const defaults = {
            ease: "power2.inOut",
            duration: 0.27,
            scrolltrigger: {
                    trigger: trigger,
                    start: "top 9%",
                    markers: false,
                    toggleActions: "play none none reverse"
            }
        }

        gsap.fromTo(bg, {
            opacity: 0,
        },
        {
            opacity: 1,
            ease: defaults.ease,
            duration: defaults.duration,

            scrollTrigger: defaults.scrolltrigger
            
        })
        gsap.fromTo(logoLight, {
            opacity: 1,
        },
        {
            opacity: 0,
            ease: defaults.ease,
            duration: defaults.duration,

            scrollTrigger: defaults.scrolltrigger
            
        })
        gsap.fromTo(logoDark, {
            opacity: 0,
        },
        {
            opacity: 1,
            ease: defaults.ease,
            duration: defaults.duration,

            scrollTrigger: defaults.scrolltrigger
            
        })

    })

    return () => ctx.revert()
}