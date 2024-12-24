import "./landing-page.scss";

import AboutUs from "./home/about-us/about-us";
import ContactStrip from "./home/contact-strip/contact-strip";
import Footer from "./home/footer/footer";
import MicroButton from "../ui/button/button";
import MicroHeaderDescribe from "../ui/header-describe/header-describe";
import OurServices from "./home/our-services/our-services";
import Overall from "./home/overall/overall";
import RecentProjects from "./home/recent-projects/recent-projects";
import WeOffer from "./home/we-offer/we-offer";
import WhyChooseUs from "./home/why-choose-us/why-choose-us";

const LandingPage = () => {
  return (
    <div className="landing-page">

      <OurServices />

      <RecentProjects />

      {/* <AboutUs /> */}

      <WeOffer />

      <WhyChooseUs />

      {/* <Testimonial /> */}

      <ContactStrip />

      <Overall />

      <Footer />
    </div>
  );
};

export default LandingPage;
