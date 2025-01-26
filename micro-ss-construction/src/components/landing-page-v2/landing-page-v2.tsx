import "./landing-page-v2.scss";

const LandingPageV2 = () => {
  return (
    <div className="landing-page-v2">
      <div className="hero parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="hero-content">
                <div className="section-title dark-section">
                  <h3 className="wow fadeInUp">welcome to handyman</h3>
                  <h1 className="text-anime-style-3" data-cursor="-opaque">
                    Your home's trusted repair experts
                  </h1>
                </div>
                <div className="hero-btn wow fadeInUp" data-wow-delay="0.2s">
                  <a href="#" className="btn-default">
                    get started
                  </a>
                  <a
                    href="contact.html"
                    className="btn-default btn-highlighted"
                  >
                    contact now
                  </a>
                </div>

                <div className="hero-list wow fadeInUp" data-wow-delay="0.4s">
                  <ul>
                    <li>24/7 emergency services</li>
                    <li>online booking and scheduling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="client-slider bg-radius-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="client-slider-boxes">
                <div className="client-slider-box"></div>

                <div className="scroll-down-circle-box">
                  <div className="scroll-circle-text">
                    <figure>
                      <img src="/images/svg/scroll-circle-text.svg" alt="" />
                    </figure>

                    <div className="scroll-down-arrow">
                      <a href="#about-us">
                        <i className="fa-solid fa-arrow-down"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-us" id="about-us">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-us-content">
                <div className="section-title">
                  <h3 className="wow fadeInUp">about us</h3>
                  <h2 className="text-anime-style-3" data-cursor="-opaque">
                    Handyman services for your home
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    Skilled and dependable handyman services for all your home
                    repair and improvement needs.
                  </p>
                </div>

                <div className="about-us-info-list">
                  <div
                    className="about-us-info-item wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <h3>booking and scheduling system</h3>
                    <p>
                      Effortlessly book and schedule your handyman services
                      online Choose a convenient date and time, view
                      availability.
                    </p>
                  </div>

                  <div
                    className="about-us-info-item wow fadeInUp"
                    data-wow-delay="0.6s"
                  >
                    <h3>emergency service A vailability</h3>
                    <p>
                      Get prompt assistance with our 24/7 emergency services for
                      urgent repairs when you need them most.
                    </p>
                  </div>
                </div>

                <div
                  className="about-us-btn wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  <a href="about.html" className="btn-default">
                    more about
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-us-images">
                <div className="about-img-1">
                  <figure className="image-anime">
                    <img src="images/samples/about-img-1.jpg" alt="" />
                  </figure>
                </div>

                <div className="about-img-2">
                  <figure className="image-anime">
                    <img src="images/samples/about-img-2.jpg" alt="" />
                  </figure>
                </div>

                <div className="company-timing">
                  <h3>Opening hours</h3>
                  <ul>
                    <li>
                      Mon to Fri <span>09:30 - 07:30</span>
                    </li>
                    <li>
                      Saturday <span>09:30 - 07:30</span>
                    </li>
                    <li>
                      Sunday <span>closed</span>
                    </li>
                  </ul>
                  <figure>
                    <img src="images/icons/icon-clock.svg" alt="" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-facts bg-radius-section">
        <div className="container">
          <div className="row section-row align-items-center">
            <div className="col-lg-6">
              <div className="section-title dark-section">
                <h3
                  className="wow fadeInUp"
                  style={{ visibility: "visible", animationName: "fadeInUp" }}
                >
                  Some facts
                </h3>
                <h2
                  className="text-anime-style-3"
                  data-cursor="-opaque"
                  style={{ perspective: "400px" }}
                >
                  hi dfhjkdfkjdfjkd f dfhdjhf
                </h2>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="section-title-content dark-section wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                <p>
                  From repairs to home improvements, our comprehensive handyman
                  services cover everything you
                </p>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-3 col-md-6 col-6 order-lg-1 order-md-1 order-1">
              <div className="fact-counter-box">
                <div className="fact-counter-item">
                  <h3>experience</h3>
                  <h2>
                    <span className="counter">25</span>+
                  </h2>
                  <p>years of experience</p>
                </div>

                <div className="fact-counter-item">
                  <h3>people</h3>
                  <h2>
                    <span className="counter">320</span>k
                  </h2>
                  <p>working staff</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6 order-lg-2 order-md-3 order-3">
              <div className="quick-fact-image">
                <img src="images/samples/quick-fact-img.png" alt="" />
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-6 order-lg-3 order-md-2 order-2">
              <div className="fact-counter-box">
                <div className="fact-counter-item">
                  <h3>work</h3>
                  <h2>
                    <span className="counter">8</span>k+
                  </h2>
                  <p>project complete</p>
                </div>

                <div className="fact-counter-item">
                  <h3>client</h3>
                  <h2>
                    <span className="counter">100</span>%
                  </h2>
                  <p>satisfaction guarante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="best-services bg-radius-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="best-services-box-content">
                <div className="best-services-content">
                  <div className="section-title">
                    <h3
                      className="wow fadeInUp"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                      }}
                    >
                      what we do
                    </h3>
                    <h2
                      className="text-anime-style-3"
                      data-cursor="-opaque"
                      style={{ perspective: "400px" }}
                    >
                      <div
                        className="split-line"
                        style={{
                          display: "block",
                          textAlign: "start",
                          position: "relative",
                        }}
                      >
                        hihsdf dfdfidhf
                      </div>
                    </h2>
                  </div>

                  <div className="best-services-body">
                    <div className="contact-now-circle">
                      <img src="/images/samples/image1.png" alt="" />
                    </div>

                    <div className="best-services-box">
                      <div
                        className="best-services-item wow fadeInUp"
                        style={{
                          visibility: "visible",
                          animationName: "fadeInUp",
                        }}
                      >
                        <div className="icon-box">
                          <img
                            src="/images/samples/icon-service-1.svg"
                            alt=""
                          />
                        </div>

                        <div className="best-services-item-content">
                          <h3>electrical services</h3>
                          <p>
                            Our skilled electricians ensure efficient lighting,
                            and power systems.
                          </p>
                        </div>
                      </div>

                      <div
                        className="best-services-item wow fadeInUp"
                        data-wow-delay="0.2s"
                        style={{
                          visibility: "visible",
                          animationDelay: "0.2s",
                          animationName: "fadeInUp",
                        }}
                      >
                        <div className="icon-box">
                          <img
                            src="/images/samples/icon-service-1.svg"
                            alt=""
                          />
                        </div>

                        <div className="best-services-item-content">
                          <h3>painting and drywall</h3>
                          <p>
                            Quality interior and the exterior painting patching
                            and finishing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="best-services-image">
                  <figure className="image-anime">
                    <img src="/images/samples/about-img-2.jpg" alt="" />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="our-services bg-radius-section">
        <div className="container">
          <div className="row section-row align-items-center">
            <div className="col-lg-6">
              <div className="section-title">
                <h3 className="wow fadeInUp">services</h3>
                <h2 className="text-anime-style-3" data-cursor="-opaque">
                  Comprehensive handyman services
                </h2>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="section-title-content wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <p>
                  From repairs to home improvement, our comprehensive handyman
                  services cover everything you need to keep your home in top
                  shape.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="service-item wow fadeInUp">
                <div className="service-item-header">
                  <div className="icon-box">
                    <img src="images/samples/icon-service-1.svg" alt="" />
                  </div>

                  <div className="service-item-content">
                    <h3>
                      <a href="service-single.html">electrical repairs</a>
                    </h3>
                    <p>Expert electrical repairs including outlet</p>
                  </div>
                </div>

                <div className="service-image">
                  <a href="service-single.html" data-cursor-text="View">
                    <figure className="image-anime">
                      <img src="images/samples/service-img-1.jpg" alt="" />
                    </figure>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
                <div className="service-item-header">
                  <div className="icon-box">
                    <img src="images/samples/icon-service-2.svg" alt="" />
                  </div>

                  <div className="service-item-content">
                    <h3>
                      <a href="service-single.html">plumbing services</a>
                    </h3>
                    <p>Expert electrical repairs including outlet</p>
                  </div>
                </div>

                <div className="service-image">
                  <a href="service-single.html" data-cursor-text="View">
                    <figure className="image-anime">
                      <img src="images/samples/service-img-2.jpg" alt="" />
                    </figure>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-item wow fadeInUp" data-wow-delay="0.4s">
                <div className="service-item-header">
                  <div className="icon-box">
                    <img src="images/samples/icon-service-3.svg" alt="" />
                  </div>

                  <div className="service-item-content">
                    <h3>
                      <a href="service-single.html">painting & drywall</a>
                    </h3>
                    <p>Expert electrical repairs including outlet</p>
                  </div>
                </div>

                <div className="service-image">
                  <a href="service-single.html" data-cursor-text="View">
                    <figure className="image-anime">
                      <img src="images/samples/service-img-3.jpg" alt="" />
                    </figure>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-item wow fadeInUp" data-wow-delay="0.6s">
                <div className="service-item-header">
                  <div className="icon-box">
                    <img src="images/samples/icon-service-4.svg" alt="" />
                  </div>

                  <div className="service-item-content">
                    <h3>
                      <a href="service-single.html">home maintenance</a>
                    </h3>
                    <p>Expert electrical repairs including outlet</p>
                  </div>
                </div>

                <div className="service-image">
                  <a href="service-single.html" data-cursor-text="View">
                    <figure className="image-anime">
                      <img src="images/samples/service-img-4.jpg" alt="" />
                    </figure>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div
                className="service-footer wow fadeInUp"
                data-wow-delay="0.8s"
              >
                <p>
                  You will be satisfy with our work. Contact us today{" "}
                  <a href="tel:123456789">(+91) 8149403097</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-work bg-radius-section">
        <div className="container">
          <div className="row section-row align-items-center">
            <div className="col-lg-6">
              <div className="section-title">
                <h3
                  className="wow fadeInUp"
                  style={{ visibility: "visible", animationName: "fadeInUp" }}
                >
                  how it work
                </h3>
                <h2
                  className="text-anime-style-3"
                  data-cursor="-opaque"
                  style={{ perspective: "400px" }}
                >
                  hihihhihi ihb
                </h2>
              </div>
            </div>

            {/* <div className="col-lg-6">
              <div className="samples/trusted-client-content">
                <div className="samples/trusted-client-box">
                  <div className="samples/trusted-client-images">
                    <div className="client-image">
                      <figure className="image-anime">
                        <img src="images/samples/trusted-client-img-2.jpg" alt="" />
                      </figure>
                    </div>

                    <div className="client-image">
                      <figure className="image-anime">
                        <img src="images/samples/trusted-client-img-2.jpg" alt="" />
                      </figure>
                    </div>

                    <div className="client-image">
                      <figure className="image-anime">
                        <img src="images/samples/trusted-client-img-2.jpg" alt="" />
                      </figure>
                    </div>

                    <div className="client-image add-more">
                      <h3>
                        <span className="counter">60</span>+
                      </h3>
                    </div>
                  </div>

                  <div className="samples/trusted-client-title">
                    <h3>
                      Trusted from our <span className="counter">1500</span>{" "}
                      client
                    </h3>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="how-work-image">
                <div className="how-work-image-title">
                  <h2>handyman</h2>
                </div>

                <figure className="image-anime">
                  <img src="images/samples/how-work-image.jpg" alt="" />
                </figure>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="how-work-steps">
                <div
                  className="how-work-step-item wow fadeInUp"
                  style={{
                    visibility: "visible",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="icon-box">
                    <img src="images/samples/icon-service-1.svg" alt="" />
                  </div>

                  <div className="how-work-step-content">
                    <h3>
                      <span>01.</span> electrical repairs
                    </h3>
                    <p>
                      Electrical Repairs involve diagnosing and fixing issues in
                      electrical systems to ensure.
                    </p>
                  </div>
                </div>

                <div
                  className="how-work-step-item wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="icon-box">
                    <img src="images/samples/icon-service-2.svg" alt="" />
                  </div>

                  <div className="how-work-step-content">
                    <h3>
                      <span>02.</span> Professional Service Delivery
                    </h3>
                    <p>
                      Our skilled handyman arrives on time with the necessary
                      tools and expertise, completing.
                    </p>
                  </div>
                </div>

                <div
                  className="how-work-step-item wow fadeInUp"
                  data-wow-delay="0.4s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.4s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="icon-box">
                    <img src="images/samples/icon-service-3.svg" alt="" />
                  </div>

                  <div className="how-work-step-content">
                    <h3>
                      <span>03.</span> Quality Check
                    </h3>
                    <p>
                      After completion, we ensure the quality of work meets our
                      standards and your satisfaction.
                    </p>
                  </div>
                </div>

                <div
                  className="how-work-step-item wow fadeInUp"
                  data-wow-delay="0.6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="icon-box">
                    <img src="images/samples/icon-service-4.svg" alt="" />
                  </div>

                  <div className="how-work-step-content">
                    <h3>
                      <span>04.</span> Payment and Follow-Up
                    </h3>
                    <p>
                      Pay easily through our secure payment options. We'll
                      follow up to ensure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="our-faqs parallaxie">
        <div className="container">
          <div className="row section-row">
            <div className="col-lg-6">
              <div className="section-title">
                <h3
                  className="wow fadeInUp"
                  style={{
                    visibility: "visible",
                    animationName: "fadeInUp",
                  }}
                >
                  FAQs
                </h3>
                <h2
                  className="text-anime-style-3"
                  data-cursor="-opaque"
                  style={{ perspective: "400px" }}
                >
                  <div
                    className="split-line"
                    style={{
                      display: "block",
                      textAlign: "start",
                      position: "relative",
                    }}
                  >
                    hi dfhkdf dfhdf
                  </div>
                  <div
                    className="split-line"
                    style={{
                      display: "block",
                      textAlign: "start",
                      position: "relative",
                    }}
                  >
                    this is dummy text
                  </div>
                </h2>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="faq-accordion" id="accordion">
                <div
                  className="accordion-item wow fadeInUp"
                  style={{ visibility: "visible", animationName: "fadeInUp" }}
                >
                  <h2 className="accordion-header" id="heading1">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse1"
                      aria-expanded="false"
                      aria-controls="collapse1"
                    >
                      1. How do I schedule a service?
                    </button>
                  </h2>
                  <div
                    id="collapse1"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading1"
                    data-bs-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes, all of our handymen are fully licensed and insured
                        to ensure safe, high-quality work and give you peace of
                        mind.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="0.2s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.2s",
                    animationName: "fadeInUp",
                  }}
                >
                  <h2 className="accordion-header" id="heading2">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse2"
                      aria-expanded="true"
                      aria-controls="collapse2"
                    >
                      2. Are you licensed and insured?
                    </button>
                  </h2>
                  <div
                    id="collapse2"
                    className="accordion-collapse collapse show"
                    aria-labelledby="heading2"
                    data-bs-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes, all of our handymen are fully licensed and insured
                        to ensure safe, high-quality work and give you peace of
                        mind.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="0.4s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.4s",
                    animationName: "fadeInUp",
                  }}
                >
                  <h2 className="accordion-header" id="heading3">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse3"
                      aria-expanded="false"
                      aria-controls="collapse3"
                    >
                      3. How do you price your services?
                    </button>
                  </h2>
                  <div
                    id="collapse3"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading3"
                    data-bs-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes, all of our handymen are fully licensed and insured
                        to ensure safe, high-quality work and give you peace of
                        mind.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="0.6s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.6s",
                    animationName: "fadeInUp",
                  }}
                >
                  <h2 className="accordion-header" id="heading4">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse4"
                      aria-expanded="false"
                      aria-controls="collapse4"
                    >
                      4. How long does typical job take?
                    </button>
                  </h2>
                  <div
                    id="collapse4"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading4"
                    data-bs-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes, all of our handymen are fully licensed and insured
                        to ensure safe, high-quality work and give you peace of
                        mind.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="accordion-item wow fadeInUp"
                  data-wow-delay="0.8s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.8s",
                    animationName: "fadeInUp",
                  }}
                >
                  <h2 className="accordion-header" id="heading5">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse5"
                      aria-expanded="false"
                      aria-controls="collapse5"
                    >
                      5. What areas do you service?
                    </button>
                  </h2>
                  <div
                    id="collapse5"
                    className="accordion-collapse collapse"
                    aria-labelledby="heading5"
                    data-bs-parent="#accordion"
                  >
                    <div className="accordion-body">
                      <p>
                        Yes, all of our handymen are fully licensed and insured
                        to ensure safe, high-quality work and give you peace of
                        mind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-contact-us bg-radius-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2"></div>

            <div className="col-lg-8">
              <div className="contact-details-box">
                <div className="contact-us-image">
                  <figure className="image-anime">
                    <img src="images/samples/contact-us-img.jpg" alt="" />
                  </figure>
                </div>

                <div className="contact-info-list">
                  <div
                    className="contact-info-item wow fadeInUp"
                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                  >
                    <div className="icon-box">
                      <img src="images/icons/icon-phone-white.svg" alt="" />
                    </div>

                    <div className="contact-info-content">
                      <p>contact:</p>
                      <h3>+01 8149403097</h3>
                    </div>
                  </div>

                  <div
                    className="contact-info-item wow fadeInUp"
                    data-wow-delay="0.2s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.2s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <div className="icon-box">
                      <img src="images/icons/icon-mail-white.svg" alt="" />
                    </div>

                    <div className="contact-info-content">
                      <p>email:</p>
                      <h3>vivaanassociates01@gmail.com</h3>
                    </div>
                  </div>

                  <div
                    className="contact-info-item location-info-item wow fadeInUp"
                    data-wow-delay="0.4s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.4s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <div className="icon-box">
                      <img src="images/icons/icon-location-white.svg" alt="" />
                    </div>

                    <div className="contact-info-content">
                      <p>location:</p>
                      <h3>
                        Plot No: 17 Balaji Nagar west Opposite Rahul medical
                        store, Manewada road Nagpur 440027 272 Linden Avenue
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-4">
              <div className="contact-form">
                <div className="section-title">
                  <h3
                    className="wow fadeInUp"
                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                  >
                    contact us
                  </h3>
                  <h2
                    className="text-anime-style-3"
                    data-cursor="-opaque"
                    style={{ perspective: "400px" }}
                  >
                    COntac tere dfg dfg dfg
                  </h2>
                  <p
                    className="wow fadeInUp"
                    data-wow-delay="0.2s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.2s",
                      animationName: "fadeInUp",
                    }}
                  >
                    Have questions or need assistance? Reach out to us today!
                    We're here to provide expert solutions and friendly support.
                  </p>
                </div>

                <div className="member-contect-form contact-form">
                  <form
                    id="contactForm"
                    action="#"
                    method="POST"
                    data-toggle="validator"
                    className="wow fadeInUp"
                    data-wow-delay="0.4s"
                    noValidate={true}
                    style={{
                      visibility: "visible",
                      animationDelay: "0.4s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <div className="row">
                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="text"
                          name="fname"
                          className="form-control"
                          id="fname"
                          placeholder="First name"
                          required
                        />
                        <div className="help-block with-errors"></div>
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="text"
                          name="lname"
                          className="form-control"
                          id="lname"
                          placeholder="Last name"
                          required
                        />
                        <div className="help-block with-errors"></div>
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          id="phone"
                          placeholder="Phone no"
                          required
                        />
                        <div className="help-block with-errors"></div>
                      </div>

                      <div className="form-group col-md-6 mb-4">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="E-mail address"
                          required
                        />
                        <div className="help-block with-errors"></div>
                      </div>

                      <div className="form-group col-md-12 mb-5">
                        <textarea
                          name="message"
                          className="form-control"
                          id="message"
                          rows={4}
                          placeholder="Message"
                        ></textarea>
                        <div className="help-block with-errors"></div>
                      </div>

                      <div className="col-md-12">
                        <button type="submit" className="btn-default disabled">
                          send message
                        </button>
                        <div id="msgSubmit" className="h3 hidden"></div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <>
        <div className="why-choose-us">
          <div className="why-choose-box bg-radius-section">
            <div className="container">
              <div className="row section-row align-items-end">
                <div className="col-lg-6">
                  <div className="section-title">
                    <h3
                      className="wow fadeInUp"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                      }}
                    >
                      why choose us
                    </h3>
                    <h2
                      className="text-anime-style-3"
                      data-cursor="-opaque"
                      style={{ perspective: "400px" }}
                    >
                      Showcasing our best features
                    </h2>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="why-choose-image">
                    <figure className="image-anime">
                      <img src="images/samples/why-choose-img.jpg" alt="" />
                    </figure>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="why-choose-project-box">
                    <div
                      className="why-choose-project-item wow fadeInUp"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                      }}
                    >
                      <div className="icon-box">
                        <img src="images/icons/icon-service-1.svg" alt="" />
                      </div>

                      <div className="why-choose-project-content">
                        <h3>locally owned</h3>
                        <p>
                          As a local business, we care about our community and
                          take pride in serving our.
                        </p>
                      </div>
                    </div>

                    <div
                      className="why-choose-project-item wow fadeInUp"
                      data-wow-delay="0.2s"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                        animationDelay: "0.2s",
                      }}
                    >
                      <div className="icon-box">
                        <img src="images/icons/icon-service-2.svg" alt="" />
                      </div>

                      <div className="why-choose-project-content">
                        <h3>on-time service</h3>
                        <p>
                          As a local business, we care about our community and
                          take pride in serving our.
                        </p>
                      </div>
                    </div>

                    <div
                      className="why-choose-project-item wow fadeInUp"
                      data-wow-delay="0.4s"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                        animationDelay: "0.4s",
                      }}
                    >
                      <div className="icon-box">
                        <img src="images/icons/icon-service-3.svg" alt="" />
                      </div>

                      <div className="why-choose-project-content">
                        <h3>transparent pricing</h3>
                        <p>
                          As a local business, we care about our community and
                          take pride in serving our.
                        </p>
                      </div>
                    </div>

                    <div
                      className="why-choose-project-item wow fadeInUp"
                      data-wow-delay="0.6s"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                        animationDelay: "0.6s",
                      }}
                    >
                      <div className="icon-box">
                        <img src="images/icons/icon-service-4.svg" alt="" />
                      </div>

                      <div className="why-choose-project-content">
                        <h3>quality assurance</h3>
                        <p>
                          As a local business, we care about our community and
                          take pride in serving our.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="why-choose-footer wow fadeInUp"
                    data-wow-delay="0.8s"
                    style={{
                      visibility: "visible",
                      animationName: "fadeInUp",
                      animationDelay: "0.8s",
                    }}
                  >
                    <p>
                      Our construction company is the perfect choice for your
                      dream. <a href="contact.html">Contact us now today!</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="our-approch bg-radius-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="our-approch-image">
                  <div className="our-approch-img-1">
                    <figure className="image-anime">
                      <img src="images/samples/our-approch-img-1.jpg" alt="" />
                    </figure>
                  </div>

                  <div className="our-approch-img-2">
                    <figure className="image-anime">
                      <img src="images/samples/our-approch-img-2.jpg" alt="" />
                    </figure>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="our-approch-content">
                  <div className="section-title">
                    <h3
                      className="wow fadeInUp"
                      style={{
                        visibility: "visible",
                        animationName: "fadeInUp",
                      }}
                    >
                      our approach
                    </h3>
                    <h2
                      className="text-anime-style-3"
                      data-cursor="-opaque"
                      style={{ perspective: "400px" }}
                    >
                      <div
                        className="split-line"
                        style={{
                          display: "block",
                          textAlign: "start",
                          position: "relative",
                        }}
                      >
                        Services with personal touch
                      </div>
                    </h2>
                  </div>

                  <div className="our-approch-tab">
                    <div
                      className="our-approch-tab-nav wow fadeInUp"
                      data-wow-delay="0.2s"
                      style={{
                        visibility: "visible",
                        animationDelay: "0.2s",
                        animationName: "fadeInUp",
                      }}
                    >
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link btn-default btn-highlighted active"
                            id="mission-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#mission"
                            type="button"
                            role="tab"
                            aria-selected="true"
                          >
                            our mission
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link btn-default btn-highlighted"
                            id="vision-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#vision"
                            type="button"
                            role="tab"
                            aria-selected="false"
                            tabIndex={-1}
                          >
                            our vision
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link btn-default btn-highlighted"
                            id="value-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#value"
                            type="button"
                            role="tab"
                            aria-selected="false"
                            tabIndex={-1}
                          >
                            our value
                          </button>
                        </li>
                      </ul>
                    </div>

                    <div className="approch-box tab-content" id="myTabContent">
                      <div
                        className="approch-item tab-pane fade active show"
                        id="mission"
                        role="tabpanel"
                        aria-labelledby="mission-tab"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-12">
                            <div className="approch-tab-content">
                              <div className="approch-tab-content-header">
                                <p>
                                  Our mission is to provide reliable,
                                  high-quality handyman services that enhance
                                  homes and simplify lives, delivering
                                  craftsmanship with integrity and care.
                                </p>
                              </div>

                              <div className="approch-tab-content-list">
                                <ul>
                                  <li>dependable repairs, every time</li>
                                  <li>improving homes, enhancing lives</li>
                                  <li>customer-centered approach</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="approch-item tab-pane fade"
                        id="vision"
                        role="tabpanel"
                        aria-labelledby="vision-tab"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-12">
                            <div className="approch-tab-content">
                              <div className="approch-tab-content-header">
                                <p>
                                  Our vision is to provide reliable,
                                  high-quality handyman services that enhance
                                  homes and simplify lives, delivering
                                  craftsmanship with integrity and care.
                                </p>
                              </div>

                              <div className="approch-tab-content-list">
                                <ul>
                                  <li>dependable repairs, every time</li>
                                  <li>improving homes, enhancing lives</li>
                                  <li>customer-centered approach</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="approch-item tab-pane fade"
                        id="value"
                        role="tabpanel"
                        aria-labelledby="value-tab"
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-12">
                            <div className="approch-tab-content">
                              <div className="approch-tab-content-header">
                                <p>
                                  Our value is to provide reliable, high-quality
                                  handyman services that enhance homes and
                                  simplify lives, delivering craftsmanship with
                                  integrity and care.
                                </p>
                              </div>

                              <div className="approch-tab-content-list">
                                <ul>
                                  <li>dependable repairs, every time</li>
                                  <li>improving homes, enhancing lives</li>
                                  <li>customer-centered approach</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="our-awards bg-radius-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="our-awards-box">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="our-awards-counter">
                        <h2>
                          <span className="counter">25</span>+
                        </h2>
                        <p>Awards from all over world</p>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="our-awards-list">
                        <div
                          className="our-awards-item wow fadeInUp"
                          style={{
                            visibility: "visible",
                            animationName: "fadeInUp",
                          }}
                        >
                          <img src="images/samples/award-1.svg" alt="" />
                        </div>

                        <div
                          className="our-awards-item wow fadeInUp"
                          data-wow-delay="0.2s"
                          style={{
                            visibility: "visible",
                            animationName: "fadeInUp",
                            animationDelay: "0.2s",
                          }}
                        >
                          <img src="images/samples/award-2.svg" alt="" />
                        </div>

                        <div
                          className="our-awards-item wow fadeInUp"
                          data-wow-delay="0.4s"
                          style={{
                            visibility: "visible",
                            animationName: "fadeInUp",
                            animationDelay: "0.4s",
                          }}
                        >
                          <img src="images/samples/award-3.svg" alt="" />
                        </div>

                        <div
                          className="our-awards-item wow fadeInUp"
                          data-wow-delay="0.6s"
                          style={{
                            visibility: "visible",
                            animationName: "fadeInUp",
                            animationDelay: "0.6s",
                          }}
                        >
                          <img src="images/samples/award-4.svg" alt="" />
                        </div>

                        <div
                          className="our-awards-item wow fadeInUp"
                          data-wow-delay="0.8s"
                          style={{
                            visibility: "visible",
                            animationName: "fadeInUp",
                            animationDelay: "0.8s",
                          }}
                        >
                          <img src="images/samples/award-5.svg" alt="" />
                        </div>

                        <div
                          className="our-awards-item wow fadeInUp"
                          data-wow-delay="1s"
                          style={{
                            visibility: "visible",
                            animationName: "fadeInUp",
                            animationDelay: "1s",
                          }}
                        >
                          <img src="images/samples/award-6.svg" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <footer className="main-footer bg-radius-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-header">
                <div className="footer-logo">
                  <img src="images/footer-logo.svg" alt="" />
                </div>

                <div className="footer-contact-box">
                  <div className="footer-contact-item">
                    <div className="icon-box">
                      <img src="/images/icons/icon-phone.svg" alt="" />
                    </div>

                    <div className="footer-contact-content">
                      <h3>contact</h3>
                      <p>+1.809.120.6705</p>
                    </div>
                  </div>

                  <div className="footer-contact-item">
                    <div className="icon-box">
                      <img src="/images/icons/icon-mail.svg" alt="" />
                    </div>

                    <div className="footer-contact-content">
                      <h3>email</h3>
                      <p>info@domain.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-footer footer-links">
                <h3>About Company</h3>
                <p>
                  Your go-to handyman for reliable, efficient, and expert home
                  and business repair solutions.
                </p>
              </div>
            </div>

            <div className="col-lg-2 col-md-4">
              <div className="footer-links">
                <h3>quick link</h3>
                <ul>
                  <li>
                    <a href="index.html">home</a>
                  </li>
                  <li>
                    <a href="about.html">about Us</a>
                  </li>
                  <li>
                    <a href="services.html">services</a>
                  </li>
                  <li>
                    <a href="blog.html">blog</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-4">
              <div className="footer-links">
                <h3>support</h3>
                <ul>
                  <li>
                    <a href="#">help</a>
                  </li>
                  <li>
                    <a href="#">term's &amp; condition</a>
                  </li>
                  <li>
                    <a href="#">privacy policy</a>
                  </li>
                  <li>
                    <a href="contact.html">contact</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-4">
              <div className="footer-links">
                <h3>follow us</h3>
                <ul>
                  <li>
                    <a href="#">facebook</a>
                  </li>
                  <li>
                    <a href="#">instagram</a>
                  </li>
                  <li>
                    <a href="#">twitter</a>
                  </li>
                  <li>
                    <a href="#">linkedin</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-copyright">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer-copyright-text">
                  <p>
                    {`Copyright © ${new Date().getFullYear()} ${"SS Construction"} | All Rights Reserved.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageV2;
