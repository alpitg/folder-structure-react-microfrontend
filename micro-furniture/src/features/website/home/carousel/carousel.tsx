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
    <section className="luxury-carousel container py-5">
      <div className="row align-items-center">
        {/* LEFT CONTENT */}

        <div className="col-lg-5 mb-5 mb-lg-0">
          <span className="badge bg-light rounded-pill px-3 py-2">
            <i className="bi bi-stars me-2"></i>
            Premium Furniture
          </span>
          <h1 className="display-4 fw-bold mt-3">Crafted Luxury Furniture</h1>
          <p className="text-muted mt-4">
            Elegant furniture designed with timeless craftsmanship, luxurious
            materials and modern aesthetics.
          </p>

          <a
            className="btn btn-dark rounded-pill px-4 mt-3"
            href={
              `https://wa.me/${appSettings?.homePage?.contactDetails?.whatsapp?.number}?text=` +
              appSettings?.homePage?.contactDetails?.whatsapp?.message
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="me-2"> Contact us: </span>
            <span className="bi bi-whatsapp me-2" />
            {appSettings?.homePage?.contactDetails?.contactnumber}
          </a>
          <h2 className="floating-text">Luxury</h2>
        </div>

        {/* RIGHT */}

        <div className="col-lg-7">
          <div className="orbit">
            {products.map((item, index) => (
              <div key={item.id} className={`orbit-item orbit-${index + 1}`}>
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselApp;
