import "./new-arrivals.scss";

const products = [
  {
    id: 1,
    title: "Nordic Chair",
    price: 50,
    image: "/static/media/img/product-1.png",
    link: "/cart",
    subtitle: "Minimal Scandinavian design",
    isNewArrival: true,
    rating: 4.5,
    reviews: 87,
  },
  {
    id: 2,
    title: "Kruzo Aero Chair",
    price: 78,
    image: "/static/media/img/product-2.png",
    link: "/cart",
    subtitle: "Lightweight ergonomic build",
    isNewArrival: false,
    rating: 4.2,
    reviews: 54,
  },
  {
    id: 3,
    title: "Kruzo Aero Chair",
    price: 78,
    image: "/static/media/img/product-2.png",
    link: "/cart",
    subtitle: "Lightweight ergonomic build",
    isNewArrival: false,
    rating: 4.2,
    reviews: 54,
  },
  {
    id: 4,
    title: "Kruzo Aero Chair",
    price: 78,
    image: "/static/media/img/product-2.png",
    link: "/cart",
    subtitle: "Lightweight ergonomic build",
    isNewArrival: false,
    rating: 4.2,
    reviews: 54,
  },
  {
    id: 5,
    title: "Kruzo Aero Chair",
    price: 78,
    image: "/static/media/img/product-2.png",
    link: "/cart",
    subtitle: "Lightweight ergonomic build",
    isNewArrival: false,
    rating: 4.2,
    reviews: 54,
  },
];

const NewArrivals = () => {
  return (
    <section className="new-arrivals-app container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-12">
          <p className="fw-bold fs-1 mb-0">
            Discover more.
            <span className="text-muted ms-2">
              Good things are waiting for you
            </span>
          </p>
        </div>
      </div>

      <div className="product-carousel-wrapper position-relative">
        <div className="product-carousel d-flex gap-4 overflow-auto pb-3">
          {products.map((p) => (
            <div key={p.id} className="product-slide flex-shrink-0">
              <div className="product-card card border-0 shadow-sm h-100 position-relative overflow-hidden">
                {/* IMAGE */}
                <div className="product-img position-relative overflow-hidden">
                  <img src={p.image} alt={p.title} className="product-image" />

                  {p.isNewArrival && (
                    <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2 shadow-sm">
                      New
                    </span>
                  )}

                  {/* HOVER ACTION */}
                  <div className="product-actions">
                    <button className="btn btn-dark btn-sm rounded-pill px-3">
                      <i className="bi bi-cart me-1"></i>
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="card-body">
                  <h6 className="fw-semibold mb-1">{p.title}</h6>
                  <p className="text-muted small mb-2">{p.subtitle}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-success">${p.price}</span>

                    <small className="text-muted">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      {p.rating} ({p.reviews})
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
