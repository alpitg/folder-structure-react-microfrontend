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
        <p className="contact"> {`Contact us: +91 8149403097`}</p>
        <MicroButton variant="secondary" className="our-service-button">
          {`Get a Quotation`}
        </MicroButton>
      </div>

      <div className="right">
        <div className="service-header">
          <h3>OUR SERVICES</h3>
        </div>
        <ul className="services-list">
          <li>Residential Construction</li>
          <li>Commercial Construction</li>
          <li>Civil Work</li>
          <li>Painting</li>
          <li>Tiling</li>
          <li>Interior Design</li>
          <li>Renovation</li>
        </ul>
      </div>
    </section>
  );
};

export default TopSection;
