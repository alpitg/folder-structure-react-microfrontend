import "./cart-payment.scss";

import type { CartResponse } from "../../../../../app/redux/website/cart/cart.api";
import type { DeliveryAddress } from "../../../checkout/checkout";
import type { WebsiteUser } from "../../../../../app/redux/website/auth/profile-login.api";
import { useState } from "react";

export type PaymentMethod = "cod" | "online";

// ============================================================
// TYPES
// ============================================================

interface CartPaymentProps {
  customer: WebsiteUser;

  cart: CartResponse;

  selectedAddress: DeliveryAddress | null;

  onBack?: () => void;

  /**
   * Called after the payment/order flow succeeds.
   */
  onOrderSuccess: (orderId: string) => void;

  /**
   * Optional external processing state.
   */
  isProcessing?: boolean;

  /**
   * Optional error from parent/order API.
   */
  error?: string;
}

// ============================================================
// COMPONENT
// ============================================================

const CartPayment = ({
  customer,
  cart,
  selectedAddress,
  onBack,
  onOrderSuccess,
  isProcessing = false,
  error = "",
}: CartPaymentProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const [localError, setLocalError] = useState("");

  // ==========================================================
  // CONTINUE
  // ==========================================================

  const handleContinue = async () => {
    if (isProcessing) {
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

    /**
     * IMPORTANT:
     *
     * This is where your create-order / payment API should be called.
     *
     * Example:
     *
     * const response = await createOrder({
     *   customerId: customer.id,
     *   cartId: cart.id,
     *   addressId: selectedAddress.id,
     *   paymentMethod,
     * });
     *
     * Then:
     *
     * if (paymentMethod === "cod") {
     *   onOrderSuccess(response.orderId);
     * }
     *
     * if (paymentMethod === "online") {
     *   // redirect/open payment gateway
     * }
     */

    console.log("Checkout:", {
      customerId: customer.id,
      cart,
      selectedAddress,
      paymentMethod,
    });

    /**
     * Temporary example.
     *
     * REMOVE this when your order API is connected.
     */
    // onOrderSuccess(response.orderId);
  };

  // ==========================================================
  // ERROR
  // ==========================================================

  const displayError = error || localError;

  // ==========================================================
  // TOTAL
  // ==========================================================

  const total = cart.summary?.grandTotal ?? cart.pricing?.total ?? 0;

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="cart-payment">
      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <div className="cart-payment-header">
        <div>
          <h5 className="cart-payment-title">Payment</h5>

          <p className="cart-payment-description">
            Choose your preferred payment method to place your order.
          </p>
        </div>
      </div>

      {/* ================================================== */}
      {/* ADDRESS SUMMARY */}
      {/* ================================================== */}

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
                disabled={isProcessing}
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

      {/* ================================================== */}
      {/* PAYMENT METHODS */}
      {/* ================================================== */}

      <div className="cart-payment-methods">
        <div className="cart-payment-section-heading">
          <h6>Choose Payment Method</h6>
        </div>

        {/* COD */}
        <button
          type="button"
          className={`cart-payment-method ${
            paymentMethod === "cod" ? "cart-payment-method-selected" : ""
          }`}
          onClick={() => setPaymentMethod("cod")}
          disabled={isProcessing}
        >
          <div className="cart-payment-method-radio">
            <span
              className={
                paymentMethod === "cod" ? "cart-payment-radio-selected" : ""
              }
            />
          </div>

          <div className="cart-payment-method-icon">
            <i className="bi bi-cash-stack" />
          </div>

          <div className="cart-payment-method-content">
            <strong>Cash on Delivery</strong>

            <span>Pay when your order is delivered to you.</span>
          </div>

          {paymentMethod === "cod" && (
            <div className="cart-payment-method-check">
              <i className="bi bi-check-circle-fill" />
            </div>
          )}
        </button>

        {/* ONLINE */}
        <button
          type="button"
          className={`cart-payment-method ${
            paymentMethod === "online" ? "cart-payment-method-selected" : ""
          }`}
          onClick={() => setPaymentMethod("online")}
          disabled={isProcessing}
        >
          <div className="cart-payment-method-radio">
            <span
              className={
                paymentMethod === "online" ? "cart-payment-radio-selected" : ""
              }
            />
          </div>

          <div className="cart-payment-method-icon">
            <i className="bi bi-credit-card" />
          </div>

          <div className="cart-payment-method-content">
            <strong>Online Payment</strong>

            <span>Pay securely using UPI, card, net banking or wallet.</span>
          </div>

          {paymentMethod === "online" && (
            <div className="cart-payment-method-check">
              <i className="bi bi-check-circle-fill" />
            </div>
          )}
        </button>
      </div>

      {/* ================================================== */}
      {/* SECURITY MESSAGE */}
      {/* ================================================== */}

      <div className="cart-payment-security">
        <div className="cart-payment-security-icon">
          <i className="bi bi-shield-check" />
        </div>

        <div>
          <strong>Safe and secure payments</strong>

          <p>Your payment information is encrypted and securely processed.</p>
        </div>
      </div>

      {/* ================================================== */}
      {/* ERROR */}
      {/* ================================================== */}

      {displayError && (
        <div className="cart-payment-error">
          <i className="bi bi-exclamation-circle" />

          <span>{displayError}</span>
        </div>
      )}

      {/* ================================================== */}
      {/* PAYMENT SUMMARY */}
      {/* ================================================== */}

      <div className="cart-payment-summary">
        <div className="cart-payment-summary-row">
          <span>Items</span>

          <span>{cart.summary?.totalQuantity ?? 0}</span>
        </div>

        <div className="cart-payment-summary-row">
          <span>Subtotal</span>

          <span>
            {formatPrice(cart.summary?.subtotal ?? cart.pricing?.subtotal ?? 0)}
          </span>
        </div>

        {(cart.summary?.discount ?? cart.pricing?.discount ?? 0) > 0 && (
          <div className="cart-payment-summary-row cart-payment-discount">
            <span>Discount</span>

            <span>
              -
              {formatPrice(
                cart.summary?.discount ?? cart.pricing?.discount ?? 0,
              )}
            </span>
          </div>
        )}

        {(cart.summary?.shipping ?? cart.pricing?.shipping ?? 0) > 0 && (
          <div className="cart-payment-summary-row">
            <span>Shipping</span>

            <span>
              {formatPrice(
                cart.summary?.shipping ?? cart.pricing?.shipping ?? 0,
              )}
            </span>
          </div>
        )}

        <div className="cart-payment-summary-total">
          <span>Total Amount</span>

          <strong>{formatPrice(total)}</strong>
        </div>
      </div>

      {/* ================================================== */}
      {/* FOOTER */}
      {/* ================================================== */}

      <div className="cart-payment-footer">
        {onBack && (
          <button
            type="button"
            className="cart-payment-back-btn"
            onClick={onBack}
            disabled={isProcessing}
          >
            <i className="bi bi-arrow-left" />
            Back
          </button>
        )}

        <button
          type="button"
          className="cart-payment-place-order-btn"
          onClick={handleContinue}
          disabled={!selectedAddress || isProcessing}
        >
          {isProcessing ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />
              Processing...
            </>
          ) : (
            <>
              {paymentMethod === "cod" ? "Place Order" : "Continue to Payment"}

              <i className="bi bi-arrow-right" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartPayment;
