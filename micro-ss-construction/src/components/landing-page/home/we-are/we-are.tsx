import "./we-are.scss";

import MicroHeaderDescribe from "../../../ui/header-describe/header-describe";

const WeAre = () => {
  return (
    <section className="we-are">
      <div className="row text-align-center">
        <div className="column column-1-4">
          <ul className="we-are-feature-list big">
            <li className="sl-large-house-2">
              <div className="ornament"></div>

              <MicroHeaderDescribe header="WE'RE EXPERTS" headerSize="h5">
                <p>
                  Morbi nulla tortor, dignissim est node cursus euismod est
                  arcu. Nomad at vehicula novum justo magna.
                </p>
              </MicroHeaderDescribe>
            </li>
          </ul>
        </div>
        <div className="column column-1-4">
          <ul className="we-are-feature-list big">
            <li className="sl-large-team">
              <div className="ornament"></div>
              <MicroHeaderDescribe header="WE'RE FRIENDLY" headerSize="h5">
                <p>
                  Morbi nulla tortor, dignissim est node cursus euismod est
                  arcu. Nomad at vehicula novum justo magna.
                </p>
              </MicroHeaderDescribe>
            </li>
          </ul>
        </div>
        <div className="column column-1-4">
          <ul className="we-are-feature-list big">
            <li className="sl-large-measure">
              <div className="ornament"></div>
              <MicroHeaderDescribe header="WE'RE ACCURATE" headerSize="h5">
                <p>
                  Morbi nulla tortor, dignissim est node cursus euismod est
                  arcu. Nomad at vehicula novum justo magna.
                </p>
              </MicroHeaderDescribe>
            </li>
          </ul>
        </div>
        <div className="column column-1-4">
          <ul className="we-are-feature-list big">
            <li className="sl-large-brush-2">
              <div className="ornament"></div>
              <MicroHeaderDescribe header="WE'RE TRUSTED" headerSize="h5">
                <p>
                  Morbi nulla tortor, dignissim est node cursus euismod est
                  arcu. Nomad at vehicula novum justo magna.
                </p>
              </MicroHeaderDescribe>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WeAre;
