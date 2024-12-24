import "./why-choose-us.scss";

import MicroHeaderDescribe from "../../../ui/header-describe/header-describe";

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div className="text-align-center">
        <MicroHeaderDescribe header="WHY CHOOSE US">
          <p>
            <ul className="why-choose-us-list">
              <li> Proven Track Record </li>
              <li> Skilled Workforce </li>
              <li> Quality Service </li>
            </ul>
            <br />
            We stand out for our unwavering commitment to quality, reliability
            and customer satisfaction. With years of experience and a dedicatd
            team of experts, we ensure that every project is completed on time,
            within budget and to the highest standards.
          </p>
        </MicroHeaderDescribe>
      </div>
    </section>
  );
};

export default WhyChooseUs;
