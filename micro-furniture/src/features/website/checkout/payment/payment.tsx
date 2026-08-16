import "./payment.scss";

import type { Customer, DeliveryAddress } from "../checkout";

import { ROUTE_URL } from "../../../../routes/constants/routes.const";
import { useState } from "react";

interface PaymentProps {
  customer: Customer | null;
  address: DeliveryAddress;
  cart: any;
  summary: any;
  guestCartId: string | null;
  appSettings: any;
  createWebsiteOrder: any;
  verifyWebsitePayment: any;
  isCreatingOrder: boolean;
  isVerifyingPayment: boolean;
  navigate: any;
  onBack: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

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

const PaymentApp = ({
  customer,
  address,
  cart,
  summary,
  guestCartId,
  appSettings,
  createWebsiteOrder,
  verifyWebsitePayment,
  isCreatingOrder,
  isVerifyingPayment,
  navigate,
  onBack,
}: PaymentProps) => {
  const [error, setError] = useState("");

  const items = cart?.items ?? [];

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

  const handlePayment = async () => {
    if (!customer?.id) {
      setError("Please login before continuing.");
      return;
    }

    if (!address) {
      setError("Please select a delivery address.");
      return;
    }

    setError("");

    try {
      /*
       * ============================================
       * LOAD RAZORPAY
       * ============================================
       */

      if (appSettings?.cartPage?.enablePayment) {
        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
          setError("Unable to load payment gateway. Please try again.");

          return;
        }
      }

      /*
       * ============================================
       * ORDER PAYLOAD
       * ============================================
       */

      const payload = {
        customerName: customer.name || address.name || "Customer",

        customerId: customer.id,

        guestCartId,

        items: items.map((item: any) => ({
          productId: item.productId,
          productType: item.productType ?? "physical",
          quantity: item.quantity,
        })),

        /*
         * IMPORTANT
         *
         * Your backend should accept this field.
         * If your API uses another name such as
         * shippingAddress, deliveryAddress, etc.,
         * change this key to match your API.
         */
        shippingAddress: address,

        miscCharges: [],

        note: "Website order",

        likelyDateOfDelivery: null,
      };

      /*
       * ============================================
       * CREATE ORDER
       * ============================================
       */

      const result = await createWebsiteOrder(payload).unwrap();

      if (!result?.payment && appSettings?.cartPage?.enablePayment) {
        throw new Error("Payment information was not returned.");
      }

      /*
       * ============================================
       * PAYMENT DISABLED
       * ============================================
       */

      if (!appSettings?.cartPage?.enablePayment) {
        if (guestCartId) {
          localStorage.removeItem(GUEST_CART_ID_KEY);
        }

        navigate(
          `${ROUTE_URL.WEBSITE.ORDER_SUCCESS}?orderId=${result?.order?.orderCode}`,
        );

        return;
      }

      /*
       * ============================================
       * RAZORPAY
       * ============================================
       */

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

            if (guestCartId) {
              localStorage.removeItem(GUEST_CART_ID_KEY);
            }

            navigate(
              `${ROUTE_URL.WEBSITE.ORDER_SUCCESS}?orderId=${order.orderCode}`,
            );
          } catch (paymentError) {
            console.error("Payment verification failed:", paymentError);

            setError(
              "Payment was received, but we could not verify it yet. Please contact support.",
            );
          }
        },

        prefill: {
          name:
            order.customerName || customer.name || address.name || "Customer",

          email: order.customerEmail || customer.email,

          contact: order.customerMobile || address.mobile || customer.mobile,
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

        setError(
          response?.error?.description || "Payment failed. Please try again.",
        );
      });

      razorpay.open();
    } catch (error: any) {
      console.error("Checkout initialization failed:", error);

      setError(
        error?.data?.detail ||
          error?.data?.message ||
          error?.message ||
          "Unable to start checkout. Please try again.",
      );
    }
  };

  return (
    <div className="payment-container">
      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div className="payment-header">
        <button type="button" className="payment-back-btn" onClick={onBack}>
          <i className="bi bi-arrow-left" />

          <span>Change Address</span>
        </button>

        <div>
          <h5>Payment</h5>

          <p>Review your order and complete payment.</p>
        </div>
      </div>

      <div className="payment-content">
        {/* ========================================= */}
        {/* LEFT */}
        {/* ========================================= */}

        <div className="payment-left">
          {/* ADDRESS */}

          <div className="payment-section">
            <div className="payment-section-header">
              <h6>
                <i className="bi bi-geo-alt" />
                Delivery Address
              </h6>

              <button type="button" onClick={onBack}>
                Change
              </button>
            </div>

            <div className="payment-address-card">
              <div className="payment-address-name">
                <strong>{address.name}</strong>

                <span>{address.addressType.toUpperCase()}</span>
              </div>

              <p>
                {address.addressLine1}

                {address.addressLine2 && `, ${address.addressLine2}`}
              </p>

              {address.landmark && <p>Landmark: {address.landmark}</p>}

              <p>
                {address.city}, {address.state} - {address.pincode}
              </p>

              <p>Mobile: {address.mobile}</p>
            </div>
          </div>

          {/* PAYMENT METHOD */}

          <div className="payment-section">
            <div className="payment-section-header">
              <h6>
                <i className="bi bi-credit-card" />
                Payment Method
              </h6>
            </div>

            <div className="payment-method-card payment-method-selected">
              <div className="payment-method-radio">
                <span />
              </div>

              <div>
                <strong>Online Payment</strong>

                <p>Pay securely using UPI, cards, net banking or wallets.</p>
              </div>

              <i className="bi bi-shield-check" />
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* RIGHT - SUMMARY */}
        {/* ========================================= */}

        <div className="payment-right">
          <div className="payment-summary">
            <h6>PRICE DETAILS</h6>

            <div className="payment-summary-row">
              <span>Total MRP</span>

              <span>₹{(summary?.mrp ?? 0).toFixed(2)}</span>
            </div>

            <div className="payment-summary-row">
              <span>Discount on MRP</span>

              <span className="discount-value">
                - ₹{(summary?.discount ?? 0).toFixed(2)}
              </span>
            </div>

            <div className="payment-summary-row">
              <span>Platform Fee</span>

              <span>₹{(summary?.miscCharges ?? 0).toFixed(2)}</span>
            </div>

            <div className="payment-summary-row">
              <span>Shipping Fee</span>

              <span className="free">
                {(summary?.shipping ?? 0) === 0
                  ? "FREE"
                  : `₹${(summary?.shipping ?? 0).toFixed(2)}`}
              </span>
            </div>

            {(summary?.taxToAdd ?? 0) > 0 && (
              <div className="payment-summary-row">
                <span>Tax</span>

                <span>₹{(summary?.taxToAdd ?? 0).toFixed(2)}</span>
              </div>
            )}

            <div className="payment-summary-divider" />

            <div className="payment-summary-total">
              <span>Total Amount</span>

              <span>₹{(summary?.grandTotal ?? 0).toFixed(2)}</span>
            </div>

            {error && (
              <div className="payment-error">
                <i className="bi bi-exclamation-circle" />

                <span>{error}</span>
              </div>
            )}

            <button
              type="button"
              className="payment-pay-btn"
              onClick={handlePayment}
              disabled={isCreatingOrder || isVerifyingPayment}
            >
              {isCreatingOrder
                ? "CREATING ORDER..."
                : isVerifyingPayment
                  ? "VERIFYING PAYMENT..."
                  : `PAY ₹${(summary?.grandTotal ?? 0).toFixed(2)}`}
            </button>

            <div className="payment-secure">
              <i className="bi bi-shield-check" />

              <span>Safe and Secure Payments. 100% Authentic Products.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentApp;
