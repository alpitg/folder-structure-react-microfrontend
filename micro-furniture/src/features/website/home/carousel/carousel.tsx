import "./carousel.scss";

import { GetEnvConfig } from "../../../../app.config";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";

const products = [
  {
    id: 1,
    image: "/static/media/img/product-1.png",
  },
  {
    id: 2,
    image: "/static/media/img/product-2.png",
  },
  {
    id: 3,
    image: "/static/media/img/furniture/category/chests-of-drawers.png",
  },
  {
    id: 4,
    image: "/static/media/img/product-4.png",
  },
  {
    id: 5,
    image: "/static/media/img/furniture/category/sofas.png",
  },
];

const CarouselApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <section className="luxury-carousel py-5">
      <div className="container mt-10">
        <div className="row align-items-center g-5">
          {/* LEFT CONTENT */}
          <div className="col-lg-5">
            <div className="luxury-content">
              <h1 className="display-4 fw-bold mt-4">
                {appSettings?.homePage?.title}
              </h1>

              <p className="text-muted mt-4 fs-5">
                {appSettings?.homePage?.description}
              </p>

              <a
                className="btn btn-dark rounded-pill px-4 py-3 mt-3 luxury-btn"
                href={`https://wa.me/${appSettings?.homePage?.contactDetails?.whatsapp?.number}?text=${appSettings?.homePage?.contactDetails?.whatsapp?.message}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="me-2">Contact us</span>
                <i className="bi bi-whatsapp me-2"></i>
                {appSettings?.homePage?.contactDetails?.contactnumber}
              </a>

              <h2 className="floating-text">Luxury</h2>
            </div>
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="col-lg-7 d-none d-lg-block">
            <div className="orbit-wrapper">
              <div className="orbit-circle"></div>

              <div className="orbit">
                {products.map((item, index) => (
                  <NavLink
                    key={item.id}
                    className={`orbit-item orbit-${index + 1}`}
                    to={ROUTE_URL.WEBSITE.PRODUCTS}
                  >
                    <img src={item.image} alt="Luxury furniture" />
                  </NavLink>
                ))}
              </div>

              <div className="center-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselApp;
