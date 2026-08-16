import "./cart-empty.scss";

interface CartEmptyProps {
  onContinueShopping?: () => void;
}

// ============================================================
// CART EMPTY
// ============================================================

const CartEmpty = ({ onContinueShopping }: CartEmptyProps) => {
  return (
    <div className="cart-empty">
      <div className="cart-empty-content">
        {/* ====================================================
            ILLUSTRATION
        ==================================================== */}

        <div className="cart-empty-illustration">
          <div className="cart-empty-bag">
            <div className="cart-empty-bag-handle" />

            <div className="cart-empty-bag-body">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <h2 className="cart-empty-title">Your cart is currently empty</h2>

        <p className="cart-empty-message">
          Looks like you haven't added anything yet. Explore our collection and
          find something you love.
        </p>

        {/* ====================================================
            ACTION
        ==================================================== */}

        <button
          type="button"
          className="cart-empty-shopping-button"
          onClick={onContinueShopping}
        >
          <i className="bi bi-arrow-left" />

          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};

export default CartEmpty;
