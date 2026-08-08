import "./order-success.scss";

import { useNavigate, useSearchParams } from "react-router";

const OrderSuccessApp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  return (
    <section className="order-success-section bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="order-success-card bg-white text-center rounded-3 p-4 p-md-5">
              {/* Success Icon */}
              <div className="success-icon mx-auto mb-4 d-flex align-items-center justify-content-center rounded-circle">
                <i className="bi bi-check-lg" />
              </div>

              {/* Heading */}
              <h2 className="fw-semibold mb-2">Order placed successfully!</h2>

              <p className="text-muted mb-4">
                Your order has been confirmed and will be processed shortly.
              </p>

              {/* Order Details */}
              {orderId && (
                <div className="order-id-box border rounded-2 bg-light px-3 py-3 mb-4">
                  <div className="small text-muted mb-1">ORDER ID</div>

                  <div className="fw-semibold text-break">{orderId}</div>
                </div>
              )}

              {/* Delivery Message */}
              <div className="delivery-message border-top border-bottom py-3 mb-4">
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <i className="bi bi-truck" />

                  <span className="small">
                    We'll notify you when your order is shipped.
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-dark py-2"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </button>

                {orderId && (
                  <button
                    type="button"
                    className="btn btn-outline-dark py-2"
                    onClick={() => navigate(`/orders/${orderId}`)}
                  >
                    View Order
                  </button>
                )}
              </div>

              {/* Footer */}
              <p className="text-muted small mt-4 mb-0">
                Thank you for shopping with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccessApp;
