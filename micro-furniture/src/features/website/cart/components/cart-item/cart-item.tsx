import "./cart-item.scss";

import type { CartItem as CartItemType } from "../../../../../app/redux/website/cart/cart.api";

// ============================================================
// TYPES
// ============================================================

interface CartItemProps {
  item: CartItemType;

  onQuantityChange: (item: CartItemType, quantity: number) => void;

  onRemove: (item: CartItemType) => void;

  isUpdating?: boolean;
}

// ============================================================
// HELPERS
// ============================================================

const formatPrice = (amount: number, currency: string = "INR"): string => {
  if (currency === "INR") {
    return `₹${amount.toLocaleString("en-IN")}`;
  }

  return `${currency} ${amount.toLocaleString("en-IN")}`;
};

// ============================================================
// COMPONENT
// ============================================================

const CartItem = ({
  item,
  onQuantityChange,
  onRemove,
  isUpdating = false,
}: CartItemProps) => {
  const mrp = item.price?.mrp ?? 0;

  const sellingPrice = item.price?.sellingPrice ?? 0;

  const discountValue = item.price?.discount?.value ?? 0;

  const currency = "INR";

  const discountPercentage =
    mrp > 0 && sellingPrice < mrp
      ? Math.round(((mrp - sellingPrice) / mrp) * 100)
      : 0;

  const handleDecrease = () => {
    if (item.quantity <= 1 || isUpdating) {
      return;
    }

    onQuantityChange(item, item.quantity - 1);
  };

  const handleIncrease = () => {
    if (isUpdating) {
      return;
    }

    onQuantityChange(item, item.quantity + 1);
  };

  const handleRemove = () => {
    if (isUpdating) {
      return;
    }

    onRemove(item);
  };

  return (
    <article className={`cart-item ${isUpdating ? "cart-item-updating" : ""}`}>
      {/* ======================================================
          PRODUCT IMAGE
      ====================================================== */}

      <div className="cart-item-image-wrapper">
        {item.image ? (
          <img src={item.image} alt={item.name} className="cart-item-image" />
        ) : (
          <div className="cart-item-image-placeholder">
            <i className="bi bi-image" />
          </div>
        )}
      </div>

      {/* ======================================================
          PRODUCT CONTENT
      ====================================================== */}

      <div className="cart-item-content">
        {/* ====================================================
            PRODUCT HEADER
        ==================================================== */}

        <div className="cart-item-header">
          <div className="cart-item-product-info">
            <h4 className="cart-item-name">{item.name}</h4>

            {item.description && (
              <p className="cart-item-description">{item.description}</p>
            )}

            {item.productType && (
              <div className="cart-item-product-type">{item.productType}</div>
            )}
          </div>

          {/* ==================================================
              REMOVE
          ================================================== */}

          <button
            type="button"
            className="cart-item-remove-button"
            onClick={handleRemove}
            disabled={isUpdating}
            aria-label={`Remove ${item.name}`}
            title="Remove item"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* ====================================================
            PRICE
        ==================================================== */}

        <div className="cart-item-price">
          <span className="cart-item-selling-price">
            {formatPrice(sellingPrice, currency)}
          </span>

          {mrp > sellingPrice && (
            <span className="cart-item-mrp">{formatPrice(mrp, currency)}</span>
          )}

          {discountPercentage > 0 && (
            <span className="cart-item-discount">
              {discountPercentage}% OFF
            </span>
          )}

          {discountValue > 0 && (
            <span className="cart-item-discount-value">
              Save {formatPrice(discountValue, currency)}
            </span>
          )}
        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="cart-item-footer">
          {/* ==================================================
              QUANTITY
          ================================================== */}

          <div className="cart-item-quantity">
            <span className="cart-item-quantity-label">Qty</span>

            <div className="cart-item-quantity-control">
              <button
                type="button"
                className="cart-item-quantity-button"
                onClick={handleDecrease}
                disabled={item.quantity <= 1 || isUpdating}
                aria-label="Decrease quantity"
              >
                <i className="bi bi-dash" />
              </button>

              <span className="cart-item-quantity-value">{item.quantity}</span>

              <button
                type="button"
                className="cart-item-quantity-button"
                onClick={handleIncrease}
                disabled={isUpdating}
                aria-label="Increase quantity"
              >
                <i className="bi bi-plus" />
              </button>
            </div>
          </div>

          {/* ==================================================
              ITEM TOTAL
          ================================================== */}

          <div className="cart-item-total">
            <span className="cart-item-total-label">Total</span>

            <strong className="cart-item-total-price">
              {formatPrice(item.itemTotal, currency)}
            </strong>
          </div>
        </div>
      </div>

      {/* ======================================================
          LOADING OVERLAY
      ====================================================== */}

      {isUpdating && (
        <div className="cart-item-loading" aria-label="Updating cart">
          <div className="spinner-border spinner-border-sm text-dark" />
        </div>
      )}
    </article>
  );
};

export default CartItem;
