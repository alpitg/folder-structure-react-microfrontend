import "./our-services.scss";

import MicroButton from "../../../ui/button/button";
import MicroHeaderDescribe from "../../../ui/header-describe/header-describe";

const OurServices = () => {
  return (
    <section className="our-services bg-grey">
      <div className="row">
        <div className="text-align-center">
          <MicroHeaderDescribe header="OUR SERVICES">
            <p>
              With over 15 years experience and real focus on customer
              satisfaction, you can rely on us for your next renovation,
              driveway sett or home repair. We provide a professional service
              for private and commercial customers.
            </p>
          </MicroHeaderDescribe>
        </div>

        <ul className="services-list">
          <li>
            <img src="src/assets/images/samples/image1.png" alt="" />
            <h4 className="box-header">
              <a
                href="?page=service_interior_renovation"
                title="Interior Renovation"
              >
                INTERIOR RENOVATION
              </a>
            </h4>
            <p>
              We can help you bring new life to existing rooms and develop
              unused spaces.
            </p>
          </li>

          <li>
            <img src="src/assets/images/samples/image2.png" alt="" />
            <h4 className="box-header">
              <a href="?page=service_design_build" title="Design and Build">
                DESIGN AND BUILD
              </a>
            </h4>
            <p>
              From initial design and project specification to archieving a high
              end finish.
            </p>
          </li>

          <li>
            <img
              src="src/assets/images/samples/image3.png"
              alt=""
              title="Tiling and Painting"
            />
            <h4 className="box-header">
              <a
                href="?page=service_tiling_painting"
                title="Tiling and Painting"
              >
                TILING AND PAINTING
              </a>
            </h4>
            <p>
              We offer quality tiling and painting solutions for interior and
              exterior.
            </p>
          </li>
        </ul>
      </div>

      <div className="row">
        <div className="view-all-services text-align-center">
          <MicroButton href="?page=services" title="VIEW ALL SERVICES">
            VIEW ALL SERVICES
          </MicroButton>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
