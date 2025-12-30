const ServicesApp = () => {
  return (
    <section id="services" className="services section">
      <div className="container section-title">
        <h2>Services</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <div className="service-card">
              <div className="service-icon">
                <i className="bi bi-palette"></i>
              </div>
              <h3>Creative Design</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
              <a href="service-details.html" className="service-link">
                Learn More
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service-card">
              <div className="service-icon">
                <i className="bi bi-code-slash"></i>
              </div>
              <h3>Web Development</h3>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo.
              </p>
              <a href="service-details.html" className="service-link">
                Learn More
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service-card">
              <div className="service-icon">
                <i className="bi bi-megaphone"></i>
              </div>
              <h3>Digital Marketing</h3>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
              <a href="service-details.html" className="service-link">
                Learn More
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service-card">
              <div className="service-icon">
                <i className="bi bi-graph-up-arrow"></i>
              </div>
              <h3>Business Strategy</h3>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim.
              </p>
              <a href="service-details.html" className="service-link">
                Learn More
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-card">
              <div className="service-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h3>Security Solutions</h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium.
              </p>
              <a href="service-details.html" className="service-link">
                Learn More
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="service-card">
              <div className="service-icon">
                <i className="bi bi-headset"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae.
              </p>
              <a href="service-details.html" className="service-link">
                Learn More
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ServicesApp;
