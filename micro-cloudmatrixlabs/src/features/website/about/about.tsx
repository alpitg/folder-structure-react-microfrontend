const AboutApp = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-image">
              <img
                src="static/media/img/about.png"
                alt="About"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="content">
              <h2>Crafting Excellence Through Innovation and Dedication</h2>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>

              <div className="stats-row">
                <div className="stat-item">
                  <h3>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="150"
                      data-purecounter-duration="0"
                      className="purecounter"
                    >
                      150
                    </span>
                    +
                  </h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat-item">
                  <h3>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="12"
                      data-purecounter-duration="0"
                      className="purecounter"
                    >
                      12
                    </span>
                    +
                  </h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat-item">
                  <h3>
                    <span
                      data-purecounter-start="0"
                      data-purecounter-end="98"
                      data-purecounter-duration="0"
                      className="purecounter"
                    >
                      98
                    </span>
                    %
                  </h3>
                  <p>Client Satisfaction</p>
                </div>
              </div>

              <div className="cta-wrapper">
                <a href="#" className="btn-cta">
                  <span>Discover Our Story</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutApp;
