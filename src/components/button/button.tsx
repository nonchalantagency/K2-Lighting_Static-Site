import { Link } from "react-router"
import './button.scss'

export function Button(
    {
        link = "#",
        text = "Button Text",
        
        bgColour = "transparent",
        targetBgColour = "transparent",

        textColour = "var(--colour-light)",
        targetTextColour = "var(--colour-light)",

        borderColour = "transparent",
        targetBorderColour = "transparent",

        divColour = "var(--colour-light)",

        iconUrl = "https://raw.githubusercontent.com/nonchalantagency/NC-Client_Assets/refs/heads/main/K2%20Lighting/icons/arrow_light.png",

        linkType = "external",

    }:
    {
        link?: string;
        text?: string;

        bgColour?: string;
        targetBgColour?: string;

        textColour?: string;
        targetTextColour?: string;

        borderColour?: string;
        targetBorderColour?: string;

        divColour?: string;

        iconUrl?: string;

        linkType?: string;
    }
) {



    return (


        <>
            <div
            className="button"
            data-anim="button"
            data-bg-colour-target={targetBgColour}
            data-text-colour-target={targetTextColour}
            data-border-colour-target={targetBorderColour}
            
            
            style={{
                backgroundColor: bgColour,
                borderColor: borderColour,
            }}>

            {linkType === "external" ? (<Link to={link} className="button-link"></Link>) : (<a href={link} className="button-link"></a>)}

                <div className="button-inner">
                    <div className="button-text-wrap">
                        <p className="button-text" data-anim="button-text" style={{color: textColour}}>{text}</p>
                        <p className="button-text absolute" data-anim="button-text" style={{color: textColour}}>{text}</p>
                    </div>
                    <div className="button-icon-wrap">
                        <img className="button-icon-img" src={iconUrl}></img>
                        <img className="button-icon-img absolute" src={iconUrl}></img>
                    </div>
                </div>
                <div className="button-div" style={{backgroundColor: divColour}}></div>

            </div>
        
        </>
    )
}