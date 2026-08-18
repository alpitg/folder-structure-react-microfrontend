import { useState } from "react";

import type { ProfileSection } from "../profile";

import {
  useGetWebsiteProfileQuery,
  useUpdateWebsiteProfileMutation,
  type UpdateWebsiteProfileRequest,
  type WebsiteProfile,
} from "../../../../../app/redux/website/auth/website-profile.api";

// ============================================================
// TYPES
// ============================================================

interface ProfileOverviewProps {
  onSectionChange: (section: ProfileSection) => void;
}

interface ProfileEditFormProps {
  customer: WebsiteProfile;

  isLoading: boolean;

  onSubmit: (data: UpdateWebsiteProfileRequest) => void;

  onCancel: () => void;
}

// ============================================================
// EDIT FORM
// ============================================================

const ProfileEditForm = ({
  customer,
  isLoading,
  onSubmit,
  onCancel,
}: ProfileEditFormProps) => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [formData, setFormData] = useState<UpdateWebsiteProfileRequest>({
    name: customer.name ?? "",
    email: customer.email ?? "",
    mobile: customer.mobile ?? "",
    description: customer.description ?? "",
  });

  // ==========================================================
  // CHANGE
  // ==========================================================

  const handleChange = (
    field: keyof UpdateWebsiteProfileRequest,
    value: string,
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

    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      description: formData.description?.trim() || null,
    });
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="profile-section-card profile-main-card">
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="profile-card-header">
        <div>
          <h2>Edit Profile Information</h2>

          <p>Update your personal information.</p>
        </div>
      </div>

      {/* ====================================================
          FORM
      ==================================================== */}

      <form className="profile-overview-edit-form" onSubmit={handleSubmit}>
        {/* ==================================================
            NAME
        ================================================== */}

        <div className="profile-overview-field">
          <label htmlFor="profile-name">Name</label>

          <input
            id="profile-name"
            type="text"
            value={formData.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            required
            disabled={isLoading}
          />
        </div>

        {/* ==================================================
            EMAIL
        ================================================== */}

        <div className="profile-overview-field">
          <label htmlFor="profile-email">Email Address</label>

          <input
            id="profile-email"
            type="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="Enter email address"
            autoComplete="email"
            required
            disabled={isLoading}
          />
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div className="profile-overview-form-actions">
          {/* CANCEL */}

          <button
            type="button"
            className="profile-secondary-btn"
            onClick={onCancel}
            disabled={isLoading}
          >
            <i className="bi bi-x-lg" />

            <span>Cancel</span>
          </button>

          {/* SAVE */}

          <button
            type="submit"
            className="profile-primary-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="bi bi-arrow-repeat profile-overview-spin" />

                <span>Saving...</span>
              </>
            ) : (
              <>
                <i className="bi bi-check2" />

                <span>Save Changes</span>
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

const ProfileOverview = ({ onSectionChange }: ProfileOverviewProps) => {
  // ==========================================================
  // GET PROFILE
  // ==========================================================

  const {
    data: customer,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetWebsiteProfileQuery();

  // ==========================================================
  // UPDATE PROFILE
  // ==========================================================

  const [updateProfile, { isLoading: isUpdating, isError: isUpdateError }] =
    useUpdateWebsiteProfileMutation();

  // ==========================================================
  // STATE
  // ==========================================================

  const [isEditing, setIsEditing] = useState(false);

  // ==========================================================
  // UPDATE PROFILE
  // ==========================================================

  const handleUpdateProfile = async (formData: UpdateWebsiteProfileRequest) => {
    try {
      await updateProfile(formData).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.error("Unable to update profile:", error);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (isLoading) {
    return (
      <div className="profile-overview">
        <div className="profile-overview-loading">
          <div className="profile-overview-spinner">
            <i className="bi bi-arrow-repeat" />
          </div>

          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (isError || !customer) {
    return (
      <div className="profile-overview">
        <div className="profile-overview-error">
          <div className="profile-empty-icon">
            <i className="bi bi-exclamation-circle" />
          </div>

          <h3>Unable to load profile</h3>

          <p>Something went wrong while loading your profile information.</p>

          <button
            type="button"
            className="profile-primary-btn"
            onClick={() => refetch()}
          >
            <i className="bi bi-arrow-clockwise" />

            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================================
  // EDIT MODE
  // ==========================================================

  if (isEditing) {
    return (
      <div className="profile-overview">
        {/* ==================================================
            EDIT FORM
        ================================================== */}

        <ProfileEditForm
          customer={customer}
          isLoading={isUpdating}
          onSubmit={handleUpdateProfile}
          onCancel={() => setIsEditing(false)}
        />

        {/* ==================================================
            UPDATE ERROR
        ================================================== */}

        {isUpdateError && (
          <div className="profile-overview-fetching profile-overview-update-error">
            <i className="bi bi-exclamation-circle" />

            <span>Unable to update your profile. Please try again.</span>
          </div>
        )}

        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <div className="profile-section-title">
          <h2>Quick Actions</h2>
        </div>

        <ProfileQuickActions onSectionChange={onSectionChange} />
      </div>
    );
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="profile-overview">
      {/* ====================================================
          FETCHING
      ==================================================== */}

      {isFetching && (
        <div className="profile-overview-fetching">
          <i className="bi bi-arrow-repeat profile-overview-spin" />

          <span>Refreshing profile...</span>
        </div>
      )}

      {/* ====================================================
          PROFILE INFORMATION
      ==================================================== */}

      <div className="profile-section-card profile-main-card">
        {/* HEADER */}

        <div className="profile-card-header">
          <div>
            <h2>Profile Information</h2>

            <p>Manage your personal information.</p>
          </div>

          <button
            type="button"
            className="profile-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-pencil" />

            <span>Edit</span>
          </button>
        </div>

        {/* DETAILS */}

        <div className="profile-details-grid">
          {/* NAME */}

          <div className="profile-detail-item">
            <span>Name</span>

            <strong>{customer.name || "Not added"}</strong>
          </div>

          {/* EMAIL */}

          <div className="profile-detail-item">
            <span>Email Address</span>

            <strong>{customer.email || "Not added"}</strong>
          </div>
        </div>
      </div>

      {/* ====================================================
          QUICK ACTIONS
      ==================================================== */}

      <div className="profile-section-title">
        <h2>Quick Actions</h2>
      </div>

      <ProfileQuickActions onSectionChange={onSectionChange} />

      {/* ====================================================
          ACCOUNT INFORMATION
      ==================================================== */}

      <div className="profile-section-card profile-account-card">
        <div className="profile-card-header">
          <div>
            <h2>Account Information</h2>

            <p>Your account details.</p>
          </div>
        </div>

        <div className="profile-account-row">
          {/* CUSTOMER ID */}

          <div>
            <span>Customer ID</span>

            <strong>{customer.id || "—"}</strong>
          </div>

          {/* ACCOUNT STATUS */}

          <div>
            <span>Account Status</span>

            <strong
              className={
                customer.isActive
                  ? "profile-status-active"
                  : "profile-status-inactive"
              }
            >
              {customer.isActive ? "Active" : "Inactive"}
            </strong>
          </div>

          {/* CREATED */}

          <div>
            <span>Created</span>

            <strong>
              {customer.createdAt
                ? new Date(customer.createdAt).toLocaleDateString()
                : "—"}
            </strong>
          </div>

          {/* UPDATED */}

          <div>
            <span>Last Updated</span>

            <strong>
              {customer.updatedAt
                ? new Date(customer.updatedAt).toLocaleDateString()
                : "—"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// QUICK ACTIONS
// ============================================================

interface ProfileQuickActionsProps {
  onSectionChange: (section: ProfileSection) => void;
}

const ProfileQuickActions = ({ onSectionChange }: ProfileQuickActionsProps) => {
  return (
    <div className="profile-quick-grid">
      {/* ====================================================
          ORDERS
      ==================================================== */}

      <button
        type="button"
        className="profile-quick-card"
        onClick={() => onSectionChange("orders")}
      >
        <div className="profile-quick-icon orders">
          <i className="bi bi-bag" />
        </div>

        <div>
          <h3>My Orders</h3>

          <p>Track, return or cancel your orders.</p>
        </div>

        <i className="bi bi-chevron-right" />
      </button>

      {/* ====================================================
          ADDRESS
      ==================================================== */}

      <button
        type="button"
        className="profile-quick-card"
        onClick={() => onSectionChange("addresses")}
      >
        <div className="profile-quick-icon address">
          <i className="bi bi-geo-alt" />
        </div>

        <div>
          <h3>Saved Addresses</h3>

          <p>Manage your delivery addresses.</p>
        </div>

        <i className="bi bi-chevron-right" />
      </button>

      {/* ====================================================
          WISHLIST
      ==================================================== */}

      <button
        type="button"
        className="profile-quick-card"
        onClick={() => onSectionChange("wishlist")}
      >
        <div className="profile-quick-icon wishlist">
          <i className="bi bi-heart" />
        </div>

        <div>
          <h3>Wishlist</h3>

          <p>View your saved products.</p>
        </div>

        <i className="bi bi-chevron-right" />
      </button>
    </div>
  );
};

export default ProfileOverview;
