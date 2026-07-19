import "./pricing.scss";

import type { IProductData } from "../../../../store/catalog/interface/product/product.model";

const PricingApp = ({ product }: { product?: IProductData }) => {
  return (
    <div className="pricing-app">
      <div className="d-flex flex-wrap align-items-center gap-3">
        <div className="deal-price-box">
          <div className="deal-content">
            <h2 className="deal-title">Today's Deal Price</h2>

            <div className="price-section">
              <div className="selling-price">
                ₹{(product?.price?.sellingPrice ?? 0).toLocaleString("en-IN")}
              </div>

              <span className="d-flex align-items-center">
                <div className="mrp-section me-2">
                  <span>MRP</span>
                  <span className="mrp-price">
                    ₹ {product?.price?.basePrice ?? 0}
                  </span>
                </div>

                <div className="discount">
                  ({product?.price?.discount?.value ?? 0}% OFF)
                </div>
              </span>
            </div>

            <div className="tax-info">
              Inclusive of all taxes (Prices as per revised GST rates on
              applicable products)
            </div>

            <div id="razorpay-affordability-widget"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingApp;
