import "./about-us.scss";

import MicroHeaderDescribe from "../../../ui/header-describe/header-describe";

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="text-align-center">
        <MicroHeaderDescribe header="ABOUT US">
          <p>
            We provide a professional renovation and installation services with
            a real focus on customer satisfaction. Our installations are carried
            out by fully trained staff to the highest professional standards.
          </p>
        </MicroHeaderDescribe>
      </div>

      <div className="short-about-us">
        <div className="image-wrapper">
          <img src="/images/samples/image4.png" alt="" className="radius" />
        </div>

        <div className="about-features-list">
          <ul className="features-list">
            <li className="sl-small-helmet margin-top-40">
              <h4>OVER 15 YEARS EXPERIENCE</h4>
              <p>
                We combine quality workmanship, superior knowledge and low
                prices to provide you with service unmatched by our competitors.
              </p>
            </li>
            <li className="sl-small-roller">
              <h4>BEST MATERIALS</h4>
              <p>
                We have the experience, personel and resources to make the
                project run smoothly. We can ensure a job is done on time.
              </p>
            </li>
            <li className="sl-small-driller">
              <h4>PROFESSIONAL STANDARDS</h4>
              <p>
                Work with us involve a carefully planned series of steps,
                centered around a schedule we stick to and daily communication.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
