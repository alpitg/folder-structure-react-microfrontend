import "./top-section.scss";

import MicroButton from "../../../ui/button/button";

const TopSection = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "files/Brochure.pdf"; // Path to the PDF file in the public folder
    link.download = "SS_Construction_Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="top-section">
      <div className="content">
        <h1 className="header">SS Construction</h1>
        <p className="sub-header">
          We build your dream home, <small>since 1990</small>
        </p>
        <p className="contact"> {`Contact us: +91 8149403097`}</p>
        <br />
        <MicroButton
          variant="secondary"
          className="our-service-button"
          onClick={handleDownload}
        >
          {`DOWNLOAD BROCHURE`}
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
