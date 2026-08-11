import "./user-login.scss";

import { GetEnvConfig } from "../../../app.config";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { useState } from "react";
import { useWebsiteLoginMutation } from "../../../app/redux/website/auth/profile-login.api";

interface UserLoginAppProps {
  onLogin?: (customerId: string, mobile: string) => void;
  onClose?: () => void;
}

const UserLoginApp = ({ onLogin, onClose }: UserLoginAppProps) => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const appSettings = GetEnvConfig();

  const [websiteLogin, { isLoading }] = useWebsiteLoginMutation();

  const handleLogin = async () => {
    if (!mobile) {
      setError("Please enter your mobile number.");
      return;
    }

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    try {
      const response = await websiteLogin({
        mobile,
      }).unwrap();

      if (!response?.success) {
        setError(response?.message || "Unable to login. Please try again.");
        return;
      }

      const customerId = response?.user?.id;

      if (!customerId) {
        setError(
          "Login successful, but customer information was not received.",
        );
        return;
      }

      onLogin?.(customerId, mobile);
    } catch (error: any) {
      setError(
        error?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="user-login-app">
      <div className="user-login-backdrop"></div>
      <div className="user-login-container">
        <div className="user-login-header">
          <div>
            <h5 className="user-login-title">Login to your account</h5>

            <p className="user-login-description">
              Enter your mobile number to continue shopping and manage your
              orders.
            </p>
          </div>

          {onClose && (
            <button
              type="button"
              className="user-login-close"
              onClick={onClose}
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          )}
        </div>

        <div className="user-login-body">
          <div className="account-field">
            <label htmlFor="user-mobile">Mobile Number</label>

            <div
              className={`account-input ${error ? "account-input-error" : ""}`}
            >
              <span className="account-input-prefix">+91</span>

              <input
                id="user-mobile"
                type="tel"
                value={mobile}
                maxLength={10}
                inputMode="numeric"
                autoComplete="tel"
                placeholder="Enter mobile number"
                disabled={isLoading}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");

                  setMobile(value);
                  setError("");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleLogin();
                  }
                }}
              />
            </div>

            {error && (
              <div className="account-error">
                <i className="bi bi-exclamation-circle"></i>
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="account-login-action"
            onClick={handleLogin}
            disabled={isLoading}
          >
            <span>{isLoading ? "Please wait..." : "Continue"}</span>

            {!isLoading && <i className="bi bi-arrow-right"></i>}

            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              />
            )}
          </button>

          <div className="account-divider">
            <span>OR</span>
          </div>

          <div className="account-benefits">
            <div className="account-benefit">
              <div className="account-icon">
                <i className="bi bi-bag-check"></i>
              </div>

              <div>
                <strong>Easy Orders</strong>
                <span>Track all your orders</span>
              </div>
            </div>

            <div className="account-benefit">
              <div className="account-icon">
                <i className="bi bi-heart"></i>
              </div>

              <div>
                <strong>Wishlist</strong>
                <span>Save products you love</span>
              </div>
            </div>

            <div className="account-benefit">
              <div className="account-icon">
                <i className="bi bi-lightning"></i>
              </div>

              <div>
                <strong>Faster Checkout</strong>
                <span>Save your details securely</span>
              </div>
            </div>
          </div>

          <div className="user-login-terms">
            By continuing, you agree to {appSettings?.name}'s{" "}
            <NavLink
              to={ROUTE_URL.WEBSITE.TERMS_OF_USE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use
            </NavLink>
            {" and "}
            <NavLink
              to={ROUTE_URL.WEBSITE.PRIVACY_POLICY}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </NavLink>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginApp;
