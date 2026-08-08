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
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        alert("Unable to load payment gateway. Please try again.");

        return;
      }

      // --------------------------------------------------
      // STEP 2: Prepare order payload
      // --------------------------------------------------
      //
      // IMPORTANT:
      // Do NOT send price/subtotal/totalAmount.
      //
      // Backend gets the product price from MongoDB.
      //

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

            // Clear cart ONLY after backend
            // confirms successful verification.
            dispatch(clearBag());

            // --------------------------------------------
            // STEP 7: Navigate to success page
            // --------------------------------------------

            navigate(`${ROUTE_URL.WEBSITE.ORDER_SUCCESS}?orderId=${order.id}`);
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
          color: "#212529",
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

  return (
    <section className="cart-app py-5">
      {items?.length === 0 ? (
        <EmptyCartApp />
      ) : (
        <div className="container">
          {/* -------------------------------------------- */}
          {/* CART TABLE */}
          {/* -------------------------------------------- */}

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
                    {/* Product */}
                    <td>
                      <NavLink to={`/products/${item.id}`}>
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-image me-3"
                          />

                          <h6 className="mb-0 fw-medium">{item.name}</h6>
                        </div>
                      </NavLink>
                    </td>

                    {/* Price */}
                    <td>₹ {item.price.toFixed(2)}</td>

                    {/* Quantity */}
                    <td>
                      <div className="quantity-box">
                        <button
                          type="button"
                          className="btn-qty"
                          onClick={() => decrease(item.id)}
                          disabled={isProcessing}
                        >
                          -
                        </button>

                        <input readOnly value={item.quantity} />

                        <button
                          type="button"
                          className="btn-qty"
                          onClick={() => increase(item.id)}
                          disabled={isProcessing}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Total */}
                    <td>₹ {(item.price * item.quantity).toFixed(2)}</td>

                    {/* Remove */}
                    <td className="text-end">
                      <i
                        className="bi bi-x-lg text-dark ms-2 cursor-pointer"
                        onClick={() => remove(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* -------------------------------------------- */}
          {/* CART ACTIONS */}
          {/* -------------------------------------------- */}

          <div className="d-flex justify-content-between flex-wrap gap-3 mt-5">
            <NavLink
              className="btn btn-dark px-4"
              to={ROUTE_URL.WEBSITE.PRODUCTS}
            >
              ← Continue Shopping
            </NavLink>

            <button
              type="button"
              className="btn btn-outline-dark px-4"
              onClick={clearCart}
              disabled={isProcessing}
            >
              Clear Cart
            </button>
          </div>

          {/* -------------------------------------------- */}
          {/* SUMMARY */}
          {/* -------------------------------------------- */}

          <div className="row mt-5 gy-4">
            <div className="col-lg-6"></div>

            <div className="col-lg-6">
              <div className="cart-summary ms-lg-auto">
                <div className="d-flex justify-content-between border-bottom pb-3">
                  <strong>Subtotal</strong>

                  <span>₹ {subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between pt-3">
                  <strong>Total</strong>

                  <strong>₹ {subtotal.toFixed(2)}</strong>
                </div>

                {/* ---------------------------------------- */}
                {/* ERROR */}
                {/* ---------------------------------------- */}

                {errorMessage && (
                  <div className="alert alert-danger mt-3">{errorMessage}</div>
                )}

                {/* ---------------------------------------- */}
                {/* CHECKOUT */}
                {/* ---------------------------------------- */}

                <button
                  type="button"
                  className="btn btn-dark w-100 mt-4 mb-5"
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                >
                  {isCreatingOrder
                    ? "Creating Order..."
                    : isVerifyingPayment
                      ? "Verifying Payment..."
                      : "Proceed to Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartApp;
