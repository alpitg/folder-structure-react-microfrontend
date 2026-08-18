import "./profile.scss";

import { GetEnvConfig } from "../../../../app.config";
import ProfileAddresses from "./components/profile-addresses";
import ProfileOrders from "./components/profile-orders";
import ProfileOverview from "./components/profile-overview";
import ProfileSidebar from "./components/profile-sidebar";
import ProfileWishlist from "./components/profile-wishlist";
import UserLoginApp from "../login/user-login";
import { WEBSITE_AUTH_KEY } from "../../../../constants/global/global-key.const";
import { useState } from "react";

// ============================================================
// TYPES
// ============================================================

export interface ProfileUser {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
}

export interface WebsiteAuth {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;

  customerId?: string;
  mobile?: string;
  name?: string;
  email?: string;
}

export type ProfileSection =
  | "overview"
  | "orders"
  | "addresses"
  | "wishlist"
  | "settings";

interface ProfileProps {
  isLoggedIn?: boolean;
  user?: ProfileUser;
}

// ============================================================
// HELPERS
// ============================================================

const getStoredWebsiteAuth = (): WebsiteAuth | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const authString = localStorage.getItem(WEBSITE_AUTH_KEY);

  if (!authString) {
    return null;
  }

  try {
    return JSON.parse(authString) as WebsiteAuth;
  } catch (error) {
    console.error("Invalid website authentication data:", error);

    return null;
  }
};

// ============================================================
// COMPONENT
// ============================================================

const Profile = ({ isLoggedIn = false, user }: ProfileProps) => {
  const appSettings = GetEnvConfig();

  // ==========================================================
  // AUTH
  // ==========================================================

  const storedAuth = getStoredWebsiteAuth();

  const hasStoredLogin = Boolean(
    storedAuth?.accessToken && storedAuth?.customerId,
  );

  // ==========================================================
  // STATE
  // ==========================================================

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(isLoggedIn || hasStoredLogin);

  const [currentUser, setCurrentUser] = useState<ProfileUser | undefined>(
    user || {
      id: storedAuth?.customerId,

      name: storedAuth?.name,

      email: storedAuth?.email,

      phone: storedAuth?.mobile,

      mobile: storedAuth?.mobile,
    },
  );

  const [activeSection, setActiveSection] =
    useState<ProfileSection>("overview");

  // ==========================================================
  // LOGIN
  // ==========================================================

  const handleLogin = (customerId: string, mobile: string) => {
    const auth = getStoredWebsiteAuth();

    const customer: ProfileUser = {
      id: customerId,

      mobile: auth?.mobile || mobile,

      phone: auth?.mobile || mobile,

      name: auth?.name,

      email: auth?.email,
    };

    setCurrentUser(customer);

    setLoggedIn(true);

    setIsLoginOpen(false);

    setActiveSection("overview");
  };

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = () => {
    localStorage.removeItem(WEBSITE_AUTH_KEY);

    setLoggedIn(false);

    setCurrentUser(undefined);

    setActiveSection("overview");
  };

  // ==========================================================
  // LOGIN SCREEN
  // ==========================================================

  if (!loggedIn) {
    return (
      <div className="profile-app">
        <section className="profile-login-page">
          <div className="profile-login-card">
            <div className="profile-login-icon">
              <i className="bi bi-person" />
            </div>

            <h1>Welcome to {appSettings?.name}</h1>

            <p>
              Login to access your profile, orders, wishlist and saved
              addresses.
            </p>

            <button
              type="button"
              className="profile-login-btn"
              onClick={() => setIsLoginOpen(true)}
            >
              <i className="bi bi-box-arrow-in-right" />

              <span>Login / Signup</span>
            </button>
          </div>
        </section>

        {isLoginOpen && (
          <UserLoginApp
            onLogin={handleLogin}
            onClose={() => setIsLoginOpen(false)}
          />
        )}
      </div>
    );
  }

  // ==========================================================
  // PROFILE CONTENT
  // ==========================================================

  const renderContent = () => {
    switch (activeSection) {
      case "orders":
        return <ProfileOrders />;

      case "addresses":
        return <ProfileAddresses />;

      case "wishlist":
        return <ProfileWishlist />;

      case "settings":
        return (
          <div className="profile-empty-state">
            <div className="profile-empty-icon">
              <i className="bi bi-gear" />
            </div>

            <h3>Account Settings</h3>

            <p>Manage your account preferences here.</p>
          </div>
        );

      case "overview":
      default:
        return <ProfileOverview onSectionChange={setActiveSection} />;
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="profile-app">
      <div className="profile-page">
        {/* ==================================================
            PAGE HEADER
        ================================================== */}

        <div className="profile-page-header">
          <div>
            <h1>My Account</h1>

            <p>Manage your account, orders and preferences.</p>
          </div>
        </div>

        {/* ==================================================
            PROFILE LAYOUT
        ================================================== */}

        <div className="profile-layout">
          {/* ==================================================
              SIDEBAR
          ================================================== */}

          <ProfileSidebar
            user={currentUser}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onLogout={handleLogout}
          />

          {/* ==================================================
              CONTENT
          ================================================== */}

          <main className="profile-content">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
