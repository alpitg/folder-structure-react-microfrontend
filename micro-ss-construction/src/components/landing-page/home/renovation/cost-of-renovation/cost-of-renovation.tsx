import "./cost-of-renovation.scss";

import React, { useState } from "react";

import MicroButton from "../../../../ui/button/button";

const CostOfRenovation = () => {
  const [formVisible, setFormVisible] = useState(false);

  const handleButtonClick = () => {
    setFormVisible(!formVisible);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    alert("Form submitted!");
  };

  return (
    <section className="request-a-quote">
      <div className="row">
        <div className="cost-of-renovation">
          <h3>COST OF RENOVATION</h3>
          <p className="description">
            Use our form to estimate the initial cost of renovation or
            installation.
          </p>
        </div>
        <div className="quote">
          <MicroButton
            variant="primary"
            onClick={handleButtonClick}
            title="REQUEST A QUOTE"
          >
            {!formVisible ? "REQUEST A QUOTE" : "Close"}
          </MicroButton>
        </div>
      </div>
      {formVisible && (
        <form className="quote-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email/Phone</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <MicroButton variant="primary" type="submit">
            SUBMIT NOW
          </MicroButton>
        </form>
      )}
    </section>
  );
};

export default CostOfRenovation;
