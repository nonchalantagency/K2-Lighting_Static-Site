import { Button } from "./button";

export function CtaButton(
    {
        text = "CTA Button",
        link = "#",
        linkType = "external"
    }:
    {
        text?: string;
        link?: string;
        linkType?: string;
    }
) {


    return (
        <Button
        text={text}
        link={link}
        
        bgColour="transparent"
        textColour="var(--colour-cta)"
        borderColour="transparent"
        
        targetBgColour="transparent"
        targetTextColour="var(--colour-cta)"
        targetBorderColour="transparent"
        
        divColour="var(--colour-cta)"

        iconUrl="https://raw.githubusercontent.com/nonchalantagency/NC-Client_Assets/refs/heads/main/K2%20Lighting/icons/arrow_cta.png"

        linkType={linkType}
        >

        </Button>
    )
}