import "./cart-price-details.scss";

import type { CartResponse } from "../../../../../app/redux/website/cart/cart.api";

interface CartPriceDetailsProps {
  cart: CartResponse;

  /**
   * Optional title override.
   */
  title?: string;

  /**
   * Shows the final checkout CTA when provided.
   */
  onContinue?: () => void;

  /**
   * Disable checkout button while processing.
   */
  isLoading?: boolean;

  /**
   * Whether the checkout button should be disabled.
   */
  disabled?: boolean;

  /**
   * Optional custom checkout button label.
   */
  continueLabel?: string;
}

const CartPriceDetails = ({
  cart,
  title = "Price Details",
  onContinue,
  isLoading = false,
  disabled = false,
  continueLabel = "Continue",
}: CartPriceDetailsProps) => {
  const summary = cart.summary;

  const totalMrp = summary?.mrp ?? cart.pricing?.totalMrp ?? 0;

  const discount = summary?.discount ?? cart.pricing?.discount ?? 0;

  const subtotal = summary?.subtotal ?? cart.pricing?.subtotal ?? 0;

  const shipping = summary?.shipping ?? cart.pricing?.shipping ?? 0;

  const totalTax =
    summary?.totalTax ?? summary?.taxToAdd ?? cart.pricing?.tax ?? 0;

  const miscCharges = summary?.miscCharges ?? cart.pricing?.miscCharges ?? 0;

  const grandTotal = summary?.grandTotal ?? cart.pricing?.total ?? 0;

  const totalQuantity = summary?.totalQuantity ?? 0;

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const hasDiscount = discount > 0;
  const hasShipping = shipping > 0;
  const hasTax = totalTax > 0;
  const hasMiscCharges = miscCharges > 0;

  return (
    <aside className="cart-price-details">
      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <div className="cart-price-details-header">
        <h6>{title}</h6>
      </div>

      {/* ================================================== */}
      {/* ITEM COUNT */}
      {/* ================================================== */}

      <div className="cart-price-details-item-count">
        <span>
          PRICE DETAILS ({totalQuantity}{" "}
          {totalQuantity === 1 ? "ITEM" : "ITEMS"})
        </span>
      </div>

      {/* ================================================== */}
      {/* PRICE BREAKDOWN */}
      {/* ================================================== */}

      <div className="cart-price-details-body">
        {/* Total MRP */}
        <div className="cart-price-row">
          <span>Total MRP</span>

          <span>{formatPrice(totalMrp)}</span>
        </div>

        {/* Discount */}
        {hasDiscount && (
          <div className="cart-price-row cart-price-row-discount">
            <span>Discount on MRP</span>

            <span>- {formatPrice(discount)}</span>
          </div>
        )}

        {/* Subtotal */}
        <div className="cart-price-row">
          <span>Subtotal</span>

          <span>{formatPrice(subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="cart-price-row">
          <span>Shipping Fee</span>

          {hasShipping ? (
            <span>{formatPrice(shipping)}</span>
          ) : (
            <span className="cart-price-free">FREE</span>
          )}
        </div>

        {/* Tax */}
        {hasTax && (
          <div className="cart-price-row">
            <span>Taxes</span>

            <span>{formatPrice(totalTax)}</span>
          </div>
        )}

        {/* Misc Charges */}
        {hasMiscCharges && (
          <div className="cart-price-row">
            <span>Other Charges</span>

            <span>{formatPrice(miscCharges)}</span>
          </div>
        )}
      </div>

      {/* ================================================== */}
      {/* TOTAL */}
      {/* ================================================== */}

      <div className="cart-price-details-total">
        <span>Total Amount</span>

        <strong>{formatPrice(grandTotal)}</strong>
      </div>

      {/* ================================================== */}
      {/* SAVINGS */}
      {/* ================================================== */}

      {hasDiscount && (
        <div className="cart-price-details-savings">
          <i className="bi bi-tag-fill" />

          <span>You save {formatPrice(discount)} on this order</span>
        </div>
      )}

      {/* ================================================== */}
      {/* CONTINUE */}
      {/* ================================================== */}

      {onContinue && (
        <div className="cart-price-details-action">
          <button
            type="button"
            className="cart-price-details-continue"
            onClick={onContinue}
            disabled={disabled || isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                />
                Processing...
              </>
            ) : (
              <>
                <span>{continueLabel}</span>

                <i className="bi bi-arrow-right" />
              </>
            )}
          </button>
        </div>
      )}

      {/* ================================================== */}
      {/* SECURITY */}
      {/* ================================================== */}

      <div className="cart-price-details-secure">
        <i className="bi bi-shield-check" />

        <span>Safe and secure checkout</span>
      </div>
    </aside>
  );
};

export default CartPriceDetails;
