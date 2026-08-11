import "./cart.scss";

import { NavLink, useNavigate } from "react-router";
import {
  useClearWebsiteCartMutation,
  useGetWebsiteCartQuery,
  useRemoveWebsiteCartItemMutation,
  useUpdateWebsiteCartItemMutation,
} from "../../../app/redux/website/cart/cart.api";
import {
  useCreateWebsiteOrderMutation,
  useVerifyWebsitePaymentMutation,
} from "../../../app/redux/website/order/website-order.api";

import EmptyCartApp from "./empty-cart/empty-cart";
import { GetEnvConfig } from "../../../app.config";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import UserLoginApp from "../login/user-login";
import { useState } from "react";

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

const GUEST_CART_ID_KEY = "website_guest_cart_id";

const CartApp = () => {
  //#region Variables

  const navigate = useNavigate();
  const appSettings = GetEnvConfig();
  const [isOpen, setIsOpen] = useState(false);

  // --------------------------------------------------
  // GUEST CART ID
  // --------------------------------------------------

  const guestCartId = localStorage.getItem(GUEST_CART_ID_KEY);

  // --------------------------------------------------
  // CART API
  // --------------------------------------------------

  const {
    data: cart,
    isLoading: isCartLoading,
    error: cartError,
  } = useGetWebsiteCartQuery(
    {
      guestCartId,
    },
    {
      skip: !guestCartId,
    },
  );

  const [
    updateWebsiteCartItem,
    { isLoading: isUpdatingItem, error: updateItemError },
  ] = useUpdateWebsiteCartItemMutation();

  const [
    removeWebsiteCartItem,
    { isLoading: isRemovingItem, error: removeItemError },
  ] = useRemoveWebsiteCartItemMutation();

  const [
    clearWebsiteCart,
    { isLoading: isClearingCart, error: clearCartError },
  ] = useClearWebsiteCartMutation();

  // --------------------------------------------------
  // ORDER API
  // --------------------------------------------------

  const [
    createWebsiteOrder,
    { isLoading: isCreatingOrder, error: createOrderError },
  ] = useCreateWebsiteOrderMutation();

  const [
    verifyWebsitePayment,
    { isLoading: isVerifyingPayment, error: verifyPaymentError },
  ] = useVerifyWebsitePaymentMutation();

  // --------------------------------------------------
  // SERVER CART
  // --------------------------------------------------

  const items = cart?.items ?? [];

  const summary = cart?.summary;

  //#endregion

  //#region Cart Actions

  const increase = async (productId: string) => {
    const item = items.find((item) => item.productId === productId);

    if (!item || !guestCartId) {
      return;
    }

    try {
      await updateWebsiteCartItem({
        guestCartId,
        productId,
        quantity: item.quantity + 1,
        customizedDetails: item.customizedDetails,
      }).unwrap();
    } catch (error) {
      console.error("Unable to increase cart quantity:", error);
    }
  };

  const decrease = async (productId: string) => {
    const item = items.find((item) => item.productId === productId);

    if (!item || !guestCartId) {
      return;
    }

    if (item.quantity <= 1) {
      return;
    }

    try {
      await updateWebsiteCartItem({
        guestCartId,
        productId,
        quantity: item.quantity - 1,
        customizedDetails: item.customizedDetails,
      }).unwrap();
    } catch (error) {
      console.error("Unable to decrease cart quantity:", error);
    }
  };

  const remove = async (productId: string) => {
    if (!guestCartId) {
      return;
    }

    try {
      await removeWebsiteCartItem({
        guestCartId,
        productId,
      }).unwrap();
    } catch (error) {
      console.error("Unable to remove cart item:", error);
    }
  };

  const clearCart = async () => {
    if (!guestCartId) {
      return;
    }

    try {
      await clearWebsiteCart({
        guestCartId,
      }).unwrap();
    } catch (error) {
      console.error("Unable to clear cart:", error);
    }
  };

  //#endregion

  //#region WhatsApp Enquiry

  const handleEnquiry = () => {
    if (items.length === 0) {
      return;
    }

    const frontUrl = window.location.origin;

    const message = [
      "Hello! I would like to place an order for the following items:",

      ...items.map(
        (item) =>
          `- ${item.name} x${item.quantity} @ ₹ ${item.price.sellingPrice.toFixed(
            2,
          )} each = ₹ ${item.itemTotal.toFixed(
            2,
          )}\n  ${frontUrl}/products/${item.productId}`,
      ),

      "",

      `Subtotal: ₹ ${(summary?.subtotal ?? 0).toFixed(2)}`,
      `Discount: ₹ ${(summary?.discount ?? 0).toFixed(2)}`,
      `Tax: ₹ ${(summary?.taxToAdd ?? 0).toFixed(2)}`,
      `Shipping: ₹ ${(summary?.shipping ?? 0).toFixed(2)}`,
      `Total: ₹ ${(summary?.grandTotal ?? 0).toFixed(2)}`,
    ].join("\n");

    const whatsappNumber =
      appSettings?.homePage?.contactDetails?.whatsapp?.number;

    const whatsappUrl = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  //#endregion

  //#region Razorpay

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

  //#endregion

  //#region Checkout

  const handleCheckout = async () => {
    if (items.length === 0) {
      return;
    }

    if (guestCartId) {
      setIsOpen(true);
      return;
    }

    try {
      // --------------------------------------------------
      // STEP 1: Load Razorpay
      // --------------------------------------------------

      if (appSettings?.cartPage?.enablePayment) {
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
        customerName: "Guest",
        customerId: null,
        guestCartId,
        items: items.map((item) => ({
          productId: item.productId,
          productType: item.productType ?? "physical",
          quantity: item.quantity,
          customizedDetails: item.customizedDetails,
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

      // --------------------------------------------------
      // STEP 4: Open Razorpay
      // --------------------------------------------------

      if (appSettings?.cartPage?.enablePayment) {
        const payment = result.payment;

        if (!payment.keyId || !payment.razorpayOrderId) {
          throw new Error("Razorpay order was not created.");
        }

        const order = result.order as {
          id?: string;
          orderCode?: string;
          customerName?: string;
          customerEmail?: string;
          customerMobile?: string;
        };

        const options: RazorpayOptions = {
          key: payment.keyId,
          amount: payment.amount,
          currency: payment.currency,
          name: appSettings?.name ?? "Artisan Studios",
          description: `Order ${order.orderCode || ""}`,
          order_id: payment.razorpayOrderId,

          handler: async (response: RazorpayResponse) => {
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

              localStorage.removeItem(GUEST_CART_ID_KEY);

              navigate(
                `${ROUTE_URL.WEBSITE.ORDER_SUCCESS}?orderId=${order.orderCode}`,
              );
            } catch (error) {
              console.error("Payment verification failed:", error);

              alert(
                "Payment was received, but we could not verify it yet. Please contact support.",
              );
            }
          },

          prefill: {
            name: order.customerName || "Guest Customer",
            email: order.customerEmail,
            contact: order.customerMobile,
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

        const razorpay = new window.Razorpay(options);

        razorpay.on("payment.failed", (response: any) => {
          console.error("Razorpay payment failed:", response);

          const errorMessage =
            response?.error?.description || "Payment failed. Please try again.";

          alert(errorMessage);
        });

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

  //#endregion

  //#region Loading / Errors

  const isProcessing =
    isUpdatingItem ||
    isRemovingItem ||
    isClearingCart ||
    isCreatingOrder ||
    isVerifyingPayment;

  const errorMessage =
    (cartError as any)?.data?.detail ||
    (cartError as any)?.data?.message ||
    (updateItemError as any)?.data?.detail ||
    (updateItemError as any)?.data?.message ||
    (removeItemError as any)?.data?.detail ||
    (removeItemError as any)?.data?.message ||
    (clearCartError as any)?.data?.detail ||
    (clearCartError as any)?.data?.message ||
    (createOrderError as any)?.data?.detail ||
    (createOrderError as any)?.data?.message ||
    (verifyPaymentError as any)?.data?.detail ||
    (verifyPaymentError as any)?.data?.message ||
    null;

  //#endregion

  // ------------------------------------------------------
  // LOADING
  // ------------------------------------------------------

  if (isCartLoading) {
    return (
      <section className="cart-page">
        <div className="container">
          <div className="text-center py-5">Loading cart...</div>
        </div>
      </section>
    );
  }

  // ------------------------------------------------------
  // EMPTY CART
  // ------------------------------------------------------

  if (items.length === 0) {
    return <EmptyCartApp />;
  }

  // ------------------------------------------------------
  // CART
  // ------------------------------------------------------

  return (
    <section className="cart-app">
      <div className="container">
        {/* -------------------------------------------- */}
        {/* CART HEADER */}
        {/* -------------------------------------------- */}

        <div className="cart-app-header">
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
                <div className="cart-item" key={item.productId}>
                  {/* Product Image */}

                  <NavLink
                    to={`/products/${item.productId}`}
                    className="cart-item-image-link"
                  >
                    <img
                      src={
                        item.image || "/static/media/img/svg/blank-image.svg"
                      }
                      alt={item.name}
                      className="cart-image"
                    />
                  </NavLink>

                  {/* Product Details */}

                  <div className="cart-item-details">
                    <div className="cart-item-heading">
                      <div>
                        <NavLink
                          to={`/products/${item.productId}`}
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
                        onClick={() => remove(item.productId)}
                        disabled={isProcessing}
                        aria-label={`Remove ${item.name}`}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>

                    {/* Price */}

                    <div className="cart-price">
                      <span className="current-price">
                        ₹{item.price.sellingPrice.toFixed(2)}
                      </span>

                      {item.price.mrp !== item.price.sellingPrice && (
                        <span className="original-price">
                          ₹{item.price.mrp.toFixed(2)}
                        </span>
                      )}

                      {item.price.discount && (
                        <span>
                          {item?.price?.discount?.type === "percentage" &&
                            item.price.discount.value != null && (
                              <span className="discount">
                                {item.price.discount.value}% OFF
                              </span>
                            )}

                          {item?.price?.discount?.type === "fixed" && (
                            <span className="discount">
                              ₹
                              {(
                                item.price.mrp - item.price.sellingPrice
                              )?.toFixed(2)}
                              <span> OFF</span>
                            </span>
                          )}
                        </span>
                      )}
                    </div>

                    {/* Quantity */}

                    <div className="cart-item-bottom">
                      <div className="quantity-box">
                        <button
                          type="button"
                          className="btn-qty"
                          onClick={() => decrease(item.productId)}
                          disabled={isProcessing || item.quantity <= 1}
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
                          onClick={() => increase(item.productId)}
                          disabled={isProcessing}
                        >
                          +
                        </button>
                      </div>

                      <div className="item-total">
                        ₹{item.itemTotal.toFixed(2)}
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
                className="btn btn-outline-secondary clear-cart"
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

                <span>₹{(summary?.mrp ?? 0).toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Discount on MRP</span>

                <span className="discount-value">
                  - ₹{(summary?.discount ?? 0).toFixed(2)}
                </span>
              </div>
              <div className="price-row">
                <span>Platform Fee</span>

                <span>₹{(summary?.miscCharges ?? 0).toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping Fee</span>

                <span className="free">
                  {(summary?.shipping ?? 0) === 0
                    ? "FREE"
                    : `₹${(summary?.shipping ?? 0).toFixed(2)}`}
                </span>
              </div>
              {/* Tax */}
              {(summary?.taxToAdd ?? 0) > 0 && (
                <div className="price-row">
                  <span>Tax</span>

                  <span>₹{(summary?.taxToAdd ?? 0).toFixed(2)}</span>
                </div>
              )}
              <div className="price-divider"></div>
              <div className="price-total">
                <span>Total Amount</span>

                <span>₹{(summary?.grandTotal ?? 0).toFixed(2)}</span>
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

                <span>Safe and Secure Payments. 100% Authentic Products.</span>
              </div>

              <div className="text-center small text-muted py-2">
                By placing the order, you agree to {appSettings?.name}'s{" "}
                <NavLink
                  to={ROUTE_URL.WEBSITE.TERMS_OF_USE}
                  className="text-decoration-none"
                  target="_blank"
                >
                  Terms of Use
                </NavLink>
                <span> and </span>
                <NavLink
                  to={ROUTE_URL.WEBSITE.PRIVACY_POLICY}
                  className="text-decoration-none"
                  target="_blank"
                >
                  Privacy Policy
                </NavLink>
              </div>

              <div>
                <div className="account-divider">
                  <span>OR</span>
                </div>

                <button
                  className="btn btn-dark w-100 mt-4 mb-5"
                  onClick={handleEnquiry}
                  disabled={isProcessing}
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

      {isOpen && <UserLoginApp onClose={() => setIsOpen(false)} />}
    </section>
  );
};

export default CartApp;
