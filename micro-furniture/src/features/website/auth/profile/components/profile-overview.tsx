// ============================================================
// TYPES
// ============================================================

import type { ProfileSection, ProfileUser } from "../profile";

interface ProfileOverviewProps {
  user?: ProfileUser;

  onSectionChange: (section: ProfileSection) => void;
}

// ============================================================
// COMPONENT
// ============================================================

const ProfileOverview = ({ user, onSectionChange }: ProfileOverviewProps) => {
  return (
    <div className="profile-overview">
      {/* ==================================================
          PROFILE HEADER
      ================================================== */}

      <div className="profile-section-card profile-main-card">
        <div className="profile-card-header">
          <div>
            <h2>Profile Information</h2>

            <p>Manage your personal information.</p>
          </div>

          <button type="button" className="profile-edit-btn">
            <i className="bi bi-pencil" />
            Edit
          </button>
        </div>

        {/* ==================================================
            DETAILS
        ================================================== */}

        <div className="profile-details-grid">
          <div className="profile-detail-item">
            <span>Name</span>

            <strong>{user?.name || "Not added"}</strong>
          </div>

          <div className="profile-detail-item">
            <span>Mobile Number</span>

            <strong>{user?.mobile || user?.phone || "Not added"}</strong>
          </div>

          <div className="profile-detail-item">
            <span>Email Address</span>

            <strong>{user?.email || "Not added"}</strong>
          </div>
        </div>
      </div>

      {/* ==================================================
          QUICK ACTIONS
      ================================================== */}

      <div className="profile-section-title">
        <h2>Quick Actions</h2>
      </div>

      <div className="profile-quick-grid">
        {/* ORDERS */}

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

        {/* ADDRESS */}

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

        {/* WISHLIST */}

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

      {/* ==================================================
          ACCOUNT INFO
      ================================================== */}

      <div className="profile-section-card profile-account-card">
        <div className="profile-card-header">
          <div>
            <h2>Account Information</h2>

            <p>Your account details.</p>
          </div>
        </div>

        <div className="profile-account-row">
          <div>
            <span>Customer ID</span>

            <strong>{user?.id || "—"}</strong>
          </div>

          <div>
            <span>Account Status</span>

            <strong className="profile-status-active">Active</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
