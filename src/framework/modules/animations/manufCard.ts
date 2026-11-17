import { gsap } from "./gsap"
import { resolveCssValue } from "./core/resolveCss"

const defaults = {
    ease: "power2.out",
    duration: 0.45
}

export function initManufCard() {

    const ctx = gsap.context(() => {

        const cards = document.querySelectorAll(`[data-anim="manuf-card"]`);

        const startBgColour = resolveCssValue("var(--colour-dark)", "background-color");
        const targetBgColour = resolveCssValue("var(--colour-dark-mid)", "background-color");

        const startTextColour = resolveCssValue("var(--colour-light)", "color");
        const targetTextColour = resolveCssValue("var(--colour-light)", "color")

        console.log(startBgColour, targetBgColour)

        cards.forEach((el) => {

            const text = el.querySelector(".manuf-card-name");
            const tray = el.querySelector(".manuf-card-tray");
            const div = el.querySelector(".manuf-tray-div");
            const img = el.querySelector(".manuf-card-logo");

            const tl = gsap.timeline({paused: true});

            // BACKGROUND
            tl.fromTo(el, {
                backgroundColor: startBgColour ?? "magenta"
            },
            {
                backgroundColor: targetBgColour ?? "magenta",
                ease: defaults.ease,
                duration: defaults.duration
            },0)

            // TITLE TEXT
            tl.fromTo(text, {
                color: startTextColour ?? "magenta"
            },
            {
                color: targetTextColour ?? "magenta",
                ease: defaults.ease,
                duration: defaults.duration
            },0)

            // OPEN TRAY
            tl.fromTo(tray, {
                height: "0px"
            },
            {
                height: "auto",
                ease: defaults.ease,
                duration: defaults.duration
            },0)

            // IMG
            tl.fromTo(img, {
                scale: 1,
                filter: "grayscale(1)"
            },
            {
                scale: 1.1,
                filter: "grayscale(0)",
                ease: defaults.ease,
                duration: defaults.duration
            }, 0)

            // TRAY DIV
            tl.fromTo(div, {
                width: "0%"
            },
            {
                width: "100%",
                ease: defaults.ease,
                duration: (defaults.duration)
            },0)

            el.addEventListener("mouseenter", () => {
                tl.timeScale(1);
                tl.play();
            })
            el.addEventListener("mouseleave", () => {
                tl.timeScale(1.25);
                tl.reverse();
            })
        })
    })

    return () => ctx.revert();


}