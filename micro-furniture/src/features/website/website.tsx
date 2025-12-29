import "./website.scss";
import "../../assets/scss/website.scss";

import Footer from "./footer/footer";
import { GetEnvConfig } from "../../app.config";
import RecentWorksApp from "./recent-works/rectent-works";
import TestimoniApp from "./testimoni/testimoni";

const WebsiteApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <div className="website-app">
      <div className="website-body">
        <nav
          className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
          arial-label="Furni navigation bar"
        >
          <div className="container">
            <a className="navbar-brand" href="index.html">
              {appSettings?.name}
              <span>.</span>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsFurni"
              aria-controls="navbarsFurni"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsFurni">
              <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item active">
                  <a className="nav-link" href="index.html">
                    Home
                  </a>
                </li>

                <li>
                  <a className="nav-link" href="#whyUs">
                    Why us
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#services">
                    Services
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#recentWorks">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="#contact">
                    Contact us
                  </a>
                </li>
              </ul>

              <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                <li>
                  <a className="nav-link" href="#">
                    <img src="static/media/img/user.svg" />
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="cart.html">
                    <img src="static/media/img/cart.svg" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="hero">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div className="intro-excerpt">
                  <h1>{appSettings?.homePage?.title}</h1>
                  <p className="mb-4">{appSettings?.homePage?.description}</p>
                  <p>
                    <b>Contact us:</b>
                    <a
                      href="#"
                      title="Copy to clipboard"
                      className="btn btn-white-outline"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          appSettings?.homePage?.contactDetails
                            ?.contactnumber || ""
                        )
                      }
                    >
                      {appSettings?.homePage?.contactDetails?.contactnumber}
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="hero-img-wrap">
                  <img src="static/media/img/couch.png" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                <h2 className="mb-4 section-title">
                  Crafted with excellent material.
                </h2>
                <p className="mb-4">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
                  tristique.{" "}
                </p>
                <p>
                  <a href="shop.html" className="btn">
                    Explore
                  </a>
                </p>
              </div>

              <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                <a className="product-item" href="cart.html">
                  <img
                    src="static/media/img/product-1.png"
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">Nordic Chair</h3>
                  <strong className="product-price">$50.00</strong>

                  <span className="icon-cross">
                    <img
                      src="static/media/img/cross.svg"
                      className="img-fluid"
                    />
                  </span>
                </a>
              </div>

              <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                <a className="product-item" href="cart.html">
                  <img
                    src="static/media/img/product-2.png"
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">Kruzo Aero Chair</h3>
                  <strong className="product-price">$78.00</strong>

                  <span className="icon-cross">
                    <img
                      src="static/media/img/cross.svg"
                      className="img-fluid"
                    />
                  </span>
                </a>
              </div>

              <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                <a className="product-item" href="cart.html">
                  <img
                    src="static/media/img/product-3.png"
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">Ergonomic Chair</h3>
                  <strong className="product-price">$43.00</strong>

                  <span className="icon-cross">
                    <img
                      src="static/media/img/cross.svg"
                      className="img-fluid"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="why-choose-section" id="whyUs">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <h2 className="section-title">
                  {appSettings?.homePage?.whyChooseUs?.title}
                </h2>
                <p>{appSettings?.homePage?.whyChooseUs?.description}</p>

                <div className="row my-5">
                  {appSettings?.homePage?.whyChooseUs?.services?.map(
                    (service, index) => (
                      <div
                        className="col-6 col-md-6"
                        key={`why-choose-us-service-${index}`}
                      >
                        <div className="feature">
                          <div className="icon">
                            <img
                              src={service.icon || "static/media/img/truck.svg"}
                              alt="Image"
                              className="imf-fluid"
                            />
                          </div>
                          <h3>{service.title}</h3>
                          <p>{service.description}</p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="col-lg-5">
                <div className="img-wrap">
                  <img
                    src="static/media/img/why-choose-us-img.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="we-help-section">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-7 mb-5 mb-lg-0">
                <div className="imgs-grid">
                  <div className="grid grid-1">
                    <img
                      src="static/media/img/img-grid-1.jpg"
                      alt="Untree.co"
                    />
                  </div>
                  <div className="grid grid-2">
                    <img
                      src="static/media/img/img-grid-2.jpg"
                      alt="Untree.co"
                    />
                  </div>
                  <div className="grid grid-3">
                    <img
                      src="static/media/img/img-grid-3.jpg"
                      alt="Untree.co"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-5 ps-lg-5">
                <h2 className="section-title mb-4">
                  {appSettings?.homePage?.whyChooseUs2?.title}
                </h2>
                <p>{appSettings?.homePage?.whyChooseUs2?.description}</p>

                <ul className="list-unstyled custom-list my-4">
                  {appSettings?.homePage?.whyChooseUs2?.services?.map(
                    (service, index) => (
                      <li key={`why-choose-us-2-service-${index}`}>
                        {service.title}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="popular-product">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img
                      src="static/media/img/product-1.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="pt-3">
                    <h3>Nordic Chair</h3>
                    <p>
                      Donec facilisis quam ut purus rutrum lobortis. Donec vitae
                      odio{" "}
                    </p>
                    <p>
                      <a href="#">Read More</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img
                      src="static/media/img/product-2.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="pt-3">
                    <h3>Kruzo Aero Chair</h3>
                    <p>
                      Donec facilisis quam ut purus rutrum lobortis. Donec vitae
                      odio{" "}
                    </p>
                    <p>
                      <a href="#">Read More</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img
                      src="static/media/img/product-3.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="pt-3">
                    <h3>Ergonomic Chair</h3>
                    <p>
                      Donec facilisis quam ut purus rutrum lobortis. Donec vitae
                      odio{" "}
                    </p>
                    <p>
                      <a href="#">Read More</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <TestimoniApp />

        <RecentWorksApp />

        <Footer></Footer>
      </div>
    </div>
  );
};

export default WebsiteApp;
