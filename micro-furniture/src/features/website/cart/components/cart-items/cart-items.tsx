import "./cart-items.scss";

import type {
  CartIdentity,
  CartItem as CartItemType,
} from "../../../../../app/redux/website/cart/cart.api";
import {
  useRemoveWebsiteCartItemMutation,
  useUpdateWebsiteCartItemMutation,
} from "../../../../../app/redux/website/cart/cart.api";

import CartItem from "../cart-item/cart-item";
import { useState } from "react";

// ============================================================
// TYPES
// ============================================================

interface CartItemsProps {
  items: CartItemType[];

  identity: CartIdentity;

  /**
   * Indicates that the parent cart query is fetching data.
   */
  isFetching?: boolean;

  /**
   * Called after a cart item has been successfully updated
   * or removed.
   */
  onCartUpdated?: () => void;
}

// ============================================================
// COMPONENT
// ============================================================

const CartItems = ({
  items,
  identity,
  isFetching = false,
  onCartUpdated,
}: CartItemsProps) => {
  // ==========================================================
  // MUTATIONS
  // ==========================================================

  const [updateWebsiteCartItem, { isLoading: isUpdatingCartItem }] =
    useUpdateWebsiteCartItemMutation();

  const [removeWebsiteCartItem, { isLoading: isRemovingCartItem }] =
    useRemoveWebsiteCartItemMutation();

  // ==========================================================
  // STATE
  // ==========================================================

  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  const [error, setError] = useState("");

  // ==========================================================
  // UPDATE QUANTITY
  // ==========================================================

  const handleQuantityChange = async (item: CartItemType, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    if (updatingItemId) {
      return;
    }

    try {
      setError("");

      setUpdatingItemId(item.id);

      await updateWebsiteCartItem({
        ...identity,
        productId: item.productId,
        quantity,
      }).unwrap();

      onCartUpdated?.();
    } catch (error) {
      console.error("Failed to update cart item:", error);

      setError("Unable to update the item quantity. Please try again.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  // ==========================================================
  // REMOVE ITEM
  // ==========================================================

  const handleRemove = async (item: CartItemType) => {
    if (updatingItemId) {
      return;
    }

    try {
      setError("");

      setUpdatingItemId(item.id);

      await removeWebsiteCartItem({
        ...identity,

        productId: item.productId,
      }).unwrap();

      onCartUpdated?.();
    } catch (error) {
      console.error("Failed to remove cart item:", error);

      setError("Unable to remove the item. Please try again.");
    } finally {
      setUpdatingItemId(null);
    }
  };

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (!items?.length) {
    return null;
  }

  // ==========================================================
  // LOADING STATES
  // ==========================================================

  const isUpdatingItem =
    isUpdatingCartItem || isRemovingCartItem || !!updatingItemId;

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <section
      className={`cart-items ${isFetching ? "cart-items-fetching" : ""}`}
      aria-busy={isFetching || isUpdatingItem}
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="cart-items-header">
        <div>
          <h4 className="cart-items-title">Your Bag</h4>

          <p className="cart-items-subtitle">
            {items.length} {items.length === 1 ? "item" : "items"} in your bag
          </p>
        </div>

        {isFetching && (
          <div
            className="cart-items-refreshing"
            role="status"
            aria-label="Updating bag"
          >
            <span className="spinner-border spinner-border-sm" />

            <span>Updating...</span>
          </div>
        )}
      </div>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="cart-items-error" role="alert">
          <i className="bi bi-exclamation-circle" />

          <span>{error}</span>

          <button
            type="button"
            className="cart-items-error-close"
            onClick={() => setError("")}
            aria-label="Close error"
          >
            <i className="bi bi-x" />
          </button>
        </div>
      )}

      {/* ======================================================
          ITEMS
      ====================================================== */}

      <div className="cart-items-list">
        {items?.map((item) => (
          <CartItem
            key={item?.id || item?.productId}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            isUpdating={isUpdatingItem && updatingItemId === item.id}
          />
        ))}
      </div>
    </section>
  );
};

export default CartItems;
