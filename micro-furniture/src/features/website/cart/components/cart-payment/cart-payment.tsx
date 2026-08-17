import "./cart-payment.scss";

import type { CartResponse } from "../../../../../app/redux/website/cart/cart.api";
import type { DeliveryAddress } from "../../../checkout/checkout";
import type { WebsiteOrderItemPayload } from "../../../../../app/redux/website/order/website-order.api";
import type { WebsiteUser } from "../../../../../app/redux/website/auth/profile-login.api";
import { useState } from "react";

// ============================================================
// PAYMENT
// ============================================================

export type PaymentMethod = "online";

// ============================================================
// CREATE ORDER
// ============================================================

export interface CreateOrderPayload {
  customerId: string;

  customerName: string;
  deliveryAddress: {
    id?: string;
    name: string;
    mobile: string;
    addressType: string;
    addressLine1: string;
    addressLine2?: string | null;
    landmark?: string | null;
    city: string;
    state: string;
    pincode: string;
    isDefault?: boolean;
  };
  items: WebsiteOrderItemPayload[];

  miscCharges?: Array<{
    label: string;
    amount: number;
  }>;

  note?: string;

  discountAmount?: number;

  likelyDateOfDelivery?: string;
}

// ============================================================
// CREATE ORDER RESPONSE
// ============================================================

export interface CreateOrderResponse {
  order: {
    _id: string;
    orderCode?: string;
    customerId?: string | null;
    customerName?: string;
    totalAmount?: number;
    orderStatus?: string;
    invoiceId?: string | null;
  };

  invoice?: {
    _id: string;
    paymentStatus?: string;
    totalAmount?: number;
    balanceAmount?: number;
  };

  payment?: {
    provider?: string;
    keyId?: string;
    razorpayOrderId?: string;
    amount?: number;
    currency?: string;
  };
}

// ============================================================
// VERIFY
// ============================================================

export interface VerifyPaymentPayload {
  orderId: string;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;

  message?: string;

  order?: {
    _id: string;
    orderStatus?: string;
  };

  invoice?: unknown;

  payment?: unknown;

  paidAt?: string;
}

// ============================================================
// PROPS
// ============================================================

interface CartPaymentProps {
  customer: WebsiteUser;

  cart: CartResponse;

  selectedAddress: DeliveryAddress | null;

  onBack?: () => void;

  onOrderSuccess: (orderId: string) => void;

  createOrder: (payload: CreateOrderPayload) => Promise<CreateOrderResponse>;

  verifyPayment: (
    payload: VerifyPaymentPayload,
  ) => Promise<VerifyPaymentResponse>;

  isProcessing?: boolean;

  error?: string;
}

// ============================================================
// RAZORPAY
// ============================================================

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

  prefill?: {
    name?: string;
    contact?: string;
    email?: string;
  };

  handler: (response: RazorpayResponse) => void | Promise<void>;

  modal?: {
    ondismiss?: () => void;
  };
}

// ============================================================
// RAZORPAY SCRIPT
// ============================================================

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), {
        once: true,
      });

      existingScript.addEventListener("error", () => resolve(false), {
        once: true,
      });

      return;
    }

    const script = document.createElement("script");

    script.src = RAZORPAY_SCRIPT;
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

// ============================================================
// COMPONENT
// ============================================================

const CartPayment = ({
  customer,
  cart,
  selectedAddress,
  onBack,
  onOrderSuccess,
  createOrder,
  verifyPayment,
  isProcessing = false,
  error = "",
}: CartPaymentProps) => {
  const [processing, setProcessing] = useState(false);

  const [localError, setLocalError] = useState("");

  const isBusy = isProcessing || processing;

  // ==========================================================
  // CONTINUE
  // ==========================================================

  const handleContinue = async () => {
    if (isBusy) {
      return;
    }

    if (!customer?.id) {
      setLocalError("Customer information is missing.");
      return;
    }

    if (!selectedAddress) {
      setLocalError("Please select a delivery address.");
      return;
    }

    if (!cart?.items?.length) {
      setLocalError("Your cart is empty.");
      return;
    }

    setLocalError("");
    setProcessing(true);

    try {
      // ======================================================
      // CREATE ORDER PAYLOAD
      // ======================================================

      const payload: CreateOrderPayload = {
        customerId: String(customer.id),

        customerName:
          customer.name || selectedAddress.name || "Website Customer",

        deliveryAddress: selectedAddress,

        items: cart.items.map((item) => ({
          productId: String(item.productId),

          productType: item.productType || "physical",

          quantity: Number(item.quantity),

          ...(item.customizedDetails !== undefined
            ? {
                customizedDetails: item.customizedDetails,
              }
            : {}),
        })),

        miscCharges: [],

        note: "Website order",

        discountAmount: 0,
      };

      // ======================================================
      // CREATE INTERNAL ORDER + INVOICE + RAZORPAY ORDER
      // ======================================================

      const response = await createOrder(payload);

      const orderId = response?.order?._id;

      if (!orderId) {
        throw new Error("Order was created but no order ID was returned.");
      }

      // ======================================================
      // RAZORPAY DETAILS
      // ======================================================

      const razorpayOrderId = response.payment?.razorpayOrderId;

      const razorpayKeyId = response.payment?.keyId;

      const razorpayAmount = response.payment?.amount;

      const razorpayCurrency = response.payment?.currency || "INR";

      if (!razorpayOrderId) {
        throw new Error("Razorpay order ID was not returned.");
      }

      if (!razorpayKeyId) {
        throw new Error("Razorpay key ID was not returned.");
      }

      if (
        razorpayAmount === undefined ||
        razorpayAmount === null ||
        razorpayAmount <= 0
      ) {
        throw new Error("Invalid Razorpay payment amount.");
      }

      // ======================================================
      // LOAD RAZORPAY
      // ======================================================

      const loaded = await loadRazorpayScript();

      if (!loaded || !window.Razorpay) {
        throw new Error("Unable to load payment gateway. Please try again.");
      }

      // ======================================================
      // RAZORPAY OPTIONS
      // ======================================================

      const options: RazorpayOptions = {
        key: razorpayKeyId,

        amount: razorpayAmount,

        currency: razorpayCurrency,

        name: "Your Store",

        description: response.order.orderCode
          ? `Order ${response.order.orderCode}`
          : "Website Order",

        order_id: razorpayOrderId,

        prefill: {
          name: customer.name || selectedAddress.name,

          contact: customer.mobile || selectedAddress.mobile,

          email: customer.email || undefined,
        },

        // ====================================================
        // SUCCESS
        // ====================================================

        handler: async (razorpayResponse) => {
          try {
            setProcessing(true);
            setLocalError("");

            const verification = await verifyPayment({
              orderId,

              razorpayPaymentId: razorpayResponse.razorpay_payment_id,

              razorpayOrderId: razorpayResponse.razorpay_order_id,

              razorpaySignature: razorpayResponse.razorpay_signature,
            });

            if (!verification.success) {
              throw new Error(
                verification.message || "Payment verification failed.",
              );
            }

            const verifiedOrderId = verification.order?._id || orderId;

            onOrderSuccess(verifiedOrderId);
          } catch (paymentError: unknown) {
            console.error("Payment verification failed:", paymentError);

            setLocalError(
              paymentError instanceof Error
                ? paymentError.message
                : "Payment verification failed. Please contact support.",
            );
          } finally {
            setProcessing(false);
          }
        },

        // ====================================================
        // DISMISSED
        // ====================================================

        modal: {
          ondismiss: () => {
            setProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (orderError: unknown) {
      console.error("Unable to place order:", orderError);

      setLocalError(
        orderError instanceof Error
          ? orderError.message
          : "Unable to place your order. Please try again.",
      );

      setProcessing(false);
    }
  };

  // ==========================================================
  // VALUES
  // ==========================================================

  const displayError = error || localError;

  const total = cart.summary?.grandTotal ?? 0;

  const formatPrice = (amount: number) =>
    `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="cart-payment">
      <div className="cart-payment-header">
        <div>
          <h5 className="cart-payment-title">Payment</h5>

          <p className="cart-payment-description">
            Complete your order securely using Razorpay.
          </p>
        </div>
      </div>

      {/* ====================================================
          ADDRESS
      ==================================================== */}

      {selectedAddress && (
        <div className="cart-payment-address">
          <div className="cart-payment-address-header">
            <div className="cart-payment-section-title">
              <i className="bi bi-geo-alt" />

              <span>Delivering to</span>
            </div>

            {onBack && (
              <button
                type="button"
                className="cart-payment-change-btn"
                onClick={onBack}
                disabled={isBusy}
              >
                Change
              </button>
            )}
          </div>

          <div className="cart-payment-address-content">
            <div className="cart-payment-address-name">
              <strong>{selectedAddress.name}</strong>

              <span className="cart-payment-address-type">
                {selectedAddress.addressType.toUpperCase()}
              </span>
            </div>

            <p>
              {selectedAddress.addressLine1}

              {selectedAddress.addressLine2 &&
                `, ${selectedAddress.addressLine2}`}
            </p>

            {selectedAddress.landmark && (
              <p>Landmark: {selectedAddress.landmark}</p>
            )}

            <p>
              {selectedAddress.city}, {selectedAddress.state} -{" "}
              {selectedAddress.pincode}
            </p>

            <p className="cart-payment-address-mobile">
              Mobile: {selectedAddress.mobile}
            </p>
          </div>
        </div>
      )}

      {/* ====================================================
          PAYMENT METHOD
      ==================================================== */}

      <div className="cart-payment-methods">
        <div className="cart-payment-section-heading">
          <h6>Payment Method</h6>
        </div>

        <div className="cart-payment-method cart-payment-method-selected">
          <div className="cart-payment-method-radio">
            <span className="cart-payment-radio-selected" />
          </div>

          <div className="cart-payment-method-icon">
            <i className="bi bi-credit-card" />
          </div>

          <div className="cart-payment-method-content">
            <strong>Online Payment</strong>

            <span>Pay securely using UPI, card, net banking or wallet.</span>
          </div>

          <div className="cart-payment-method-check">
            <i className="bi bi-check-circle-fill" />
          </div>
        </div>
      </div>

      {/* ====================================================
          SECURITY
      ==================================================== */}

      <div className="cart-payment-security">
        <div className="cart-payment-security-icon">
          <i className="bi bi-shield-check" />
        </div>

        <div>
          <strong>Safe and secure payments</strong>

          <p>Your payment is securely processed by Razorpay.</p>
        </div>
      </div>

      {/* ====================================================
          ERROR
      ==================================================== */}

      {displayError && (
        <div className="cart-payment-error">
          <i className="bi bi-exclamation-circle" />

          <span>{displayError}</span>
        </div>
      )}

      {/* ====================================================
          SUMMARY
      ==================================================== */}

      <div className="cart-payment-summary">
        <div className="cart-payment-summary-row">
          <span>Items</span>

          <span>{cart.summary?.totalQuantity ?? 0}</span>
        </div>

        <div className="cart-payment-summary-row">
          <span>Subtotal</span>

          <span>{formatPrice(cart.summary?.subtotal ?? 0)}</span>
        </div>

        {cart.summary?.discount > 0 && (
          <div className="cart-payment-summary-row cart-payment-discount">
            <span>Discount</span>

            <span>-{formatPrice(cart.summary.discount)}</span>
          </div>
        )}

        {cart.summary?.shipping > 0 && (
          <div className="cart-payment-summary-row">
            <span>Shipping</span>

            <span>{formatPrice(cart.summary.shipping)}</span>
          </div>
        )}

        {cart.summary?.totalTax > 0 && (
          <div className="cart-payment-summary-row">
            <span>Tax</span>

            <span>{formatPrice(cart.summary.totalTax)}</span>
          </div>
        )}

        <div className="cart-payment-summary-total">
          <span>Total Amount</span>

          <strong>{formatPrice(total)}</strong>
        </div>
      </div>

      {/* ====================================================
          FOOTER
      ==================================================== */}

      <div className="cart-payment-footer">
        {onBack && (
          <button
            type="button"
            className="cart-payment-back-btn"
            onClick={onBack}
            disabled={isBusy}
          >
            <i className="bi bi-arrow-left" />
            Back
          </button>
        )}

        <button
          type="button"
          className="cart-payment-place-order-btn"
          onClick={handleContinue}
          disabled={!selectedAddress || isBusy}
        >
          {isBusy ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />
              Processing...
            </>
          ) : (
            <>
              Continue to Payment
              <i className="bi bi-arrow-right" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartPayment;
