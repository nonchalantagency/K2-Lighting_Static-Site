
import { gsap } from "./gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const defaults = {
    ease: "power2.out",
    duration: 0.63,
    trigger: "top 85%"
}

export function initScrollAnims() {


        
    const ctx = gsap.context(() => {

    
    
        const lazyLoads = document.querySelectorAll(`[data-anim="lazy-load"]`);

        const splitWords = document.querySelectorAll(`[data-anim="split-words"]`)


        lazyLoads.forEach((el) => {

            gsap.from(el, {
                yPercent: 20,
                opacity: 0,

                ease: defaults.ease,
                duration: defaults.duration,

                scrollTrigger: {
                    trigger: el,
                    start: defaults.trigger
                }
            })
        })

        splitWords.forEach((el) => {
            const split = new SplitText(el, {
                type: "words",
                mask: "words"
            })

            gsap.from(split.words, {
                yPercent: 100,
                opacity: 0,
                ease: defaults.ease,

                duration: defaults.duration,
                stagger: 0.05,

                scrollTrigger: {
                    trigger: el,
                    start: defaults.trigger
                }
            })
        })


    });

    return () => ctx.revert();
}