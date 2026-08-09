import "./cart.scss";

import { NavLink, useNavigate } from "react-router";
import {
  clearBag,
  decreaseBagItemQuantity,
  increaseBagItemQuantity,
  removeBagItem,
} from "../../../app/redux/core/shopping-bag/shopping-bag.slice";
import {
  useCreateWebsiteOrderMutation,
  useVerifyWebsitePaymentMutation,
} from "../../../app/redux/website/order/website-order.api";
import { useDispatch, useSelector } from "react-redux";

import type { AppState } from "../../../app/store";
import EmptyCartApp from "./empty-cart/empty-cart";
import { GetEnvConfig } from "../../../app.config";
import { ROUTE_URL } from "../../../routes/constants/routes.const";

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: any) => void) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const CartApp = () => {
  //#region variables

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appSettings = GetEnvConfig();

  const items = useSelector((state: AppState) => state.core.shoppingBag.items);

  const [
    createWebsiteOrder,
    { isLoading: isCreatingOrder, error: createOrderError },
  ] = useCreateWebsiteOrderMutation();

  const [
    verifyWebsitePayment,
    { isLoading: isVerifyingPayment, error: verifyPaymentError },
  ] = useVerifyWebsitePaymentMutation();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const increase = (id: string) => {
    dispatch(increaseBagItemQuantity(id));
  };

  const decrease = (id: string) => {
    dispatch(decreaseBagItemQuantity(id));
  };

  const remove = (id: string) => {
    dispatch(removeBagItem(id));
  };

  const clearCart = () => {
    dispatch(clearBag());
  };

  const handleEnquiry = () => {
    if (items.length === 0) return;

    const frontUrl = window.location.origin;

    const message = [
      "Hello! I would like to place an order for the following items:",
      ...items.map(
        (item) =>
          `- ${item.name} x${item.quantity} @ ₹ ${item.price.toFixed(2)} each = ₹ ${(item.price * item.quantity).toFixed(2)}\n  ${frontUrl}/products/${item.id}`,
      ),
      "",
      `Subtotal: ₹ ${subtotal.toFixed(2)}`,
    ].join("\n");

    const whatsappNumber =
      appSettings?.homePage?.contactDetails?.whatsapp?.number;

    const whatsappUrl = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(true));
        existingScript.addEventListener("error", () => resolve(false));

        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      return;
    }

    try {
      // --------------------------------------------------
      // STEP 1: Load Razorpay
      // --------------------------------------------------

      if (appSettings?.cartPage?.disablePayment) {
        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
          alert("Unable to load payment gateway. Please try again.");

          return;
        }
      }

      // --------------------------------------------------
      // STEP 2: Prepare order payload
      // --------------------------------------------------

      const payload = {
        customerName: "Naru",
        customerId: null,
        items: items.map((item) => ({
          productId: item.id,
          productType: "physical",
          quantity: item.quantity,
          customizedDetails: undefined,
        })),
        miscCharges: [],
        note: "Website order",
        likelyDateOfDelivery: null,
      };

      // --------------------------------------------------
      // STEP 3: Create website order
      // --------------------------------------------------

      const result = await createWebsiteOrder(payload).unwrap();

      if (!result?.payment) {
        throw new Error("Payment information was not returned.");
      }

      if (appSettings?.cartPage?.disablePayment) {
        const payment = result.payment;

        if (!payment.keyId || !payment.razorpayOrderId) {
          throw new Error("Razorpay order was not created.");
        }

        // --------------------------------------------------
        // STEP 4: Open Razorpay Checkout
        // --------------------------------------------------

        const order = result.order as {
          id?: string;
          orderCode?: string;
          customerName?: string;
        };

        const options: RazorpayOptions = {
          key: payment.keyId,
          amount: payment.amount,
          currency: payment.currency,
          name: "Artisan Studios",
          description: `Order ${order.orderCode || ""}`,
          order_id: payment.razorpayOrderId,

          handler: async (response: RazorpayResponse) => {
            // ----------------------------------------------
            // STEP 5: Verify payment on backend
            // ----------------------------------------------

            try {
              if (!order.id) {
                throw new Error("Order ID is missing.");
              }

              await verifyWebsitePayment({
                orderId: order.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }).unwrap();

              // --------------------------------------------
              // STEP 6: Payment verified
              // --------------------------------------------

              dispatch(clearBag());

              // --------------------------------------------
              // STEP 7: Navigate to success page
              // --------------------------------------------

              navigate(
                `${ROUTE_URL.WEBSITE.ORDER_SUCCESS}?orderId=${order.id}`,
              );
            } catch (error) {
              console.error("Payment verification failed:", error);

              alert(
                "Payment was received, but we could not verify it yet. Please contact support.",
              );
            }
          },

          prefill: {
            name: order.customerName || "Customer",
          },

          theme: {
            color: "#ff3f6c",
          },

          modal: {
            ondismiss: () => {
              console.log("Razorpay checkout closed");
            },
          },
        };

        // --------------------------------------------------
        // STEP 8: Create Razorpay instance
        // --------------------------------------------------

        const razorpay = new window.Razorpay(options);

        // --------------------------------------------------
        // Payment failure
        // --------------------------------------------------

        razorpay.on("payment.failed", (response: any) => {
          console.error("Razorpay payment failed:", response);

          const errorMessage =
            response?.error?.description || "Payment failed. Please try again.";

          alert(errorMessage);
        });

        // --------------------------------------------------
        // Open Razorpay
        // --------------------------------------------------

        razorpay.open();
      }
    } catch (error: any) {
      console.error("Checkout initialization failed:", error);

      const message =
        error?.data?.detail ||
        error?.data?.message ||
        error?.message ||
        "Unable to start checkout. Please try again.";

      alert(message);
    }
  };

  const isProcessing = isCreatingOrder || isVerifyingPayment;

  const errorMessage =
    (createOrderError as any)?.data?.detail ||
    (createOrderError as any)?.data?.message ||
    (verifyPaymentError as any)?.data?.detail ||
    (verifyPaymentError as any)?.data?.message ||
    null;

  //#endregion

  return (
    <section className="cart-app">
      {items?.length === 0 ? (
        <EmptyCartApp />
      ) : (
        <div className="cart-page">
          <div className="container">
            {/* -------------------------------------------- */}
            {/* CART HEADER */}
            {/* -------------------------------------------- */}

            <div className="cart-page-header">
              <h4>
                Shopping Bag
                <span>({items.length} Items)</span>
              </h4>
            </div>

            <div className="row g-4">
              {/* -------------------------------------------- */}
              {/* CART ITEMS */}
              {/* -------------------------------------------- */}

              <div className="col-lg-8">
                <div className="cart-items">
                  {items.map((item) => (
                    <div className="cart-item" key={item.id}>
                      {/* Product Image */}

                      <NavLink
                        to={`/products/${item.id}`}
                        className="cart-item-image-link"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-image"
                        />
                      </NavLink>

                      {/* Product Details */}

                      <div className="cart-item-details">
                        <div className="cart-item-heading">
                          <div>
                            <NavLink
                              to={`/products/${item.id}`}
                              className="cart-product-name"
                            >
                              {item.name}
                            </NavLink>

                            <p className="cart-product-description">
                              Regular fit • Casual wear
                            </p>
                          </div>

                          <button
                            type="button"
                            className="remove-item"
                            onClick={() => remove(item.id)}
                            disabled={isProcessing}
                            aria-label={`Remove ${item.name}`}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>

                        {/* Price */}

                        <div className="cart-price">
                          <span className="current-price">
                            ₹{item.price.toFixed(0)}
                          </span>

                          <span className="original-price">
                            ₹{(item.price * 1.25).toFixed(0)}
                          </span>

                          <span className="discount">20% OFF</span>
                        </div>

                        {/* Quantity */}

                        <div className="cart-item-bottom">
                          <div className="quantity-box">
                            <button
                              type="button"
                              className="btn-qty"
                              onClick={() => decrease(item.id)}
                              disabled={isProcessing}
                            >
                              -
                            </button>

                            <input
                              readOnly
                              value={item.quantity}
                              aria-label="Quantity"
                            />

                            <button
                              type="button"
                              className="btn-qty"
                              onClick={() => increase(item.id)}
                              disabled={isProcessing}
                            >
                              +
                            </button>
                          </div>

                          <div className="item-total">
                            ₹{(item.price * item.quantity).toFixed(0)}
                          </div>
                        </div>

                        {/* Delivery */}

                        <div className="delivery-info">
                          <i className="bi bi-truck"></i>

                          <span>Delivery available to your location</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping */}

                <div className="cart-actions d-flex gap-5">
                  <NavLink
                    className="continue-shopping"
                    to={ROUTE_URL.WEBSITE.PRODUCTS}
                  >
                    <i className="bi bi-arrow-left"></i>
                    Continue Shopping
                  </NavLink>

                  <button
                    type="button"
                    className="btn btn-secondary clear-cart"
                    onClick={clearCart}
                    disabled={isProcessing}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* -------------------------------------------- */}
              {/* PRICE DETAILS */}
              {/* -------------------------------------------- */}

              <div className="col-lg-4">
                <div className="price-details">
                  <h6 className="price-details-title">PRICE DETAILS</h6>

                  <div className="price-row">
                    <span>Total MRP</span>

                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>

                  <div className="price-row">
                    <span>Discount on MRP</span>

                    <span className="discount-value">- ₹0</span>
                  </div>

                  <div className="price-row">
                    <span>Platform Fee</span>

                    <span>₹0</span>
                  </div>

                  <div className="price-row">
                    <span>Shipping Fee</span>

                    <span className="free">FREE</span>
                  </div>

                  <div className="price-divider"></div>

                  <div className="price-total">
                    <span>Total Amount</span>

                    <span>₹{subtotal.toFixed(0)}</span>
                  </div>

                  <button
                    type="button"
                    className="place-order-btn"
                    onClick={handleCheckout}
                    disabled={isProcessing || items.length === 0}
                  >
                    {isCreatingOrder
                      ? "CREATING ORDER..."
                      : isVerifyingPayment
                        ? "VERIFYING PAYMENT..."
                        : "PLACE ORDER"}
                  </button>

                  <div className="secure-payment">
                    <i className="bi bi-shield-check"></i>

                    <span>
                      Safe and Secure Payments. 100% Authentic Products.
                    </span>
                  </div>

                  <div>
                    <div className="account-divider">
                      <span>OR</span>
                    </div>
                    <button
                      className="btn btn-dark w-100 mt-4 mb-5"
                      onClick={handleEnquiry}
                    >
                      Send Enquiry by WhatsApp
                      <i className="bi bi-whatsapp ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------- */}
            {/* ERROR */}
            {/* -------------------------------------------- */}

            {errorMessage && (
              <div className="alert alert-danger mt-4">{errorMessage}</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CartApp;
