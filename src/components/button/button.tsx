import { Link } from "react-router"
import './button.scss'

export function Button(
    {
        link = "#",
        text = "Button Text",
        
        bgColour = "transparent",
        targetBgColour = "var(--colour-dark-mid)",

        textColour = "var(--colour-dark)",
        targetTextColour = "var(--colour-light)",

        borderColour = "var(--colour-dark)",
        targetBorderColour = "var(--colour-dark-mid)",

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
    }
) {



    return (


        <>
            <Link
            to={link}
            className="button"
            data-anim="button"
            data-bg-colour-target={targetBgColour}
            data-text-colour-target={targetTextColour}
            data-border-colour-target={targetBorderColour}
            
            
            style={{
                backgroundColor: bgColour,
                borderColor: borderColour,
            }}>

                <div className="button-text-wrap">
                    <p className="button-text" data-anim="button-text" style={{color: textColour}}>{text}</p>
                    <p className="button-text absolute" data-anim="button-text" style={{color: textColour}}>{text}</p>
                </div>

            </Link>
        
        </>
    )
}