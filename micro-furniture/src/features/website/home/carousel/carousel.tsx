import "./carousel.scss";

import { GetEnvConfig } from "../../../../app.config";

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
    image: "/static/media/img/product-3.png",
  },
  {
    id: 4,
    image: "/static/media/img/product-4.png",
  },
];

const CarouselApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <section className="luxury-carousel py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* LEFT CONTENT */}
          <div className="col-lg-5">
            <div className="luxury-content">
              <span className="premium-badge">
                <i className="bi bi-stars me-2"></i>
                Premium Furniture
              </span>

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
          <div className="col-lg-7">
            <div className="orbit-wrapper">
              <div className="orbit-circle"></div>

              <div className="orbit">
                {products.map((item, index) => (
                  <div
                    key={item.id}
                    className={`orbit-item orbit-${index + 1}`}
                  >
                    <img src={item.image} alt="Luxury furniture" />
                  </div>
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
