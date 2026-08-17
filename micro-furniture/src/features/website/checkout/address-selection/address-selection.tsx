import "./address-selection.scss";

import { useEffect, useState } from "react";

import type { Customer, DeliveryAddress } from "../checkout";

import {
  useCreateWebsiteAddressMutation,
  useGetWebsiteAddressesQuery,
  type WebsiteAddress,
} from "../../../../app/redux/website/address/website-address.api";

interface AddressForm {
  name: string;
  mobile: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  addressType: string; //"home" | "office" | "other";
}

interface AddressSelectionAppProps {
  customer: Customer | null;
  selectedAddress: DeliveryAddress | null;
  onAddressSelected: (address: DeliveryAddress) => void;
  onClose?: () => void;
}

const emptyForm: AddressForm = {
  name: "",
  mobile: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  addressType: "home",
};

const mapWebsiteAddressToDeliveryAddress = (
  address: WebsiteAddress,
): DeliveryAddress => {
  return {
    id: String(address.id),
    name: address.name,
    mobile: address.mobile,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2 ?? "",
    landmark: address.landmark ?? "",
    city: address.city,
    state: address.state,
    pincode: address.pincode,
    addressType:
      address.addressType === "work" ? "office" : address.addressType,
    isDefault: address.isDefault,
  };
};

const AddressSelectionApp = ({
  customer,
  selectedAddress,
  onAddressSelected,
  onClose,
}: AddressSelectionAppProps) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [form, setForm] = useState<AddressForm>(emptyForm);
  const [error, setError] = useState("");

  const {
    data: addressesResponse,
    isLoading: isAddressesLoading,
    isFetching: isAddressesFetching,
    isError: isAddressesError,
    refetch: refetchAddresses,
  } = useGetWebsiteAddressesQuery(undefined, {
    skip: !customer?.id,
  });

  const [createAddress, { isLoading: isCreatingAddress }] =
    useCreateWebsiteAddressMutation();

  const addresses: DeliveryAddress[] = (addressesResponse?.addresses ?? []).map(
    mapWebsiteAddressToDeliveryAddress,
  );

  useEffect(() => {
    if (!customer) {
      return;
    }

    setForm((current) => ({
      ...current,
      name: current.name || customer.name || "",
      mobile: current.mobile || customer.mobile || "",
    }));
  }, [customer]);

  const handleFormChange = <K extends keyof AddressForm>(
    field: K,
    value: AddressForm[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  };

  const handleSelect = (address: DeliveryAddress) => {
    onAddressSelected(address);
  };

  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (!form.addressLine1.trim()) {
      setError("Please enter your address.");
      return false;
    }

    if (!form.city.trim()) {
      setError("Please enter your city.");
      return false;
    }

    if (!form.state.trim()) {
      setError("Please enter your state.");
      return false;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return false;
    }

    return true;
  };

  const handleSaveAddress = async () => {
    if (isCreatingAddress) {
      return;
    }

    if (!customer?.id) {
      setError("Please login to save a delivery address.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setError("");

      const response = await createAddress({
        name: form.name.trim(),
        mobile: form.mobile,
        addressLine1: form.addressLine1.trim(),
        addressLine2: form.addressLine2.trim() || undefined,
        landmark: form.landmark.trim() || undefined,
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode,
        addressType: form.addressType === "office" ? "work" : form.addressType,
        isDefault: addresses.length === 0,
      }).unwrap();

      const newAddress = mapWebsiteAddressToDeliveryAddress(response.address);

      onAddressSelected(newAddress);

      setForm({
        ...emptyForm,
        mobile: customer.mobile || "",
        name: customer.name || "",
      });

      setIsAddingAddress(false);
      setError("");

      await refetchAddresses();
    } catch (error: unknown) {
      console.error("Unable to save address:", error);

      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as {
          data?: {
            detail?: string;
            message?: string;
          };
        };

        setError(
          apiError.data?.detail ||
            apiError.data?.message ||
            "Unable to save address. Please try again.",
        );

        return;
      }

      if (error instanceof Error) {
        setError(error.message);
        return;
      }

      setError("Unable to save address. Please try again.");
    }
  };

  const addressLoadError = isAddressesError
    ? "Unable to load your saved addresses."
    : "";

  return (
    <div
      className="address-selection-container"
      role="dialog"
      aria-modal="true"
      aria-label="Select delivery address"
    >
      {/* ============================================= */}
      {/* HEADER */}
      {/* ============================================= */}

      <div className="address-selection-header">
        <div>
          <h5 className="address-selection-title">Select Delivery Address</h5>

          <p className="address-selection-description">
            Choose where you want your order delivered.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            className="address-selection-close"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="bi bi-x-lg" />
          </button>
        )}
      </div>

      {/* ============================================= */}
      {/* ADDRESS LIST */}
      {/* ============================================= */}

      {!isAddingAddress ? (
        <>
          <div className="address-selection-body">
            {isAddressesLoading || isAddressesFetching ? (
              <div className="address-empty-state">
                <div className="address-empty-icon">
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  />
                </div>

                <h6>Loading saved addresses</h6>

                <p>Please wait while we load your addresses.</p>
              </div>
            ) : addressLoadError ? (
              <div className="address-empty-state">
                <div className="address-empty-icon">
                  <i className="bi bi-exclamation-circle" />
                </div>

                <h6>Unable to load addresses</h6>

                <p>{addressLoadError}</p>

                <button
                  type="button"
                  className="address-add-btn"
                  onClick={() => refetchAddresses()}
                >
                  <i className="bi bi-arrow-clockwise" />
                  Try Again
                </button>
              </div>
            ) : addresses.length === 0 ? (
              <div className="address-empty-state">
                <div className="address-empty-icon">
                  <i className="bi bi-geo-alt" />
                </div>

                <h6>No saved addresses</h6>

                <p>Add a delivery address to continue with your order.</p>

                <button
                  type="button"
                  className="address-add-btn"
                  onClick={() => setIsAddingAddress(true)}
                >
                  <i className="bi bi-plus-lg" />
                  Add New Address
                </button>
              </div>
            ) : (
              <>
                <div className="address-list">
                  {addresses.map((address) => {
                    const isSelected = selectedAddress?.id === address.id;

                    return (
                      <button
                        type="button"
                        key={address.id}
                        className={`address-card ${
                          isSelected ? "address-card-selected" : ""
                        }`}
                        onClick={() => handleSelect(address)}
                      >
                        <div className="address-card-radio">
                          <span
                            className={
                              isSelected ? "address-radio-selected" : ""
                            }
                          />
                        </div>

                        <div className="address-card-content">
                          <div className="address-card-header">
                            <strong>{address.name}</strong>

                            <span className="address-type">
                              {address.addressType.toUpperCase()}
                            </span>

                            {address.isDefault && (
                              <span className="address-default">DEFAULT</span>
                            )}
                          </div>

                          <p>
                            {address.addressLine1}
                            {address.addressLine2 &&
                              `, ${address.addressLine2}`}
                          </p>

                          {address.landmark && (
                            <p>Landmark: {address.landmark}</p>
                          )}

                          <p>
                            {address.city}, {address.state} - {address.pincode}
                          </p>

                          <p className="address-mobile">
                            Mobile: {address.mobile}
                          </p>
                        </div>

                        <div className="address-card-check">
                          {isSelected && (
                            <i className="bi bi-check-circle-fill" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="address-add-btn"
                  onClick={() => setIsAddingAddress(true)}
                >
                  <i className="bi bi-plus-lg" />
                  Add New Address
                </button>
              </>
            )}

            {error && (
              <div className="address-error">
                <i className="bi bi-exclamation-circle" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {addresses.length > 0 && (
            <div className="address-selection-footer">
              <button
                type="button"
                className="address-continue-btn"
                onClick={() => {
                  if (selectedAddress) {
                    onAddressSelected(selectedAddress);
                  }
                }}
                disabled={!selectedAddress}
              >
                <span>Deliver to this address</span>

                <i className="bi bi-arrow-right" />
              </button>
            </div>
          )}
        </>
      ) : (
        /* ============================================= */
        /* ADD ADDRESS */
        /* ============================================= */

        <>
          <div className="address-selection-body address-form-body">
            <div className="address-form-header">
              <button
                type="button"
                className="address-back-btn"
                onClick={() => {
                  setIsAddingAddress(false);
                  setError("");
                }}
                disabled={isCreatingAddress}
              >
                <i className="bi bi-arrow-left" />
              </button>

              <div>
                <h6>Add New Address</h6>

                <p>Enter your delivery address details.</p>
              </div>
            </div>

            <div className="address-form">
              <div className="address-form-row">
                <div className="address-form-field">
                  <label htmlFor="address-name">Full Name</label>

                  <input
                    id="address-name"
                    type="text"
                    value={form.name}
                    placeholder="Enter full name"
                    disabled={isCreatingAddress}
                    onChange={(event) =>
                      handleFormChange("name", event.target.value)
                    }
                  />
                </div>

                <div className="address-form-field">
                  <label htmlFor="address-mobile">Mobile Number</label>

                  <input
                    id="address-mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.mobile}
                    placeholder="10-digit mobile number"
                    disabled={isCreatingAddress}
                    onChange={(event) =>
                      handleFormChange(
                        "mobile",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                  />
                </div>
              </div>

              <div className="address-form-field">
                <label htmlFor="address-line-1">Address</label>

                <input
                  id="address-line-1"
                  type="text"
                  value={form.addressLine1}
                  placeholder="House No., Building, Street"
                  disabled={isCreatingAddress}
                  onChange={(event) =>
                    handleFormChange("addressLine1", event.target.value)
                  }
                />
              </div>

              <div className="address-form-field">
                <label htmlFor="address-line-2">Area / Locality</label>

                <input
                  id="address-line-2"
                  type="text"
                  value={form.addressLine2}
                  placeholder="Area, locality"
                  disabled={isCreatingAddress}
                  onChange={(event) =>
                    handleFormChange("addressLine2", event.target.value)
                  }
                />
              </div>

              <div className="address-form-field">
                <label htmlFor="address-landmark">Landmark</label>

                <input
                  id="address-landmark"
                  type="text"
                  value={form.landmark}
                  placeholder="Nearby landmark (optional)"
                  disabled={isCreatingAddress}
                  onChange={(event) =>
                    handleFormChange("landmark", event.target.value)
                  }
                />
              </div>

              <div className="address-form-row">
                <div className="address-form-field">
                  <label htmlFor="address-city">City</label>

                  <input
                    id="address-city"
                    type="text"
                    value={form.city}
                    placeholder="City"
                    disabled={isCreatingAddress}
                    onChange={(event) =>
                      handleFormChange("city", event.target.value)
                    }
                  />
                </div>

                <div className="address-form-field">
                  <label htmlFor="address-state">State</label>

                  <input
                    id="address-state"
                    type="text"
                    value={form.state}
                    placeholder="State"
                    disabled={isCreatingAddress}
                    onChange={(event) =>
                      handleFormChange("state", event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="address-form-row">
                <div className="address-form-field">
                  <label htmlFor="address-pincode">Pincode</label>

                  <input
                    id="address-pincode"
                    type="tel"
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pincode}
                    placeholder="6-digit pincode"
                    disabled={isCreatingAddress}
                    onChange={(event) =>
                      handleFormChange(
                        "pincode",
                        event.target.value.replace(/\D/g, ""),
                      )
                    }
                  />
                </div>

                <div className="address-form-field">
                  <label>Address Type</label>

                  <div className="address-type-options">
                    {(["home", "office", "other"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={
                          form.addressType === type
                            ? "address-type-option-selected"
                            : "address-type-option"
                        }
                        onClick={() => handleFormChange("addressType", type)}
                        disabled={isCreatingAddress}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="address-error">
                  <i className="bi bi-exclamation-circle" />

                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          <div className="address-selection-footer">
            <button
              type="button"
              className="address-save-btn"
              onClick={handleSaveAddress}
              disabled={isCreatingAddress}
            >
              {isCreatingAddress ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  />
                  Saving Address...
                </>
              ) : (
                "Save Address"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressSelectionApp;
