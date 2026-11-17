import gsap from "gsap";


export function initContactAnims() {

    const ctx = gsap.context(() => {

        const contact = document.querySelectorAll(`[data-anim="contact"]`)

        contact.forEach((el) => {

            const div = el.querySelector(".contact-div");

            const tl = gsap.timeline({paused: true});

            tl.fromTo(div, {
                width: "0%"
            },
            {
                width: "100%",
                ease: "power2.out",
                duration: 0.45
            })

            el.addEventListener("mouseenter", () => {
                tl.play()
            })
            el.addEventListener("mouseleave", () => {
                tl.reverse()
            })
        })
    })

    return () => ctx.revert()

}