const PricingApp = () => {
  return (
    <section id="pricing" className="pricing section">
      <div className="container section-title">
        <h2>Pricing</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>
      <div className="container">
        <div className="row justify-content-center g-4">
          <div className="col-lg-4 col-md-6">
            <div className="pricing-card starter">
              <div className="plan-header">
                <h3 className="plan-name">Starter</h3>
                <p className="plan-description">
                  Perfect for individuals and small projects getting started.
                </p>
              </div>
              <div className="pricing-display">
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">19</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              <div className="features-list">
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>5 Projects</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>10GB Storage</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Email Support</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Basic Analytics</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>SSL Certificate</span>
                </div>
              </div>
              <a href="#" className="btn-plan">
                Get Started
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="pricing-card professional featured">
              <div className="plan-header">
                <div className="featured-badge">Most Popular</div>
                <h3 className="plan-name">Professional</h3>
                <p className="plan-description">
                  Ideal for growing businesses and teams that need more power.
                </p>
              </div>
              <div className="pricing-display">
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">49</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              <div className="features-list">
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>25 Projects</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>100GB Storage</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Priority Support</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Advanced Analytics</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Team Collaboration</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Custom Integrations</span>
                </div>
              </div>
              <a href="#" className="btn-plan">
                Start Free Trial
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="pricing-card enterprise">
              <div className="plan-header">
                <h3 className="plan-name">Enterprise</h3>
                <p className="plan-description">
                  Comprehensive solution for large organizations with specific
                  needs.
                </p>
              </div>
              <div className="pricing-display">
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">99</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              <div className="features-list">
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Unlimited Projects</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>1TB Storage</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>24/7 Phone Support</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Enterprise Analytics</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Advanced Security</span>
                </div>
                <div className="feature">
                  <i className="bi bi-check2"></i>
                  <span>Dedicated Account Manager</span>
                </div>
              </div>
              <a href="#" className="btn-plan">
                Contact Sales
              </a>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-5">
          <div className="col-lg-8 text-center">
            <div className="pricing-footer">
              <p className="guarantee-text">
                30-day money-back guarantee • No setup fees • Cancel anytime
              </p>
              <p className="contact-text">
                Need a custom plan? <a href="#">Contact our sales team</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PricingApp;
