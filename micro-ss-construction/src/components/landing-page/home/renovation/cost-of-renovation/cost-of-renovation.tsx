import "./cost-of-renovation.scss";

import MicroButton from "../../../../ui/button/button";

const CostOfRenovation = () => {
  return (
    <section className="request-a-quote">
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
          href="?page=services"
          title="REQUEST A QUOTE"
        >
          REQUEST A QUOTE
        </MicroButton>
      </div>
    </section>
  );
};

export default CostOfRenovation;
