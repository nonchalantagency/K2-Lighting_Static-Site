import { Button } from "./button";

export function CtaButton(
    {
        text = "CTA Button",
        link = "#"
    }:
    {
        text?: string;
        link?: string;
    }
) {


    return (
        <Button
        text={text}
        link={link}
        
        bgColour="var(--colour-cta)"
        textColour="var(--colour-light)"
        borderColour="var(--colour-cta)"
        
        targetBgColour="var(--colour-cta-mid)"
        targetTextColour="var(--colour-light)"
        targetBorderColour="var(--colour-cta-mid)">

        </Button>
    )
}