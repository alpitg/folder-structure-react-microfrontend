import "./address-selection.scss";

import type { Customer, DeliveryAddress } from "../checkout";
import { useEffect, useState } from "react";

interface AddressSelectionAppProps {
  customer: Customer | null;
  selectedAddress: DeliveryAddress | null;
  onAddressSelected: (address: DeliveryAddress) => void;
  onClose?: () => void;
}

const ADDRESS_KEY = "website_customer_addresses";

const emptyForm: Omit<DeliveryAddress, "id"> = {
  name: "",
  mobile: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  addressType: "home",
  isDefault: false,
};

const AddressSelectionApp = ({
  customer,
  selectedAddress,
  onAddressSelected,
  onClose,
}: AddressSelectionAppProps) => {
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const [form, setForm] = useState<Omit<DeliveryAddress, "id">>(emptyForm);

  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(ADDRESS_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setAddresses(parsed);
        }
      } catch {
        setAddresses([]);
      }
    }
  }, []);

  useEffect(() => {
    if (customer?.mobile && !form.mobile) {
      setForm((current) => ({
        ...current,
        mobile: customer.mobile,
        name: customer.name || "",
      }));
    }
  }, [customer]);

  const handleFormChange = (
    field: keyof Omit<DeliveryAddress, "id">,
    value: string | boolean,
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

  const handleSaveAddress = () => {
    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
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

    if (!/^\d{6}$/.test(form.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    const newAddress: DeliveryAddress = {
      id: crypto.randomUUID(),
      ...form,
      isDefault: addresses.length === 0,
    };

    const nextAddresses = [
      ...addresses.map((address) => ({
        ...address,
        isDefault:
          newAddress.isDefault && address.isDefault ? false : address.isDefault,
      })),
      newAddress,
    ];

    localStorage.setItem(ADDRESS_KEY, JSON.stringify(nextAddresses));

    setAddresses(nextAddresses);

    setForm({
      ...emptyForm,
      mobile: customer?.mobile || "",
      name: customer?.name || "",
    });

    setIsAddingAddress(false);
    setError("");

    onAddressSelected(newAddress);
  };

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
