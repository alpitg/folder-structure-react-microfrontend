import CarouselApp from "./carousel/carousel";
import CategoryBanner from "../category-banner/category-banner";
import { GetEnvConfig } from "../../../app.config";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import RecentWorksApp from "../recent-works/recent-works";
import { addItemToBag } from "../../../app/redux/core/shopping-bag/shopping-bag.slice";
import { useDispatch } from "react-redux";

const HomeApp = () => {
  const appSettings = GetEnvConfig();
  const dispatch = useDispatch();

  const productList = [
    {
      id: 1,
      title: "Animi Dolor Pariatur",
      image: "/static/media/img/product-1.png",
      price: 78.0,
    },
    {
      id: 2,
      title: "Art Deco Home",
      image: "/static/media/img/product-2.png",
      price: 43.0,
    },
    {
      id: 3,
      title: "Helen Chair",
      image: "/static/media/img/product-3.png",
      price: 43.0,
    },
  ];

  return (
    <section className="home-app">
      <CarouselApp />

      <CategoryBanner />
      <div className="product-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
              <h2 className="mb-4 section-title">
                Crafted with excellent material.
              </h2>
              <p className="mb-4">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>
              <p>
                <a href="shop.html" className="btn">
                  Explore
                </a>
              </p>
            </div>

            {productList.map((product) => (
              <div
                className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0"
                key={product.id}
              >
                <a className="product-item">
                  <img
                    src={product.image}
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">{product.title}</h3>
                  <strong className="product-price">
                    ₹ {product.price.toFixed(2)}
                  </strong>

                  <span
                    className="icon-cross"
                    onClick={() =>
                      dispatch(
                        addItemToBag({
                          id: product.id,
                          name: product.title,
                          image: product.image,
                          price: product.price,
                          quantity: 1,
                        }),
                      )
                    }
                  >
                    <img
                      src="/static/media/img/cross.svg"
                      className="img-fluid"
                    />
                  </span>
                </a>
              </div>
            ))}
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
                            src={service.icon || "/static/media/img/truck.svg"}
                            alt="Image"
                            className="img-fluid"
                          />
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="img-wrap">
                <img
                  src="/static/media/img/why-choose-us-img.jpg"
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
                  <img src="/static/media/img/img-grid-1.jpg" alt="Untree.co" />
                </div>
                <div className="grid grid-2">
                  <img src="/static/media/img/img-grid-2.jpg" alt="Untree.co" />
                </div>
                <div className="grid grid-3">
                  <img src="/static/media/img/img-grid-3.jpg" alt="Untree.co" />
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
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="popular-product" id="services">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="product-item-sm d-flex">
                <div className="thumbnail">
                  <img
                    src="/static/media/img/product-1.png"
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
                    src="/static/media/img/product-2.png"
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
                    src="/static/media/img/product-3.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
                <div className="pt-3">
                  <h3>Ergonomic Chair</h3>
                  <p>
                    Donec facilisis quam ut purus rutrum lobortis. Donec vitae
                    odio
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
      <RecentWorksApp />
    </section>
  );
};

export default HomeApp;
