import './nav.scss'



export function Nav() {



    return(
        <>
            <nav className="nav" data-anim="nav">
                <div className="wrapper full-h">
                    <div className='nav-bg'></div>
                    <div className="nav-content">
                        <div className='nav-brand'>
                            <img className='nav-brand-img' src='https://raw.githubusercontent.com/nonchalantagency/NC-Client_Assets/refs/heads/main/K2%20Lighting/K2_light.png'></img>
                            <img className='nav-brand-img absolute' src='https://raw.githubusercontent.com/nonchalantagency/NC-Client_Assets/refs/heads/main/K2%20Lighting/K2_dark.png'></img>
                        </div>

                    </div>
                </div>
            </nav>
        
        </>
    )
}