import { Link } from "react-router"
import './button.scss'

export function Button(
    {
        link = "#",
        text = "Button Text",
    }:
    {
        link?: string;
        text?: string;
    }
) {



    return (


        <>
            <Link to={link} className="button">

                <div className="button-text-wrap">
                    <p className="button-text">{text}</p>
                    <p className="button-text absolute">{text}</p>
                </div>

            </Link>
        
        </>
    )
}