import "./landing-page-v2.scss";

import { useEffect, useState } from "react";

import { CompanyDetailsModel } from "../interfaces/company-details.model";
import Gallery from "./gallery/gallery";
import { fetchCompanyDetails } from "../../services/company-details";

const LandingPageV2 = () => {
  const [detail, setDetail] = useState<CompanyDetailsModel>();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "files/Brochure.pdf"; // Path to the PDF file in the public folder
    link.download = "SS_Construction_Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchCompanyDetails()
      .then((data) => setDetail(data))
      .catch((error) =>
        console.error("Error fetching company details:", error)
      );
  }, []);

  return (
    <div className="landing-page-v2">
      <div className="hero parallaxie">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="hero-content">
                <div className="section-title dark-section">
                  <div className="icon-box">
                    <img src="images/logos/white-logo-transparent.png" alt="" />
                  </div>
                  <h3 className="wow fadeInUp">welcome to {detail?.name}</h3>
                  <h2
                    className="wow fadeInUp"
                    style={{
                      visibility: "visible",
                      animationName: "fadeInUp",
                      transitionDelay: "0.2s",
                    }}
                  >
                    Build your Luxury Residential Bungalows & Commercial
                    Complexes with us
                  </h2>
                  <p className="wow fadeInUp">
                    We deliver excellence in every project.
                  </p>
                </div>
                <div
                  className="hero-btn wow fadeInUp d-flex"
                  data-wow-delay="0.2s"
                >
                  <a href="#" className="btn-default" onClick={handleDownload}>
                    {`DOWNLOAD BROCHURE`}
                  </a>
                  <a
                    href="#page-contact-us"
                    className="btn-default btn-highlighted"
                  >
                    contact now
                  </a>
                </div>
                <div className="hero-list wow fadeInUp" data-wow-delay="0.4s">
                  <ul>
                    <li>Best in construction services</li>
                    <li>Exquisite Luxury Residential Bungalow</li>
                    <li> Innovative Commercial Complexes</li>
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
                    {/* <figure>
                      <img src="/images/svg/scroll-circle-text.svg" alt="" />
                    </figure> */}

                    <div className="scroll-down-arrow">
                      <a href="#about-us">
                        <img src="files/ss-construction-qr.png" alt="ss-qr" />
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
                    {detail?.name} services for your construction needs
                  </h2>
                  <p className="wow fadeInUp" data-wow-delay="0.2s">
                    Skilled and dependable {detail?.name} services for all your
                    construction and building needs.
                  </p>
                </div>

                <div className="about-us-info-list">
                  <div
                    className="about-us-info-item wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <h3>Comprehensive Construction Services</h3>
                    <p>
                      From residential bungalows to commercial complexes, we
                      offer a wide range of construction services tailored to
                      your needs.
                    </p>
                  </div>

                  <div
                    className="about-us-info-item wow fadeInUp"
                    data-wow-delay="0.6s"
                  >
                    <h3>Quality and Excellence</h3>
                    <p>
                      We are committed to delivering high-quality construction
                      projects with excellence and attention to detail.
                    </p>
                  </div>
                </div>

                {/* <div
                  className="about-us-btn wow fadeInUp"
                  data-wow-delay="0.8s"
                >
                  <a href="about.html" className="btn-default">
                    more about
                  </a>
                </div> */}
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
                  Building Excellence in Every Project
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
                  From building luxury residential bungalows to innovative
                  commercial complexes, our comprehensive construction services
                  cover everything you need to bring your vision to life.
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
                    <span className="counter">
                      {new Date().getFullYear() -
                        Number(detail?.startedInYear ?? 0)}
                    </span>
                    +
                  </h2>
                  <p>years of experience</p>
                </div>

                <div className="fact-counter-item">
                  <h3>people</h3>
                  <h2>
                    <span className="counter">{detail?.numberOfEmployees}</span>
                    k
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
                    <span className="counter">
                      {detail?.numberOfProjectsCompleted}
                    </span>
                    +
                  </h2>
                  <p>project complete</p>
                </div>

                <div className="fact-counter-item">
                  <h3>client</h3>
                  <h2>
                    <span className="counter">
                      {detail?.clientSatisfaction}
                    </span>
                    %
                  </h2>
                  <p>satisfaction guarante</p>
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
                  Comprehensive services
                </h2>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="section-title-content wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <p>
                  Our comprehensive construction services cover everything you
                  need to bring your vision to life.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {detail?.services?.map((x) => {
              return (
                <div className="col-lg-3 col-md-6">
                  <div className="service-item wow fadeInUp">
                    <div className="service-item-header">
                      {/* <div className="icon-box">
                        <img src="images/samples/icon-service-1.svg" alt="" />
                      </div> */}

                      <div className="service-item-content">
                        <h3>
                          <a href="service-single.html">{x?.name}</a>
                        </h3>
                        <p>{x?.description}</p>
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
              );
            })}

            <div className="col-lg-12">
              <div
                className="service-footer wow fadeInUp"
                data-wow-delay="0.8s"
              >
                <p>
                  You will be satisfy with our work. Contact us today{" "}
                  <a href={`tel:${detail?.contact?.phone}`}>
                    {detail?.contact?.phone}
                  </a>
                </p>
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
                      Other services
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
                        Other Construction Services
                      </div>
                    </h2>
                  </div>

                  <div className="best-services-body">
                    {/* <div className="contact-now-circle">
                      <img src="/images/logo/black-logo-transparent.png" alt="" />
                    </div> */}

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
                          <h3>plumbing services</h3>
                          <p>
                            Expert plumbing solutions for residential and
                            commercial properties.
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
                          <h3>carpentry services</h3>
                          <p>
                            High-quality carpentry work for custom furniture,
                            repairs, and more.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="best-services-image">
                  <figure className="image-anime">
                    <img src="/images/samples/about-img-1.jpg" alt="" />
                  </figure>
                </div>
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
                  Streamlined Process for Your Convenience
                </h2>
              </div>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="how-work-image">
                <div className="how-work-image-title">
                  <h2>{detail?.name}</h2>
                </div>

                <figure className="image-anime">
                  <img src="images/samples/how-work-image.jpg" alt="" />
                </figure>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="how-work-steps">
                {detail?.projectSteps?.map((step, index) => (
                  <div
                    className="how-work-step-item wow fadeInUp"
                    data-wow-delay={`${0.2 * (index + 1)}s`}
                    style={{
                      visibility: "visible",
                      animationDelay: `${0.2 * (index + 1)}s`,
                      animationName: "fadeInUp",
                    }}
                    key={index}
                  >
                    <div className="icon-box">
                      <img src={step.src} alt="" />
                    </div>
                    <div className="how-work-step-content">
                      <h3>
                        <span>{`0${index + 1}.`}</span> {step.title}
                      </h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
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
                    Frequently Asked Questions
                  </div>
                </h2>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="faq-accordion" id="accordion">
                {detail?.faqs?.map((faq, index) => (
                  <div
                    className="accordion-item wow fadeInUp"
                    data-wow-delay={`${0.2 * index}s`}
                    style={{
                      visibility: "visible",
                      animationDelay: `${0.2 * index}s`,
                      animationName: "fadeInUp",
                    }}
                    key={index}
                  >
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#accordion"
                    >
                      <div className="accordion-body">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                    {detail?.whyChooseUs?.map((x) => {
                      return (
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
                            <img src={x.src} alt="" />
                          </div>

                          <div className="why-choose-project-content">
                            <h3>{x.title}</h3>
                            <p>{x.description}</p>
                          </div>
                        </div>
                      );
                    })}
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
                      dream.{" "}
                      <a href="#page-contact-us">Contact us now today!</a>
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
                                <p>{detail?.ourMission.description}</p>
                              </div>

                              <div className="approch-tab-content-list">
                                {detail?.ourMission?.values?.map((x) => {
                                  return (
                                    <ul>
                                      <li>{x}</li>
                                    </ul>
                                  );
                                })}
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
                                <p>{detail?.ourVision?.description}</p>
                              </div>

                              <div className="approch-tab-content-list">
                                {detail?.ourVision?.values?.map((x) => {
                                  return (
                                    <ul>
                                      <li>{x}</li>
                                    </ul>
                                  );
                                })}
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
                                <p>{detail?.ourValue?.description}</p>
                              </div>

                              <div className="approch-tab-content-list">
                                {detail?.ourValue?.values?.map((x) => {
                                  return (
                                    <ul>
                                      <li>{x}</li>
                                    </ul>
                                  );
                                })}
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
                          <span className="counter">
                            {detail?.numberOfProjectsCompleted}
                          </span>
                          +
                        </h2>
                        <p>Total number of projects completed</p>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="our-awards-list">
                        {detail?.workWith?.map((work, index) => (
                          <div
                            className="our-awards-item wow fadeInUp"
                            data-wow-delay={`${0.2 * (index + 1)}s`}
                            style={{
                              visibility: "visible",
                              animationName: "fadeInUp",
                              animationDelay: `${0.2 * (index + 1)}s`,
                            }}
                            key={index}
                          >
                            <img src={work.src} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <Gallery />

      <div className="page-contact-us bg-radius-section" id="page-contact-us">
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
                      <h3>{detail?.contact?.phone}</h3>
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
                      <h3>{detail?.contact?.email}</h3>
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
                      <h3>{detail?.contact?.address}</h3>
                    </div>
                  </div>

                  <div className="icon-box-qr">
                    <img src="files/ss-construction-qr.png" alt="ss-qr" />
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

      <footer className="main-footer bg-radius-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-header">
                <div className="footer-logo">
                  <img src="images/logo/white-logo-transparent.gif" alt="" />
                </div>

                <div className="footer-contact-box">
                  <div className="footer-contact-item">
                    <div className="icon-box">
                      <img src="/images/icons/icon-phone.svg" alt="" />
                    </div>

                    <div className="footer-contact-content">
                      <h3>contact</h3>
                      <p>{detail?.contact?.phone}</p>
                    </div>
                  </div>
                  <div className="footer-contact-item">
                    <div className="icon-box">
                      <img src="/images/icons/icon-mail.svg" alt="" />
                    </div>

                    <div className="footer-contact-content">
                      <h3>email</h3>
                      <p>{detail?.contact?.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-footer footer-links">
                <h3>About Company</h3>
                <p>{detail?.about}</p>
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
                {detail?.contact?.social?.map((social) => (
                  <ul key={social?.id}>
                    <li>
                      <a href={social?.url}>{social?.name}</a>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-copyright">
            <div className="row">
              <div className="col-lg-12">
                <div className="footer-copyright-text">
                  <p>
                    {`Copyright © ${new Date().getFullYear()} ${
                      detail?.name
                    } | All Rights Reserved.`}
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
