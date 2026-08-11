import "./profile.scss";

import { GetEnvConfig } from "../../../../app.config";
import UserLoginApp from "../login/user-login";
import { useState } from "react";

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

interface LoginCustomer {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;
}

const Profile = ({ isLoggedIn = false, user }: ProfileProps) => {
  const appSettings = GetEnvConfig();

  const storedCustomerId = localStorage.getItem("customerId");
  const storedCustomerMobile = localStorage.getItem("customerMobile");
  const storedCustomerName = localStorage.getItem("customerName");
  const storedCustomerEmail = localStorage.getItem("customerEmail");

  const hasStoredLogin = Boolean(
    storedCustomerId || localStorage.getItem("access_token"),
  );

  const [isOpen, setIsOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(isLoggedIn || hasStoredLogin);

  const [currentUser, setCurrentUser] = useState<ProfileUser | undefined>(
    user || {
      id: storedCustomerId || undefined,
      name: storedCustomerName || undefined,
      email: storedCustomerEmail || undefined,
      phone: storedCustomerMobile || undefined,
      mobile: storedCustomerMobile || undefined,
    },
  );

  const openProfile = () => {
    if (loggedIn) {
      return;
    }

    setIsOpen(true);
  };

  const closeProfile = () => {
    setIsOpen(false);
  };

  const handleLogin = (
    customerId: string,
    mobile: string,
    customer?: LoginCustomer,
  ) => {
    localStorage.setItem("customerId", customerId);
    localStorage.setItem("customerMobile", mobile);

    if (customer?.name) {
      localStorage.setItem("customerName", customer.name);
    }

    if (customer?.email) {
      localStorage.setItem("customerEmail", customer.email);
    }

    setCurrentUser({
      id: customerId,
      mobile: mobile,
      phone: mobile,
      name: customer?.name,
      email: customer?.email,
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
