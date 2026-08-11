import "./address-selection.scss";

import { useState } from "react";

export interface WebsiteAddress {
  id: string;
  name: string;
  mobile: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  addressType?: "home" | "office" | "other";
  isDefault?: boolean;
}

interface AddressSelectionAppProps {
  addresses?: WebsiteAddress[];
  selectedAddressId?: string;
  onSelect?: (address: WebsiteAddress) => void;
  onAddAddress?: (address: WebsiteAddress) => void;
  onContinue?: (address: WebsiteAddress) => void;
  onClose?: () => void;
}

const AddressSelectionApp = ({
  addresses = [],
  selectedAddressId,
  onSelect,
  onAddAddress,
  onContinue,
  onClose,
}: AddressSelectionAppProps) => {
  const defaultAddress =
    addresses.find((address) => address.isDefault) ||
    addresses.find((address) => address.id === selectedAddressId) ||
    addresses[0];

  const [selectedId, setSelectedId] = useState<string>(
    selectedAddressId || defaultAddress?.id || "",
  );

  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "home" as "home" | "office" | "other",
  });

  const [error, setError] = useState("");

  const selectedAddress = addresses.find(
    (address) => address.id === selectedId,
  );

  const handleSelect = (address: WebsiteAddress) => {
    setSelectedId(address.id);
    setError("");

    onSelect?.(address);
  };

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  };

  const handleSaveAddress = () => {
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.mobile.trim() || form.mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!form.addressLine1.trim()) {
      setError("Please enter your address.");
      return;
    }

    if (!form.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    if (!form.state.trim()) {
      setError("Please enter your state.");
      return;
    }

    if (!form.pincode.trim() || form.pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    const newAddress: WebsiteAddress = {
      id: `address-${Date.now()}`,
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      addressLine1: form.addressLine1.trim(),
      addressLine2: form.addressLine2.trim() || undefined,
      landmark: form.landmark.trim() || undefined,
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim(),
      addressType: form.addressType,
      isDefault: addresses.length === 0,
    };

    onAddAddress?.(newAddress);

    setSelectedId(newAddress.id);

    setIsAddingAddress(false);

    setForm({
      name: "",
      mobile: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      addressType: "home",
    });

    setError("");

    onSelect?.(newAddress);
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      setError("Please select a delivery address.");
      return;
    }

    onContinue?.(selectedAddress);
  };

  return (
    <div
      className="address-selection-container"
      role="dialog"
      aria-modal="true"
      aria-label="Select delivery address"
    >
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

      {!isAddingAddress ? (
        <>
          <div className="address-selection-body">
            {addresses.length === 0 ? (
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
                    const isSelected = selectedId === address.id;

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

                            {address.addressType && (
                              <span className="address-type">
                                {address.addressType.toUpperCase()}
                              </span>
                            )}

                            {address.isDefault && (
                              <span className="address-default">DEFAULT</span>
                            )}
                          </div>

                          <p>
                            {address.addressLine1}
                            {address.addressLine2 && (
                              <>, {address.addressLine2}</>
                            )}
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
                onClick={handleContinue}
                disabled={!selectedAddress}
              >
                <span>Deliver to this address</span>
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          )}
        </>
      ) : (
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
                    <button
                      type="button"
                      className={
                        form.addressType === "home"
                          ? "address-type-option-selected"
                          : "address-type-option"
                      }
                      onClick={() => handleFormChange("addressType", "home")}
                    >
                      Home
                    </button>

                    <button
                      type="button"
                      className={
                        form.addressType === "office"
                          ? "address-type-option-selected"
                          : "address-type-option"
                      }
                      onClick={() => handleFormChange("addressType", "office")}
                    >
                      Office
                    </button>

                    <button
                      type="button"
                      className={
                        form.addressType === "other"
                          ? "address-type-option-selected"
                          : "address-type-option"
                      }
                      onClick={() => handleFormChange("addressType", "other")}
                    >
                      Other
                    </button>
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
            >
              Save Address
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressSelectionApp;
