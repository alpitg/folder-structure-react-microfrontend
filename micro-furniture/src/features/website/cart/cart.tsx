import "./cart.scss";

import {
  clearBag,
  decreaseBagItemQuantity,
  increaseBagItemQuantity,
  removeBagItem,
} from "../../../app/redux/core/shopping-bag/shopping-bag.slice";
import { useDispatch, useSelector } from "react-redux";

import type { AppState } from "../../../app/store";
import EmptyCartApp from "./empty-cart/empty-cart";
import { GetEnvConfig } from "../../../app.config";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";

const CartApp = () => {
  const appSettings = GetEnvConfig();
  const dispatch = useDispatch();
  const items = useSelector((state: AppState) => state.core.shoppingBag.items);

  const increase = (id: number) => {
    dispatch(increaseBagItemQuantity(id));
  };

  const decrease = (id: number) => {
    dispatch(decreaseBagItemQuantity(id));
  };

  const remove = (id: number) => {
    dispatch(removeBagItem(id));
  };

  const clearCart = () => dispatch(clearBag());
  const paymentOptions = appSettings?.cartPage?.pay?.options ?? [];

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePaymentOption = (option: any) => {
    if (!option) return;

    const upi = option?.upi?.trim();

    if (upi) {
      const deepLink = `upi://pay?pa=${encodeURIComponent(upi)}&pn=${encodeURIComponent(appSettings?.name || "Artisan Studio")}&tn=${encodeURIComponent("Cart Payment")}`;

      window.location.href = deepLink;
      window.setTimeout(() => {
        if (option?.link) {
          window.open(option.link, "_blank", "noopener,noreferrer");
        }
      }, 500);

      return;
    }

    if (option?.link) {
      window.open(option.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    const message = [
      "Hello! I would like to place an order for the following items:",
      ...items.map(
        (item) =>
          `- ${item.name} x${item.quantity} @ ₹${item.price.toFixed(2)} each = ₹${(item.price * item.quantity).toFixed(2)}`,
      ),
      "",
      `Subtotal: ₹${subtotal.toFixed(2)}`,
    ].join("\n");

    const whatsappNumber =
      appSettings?.homePage?.contactDetails?.whatsapp?.number;
    const whatsappUrl = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="cart-app py-5">
      {items?.length === 0 ? (
        <EmptyCartApp />
      ) : (
        <div className="container">
          <div className="table-responsive">
            <table className="table align-middle cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-image me-3"
                        />

                        <h6 className="mb-0 fw-medium">{item.name}</h6>
                      </div>
                    </td>

                    <td>₹{item.price.toFixed(2)}</td>

                    <td>
                      <div className="quantity-box">
                        <button
                          className="btn-qty"
                          onClick={() => decrease(item.id)}
                        >
                          -
                        </button>

                        <input readOnly value={item.quantity} />

                        <button
                          className="btn-qty"
                          onClick={() => increase(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>

                    <td className="text-end">
                      {/* <button
                      className="btn btn-link text-dark p-0"
                      onClick={() => remove(item.id)}
                    >
                      ✕
                    </button> */}

                      <i
                        className="bi bi-x-lg text-dark ms-2 cursor-pointer"
                        onClick={() => remove(item.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between flex-wrap gap-3 mt-5">
            <NavLink
              className="btn btn-dark px-4"
              to={ROUTE_URL.WEBSITE.PRODUCTS}
            >
              ← Continue Shopping
            </NavLink>

            <button className="btn btn-outline-dark px-4" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="row mt-5 gy-4">
            <div className="col-lg-6">
              {/* <h5 className="mb-4">Coupon Discount</h5>

              <p className="text-muted">
                Enter your coupon code if you have one.
              </p>

              <input className="form-control" placeholder="Coupon code" />

              <button className="btn btn-outline-dark mt-4 px-4">
                Apply Coupon
              </button> */}
            </div>

            <div className="col-lg-6">
              <div className="cart-summary ms-lg-auto">
                <div className="d-flex justify-content-between border-bottom pb-3">
                  <strong>Subtotal</strong>

                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between pt-3">
                  <strong>Total</strong>

                  <strong>₹{subtotal.toFixed(2)}</strong>
                </div>

                <button
                  className="btn btn-dark w-100 mt-4 mb-5"
                  onClick={handleCheckout}
                >
                  Send Enquiry by WhatsApp
                </button>

                {/* <div className="mt-4">
                  <h6 className="fw-semibold mb-3">
                    {appSettings?.cartPage?.pay?.title || "Proceed to Payment"}
                  </h6>

                  <p className="text-muted small mb-3">
                    {appSettings?.cartPage?.pay?.description ||
                      "Choose a payment option to continue."}
                  </p>

                  <div className="d-flex flex-wrap gap-3">
                    {paymentOptions.map((option: any) => (
                      <button
                        key={option?.method}
                        className="btn btn-outline-dark payment-option-btn"
                        onClick={() => handlePaymentOption(option)}
                      >
                        {option?.icon ? (
                          <img
                            src={option.icon}
                            alt={option.method}
                            className="payment-option-icon"
                          />
                        ) : null}
                        <span>{option?.method}</span>
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartApp;
