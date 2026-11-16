import { Button } from "../../components/button/button";
import { CtaButton } from "../../components/button/buttonCta";
import { manufacturerData } from "../../data/manufacturerData";
import { useGSAP } from "@gsap/react";
import { initAnims } from "../../framework/modules/animations/initAnims";

import './manuf-card.scss'

export function HomePage() {

  useGSAP(() => {
        return initAnims();
  });


  return (

    <>
      <header className="section hero light">
        <div className="wrapper full-h">
          <div className="content vertical align-centre justify-centre rem-1 above">
            <h1 className="page-heading centred">K2 Lighting & Controls</h1>
            <div className="copy-div no-gap centred">
              <p>K2 Lighting & Controls will launch their full site in 2027.</p>
              <p>Please see our list of suppliers.</p>
            </div>
            <div className="button-wrap">
              <CtaButton text="See Suppliers"></CtaButton>
              <Button text="Get in Touch"></Button>
            </div>
          </div>
        </div>
        <div className="hero-bg-div">
          <img className="hero-bg-img" src="https://raw.githubusercontent.com/nonchalantagency/NC-Client_Assets/refs/heads/main/K2%20Lighting/header-test.jpg"></img>
        </div>
      </header>

      <main className="section">
        <div className="wrapper">
          <h2 className="section-heading" data-anim="split-words">Our Partners</h2>
          <div className="grid">

              {manufacturerData.map((item) => (
                
                <div className="manuf-card-wrap" data-anim="lazy-load">
                  <a key={item.name} className="manuf-card" href={item.websiteUrl} target="_blank" data-anim="manuf-card">
                    <div className="manuf-card-logo-wrap">
                      <img src={item.logoUrl} className="manuf-card-logo"></img>
                    </div>

                    <h3 className="manuf-card-name">{item.name}</h3>
                    <div className="manuf-tray-wrap">
                      <div className="manuf-card-tray">
                        <p className="manuf-card-cta-text">Visit Website</p>
                        <div className="manuf-tray-div"></div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </main>
    
    </>
  )
}
