import "./cart.scss";

import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router";

import {
  useGetWebsiteCartQuery,
  useMergeGuestCartMutation,
  type CartIdentity,
} from "../../../app/redux/website/cart/cart.api";

import {
  useGetCurrentUserQuery,
  type WebsiteUser,
} from "../../../app/redux/website/auth/profile-login.api";

import CartSteps from "./components/cart-steps/cart-steps";
import CartItems from "./components/cart-items/cart-items";
import CartPriceDetails from "./components/cart-price-details/cart-price-details";
import CartEmpty from "./components/cart-empty/cart-empty";
import CartAddress from "./components/cart-address/cart-address";

import CartPayment, {
  type CreateOrderPayload,
  type CreateOrderResponse,
  type VerifyPaymentPayload,
  type VerifyPaymentResponse,
} from "./components/cart-payment/cart-payment";

import UserLoginApp from "../auth/login/user-login";

import type { DeliveryAddress } from "../checkout/checkout";

import {
  useCreateWebsiteOrderMutation,
  useVerifyWebsitePaymentMutation,
} from "../../../app/redux/website/order/website-order.api";

// ============================================================
// TYPES
// ============================================================

type CartStep = "bag" | "address" | "payment";

interface CartProps {
  onClose?: () => void;
}

// ============================================================
// CONSTANTS
// ============================================================

const GUEST_CART_KEY = "website_guest_cart_id";

// ============================================================
// HELPERS
// ============================================================

const getGuestCartId = (): string => {
  const existing = localStorage.getItem(GUEST_CART_KEY);

  if (existing) {
    return existing;
  }

  const id = crypto.randomUUID();

  localStorage.setItem(GUEST_CART_KEY, id);

  return id;
};

// ============================================================
// COMPONENT
// ============================================================

const CartApp = ({ onClose }: CartProps) => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<CartStep>("bag");

  const [guestCartId, setGuestCartId] = useState<string | null>(null);

  const [hasProcessedCustomer, setHasProcessedCustomer] = useState(false);

  const [isCartMerged, setIsCartMerged] = useState(false);

  const [selectedAddress, setSelectedAddress] =
    useState<DeliveryAddress | null>(null);

  // ==========================================================
  // INITIALIZE GUEST CART
  // ==========================================================

  useEffect(() => {
    setGuestCartId(getGuestCartId());
  }, []);

  // ==========================================================
  // CURRENT USER
  // ==========================================================

  const {
    data: currentUserResponse,
    isLoading: isUserLoading,
    refetch: refetchCurrentUser,
  } = useGetCurrentUserQuery();

  const customer: WebsiteUser | null = currentUserResponse?.user ?? null;

  // ==========================================================
  // MERGE GUEST CART
  // ==========================================================

  const [mergeGuestCart, { isLoading: isMergingCart }] =
    useMergeGuestCartMutation();

  useEffect(() => {
    if (!customer?.id) {
      setHasProcessedCustomer(false);
      setIsCartMerged(false);

      return;
    }

    if (!guestCartId) {
      setIsCartMerged(true);
      setHasProcessedCustomer(true);

      return;
    }

    let cancelled = false;

    const merge = async () => {
      try {
        await mergeGuestCart({
          guestCartId,
          customerId: String(customer.id),
        }).unwrap();

        localStorage.removeItem(GUEST_CART_KEY);

        if (cancelled) {
          return;
        }

        setGuestCartId(null);
        setIsCartMerged(true);
        setHasProcessedCustomer(true);
      } catch (error) {
        console.error("Unable to merge guest cart:", error);

        if (!cancelled) {
          setIsCartMerged(false);
          setHasProcessedCustomer(false);
        }
      }
    };

    merge();

    return () => {
      cancelled = true;
    };
  }, [customer?.id, guestCartId, mergeGuestCart]);

  // ==========================================================
  // CART IDENTITY
  // ==========================================================

  const cartIdentity = useMemo<CartIdentity | undefined>(() => {
    if (customer?.id) {
      if (!hasProcessedCustomer || !isCartMerged) {
        return undefined;
      }

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
  }, [customer?.id, guestCartId, hasProcessedCustomer, isCartMerged]);

  // ==========================================================
  // CART
  // ==========================================================

  const {
    data: cart,
    isLoading: isCartLoading,
    isFetching: isCartFetching,
    isError: isCartError,
    refetch: refetchCart,
  } = useGetWebsiteCartQuery(cartIdentity as CartIdentity, {
    skip: !cartIdentity,
  });

  const hasItems = Boolean(cart?.items?.length);

  // ==========================================================
  // ORDER MUTATIONS
  // ==========================================================

  const [createWebsiteOrder, { isLoading: isCreatingOrder }] =
    useCreateWebsiteOrderMutation();

  const [verifyWebsitePayment, { isLoading: isVerifyingPayment }] =
    useVerifyWebsitePaymentMutation();

  // ==========================================================
  // CUSTOMER CHANGE
  // ==========================================================

  useEffect(() => {
    setSelectedAddress(null);
    setCurrentStep("bag");
  }, [customer?.id]);

  // ==========================================================
  // ADDRESS SELECTED
  // ==========================================================

  const handleAddressSelected = (address: DeliveryAddress) => {
    setSelectedAddress(address);
  };

  // ==========================================================
  // STEP CHANGE
  // ==========================================================

  const handleStepChange = (step: CartStep) => {
    if (!hasItems) {
      return;
    }

    if (step === "payment") {
      if (!customer) {
        setCurrentStep("address");
        return;
      }

      if (!selectedAddress) {
        setCurrentStep("address");
        return;
      }
    }

    if (step === "address" && !customer) {
      setCurrentStep("address");
      return;
    }

    setCurrentStep(step);
  };

  // ==========================================================
  // BAG CONTINUE
  // ==========================================================

  const handleBagContinue = () => {
    if (!hasItems) {
      return;
    }

    setCurrentStep("address");
  };

  // ==========================================================
  // ADDRESS CONTINUE
  // ==========================================================

  const handleAddressContinue = () => {
    if (!hasItems || !customer || !selectedAddress) {
      return;
    }

    setCurrentStep("payment");
  };

  // ==========================================================
  // LOGIN
  // ==========================================================

  const handleLogin = async () => {
    try {
      await refetchCurrentUser();
    } catch {
      // Query owns error state.
    }
  };

  // ==========================================================
  // CREATE ORDER
  // ==========================================================

  const handleCreateOrder = async (
    payload: CreateOrderPayload,
  ): Promise<CreateOrderResponse> => {
    if (!customer?.id) {
      throw new Error("Customer information is missing.");
    }

    if (!selectedAddress) {
      throw new Error("Please select a delivery address.");
    }

    if (!selectedAddress.id) {
      throw new Error("Selected delivery address is invalid.");
    }

    if (!cart?.items?.length) {
      throw new Error("Your cart is empty.");
    }

    // ========================================================
    // BUILD BACKEND-SAFE ADDRESS
    //
    // DeliveryAddress has optional isDefault.
    // CreateWebsiteOrderRequest requires boolean.
    // Therefore explicitly convert it to boolean.
    // ========================================================

    const deliveryAddress = {
      id: selectedAddress.id,

      name: selectedAddress.name,

      mobile: selectedAddress.mobile,

      addressType: selectedAddress.addressType,

      addressLine1: selectedAddress.addressLine1,

      addressLine2: selectedAddress.addressLine2 ?? null,

      landmark: selectedAddress.landmark ?? null,

      city: selectedAddress.city,

      state: selectedAddress.state,

      pincode: selectedAddress.pincode,

      isDefault: Boolean(selectedAddress.isDefault),
    };

    // ========================================================
    // BUILD ORDER PAYLOAD
    // ========================================================

    const orderPayload = {
      ...payload,

      customerId: String(customer.id),

      customerName:
        customer.name || payload.customerName || selectedAddress.name || "",

      deliveryAddress,
    };

    const response = await createWebsiteOrder(orderPayload).unwrap();

    if (!response?.order?._id) {
      throw new Error(
        "Order was created but the backend did not return an order ID.",
      );
    }

    return response;
  };

  // ==========================================================
  // VERIFY PAYMENT
  // ==========================================================

  const handleVerifyPayment = async (
    payload: VerifyPaymentPayload,
  ): Promise<VerifyPaymentResponse> => {
    const response = await verifyWebsitePayment(payload).unwrap();

    if (!response.success) {
      throw new Error(response.message || "Payment verification failed.");
    }

    return response;
  };

  // ==========================================================
  // ORDER SUCCESS
  // ==========================================================

  const handleOrderSuccess = async (orderId: string) => {
    try {
      await refetchCart();
    } catch {
      // Navigation should still continue.
    }

    navigate(`/order-success?orderId=${encodeURIComponent(orderId)}`);
  };

  // ==========================================================
  // CLOSE
  // ==========================================================

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }

    navigate("/");
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (isUserLoading || isCartLoading || isMergingCart || !cartIdentity) {
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

  // ==========================================================
  // ERROR
  // ==========================================================

  if (isCartError) {
    return (
      <section className="cart-app">
        <div className="container">
          <div className="cart-app-error">
            <div className="cart-app-error-icon">
              <i className="bi bi-exclamation-circle" />
            </div>

            <h5>Unable to load your bag</h5>

            <p>Something went wrong while loading your cart.</p>

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

  // ==========================================================
  // EMPTY
  // ==========================================================

  if (!cart || !hasItems) {
    return (
      <section className="cart-app">
        <div className="container">
          <CartEmpty onContinueShopping={() => navigate("/products")} />
        </div>
      </section>
    );
  }

  // ==========================================================
  // MAIN
  // ==========================================================

  return (
    <section className="cart-app">
      <div className="container">
        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

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

        {/* ================================================== */}
        {/* STEPS */}
        {/* ================================================== */}

        <CartSteps currentStep={currentStep} onStepChange={handleStepChange} />

        {/* ================================================== */}
        {/* BAG */}
        {/* ================================================== */}

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

        {/* ================================================== */}
        {/* ADDRESS */}
        {/* ================================================== */}

        {currentStep === "address" && (
          <div className="cart-app-content">
            <div className="cart-app-main">
              {!customer ? (
                <UserLoginApp onLogin={handleLogin} />
              ) : (
                <CartAddress
                  customer={customer}
                  selectedAddress={selectedAddress}
                  onAddressSelected={handleAddressSelected}
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

        {/* ================================================== */}
        {/* PAYMENT */}
        {/* ================================================== */}

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
                  createOrder={handleCreateOrder}
                  verifyPayment={handleVerifyPayment}
                  isProcessing={isCreatingOrder || isVerifyingPayment}
                />
              )}
            </div>

            <aside className="cart-app-sidebar">
              <CartPriceDetails cart={cart} />
            </aside>
          </div>
        )}

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <div className="cart-app-footer">
          <div className="cart-app-footer-support">
            Need help? <button type="button">Contact Support</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartApp;
