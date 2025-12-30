import "./top-section.scss";

import MicroButton from "../../../ui/button/button";

const TopSection = () => {
  const handleDownload = () => {
    fetch("files/Brochure.pdf")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the file.");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "SS_Construction_Brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the object URL
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };

  return (
    <section className="top-section" id="top-section">
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
          <li>Civil construction</li>
          <li>Marble work</li>
          <li>Furniture work</li>
          <li>Ceiling work</li>
          <li>Painting work</li>
          <li>Interior Renovation</li>
          <li>Design and Build</li>
          <li>Tiling and Painting</li>
        </ul>
        <br />
        <MicroButton
          variant="primary"
          title="REQUEST A QUOTE"
          className="request-a-quote-button"
        >
          <a href="#request-a-quote">REQUEST A QUOTE</a>
        </MicroButton>
      </div>
    </section>
  );
};

export default TopSection;
