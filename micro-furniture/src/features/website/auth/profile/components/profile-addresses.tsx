import { useState } from "react";

import {
  useCreateWebsiteAddressMutation,
  useDeleteWebsiteAddressMutation,
  useGetWebsiteAddressesQuery,
  useSetDefaultWebsiteAddressMutation,
  useUpdateWebsiteAddressMutation,
  type CreateWebsiteAddressRequest,
  type WebsiteAddress,
} from "../../../../../app/redux/website/address/website-address.api";

// ============================================================
// TYPES
// ============================================================

type AddressFormMode = "create" | "edit";

interface AddressFormProps {
  address?: WebsiteAddress | null;
  mode: AddressFormMode;
  isLoading: boolean;
  onSubmit: (data: CreateWebsiteAddressRequest) => void;
  onCancel: () => void;
}

// ============================================================
// DEFAULT FORM
// ============================================================

const emptyAddressForm: CreateWebsiteAddressRequest = {
  name: "",
  mobile: "",
  addressType: "home",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

// ============================================================
// HELPERS
// ============================================================

const getAddressTypeLabel = (type?: string): string => {
  if (!type) {
    return "Other";
  }

  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
};

const getInitialFormData = (
  address?: WebsiteAddress | null,
): CreateWebsiteAddressRequest => {
  if (!address) {
    return {
      ...emptyAddressForm,
    };
  }

  return {
    name: address.name || "",
    mobile: address.mobile || "",
    addressType: address.addressType || "home",
    addressLine1: address.addressLine1 || "",
    addressLine2: address.addressLine2 || "",
    landmark: address.landmark || "",
    city: address.city || "",
    state: address.state || "",
    pincode: address.pincode || "",
    isDefault: address.isDefault || false,
  };
};

// ============================================================
// ADDRESS FORM
// ============================================================

const ProfileAddressForm = ({
  address,
  mode,
  isLoading,
  onSubmit,
  onCancel,
}: AddressFormProps) => {
  const [formData, setFormData] = useState<CreateWebsiteAddressRequest>(
    getInitialFormData(address),
  );

  // ==========================================================
  // CHANGE
  // ==========================================================

  const handleChange = (
    field: keyof CreateWebsiteAddressRequest,
    value: string | boolean,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(formData);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="profile-address-form-wrapper">
      <div className="profile-address-form-header">
        <div>
          <h3>{mode === "create" ? "Add New Address" : "Edit Address"}</h3>

          <p>
            {mode === "create"
              ? "Add a delivery address for faster checkout."
              : "Update your delivery address details."}
          </p>
        </div>
      </div>

      <form className="profile-address-form" onSubmit={handleSubmit}>
        {/* ==================================================
            NAME
        ================================================== */}

        <div className="profile-address-form-row">
          <div className="profile-address-field">
            <label htmlFor="address-name">Full Name</label>

            <input
              id="address-name"
              type="text"
              value={formData.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="profile-address-field">
            <label htmlFor="address-mobile">Mobile Number</label>

            <input
              id="address-mobile"
              type="tel"
              value={formData.mobile}
              onChange={(event) => handleChange("mobile", event.target.value)}
              placeholder="Enter mobile number"
              required
            />
          </div>
        </div>

        {/* ==================================================
            ADDRESS TYPE
        ================================================== */}

        <div className="profile-address-field">
          <label htmlFor="address-type">Address Type</label>

          <select
            id="address-type"
            value={formData.addressType || "home"}
            onChange={(event) =>
              handleChange("addressType", event.target.value)
            }
          >
            <option value="home">Home</option>

            <option value="work">Work</option>

            <option value="other">Other</option>
          </select>
        </div>

        {/* ==================================================
            ADDRESS LINE 1
        ================================================== */}

        <div className="profile-address-field">
          <label htmlFor="address-line-1">Address</label>

          <input
            id="address-line-1"
            type="text"
            value={formData.addressLine1}
            onChange={(event) =>
              handleChange("addressLine1", event.target.value)
            }
            placeholder="House / Flat / Building / Street"
            required
          />
        </div>

        {/* ==================================================
            ADDRESS LINE 2
        ================================================== */}

        <div className="profile-address-field">
          <label htmlFor="address-line-2">
            Address Line 2<span>Optional</span>
          </label>

          <input
            id="address-line-2"
            type="text"
            value={formData.addressLine2 || ""}
            onChange={(event) =>
              handleChange("addressLine2", event.target.value)
            }
            placeholder="Area / Locality"
          />
        </div>

        {/* ==================================================
            LANDMARK
        ================================================== */}

        <div className="profile-address-field">
          <label htmlFor="address-landmark">
            Landmark
            <span>Optional</span>
          </label>

          <input
            id="address-landmark"
            type="text"
            value={formData.landmark || ""}
            onChange={(event) => handleChange("landmark", event.target.value)}
            placeholder="Nearby landmark"
          />
        </div>

        {/* ==================================================
            CITY / STATE / PINCODE
        ================================================== */}

        <div className="profile-address-form-row">
          <div className="profile-address-field">
            <label htmlFor="address-city">City</label>

            <input
              id="address-city"
              type="text"
              value={formData.city}
              onChange={(event) => handleChange("city", event.target.value)}
              placeholder="City"
              required
            />
          </div>

          <div className="profile-address-field">
            <label htmlFor="address-state">State</label>

            <input
              id="address-state"
              type="text"
              value={formData.state}
              onChange={(event) => handleChange("state", event.target.value)}
              placeholder="State"
              required
            />
          </div>

          <div className="profile-address-field">
            <label htmlFor="address-pincode">Pincode</label>

            <input
              id="address-pincode"
              type="text"
              value={formData.pincode}
              onChange={(event) => handleChange("pincode", event.target.value)}
              placeholder="Pincode"
              required
            />
          </div>
        </div>

        {/* ==================================================
            DEFAULT
        ================================================== */}

        <label className="profile-address-default">
          <input
            type="checkbox"
            checked={formData.isDefault || false}
            onChange={(event) =>
              handleChange("isDefault", event.target.checked)
            }
          />

          <span>Make this my default address</span>
        </label>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div className="profile-address-form-actions">
          <button
            type="button"
            className="profile-secondary-btn"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="profile-primary-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="bi bi-arrow-repeat profile-address-spin" />

                <span>Saving...</span>
              </>
            ) : (
              <>
                <i className="bi bi-check2" />

                <span>
                  {mode === "create" ? "Save Address" : "Update Address"}
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// ============================================================
// COMPONENT
// ============================================================

const ProfileAddresses = () => {
  // ==========================================================
  // API
  // ==========================================================

  const { data, isLoading, isFetching, isError, refetch } =
    useGetWebsiteAddressesQuery();

  const [createAddress, { isLoading: isCreating }] =
    useCreateWebsiteAddressMutation();

  const [updateAddress, { isLoading: isUpdating }] =
    useUpdateWebsiteAddressMutation();

  const [deleteAddress, { isLoading: isDeleting }] =
    useDeleteWebsiteAddressMutation();

  const [setDefaultAddress, { isLoading: isSettingDefault }] =
    useSetDefaultWebsiteAddressMutation();

  // ==========================================================
  // STATE
  // ==========================================================

  const [formMode, setFormMode] = useState<AddressFormMode | null>(null);

  const [selectedAddress, setSelectedAddress] = useState<WebsiteAddress | null>(
    null,
  );

  // ==========================================================
  // DATA
  // ==========================================================

  const addresses = data?.addresses || [];

  // ==========================================================
  // ADD ADDRESS
  // ==========================================================

  const handleAddAddress = () => {
    setSelectedAddress(null);

    setFormMode("create");
  };

  // ==========================================================
  // EDIT ADDRESS
  // ==========================================================

  const handleEditAddress = (address: WebsiteAddress) => {
    setSelectedAddress(address);

    setFormMode("edit");
  };

  // ==========================================================
  // CLOSE FORM
  // ==========================================================

  const handleCloseForm = () => {
    setFormMode(null);

    setSelectedAddress(null);
  };

  // ==========================================================
  // CREATE / UPDATE
  // ==========================================================

  const handleSubmitAddress = async (formData: CreateWebsiteAddressRequest) => {
    try {
      if (formMode === "edit" && selectedAddress) {
        await updateAddress({
          addressId: selectedAddress.id,
          body: formData,
        }).unwrap();
      } else {
        await createAddress(formData).unwrap();
      }

      handleCloseForm();
    } catch (error) {
      console.error("Unable to save address:", error);
    }
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDeleteAddress = async (address: WebsiteAddress) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the address for ${address.name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAddress(address.id).unwrap();
    } catch (error) {
      console.error("Unable to delete address:", error);
    }
  };

  // ==========================================================
  // SET DEFAULT
  // ==========================================================

  const handleSetDefault = async (address: WebsiteAddress) => {
    if (address.isDefault) {
      return;
    }

    try {
      await setDefaultAddress(address.id).unwrap();
    } catch (error) {
      console.error("Unable to set default address:", error);
    }
  };

  // ==========================================================
  // FORM
  // ==========================================================

  if (formMode) {
    return (
      <div className="profile-addresses">
        <ProfileAddressForm
          address={selectedAddress}
          mode={formMode}
          isLoading={isCreating || isUpdating}
          onSubmit={handleSubmitAddress}
          onCancel={handleCloseForm}
        />
      </div>
    );
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (isLoading) {
    return (
      <div className="profile-addresses">
        <div className="profile-address-loading">
          <div className="profile-address-spinner">
            <i className="bi bi-arrow-repeat" />
          </div>

          <p>Loading your addresses...</p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (isError) {
    return (
      <div className="profile-addresses">
        <div className="profile-address-error">
          <div className="profile-empty-icon">
            <i className="bi bi-exclamation-circle" />
          </div>

          <h3>Unable to load addresses</h3>

          <p>Something went wrong while loading your saved addresses.</p>

          <button
            type="button"
            className="profile-primary-btn"
            onClick={() => refetch()}
          >
            <i className="bi bi-arrow-clockwise" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="profile-addresses">
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="profile-content-header">
        <div>
          <h2>Saved Addresses</h2>

          <p>Manage your delivery addresses.</p>
        </div>

        <button
          type="button"
          className="profile-primary-btn"
          onClick={handleAddAddress}
        >
          <i className="bi bi-plus-lg" />

          <span>Add New Address</span>
        </button>
      </div>

      {/* ====================================================
          FETCHING INDICATOR
      ==================================================== */}

      {isFetching && !isLoading && (
        <div className="profile-address-fetching">
          <i className="bi bi-arrow-repeat profile-address-spin" />
          Updating addresses...
        </div>
      )}

      {/* ====================================================
          EMPTY
      ==================================================== */}

      {addresses.length === 0 ? (
        <div className="profile-empty-state">
          <div className="profile-empty-icon">
            <i className="bi bi-geo-alt" />
          </div>

          <h3>No saved addresses</h3>

          <p>Add an address for faster checkout.</p>

          <button
            type="button"
            className="profile-primary-btn"
            onClick={handleAddAddress}
          >
            <i className="bi bi-plus" />
            Add Address
          </button>
        </div>
      ) : (
        /* ==================================================
           ADDRESS LIST
        ================================================== */

        <div className="profile-address-list">
          {addresses?.map((address) => (
            <div
              key={address.id}
              className={`profile-address-card ${
                address.isDefault ? "profile-address-card-default" : ""
              }`}
            >
              {/* ==========================================
                    TOP
                ========================================== */}

              <div className="profile-address-top">
                <div className="profile-address-title">
                  <div className="profile-address-badges">
                    <span className="profile-address-type">
                      {getAddressTypeLabel(address.addressType)}
                    </span>

                    {address.isDefault && (
                      <span className="profile-address-default-badge">
                        Default
                      </span>
                    )}
                  </div>

                  <h3>{address.name}</h3>
                </div>

                {/* ========================================
                      MENU
                  ======================================== */}

                <div className="profile-address-actions">
                  <button
                    type="button"
                    className="profile-address-action-btn"
                    onClick={() => handleEditAddress(address)}
                    disabled={isDeleting || isSettingDefault}
                    title="Edit address"
                  >
                    <i className="bi bi-pencil" />
                  </button>

                  <button
                    type="button"
                    className="profile-address-action-btn profile-address-delete-btn"
                    onClick={() => handleDeleteAddress(address)}
                    disabled={isDeleting}
                    title="Delete address"
                  >
                    <i className="bi bi-trash" />
                  </button>
                </div>
              </div>

              {/* ==========================================
                    ADDRESS
                ========================================== */}

              <div className="profile-address-content">
                <p>{address.addressLine1}</p>

                {address.addressLine2 && <p>{address.addressLine2}</p>}

                {address.landmark && (
                  <p>
                    <span>Landmark:</span> {address.landmark}
                  </p>
                )}

                <p>
                  {address.city}, {address.state} - {address.pincode}
                </p>

                <strong>Mobile: {address.mobile}</strong>
              </div>

              {/* ==========================================
                    BOTTOM
                ========================================== */}

              {!address.isDefault && (
                <div className="profile-address-bottom">
                  <button
                    type="button"
                    className="profile-address-default-btn"
                    onClick={() => handleSetDefault(address)}
                    disabled={isSettingDefault}
                  >
                    {isSettingDefault ? (
                      <>
                        <i className="bi bi-arrow-repeat profile-address-spin" />
                        Setting default...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check2-circle" />
                        Set as Default
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileAddresses;
