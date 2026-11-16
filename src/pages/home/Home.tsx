import { Button } from "../../components/button/button";
import { manufacturerData } from "../../data/manufacturerData";

import './manuf-card.scss'

export function HomePage() {


  return (

    <>
      <section className="section hero light">
        <div className="wrapper full-h">
          <div className="content vertical align-centre justify-centre rem-1">
            <h1 className="page-heading centred">K2 Lighting & Controls</h1>
            <div className="copy-div no-gap centred">
              <p>K2 Lighting & Controls will launch their full site in 2027.</p>
              <p>Please see our list of suppliers.</p>
            </div>
            <div className="button-wrap">
              <Button text="See Suppliers"></Button>
              <Button text="Get in Touch"></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrapper">
          <div className="grid">

              {manufacturerData.map((item) => (
                
                <a key={item.name} className="manuf-card" href={item.websiteUrl} target="_blank">
                  <h3 className="manuf-card-name">{item.name}</h3>
                </a>
              ))}
          </div>
        </div>
      </section>
    
    </>
  )
}
