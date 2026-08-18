import type { ProfileSection, ProfileUser } from "../profile";

interface ProfileSidebarProps {
  user?: ProfileUser;

  activeSection: ProfileSection;

  onSectionChange: (section: ProfileSection) => void;

  onLogout: () => void;
}

// ============================================================
// COMPONENT
// ============================================================

const ProfileSidebar = ({
  user,
  activeSection,
  onSectionChange,
  onLogout,
}: ProfileSidebarProps) => {
  const getInitial = () => {
    const name = user?.name || user?.mobile || "U";

    return name.charAt(0).toUpperCase();
  };

  const menuItems: Array<{
    id: ProfileSection;
    label: string;
    icon: string;
  }> = [
    {
      id: "overview",
      label: "Profile",
      icon: "bi-person",
    },

    {
      id: "orders",
      label: "Orders",
      icon: "bi-bag",
    },

    {
      id: "addresses",
      label: "Saved Addresses",
      icon: "bi-geo-alt",
    },

    {
      id: "wishlist",
      label: "Wishlist",
      icon: "bi-heart",
    },

    {
      id: "settings",
      label: "Account Settings",
      icon: "bi-gear",
    },
  ];

  return (
    <aside className="profile-sidebar">
      {/* ==================================================
          USER CARD
      ================================================== */}

      <div className="profile-user-card">
        <div className="profile-avatar">{getInitial()}</div>

        <div className="profile-user-info">
          <h3>{user?.name || "Welcome"}</h3>

          <p>{user?.mobile || user?.phone || "Customer"}</p>
        </div>
      </div>

      {/* ==================================================
          MENU
      ================================================== */}

      <nav className="profile-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              activeSection === item.id
                ? "profile-menu-item active"
                : "profile-menu-item"
            }
            onClick={() => onSectionChange(item.id)}
          >
            <i className={`bi ${item.icon}`} />

            <span>{item.label}</span>

            <i className="bi bi-chevron-right profile-menu-arrow" />
          </button>
        ))}
      </nav>

      {/* ==================================================
          LOGOUT
      ================================================== */}

      <div className="profile-sidebar-footer">
        <button type="button" className="profile-logout-btn" onClick={onLogout}>
          <i className="bi bi-box-arrow-right" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
