import "./website.scss";
import "../../assets/scss/website.scss";

import AboutApp from "./about/about";
import FeaturesApp from "./features/features";
import Footer from "./footer/footer";
import { GetEnvConfig } from "../../app.config";
import HeaderApp from "./header/header";
import HowWeWorkApp from "./how-we-work/how-we-work";
import PricingApp from "./pricing/pricing";
import ServicesApp from "./services/services";
import TeamApp from "./team/team";

const WebsiteApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <div className="website-app" id="home">
      <HeaderApp />
      <section id="hero" className="hero section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1>
                  Transform Your <span>Digital Future</span>
                </h1>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium totam rem aperiam.
                </p>
                <div className="hero-actions justify-content-center justify-content-lg-start">
                  <a href="#services" className="btn-primary scrollto">
                    Start Journey
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                    className="glightbox btn-video d-flex align-items-center"
                  >
                    <i className="bi bi-play-fill"></i>
                    <span>Watch Demo</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img
                  src="static/media/img/illustration-28.png"
                  className="img-fluid floating"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutApp />
      <ServicesApp />
      <FeaturesApp />
      <HowWeWorkApp />
      <PricingApp />
      <TeamApp />
      <Footer />
    </div>
  );
};

export default WebsiteApp;
