import "./checkout.scss";

import AddressSelectionApp from "./address-selection/address-selection";
import PaymentApp from "./payment/payment";
import { useState } from "react";

export type CheckoutStep = 1 | 2 | 3;

export interface Customer {
  id: string;
  mobile: string;
  name?: string;
  email?: string;
}

export interface DeliveryAddress {
  id: string;
  name: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: "home" | "office" | "other";
  isDefault?: boolean;
}

interface CheckoutAppProps {
  customer: Customer | null;
  onLogin: (customerId: string, mobile: string) => void;
  onClose: () => void;
  initialStep?: CheckoutStep;
  cart: any;
  summary: any;
  guestCartId: string | null;
  appSettings: any;
  createWebsiteOrder: any;
  verifyWebsitePayment: any;
  isCreatingOrder: boolean;
  isVerifyingPayment: boolean;
  navigate: any;
}

const CheckoutApp = ({
  customer,
  onClose,
  cart,
  summary,
  guestCartId,
  appSettings,
  createWebsiteOrder,
  verifyWebsitePayment,
  isCreatingOrder,
  isVerifyingPayment,
  navigate,
}: CheckoutAppProps) => {
  const [step, setStep] = useState<CheckoutStep>(2);

  const [selectedAddress, setSelectedAddress] =
    useState<DeliveryAddress | null>(null);

  const handleAddressSelected = (address: DeliveryAddress) => {
    setSelectedAddress(address);
    setStep(3);
  };

  const handleBackToAddress = () => {
    setStep(2);
  };

  return (
    <div className="checkout-container">
      {/* ============================================= */}
      {/* CHECKOUT STEPS */}
      {/* ============================================= */}

      <div className="checkout-progress">
        <div
          className={`checkout-step ${step >= 1 ? "checkout-step-active" : ""}`}
        >
          <span className="checkout-step-number">1</span>
          <span className="checkout-step-label">BAG</span>
        </div>

        <div className="checkout-step-line" />

        <div
          className={`checkout-step ${step >= 2 ? "checkout-step-active" : ""}`}
        >
          <span className="checkout-step-number">2</span>
          <span className="checkout-step-label">ADDRESS</span>
        </div>

        <div className="checkout-step-line" />

        <div
          className={`checkout-step ${step >= 3 ? "checkout-step-active" : ""}`}
        >
          <span className="checkout-step-number">3</span>
          <span className="checkout-step-label">PAYMENT</span>
        </div>
      </div>

      {/* ============================================= */}
      {/* STEP 2 - ADDRESS */}
      {/* ============================================= */}

      {step === 2 && (
        <AddressSelectionApp
          customer={customer}
          onClose={onClose}
          selectedAddress={selectedAddress}
          onAddressSelected={handleAddressSelected}
        />
      )}

      {/* ============================================= */}
      {/* STEP 3 - PAYMENT */}
      {/* ============================================= */}

      {step === 3 && selectedAddress && (
        <PaymentApp
          customer={customer}
          address={selectedAddress}
          cart={cart}
          summary={summary}
          guestCartId={guestCartId}
          appSettings={appSettings}
          createWebsiteOrder={createWebsiteOrder}
          verifyWebsitePayment={verifyWebsitePayment}
          isCreatingOrder={isCreatingOrder}
          isVerifyingPayment={isVerifyingPayment}
          navigate={navigate}
          onBack={handleBackToAddress}
        />
      )}
    </div>
  );
};

export default CheckoutApp;
