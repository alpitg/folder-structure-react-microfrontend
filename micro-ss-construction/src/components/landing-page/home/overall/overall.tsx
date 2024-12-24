import "./overall.scss";

import MicroButton from "../../../ui/button/button";

const Overall = () => {
  return (
    <div className="overall">
      <div className="row row-4-4">
        <div className="column column-1-4">
          <h6 className="box-header">About Us</h6>
          <p className="description t1">
            Founded in 1990. SS Construction has estabilished itself as one of
            the greatest and prestigious providers of construction focused on
            residential, commercial civil construction, interior renovation
            services and building.
          </p>
        </div>
        <div className="column service-list">
          <h6 className="box-header">Our Services</h6>
          <ul>
            <li className="template-bullet">Civil construction </li>
            <li className="template-bullet">Marble work </li>
            <li className="template-bullet">Furniture work</li>
            <li className="template-bullet">Ceiling work</li>
            <li className="template-bullet">Painting work</li>
            <li className="template-bullet">Interior Renovation</li>
            <li className="template-bullet">Design and Build</li>
            <li className="template-bullet">Tiling and Painting</li>
          </ul>
        </div>
        <div className="column taxonomies">
          <h6 className="box-header">Categories</h6>
          <ul>
            <li>
              <MicroButton variant="primary-alt"> BUILD</MicroButton>
            </li>
            <li>
              <MicroButton variant="primary-alt"> DESIGN</MicroButton>
            </li>
            <li>
              <MicroButton variant="primary-alt"> FLOORING</MicroButton>
            </li>
            <li>
              <MicroButton variant="primary-alt"> PAINTING</MicroButton>
            </li>
            <li>
              <MicroButton variant="primary-alt">PAVERS </MicroButton>
            </li>
            <li>
              <MicroButton variant="primary-alt"> PLUMBING</MicroButton>
            </li>
            <li>
              <MicroButton variant="primary-alt"> RENOVATION</MicroButton>
            </li>
            <li>
              <MicroButton variant="primary-alt"> REPAIRS</MicroButton>
            </li>
            <li>
              <MicroButton variant="primary-alt"> TILING</MicroButton>
            </li>
          </ul>
        </div>
        <div className="column blog">
          <h6 className="box-header">Latest Posts</h6>
          <ul>
            <li>
              <div className="post-content">
                <a
                  href="?page=post"
                  title="What a Difference a Few Months Make"
                >
                  What a Difference a Few Months Make
                </a>
                <i>{` April 25, 2015`}</i>
              </div>
            </li>
            <li>
              <div className="post-content">
                <a href="?page=post" title="Kitchen and Living Room Renovation">
                  Kitchen and Living Room Renovation
                </a>
                <i>{` April 17, 2015`}</i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overall;
