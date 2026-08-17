import "./cart-address.scss";

import type { Customer, DeliveryAddress } from "../../../checkout/checkout";

import AddressSelectionApp from "../../../checkout/address-selection/address-selection";

import type { WebsiteUser } from "../../../../../app/redux/website/auth/profile-login.api";

import { useEffect, useState } from "react";

import {
  useGetWebsiteAddressesQuery,
  type WebsiteAddress,
} from "../../../../../app/redux/website/address/website-address.api";

// ============================================================
// TYPES
// ============================================================

interface CartAddressProps {
  customer?: WebsiteUser | null;

  selectedAddress: DeliveryAddress | null;

  onAddressSelected: (address: DeliveryAddress) => void;

  onContinue: () => void;

  onBack?: () => void;
}

// ============================================================
// HELPERS
// ============================================================

const convertWebsiteAddressToDeliveryAddress = (
  address: WebsiteAddress,
): DeliveryAddress => {
  return {
    id: address.id,
    name: address.name,
    mobile: address.mobile,
    addressType: address.addressType,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2 ?? null,
    landmark: address.landmark ?? null,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    isDefault: address.isDefault,
  };
};

// ============================================================
// COMPONENT
// ============================================================

const CartAddress = ({
  customer,
  selectedAddress,
  onAddressSelected,
  onContinue,
  onBack,
}: CartAddressProps) => {
  const [showAddressSelection, setShowAddressSelection] = useState(false);

  // ==========================================================
  // GET SAVED ADDRESSES
  //
  // This query only runs while CartAddress is mounted.
  // CartAddress is mounted only on the address step.
  // ==========================================================

  const {
    data: addressesResponse,
    isLoading: isAddressesLoading,
    isError: isAddressesError,
    refetch: refetchAddresses,
  } = useGetWebsiteAddressesQuery(undefined, {
    skip: !customer?.id,
  });

  // ==========================================================
  // CONVERT USER TO CHECKOUT CUSTOMER
  // ==========================================================

  const addressCustomer: Customer | null = customer
    ? {
        id: customer.id ?? "",
        name: customer.name ?? "",
        email: customer.email ?? "",
        mobile: customer.mobile ?? "",
      }
    : null;

  // ==========================================================
  // AUTO SELECT DEFAULT ADDRESS
  // ==========================================================

  useEffect(() => {
    // Already selected.
    if (selectedAddress) {
      return;
    }

    const addresses = addressesResponse?.addresses ?? [];

    if (addresses.length === 0) {
      return;
    }

    const defaultAddress = addresses.find(
      (address) => address.isDefault === true,
    );

    if (!defaultAddress) {
      return;
    }

    const deliveryAddress =
      convertWebsiteAddressToDeliveryAddress(defaultAddress);

    onAddressSelected(deliveryAddress);
  }, [addressesResponse, selectedAddress, onAddressSelected]);

  // ==========================================================
  // ADDRESS SELECTED
  // ==========================================================

  const handleAddressSelected = (address: DeliveryAddress) => {
    onAddressSelected(address);

    setShowAddressSelection(false);
  };

  // ==========================================================
  // CONTINUE
  // ==========================================================

  const handleContinue = () => {
    if (!selectedAddress) {
      return;
    }

    onContinue();
  };

  // ==========================================================
  // ADDRESS SELECTION SCREEN
  // ==========================================================

  if (showAddressSelection) {
    return (
      <div className="cart-address">
        <div className="cart-address-selection">
          <div className="cart-address-selection-header">
            <button
              type="button"
              className="cart-address-back-button"
              onClick={() => setShowAddressSelection(false)}
              aria-label="Back to address"
            >
              <i className="bi bi-arrow-left" />
            </button>

            <div>
              <h4 className="cart-address-title">Select Delivery Address</h4>

              <p className="cart-address-subtitle">
                Choose where you want your order delivered.
              </p>
            </div>
          </div>

          <AddressSelectionApp
            customer={addressCustomer}
            selectedAddress={selectedAddress}
            onAddressSelected={handleAddressSelected}
            onClose={() => setShowAddressSelection(false)}
          />
        </div>
      </div>
    );
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (isAddressesLoading) {
    return (
      <section className="cart-address">
        <div className="cart-address-content">
          <div className="cart-address-empty">
            <div
              className="spinner-border"
              role="status"
              aria-label="Loading addresses"
            />

            <p>Loading your delivery addresses...</p>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (isAddressesError) {
    return (
      <section className="cart-address">
        <div className="cart-address-content">
          <div className="cart-address-empty">
            <div className="cart-address-empty-icon">
              <i className="bi bi-exclamation-circle" />
            </div>

            <h5>Unable to load addresses</h5>

            <p>We couldn't load your saved delivery addresses.</p>

            <button
              type="button"
              className="cart-address-add-button"
              onClick={() => refetchAddresses()}
            >
              <i className="bi bi-arrow-clockwise" />

              <span>Try Again</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================================
  // MAIN
  // ==========================================================

  return (
    <section className="cart-address">
      <div className="cart-address-header">
        <div>
          <h4 className="cart-address-title">Delivery Address</h4>

          <p className="cart-address-subtitle">
            Select an address where you want your order delivered.
          </p>
        </div>

        {selectedAddress && (
          <button
            type="button"
            className="cart-address-change-button"
            onClick={() => setShowAddressSelection(true)}
          >
            Change
          </button>
        )}
      </div>

      <div className="cart-address-content">
        {!selectedAddress ? (
          <div className="cart-address-empty">
            <div className="cart-address-empty-icon">
              <i className="bi bi-geo-alt" />
            </div>

            <h5>No delivery address selected</h5>

            <p>Please select or add a delivery address before continuing.</p>

            <button
              type="button"
              className="cart-address-add-button"
              onClick={() => setShowAddressSelection(true)}
            >
              <i className="bi bi-plus-lg" />

              <span>Add Delivery Address</span>
            </button>
          </div>
        ) : (
          <div className="cart-address-card">
            <div className="cart-address-card-header">
              <div className="cart-address-card-title">
                <span className="cart-address-radio">
                  <span />
                </span>

                <strong>{selectedAddress.name}</strong>

                <span className="cart-address-type">
                  {selectedAddress.addressType.toUpperCase()}
                </span>

                {selectedAddress.isDefault && (
                  <span className="cart-address-default">DEFAULT</span>
                )}
              </div>

              <button
                type="button"
                className="cart-address-edit-button"
                onClick={() => setShowAddressSelection(true)}
              >
                Edit
              </button>
            </div>

            <div className="cart-address-card-body">
              <p className="cart-address-line">
                {selectedAddress.addressLine1}
              </p>

              {selectedAddress.addressLine2 && (
                <p className="cart-address-line">
                  {selectedAddress.addressLine2}
                </p>
              )}

              {selectedAddress.landmark && (
                <p className="cart-address-line">
                  Landmark: {selectedAddress.landmark}
                </p>
              )}

              <p className="cart-address-line">
                {selectedAddress.city}, {selectedAddress.state} -{" "}
                {selectedAddress.pincode}
              </p>

              <p className="cart-address-mobile">
                <span>Mobile:</span> {selectedAddress.mobile}
              </p>
            </div>

            <div className="cart-address-delivery-info">
              <i className="bi bi-truck" />

              <div>
                <strong>Delivering to this address</strong>

                <span>
                  Your order will be delivered to the address selected above.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="cart-address-footer">
        {onBack && (
          <button
            type="button"
            className="cart-address-back-footer-button"
            onClick={onBack}
          >
            <i className="bi bi-arrow-left" />

            <span>Back to Bag</span>
          </button>
        )}

        <button
          type="button"
          className="cart-address-continue-button"
          disabled={!selectedAddress}
          onClick={handleContinue}
        >
          <span>Continue to Payment</span>

          <i className="bi bi-arrow-right" />
        </button>
      </div>
    </section>
  );
};

export default CartAddress;
