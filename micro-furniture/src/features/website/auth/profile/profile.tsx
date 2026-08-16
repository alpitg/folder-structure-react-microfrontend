import "./profile.scss";

import { GetEnvConfig } from "../../../../app.config";
import UserLoginApp from "../login/user-login";
import { WEBSITE_AUTH_KEY } from "../../../../constants/global/global-key.const";
import { useState } from "react";

// ============================================================
// TYPES
// ============================================================

interface ProfileUser {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
}

interface ProfileProps {
  isLoggedIn?: boolean;
  user?: ProfileUser;
}

interface WebsiteAuth {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;

  customerId?: string;
  mobile?: string;
  name?: string;
  email?: string;
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
  // STORED WEBSITE AUTH
  // ==========================================================

  const storedAuth = getStoredWebsiteAuth();

  const hasStoredLogin = Boolean(
    storedAuth?.accessToken && storedAuth?.customerId,
  );

  // ==========================================================
  // STATE
  // ==========================================================

  const [isOpen, setIsOpen] = useState(false);

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

  // ==========================================================
  // OPEN LOGIN / PROFILE
  // ==========================================================

  const openProfile = () => {
    if (loggedIn) {
      // TODO:
      // Navigate to actual profile page when implemented.
      return;
    }

    setIsOpen(true);
  };

  // ==========================================================
  // CLOSE LOGIN
  // ==========================================================

  const closeProfile = () => {
    setIsOpen(false);
  };

  // ==========================================================
  // LOGIN SUCCESS
  // ==========================================================

  const handleLogin = (customerId: string, mobile: string) => {
    /**
     * UserLoginApp already stores the complete
     * website authentication object.
     *
     * Read it again here so Profile stays in sync
     * with the authentication source of truth.
     */
    const auth = getStoredWebsiteAuth();

    const customer = {
      id: customerId,

      mobile: auth?.mobile || mobile,

      phone: auth?.mobile || mobile,

      name: auth?.name,

      email: auth?.email,
    };

    setCurrentUser(customer);

    setLoggedIn(true);

    setIsOpen(false);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="profile-app">
      <section className="profile-container">
        <div className="profile-login-card">
          {/* ==================================================
              ICON
          ================================================== */}

          <div className="profile-login-icon">
            <i className="bi bi-person" />
          </div>

          {/* ==================================================
              TITLE
          ================================================== */}

          <h1>
            {loggedIn
              ? `Welcome ${currentUser?.name || "User"}`
              : `Welcome to ${appSettings?.name}`}
          </h1>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <p>
            {loggedIn
              ? "Manage your profile, orders, wishlist and saved addresses."
              : "Login to access your profile, orders, wishlist and saved addresses."}
          </p>

          {/* ==================================================
              ACTION
          ================================================== */}

          <button
            type="button"
            className="profile-login-btn"
            onClick={openProfile}
          >
            <i
              className={loggedIn ? "bi bi-person" : "bi bi-box-arrow-in-right"}
            />

            <span>{loggedIn ? "My Profile" : "Login / Signup"}</span>
          </button>
        </div>
      </section>

      {/* ======================================================
          LOGIN MODAL
      ====================================================== */}

      {isOpen && <UserLoginApp onLogin={handleLogin} onClose={closeProfile} />}
    </div>
  );
};

export default Profile;
