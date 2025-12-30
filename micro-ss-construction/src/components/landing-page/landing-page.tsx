import "./landing-page.scss";

import AboutUs from "./home/about-us/about-us";
import ContactStrip from "./home/contact-strip/contact-strip";
import CostOfRenovation from "./home/renovation/cost-of-renovation/cost-of-renovation";
import Footer from "./home/footer/footer";
import Navigator from "./home/navigator/navigator";
import OurServices from "./home/our-services/our-services";
import Overall from "./home/overall/overall";
import RecentProjects from "./home/recent-projects/recent-projects";
import TopSection from "./home/top-section/top-section";
import WeAre from "./home/we-are/we-are";
import WeOffer from "./home/we-offer/we-offer";
import WhyChooseUs from "./home/why-choose-us/why-choose-us";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navigator />

      <br />
      <br />
      <br />

      <TopSection />

      <CostOfRenovation />

      <WeAre />

      <OurServices />

      <RecentProjects />

      <AboutUs />

      <WeOffer />

      <WhyChooseUs />

      <ContactStrip />

      <Overall />

      <Footer />

      {/* <Testimonial /> */}
    </div>
  );
};

export default LandingPage;
