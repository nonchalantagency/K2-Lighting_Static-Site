import { resolveCssValue } from "./core/resolveCss";

import { gsap } from "./gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const defaults = {
    duration: 0.63,
    ease: "power2.inOut"
}
export function initButtonAnims() {

    const ctx = gsap.context(() => {

        const button = document.querySelectorAll(`[data-anim="button"]`);

        button.forEach((el) => {


            const tl = gsap.timeline({paused: true});

            const text = el.querySelectorAll(`[data-anim="button-text"]`);



            // SPLIT TEXT
            const firstSplit = new SplitText(text[0], {
                type: "chars"
            });

            const secondSplit = new SplitText(text[1], {
                type: "chars"
            });


            tl.fromTo(firstSplit.chars, {
                yPercent: 0
            },
            {
                yPercent: 100,
                ease: defaults.ease,
                duration: (0.5 * defaults.duration),
                stagger: 0.01
            }, 0)
            tl.fromTo(secondSplit.chars, {
                yPercent: 0
            },
            {
                yPercent: 100,
                ease: defaults.ease,
                duration: (0.5 * defaults.duration),
                stagger: 0.01
            }, 0)


            // COLOUR CHANGE
            const ogBgColour = resolveCssValue(el, "background-color");
            const targetBgColour = resolveCssValue(el.getAttribute("data-bg-colour-target"), "background-color");

            const ogTextColour = resolveCssValue(text[0], "color");
            const targetTextColour = resolveCssValue(el.getAttribute("data-text-colour-target"), "color");

            const ogBorderColour = resolveCssValue(el, "border-color");
            const targetBorderColour = resolveCssValue(el.getAttribute("data-border-colour-target"), "border-color");


            // ON BUTTON ELEMENT
            tl.fromTo(el, {
                backgroundColor: ogBgColour ?? "magenta",
                borderColor: ogBorderColour ?? "magenta"

            },
            {
                backgroundColor: targetBgColour ?? "magenta",
                borderColor: targetBorderColour ?? "magenta",
                ease: defaults.ease,
                duration: defaults.duration
            }, 0)

            tl.fromTo(text, {
                color: ogTextColour ?? "magenta",
            },
            {
                color: targetTextColour ?? "magenta",
                ease: defaults.ease,
                duration: defaults.duration
            }, 0)


            el.addEventListener("mouseenter", () => {

                tl.timeScale(1);
                tl.play();

            });


            el.addEventListener("mouseleave", () => {

                tl.timeScale(1.25);
                tl.reverse();
            });

            
        })
    })

    return () => ctx.revert();
}