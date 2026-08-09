import "./profile.scss";

import { GetEnvConfig } from "../../../app.config";
import ProfileLoginForm from "../login/profile-login-form";
import { useState } from "react";

interface ProfileProps {
  isLoggedIn?: boolean;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

const Profile = ({ isLoggedIn = false, user }: ProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const appSettings = GetEnvConfig();

  const openProfile = () => {
    setIsOpen(true);
  };

  const closeProfile = () => {
    setIsOpen(false);
  };

  const handleLogin = (mobile: string) => {
    // Integrate your login API here.
    console.log("Login with:", mobile);

    // After successful login:
    // closeProfile();
  };

  return (
    <div className="profile-app">
      {/* PROFILE BUTTON */}

      <section className="profile-app">
        <div className="profile-container">
          <div className="profile-login-card">
            <div className="profile-login-icon">
              <i className="bi bi-person"></i>
            </div>

            <h1>Welcome to {appSettings?.name}</h1>

            <p>
              Login to access your profile, orders, wishlist and saved
              addresses.
            </p>

            <button
              type="button"
              className="profile-login-btn"
              onClick={openProfile}
            >
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login / Signup</span>
            </button>
          </div>
        </div>
      </section>

      {/* BOTTOM SHEET */}

      {isOpen && (
        <div
          className="n-bottom-sheet"
          role="dialog"
          aria-modal="true"
          aria-label={isLoggedIn ? "My Profile" : "Login"}
        >
          <button
            type="button"
            className="n-bottom-sheet-backdrop"
            onClick={closeProfile}
            aria-label="Close profile"
          />

          <div className="n-bottom-sheet-panel">
            <div className="n-bottom-sheet-handle" />

            {/* HEADER */}

            <div className="n-bottom-sheet-header">
              <div>
                <h2>{isLoggedIn ? "My Profile" : "Login"}</h2>

                <p>
                  {isLoggedIn
                    ? "Manage your account"
                    : "Login to access your account"}
                </p>
              </div>

              <button
                type="button"
                className="n-bottom-sheet-close"
                onClick={closeProfile}
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* BODY */}

            <div className="n-bottom-sheet-body">
              {isLoggedIn ? (
                <div className="account">
                  {/* ACCOUNT HEADER */}

                  <div className="account-header">
                    <div className="account-avatar">
                      <i className="bi bi-person-fill"></i>
                    </div>

                    <div className="account-info">
                      <strong>{user?.name || "User"}</strong>

                      {user?.email && <span>{user.email}</span>}

                      {user?.phone && <span>{user.phone}</span>}
                    </div>
                  </div>

                  {/* ACCOUNT MENU */}

                  <div className="account-menu">
                    <button type="button" className="account-menu-btn">
                      <i className="bi bi-bag"></i>
                      <span>My Orders</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>

                    <button type="button" className="account-menu-btn">
                      <i className="bi bi-heart"></i>
                      <span>Wishlist</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>

                    <button type="button" className="account-menu-btn">
                      <i className="bi bi-person"></i>
                      <span>Edit Profile</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>

                    <button type="button" className="account-menu-btn">
                      <i className="bi bi-geo-alt"></i>
                      <span>Saved Addresses</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>

                    <button type="button" className="account-menu-btn">
                      <i className="bi bi-question-circle"></i>
                      <span>Help &amp; Support</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>

                    <button
                      type="button"
                      className="account-menu-btn account-logout"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Logout</span>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <ProfileLoginForm onLogin={handleLogin} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
