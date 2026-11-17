import { Button } from "../../components/button/button";
import { CtaButton } from "../../components/button/buttonCta";
import { manufacturerData } from "../../data/manufacturerData";
import { useGSAP } from "@gsap/react";
import { initAnims } from "../../framework/modules/animations/initAnims";
import { Nav } from "../../components/nav";
import { VideoEmbed } from "./videoEmbed";
import { Footer } from "../../components/footer";

import './contact.scss'
import './manuf-card.scss'



export function HomePage() {

  useGSAP(() => {
        return initAnims();
  });


  return (

    <>
      <Nav></Nav>

      <header className="section hero light">
        <div className="wrapper full-h">
          <div className="content vertical align-centre justify-centre rem-1 above">
            <h1 className="page-heading centred hero"><span style={{fontWeight: 700}}>K2</span> Lighting & Controls</h1>
            <div className="copy-div no-gap centred">
              <p>K2 Lighting & Controls will launch their full site in 2027. Please see our list of suppliers.</p>
            </div>
            <div className="button-wrap">
              <CtaButton text="See Suppliers" link="/#home_manufs" linkType="anchor"></CtaButton>
              <Button text="Get in Touch" link="/#home_contact" linkType="anchor"></Button>
            </div>
          </div>
        </div>
        <div className="hero-bg-div">
          <VideoEmbed></VideoEmbed>
          <img className="hero-bg-img" src="https://raw.githubusercontent.com/nonchalantagency/NC-Client_Assets/refs/heads/main/K2%20Lighting/header-test.jpg"></img>
        </div>
      </header>

      <main className="section" data-anim="nav-trigger">
        <div className="anchor-link-div" id="home_manufs"></div>

        <div className="wrapper">
          <h2 className="section-heading" data-anim="split-words">Our Partners</h2>
          <div className="grid">

              {manufacturerData.map((item) => (
                
                <div className="manuf-card-wrap" data-anim="lazy-load">
                  <a key={item.name} className="manuf-card" href={item.websiteUrl} target="_blank" data-anim="manuf-card">
                    <img className="manuf-card-bg" src="https://raw.githubusercontent.com/nonchalantagency/NC-Client_Assets/refs/heads/main/K2%20Lighting/gradient-glow.avif.png"></img>
                    <div className="manuf-card-logo-wrap">
                      <img src={item.logoUrl} className="manuf-card-logo"></img>
                    </div>

                    <h3 className="manuf-card-name">{item.name}</h3>
                    <div className="manuf-tray-wrap">
                      <div className="manuf-card-tray">
                        <p className="manuf-card-cta-text">Visit Website</p>
                      </div>
                      <div className="manuf-tray-div"></div>
                    </div>
                  </a>
                </div>
              ))}
          </div>
        </div>
      </main>

      <section className="section dark">
        <div className="anchor-link-div" id="home_contact"></div>
        <div className="wrapper">
          <h2 className="section-heading light" data-anim="split-words">Contact</h2>
          <div className="grid">

              <div className="contact-wrap">
                <a className="contact" href="mailto:k2@k2lighting.co.uk" data-anim="contact" data-anim-alt="lazy-load">

                  <p className="contact-copy">For lighting enquiries:</p>
                  <div className="contact-row">
                    <div className="contact-icon-wrap">
                      <img className="contact-icon" src="https://raw.githubusercontent.com/nonchalantagency/NC-Client_Assets/refs/heads/main/K2%20Lighting/icons/mail_light.png"></img>
                    </div>
                    <p className="contact-address">k2@k2lighting.co.uk</p>
                  </div>
                  <div className="contact-div"></div>
                </a>
                <a className="contact" href="mailto:js@k2controls.co.uk" data-anim="contact" data-anim-alt="lazy-load">

                  <p className="contact-copy">For control enquiries:</p>
                  <div className="contact-row">
                    <div className="contact-icon-wrap">
                      <img className="contact-icon" src="https://raw.githubusercontent.com/nonchalantagency/NC-Client_Assets/refs/heads/main/K2%20Lighting/icons/mail_light.png"></img>
                    </div>
                    <p className="contact-address">js@k2controls.co.uk</p>
                  </div>
                  <div className="contact-div"></div>
                </a>
              </div>

          </div>
        </div>
      </section>


      <Footer></Footer>
    
    </>
  )
}
