import NewArrivals from "./new-arrivals/new-arrivals";
import ProductGallery from "./gallery/product-gallery";

const ProductDetails = () => {
  const features = [
    {
      title: "Free shipping",
      desc: "On orders over $50",
      bg: "bg-light",
    },
    {
      title: "Easy returns",
      desc: "Just phone number",
      bg: "bg-light",
    },
    {
      title: "Nationwide delivery",
      desc: "Fast delivery",
      bg: "bg-light",
    },
    {
      title: "Refund policy",
      desc: "60 days return",
      bg: "bg-light",
    },
  ];

  return (
    <div className="product-details-app container py-5">
      <div className="row">
        <div className="col-sm-6">
          <ProductGallery />
        </div>
        <div className="col-sm-6">
          <div>
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="breadcrumb small mb-2">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/collections/jackets">Jackets</a>
                </li>
                <li className="breadcrumb-item active">Silk Midi Dress</li>
              </ol>
            </nav>

            {/* Title */}
            <h1 className="h3 fw-semibold">Silk Midi Dress</h1>

            {/* Price + Rating */}
            <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
              <div className="border border-success rounded px-3 py-1 fw-semibold text-success fs-5">
                $120.00
              </div>

              <div className="text-warning small d-flex align-items-center gap-1">
                ⭐ 4.7
                <span className="text-muted">· 95 reviews</span>
              </div>

              <div className="text-success small fw-medium">✔ In Stock</div>
            </div>

            <hr className="my-4" />

            {/* FORM */}
            <form>
              {/* COLOR */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Color</label>

                <div className="d-flex gap-2">
                  {["#2E8B57", "#F4D03F", "#000080", "#FF7F50"].map(
                    (color, i) => (
                      <div
                        key={i}
                        className="rounded-circle border"
                        style={{
                          width: "36px",
                          height: "36px",
                          backgroundColor: color,
                          cursor: "pointer",
                        }}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* SIZE */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="form-label fw-semibold mb-0">Size</label>
                  <a
                    href="#"
                    className="small text-primary text-decoration-none"
                  >
                    See sizing chart
                  </a>
                </div>

                <div className="d-flex flex-wrap gap-2 mt-2">
                  {["XS", "S", "M", "L"].map((size, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`btn btn-sm px-3 py-2 border ${
                        size === "XS"
                          ? "btn-dark text-white"
                          : "btn-outline-dark"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY + ADD TO CART */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="input-group" style={{ maxWidth: "140px" }}>
                  <button className="btn btn-outline-secondary" type="button">
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value="1"
                    readOnly
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    +
                  </button>
                </div>

                <button className="btn btn-dark flex-grow-1 py-2">
                  🛒 Add to cart
                </button>
              </div>
            </form>

            {/* ACCORDIONS */}
            <div className="accordion" id="productAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#desc"
                  >
                    Description
                  </button>
                </h2>
                <div
                  id="desc"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#productAccordion"
                >
                  <div className="accordion-body small text-muted">
                    Fashion is a form of self-expression and autonomy...
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#fabric"
                  >
                    Fabric + Care
                  </button>
                </h2>
                <div id="fabric" className="accordion-collapse collapse">
                  <div className="accordion-body small text-muted">
                    <ul className="mb-0">
                      <li>Made from premium micromesh</li>
                      <li>74% Polyamide, 26% Elastane</li>
                      <li>Hand wash cold</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* FEATURE BOXES */}
            <div className="row g-3 mt-4">
              {features.map((item, i) => (
                <div key={i} className="col-12 col-sm-6">
                  <div className={`p-3 rounded ${item.bg} h-100`}>
                    <h6 className="fw-semibold mb-1">{item.title}</h6>
                    <p className="small text-muted mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="">
          <p>
            The patented eighteen-inch hardwood Arrowhead deck --- finely
            mortised in, makes this the strongest and most rigid canoe ever
            built. You cannot buy a canoe that will afford greater satisfaction.
          </p>
          <p>
            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
            1922. Wickett had previously worked for the Old Town Canoe Co from
            1900 to 1914. Manufacturing of the classic wooden canoes in Valley
            Park, Missouri ceased in 1978.
          </p>
          <ul>
            <li>Regular fit, mid-weight t-shirt</li>
            <li>Natural color, 100% premium combed organic cotton</li>
            <li>
              Quality cotton grown without the use of herbicides or pesticides -
              GOTS certified
            </li>
            <li>Soft touch water based printed in the USA</li>
          </ul>
        </div>
      </div>

      <div className="row mt-5">
        <NewArrivals />
      </div>
    </div>
  );
};

export default ProductDetails;
