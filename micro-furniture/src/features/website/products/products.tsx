import "./products.scss";

import { useNavigate } from "react-router";

const products = [
  {
    id: 1,
    title: "Nordic Chair",
    price: 50,
    image: "/static/media/img/product-1.png",
    link: "/cart",
    category: "furniture",
    rating: 4.5,
    reviews: 87,
    subtitle: "Minimal Scandinavian design",
    isNewArrival: true,
    colors: ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  },
  {
    id: 2,
    title: "Kruzo Aero Chair",
    price: 78,
    image: "/static/media/img/product-2.png",
    link: "/cart",
    category: "furniture",
    rating: 4.2,
    reviews: 54,
    isNewArrival: false,
    subtitle: "Lightweight ergonomic build",
  },
  {
    id: 3,
    title: "Ergonomic Chair",
    price: 43,
    image: "/static/media/img/product-3.png",
    link: "/cart",
    category: "furniture",
    rating: 4.6,
    reviews: 102,
    isNewArrival: true,
    subtitle: "Comfort-focused seating",
  },
  {
    id: 4,
    title: "Modern Wooden Chair",
    price: 65,
    image: "/static/media/img/product-1.png",
    link: "/cart",
    category: "furniture",
    rating: 4.3,
    reviews: 61,
    isNewArrival: false,
    subtitle: "Premium wood finish",
  },
  {
    id: 5,
    title: "Ergonomic Chair Pro",
    price: 43,
    image: "/static/media/img/product-3.png",
    link: "/cart",
    category: "furniture",
    rating: 4.1,
    reviews: 39,
    isNewArrival: false,
    subtitle: "Advanced lumbar support",
  },
  {
    id: 6,
    title: "Modern Wooden Chair",
    price: 65,
    image: "/static/media/img/product-1.png",
    link: "/cart",
    category: "furniture",
    rating: 4.0,
    reviews: 28,
    isNewArrival: false,
    subtitle: "Natural oak finish",
  },
  {
    id: 7,
    title: "Classic Wooden Chair",
    price: 65,
    image: "/static/media/img/product-1.png",
    link: "/cart",
    category: "furniture",
    rating: 4.4,
    reviews: 72,
    isNewArrival: false,
    subtitle: "Timeless design",
  },
  {
    id: 8,
    title: "Ergonomic Office Chair",
    price: 43,
    image: "/static/media/img/product-3.png",
    link: "/cart",
    category: "furniture",
    rating: 4.7,
    reviews: 118,
    isNewArrival: false,
    subtitle: "Best for long hours",
  },
  {
    id: 9,
    title: "Nordic Lounge Chair",
    price: 50,
    image: "/static/media/img/product-1.png",
    link: "/cart",
    category: "furniture",
    rating: 4.5,
    reviews: 90,
    isNewArrival: true,
    subtitle: "Relaxed seating comfort",
  },
  {
    id: 10,
    title: "Ergonomic Mesh Chair",
    price: 43,
    image: "/static/media/img/product-3.png",
    link: "/cart",
    category: "furniture",
    rating: 4.2,
    reviews: 64,
    isNewArrival: false,
    subtitle: "Breathable mesh support",
  },
  {
    id: 11,
    title: "Modern Pine Chair",
    price: 65,
    image: "/static/media/img/product-1.png",
    link: "/cart",
    category: "furniture",
    rating: 4.3,
    reviews: 58,
    isNewArrival: true,
    subtitle: "Solid pine wood build",
  },
];

const Products = () => {
  const route = useNavigate();

  const handleQuickView = () => {
    // Implement quick view functionality here
    route("/products/1"); // Navigate to the product details page for product with id 1
  };

  return (
    <section className="products-app container py-5">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-4 p-3">
            <div className="product-card position-relative d-flex flex-column">
              {/* KEEP BOOTSTRAP STRETCHED LINK */}
              <a href={product.link} className="stretched-link"></a>

              <div className="product-img position-relative overflow-hidden rounded-4 p-6">
                <a href={product.link} className="d-block">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid w-100 product-image"
                  />
                </a>

                {product.isNewArrival && (
                  <div className="badge">
                    <span>
                      <i className="bi bi-stars me-1"></i>
                    </span>
                    <span className="fw-semibold me-1">New in</span>
                  </div>
                )}
                {/* 
               

                {/* Hover actions */}
                <div className="product-actions d-flex gap-2">
                  <button className="btn btn-dark btn-sm rounded-pill shadow px-3">
                    <i className="bi bi-cart"></i> Add to bag
                  </button>
                  <button
                    className="btn btn-light btn-sm rounded-pill shadow px-3"
                    onClick={() => handleQuickView()}
                  >
                    <i className="bi bi-arrows-fullscreen"></i> Quick view
                  </button>
                </div>
              </div>

              <div className="product-content px-2 pt-3 pb-2">
                <h6 className="fw-semibold mb-1">{product.title}</h6>
                <p className="text-muted small mb-2">{product.subtitle}</p>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="price">
                    <i className="bi bi-currency-rupee"></i>
                    {product.price}
                  </div>
                  <div className="small text-muted">
                    <i className="bi bi-star-fill text-warning me-2"></i>
                    {product.rating} ({product.reviews})
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
