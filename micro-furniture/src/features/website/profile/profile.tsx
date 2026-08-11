import "./profile.scss";

import { GetEnvConfig } from "../../../app.config";
import UserLoginApp from "../auth/login/user-login";
import { useState } from "react";

interface ProfileProps {
  isLoggedIn?: boolean;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
}

const Profile = ({ isLoggedIn = false, user }: ProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [currentUser, setCurrentUser] = useState(user);

  const appSettings = GetEnvConfig();

  const openProfile = () => {
    setIsOpen(true);
  };

  const closeProfile = () => {
    setIsOpen(false);
  };

  const handleLogin = (customerId: string, mobile: string) => {
    localStorage.setItem("customerId", customerId);

    localStorage.setItem("customerMobile", mobile);

    setCurrentUser({
      id: customerId,
      phone: mobile,
    });

    setLoggedIn(true);
    setIsOpen(false);
  };

  return (
    <div className="profile-app">
      <section className="profile-container">
        <div className="profile-login-card">
          <div className="profile-login-icon">
            <i className="bi bi-person"></i>
          </div>

          <h1>
            {loggedIn
              ? `Welcome ${currentUser?.name || "User"}`
              : `Welcome to ${appSettings?.name}`}
          </h1>

          <p>
            {loggedIn
              ? "Manage your profile, orders, wishlist and saved addresses."
              : "Login to access your profile, orders, wishlist and saved addresses."}
          </p>

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

      {isOpen && <UserLoginApp onLogin={handleLogin} onClose={closeProfile} />}
    </div>
  );
};

export default Profile;
