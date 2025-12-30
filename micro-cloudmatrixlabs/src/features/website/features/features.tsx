const FeaturesApp = () => {
  return (
    <section id="features" className="features section">
      <div className="container">
        <div className="features-grid">
          <div className="features-card">
            <div className="icon-wrapper">
              <i className="bi bi-laptop"></i>
            </div>
            <h3>Streamlined Workflow Solution</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Integrated development environment</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Cloud-based collaborative tools</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Automated testing procedures</span>
              </div>
            </div>
            <div className="image-container">
              <img
                src="static/media/img/illustration-1.png"
                alt="Streamlined Workflow"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="features-card">
            <div className="icon-wrapper">
              <i className="bi bi-graph-up"></i>
            </div>
            <h3>Performance Analytics</h3>
            <p>
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
              vel.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Real-time data visualization</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Custom report generation</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Predictive analysis models</span>
              </div>
            </div>
            <div className="image-container">
              <img
                src="static/media/img/illustration-2.png"
                alt="Performance Analytics"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="features-card">
            <div className="icon-wrapper">
              <i className="bi bi-shield-lock"></i>
            </div>
            <h3>Enterprise Security Framework</h3>
            <p>
              Quisque velit nisi, pretium ut lacinia in, elementum id enim.
              Mauris blandit aliquet elit, eget tincidunt nibh pulvinar.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Multi-factor authentication</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>End-to-end encryption standard</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Automated security audits</span>
              </div>
            </div>
            <div className="image-container">
              <img
                src="static/media/img/illustration-3.png"
                alt="Security Framework"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="features-card">
            <div className="icon-wrapper">
              <i className="bi bi-people"></i>
            </div>
            <h3>Collaborative Team Environment</h3>
            <p>
              Praesent sapien massa, convallis a pellentesque nec, egestas non
              nisi. Cras ultricies ligula sed magna dictum porta.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Shared workspace functionality</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Real-time communication tools</span>
              </div>
              <div className="feature-item">
                <i className="bi bi-check-circle-fill"></i>
                <span>Progress tracking dashboards</span>
              </div>
            </div>
            <div className="image-container">
              <img
                src="static/media/img/illustration-4.png"
                alt="Team Environment"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FeaturesApp;
