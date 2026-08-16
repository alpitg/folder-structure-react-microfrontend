import "./cart.scss";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import {
  useGetWebsiteCartQuery,
  type CartIdentity,
} from "../../../app/redux/website/cart/cart.api";

import {
  useGetCurrentUserQuery,
  type WebsiteUser,
} from "../../../app/redux/website/auth/profile-login.api";

// Child components
import CartSteps from "./components/cart-steps/cart-steps";
import CartItems from "./components/cart-items/cart-items";
import CartPriceDetails from "./components/cart-price-details/cart-price-details";
import CartEmpty from "./components/cart-empty/cart-empty";
import CartAddress from "./components/cart-address/cart-address";
import CartPayment from "./components/cart-payment/cart-payment";
import UserLoginApp from "../auth/login/user-login";

import type { DeliveryAddress } from "../checkout/checkout";

// ==================================================
// TYPES
// ==================================================

type CartStep = "bag" | "address" | "payment";

interface CartProps {
  /**
   * Optional callback when cart checkout is closed.
   */
  onClose?: () => void;
}

// ==================================================
// CONSTANTS
// ==================================================

const GUEST_CART_KEY = "website_guest_cart_id";

// ==================================================
// HELPERS
// ==================================================

const getGuestCartId = (): string => {
  const existingGuestId = localStorage.getItem(GUEST_CART_KEY);

  if (existingGuestId) {
    return existingGuestId;
  }

  const newGuestId = crypto.randomUUID();

  localStorage.setItem(GUEST_CART_KEY, newGuestId);

  return newGuestId;
};

// ==================================================
// COMPONENT
// ==================================================

const CartApp = ({ onClose }: CartProps) => {
  const navigate = useNavigate();

  // --------------------------------------------------
  // CURRENT CHECKOUT STEP
  // --------------------------------------------------

  const [currentStep, setCurrentStep] = useState<CartStep>("bag");

  // --------------------------------------------------
  // GUEST CART ID
  // --------------------------------------------------

  const [guestCartId, setGuestCartId] = useState<string | null>(null);

  // --------------------------------------------------
  // CUSTOMER
  // --------------------------------------------------

  const [customer, setCustomer] = useState<WebsiteUser | null>(null);

  // --------------------------------------------------
  // SELECTED ADDRESS
  // --------------------------------------------------

  const [selectedAddress, setSelectedAddress] =
    useState<DeliveryAddress | null>(null);

  // --------------------------------------------------
  // INITIALIZE GUEST CART
  // --------------------------------------------------

  useEffect(() => {
    const id = getGuestCartId();

    setGuestCartId(id);
  }, []);

  // --------------------------------------------------
  // CURRENT USER
  // --------------------------------------------------

  const {
    data: currentUserResponse,
    isLoading: isUserLoading,
    refetch: refetchCurrentUser,
  } = useGetCurrentUserQuery();

  // --------------------------------------------------
  // SET CUSTOMER
  // --------------------------------------------------

  useEffect(() => {
    if (currentUserResponse?.user) {
      setCustomer(currentUserResponse.user);
      return;
    }

    setCustomer(null);
  }, [currentUserResponse]);

  // --------------------------------------------------
  // CART IDENTITY
  // --------------------------------------------------

  /**
   * Logged-in customer:
   *
   * {
   *   customerId: customer.id
   * }
   *
   * Guest:
   *
   * {
   *   guestCartId
   * }
   *
   * Never send both identities at the same time.
   */

  const cartIdentity = useMemo<CartIdentity | undefined>(() => {
    if (customer?.id) {
      return {
        customerId: String(customer.id),
      };
    }

    if (guestCartId) {
      return {
        guestCartId,
      };
    }

    return undefined;
  }, [customer?.id, guestCartId]);

  // --------------------------------------------------
  // GET CART
  // --------------------------------------------------

  const {
    data: cart,
    isLoading: isCartLoading,
    isFetching: isCartFetching,
    isError: isCartError,
    refetch: refetchCart,
  } = useGetWebsiteCartQuery(cartIdentity, {
    skip: !cartIdentity,
  });

  // --------------------------------------------------
  // CART STATE
  // --------------------------------------------------

  const hasItems = Boolean(cart?.items?.length);

  // --------------------------------------------------
  // STEP NAVIGATION
  // --------------------------------------------------

  const handleStepChange = (step: CartStep) => {
    if (!hasItems) {
      return;
    }

    /**
     * Payment should only be reachable after
     * selecting an address.
     */
    if (step === "payment" && !selectedAddress) {
      setCurrentStep("address");
      return;
    }

    setCurrentStep(step);
  };

  // --------------------------------------------------
  // BAG -> ADDRESS
  // --------------------------------------------------

  const handleBagContinue = () => {
    if (!hasItems) {
      return;
    }

    setCurrentStep("address");
  };

  // --------------------------------------------------
  // ADDRESS -> PAYMENT
  // --------------------------------------------------

  const handleAddressContinue = () => {
    if (!hasItems || !selectedAddress || !customer) {
      return;
    }

    setCurrentStep("payment");
  };

  // --------------------------------------------------
  // LOGIN SUCCESS
  // --------------------------------------------------

  const handleLogin = async () => {
    /**
     * Login stores the website authentication token.
     *
     * Refetch the current-user endpoint so:
     *
     * customer
     *   ↓
     * cartIdentity
     *   ↓
     * customer cart
     *
     * gets updated automatically.
     */
    try {
      await refetchCurrentUser();
    } catch {
      // The current-user query will expose its own error state.
    }

    /**
     * Cart identity will automatically change once
     * customer state is updated.
     *
     * Explicit refetch is still useful when the cart
     * endpoint is already cached.
     */
    await refetchCart();
  };

  // --------------------------------------------------
  // PAYMENT SUCCESS
  // --------------------------------------------------

  const handleOrderSuccess = (orderId: string) => {
    navigate(`/order-success?orderId=${encodeURIComponent(orderId)}`);
  };

  // --------------------------------------------------
  // CLOSE CART
  // --------------------------------------------------

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }

    navigate("/");
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (isUserLoading || isCartLoading || !cartIdentity) {
    return (
      <section className="cart-app">
        <div className="container">
          <div className="cart-app-loading">
            <div
              className="spinner-border"
              role="status"
              aria-label="Loading cart"
            />

            <p>Loading your bag...</p>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (isCartError) {
    return (
      <section className="cart-app">
        <div className="container">
          <div className="cart-app-error">
            <div className="cart-app-error-icon">
              <i className="bi bi-exclamation-circle" />
            </div>

            <h5>Unable to load your bag</h5>

            <p>
              Something went wrong while loading your cart. Please try again.
            </p>

            <button
              type="button"
              className="cart-app-error-btn"
              onClick={() => refetchCart()}
            >
              <i className="bi bi-arrow-clockwise" />
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // EMPTY CART
  // --------------------------------------------------

  if (!cart || !hasItems) {
    return (
      <section className="cart-app">
        <div className="container">
          <CartEmpty onContinueShopping={() => navigate("/products")} />
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // MAIN CART
  // --------------------------------------------------

  return (
    <section className="cart-app">
      <div className="container">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="cart-app-header">
          <div>
            <h1 className="cart-app-title">Your Bag</h1>

            <p className="cart-app-description">
              Review your items and complete your order.
            </p>
          </div>

          <button
            type="button"
            className="cart-app-close"
            onClick={handleClose}
            aria-label="Close cart"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* ==========================================
            STEPS
        ========================================== */}

        <CartSteps currentStep={currentStep} onStepChange={handleStepChange} />

        {/* ==========================================
            BAG
        ========================================== */}

        {currentStep === "bag" && (
          <div className="cart-app-content">
            <div className="cart-app-main">
              <CartItems
                items={cart.items ?? []}
                identity={cartIdentity}
                isFetching={isCartFetching}
                onCartUpdated={refetchCart}
              />
            </div>

            <aside className="cart-app-sidebar">
              <CartPriceDetails cart={cart} onContinue={handleBagContinue} />
            </aside>
          </div>
        )}

        {/* ==========================================
            ADDRESS
        ========================================== */}

        {currentStep === "address" && (
          <div className="cart-app-content">
            <div className="cart-app-main">
              {!customer ? (
                <UserLoginApp onLogin={handleLogin} />
              ) : (
                <CartAddress
                  customer={customer}
                  selectedAddress={selectedAddress}
                  onAddressSelected={setSelectedAddress}
                  onContinue={handleAddressContinue}
                  onBack={() => setCurrentStep("bag")}
                />
              )}
            </div>

            <aside className="cart-app-sidebar">
              <CartPriceDetails cart={cart} />
            </aside>
          </div>
        )}

        {/* ==========================================
            PAYMENT
        ========================================== */}

        {currentStep === "payment" && (
          <div className="cart-app-content">
            <div className="cart-app-main">
              {customer && (
                <CartPayment
                  customer={customer}
                  cart={cart}
                  selectedAddress={selectedAddress}
                  onBack={() => setCurrentStep("address")}
                  onOrderSuccess={handleOrderSuccess}
                />
              )}
            </div>

            <aside className="cart-app-sidebar">
              <CartPriceDetails cart={cart} />
            </aside>
          </div>
        )}

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div className="cart-app-footer">
          <div className="cart-app-footer-security">
            <i className="bi bi-shield-check" />

            <span>Safe and secure shopping</span>
          </div>

          <div className="cart-app-footer-support">
            Need help? <button type="button">Contact Support</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartApp;
