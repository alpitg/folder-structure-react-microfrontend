import "./top-section.scss";

import MicroButton from "../../../ui/button/button";

const TopSection = () => {
  return (
    <section className="top-section">
      <div className="content">
        <h1 className="header">SS Construction</h1>
        <p className="sub-header">
          We build your dream home, <small>since 1990</small>
        </p>

        <MicroButton variant="secondary" className="our-service-button">
          {`VIEW OUR SERVICES >>`}
        </MicroButton>
      </div>
      <div className="banner">
        <div className="image image-1"></div>
        <div className="image image-2"></div>
        <div className="image image-3"></div>
        <div className="image image-4"></div>
      </div>
    </section>
  );
};

export default TopSection;
