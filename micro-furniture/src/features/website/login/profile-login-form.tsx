import "./profile-login-form.scss";

import { useState } from "react";

interface ProfileLoginFormProps {
  onLogin?: (mobile: string) => void;
}

const ProfileLoginForm = ({ onLogin }: ProfileLoginFormProps) => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!mobile) {
      setError("Please enter your mobile number.");
      return;
    }

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");
    onLogin?.(mobile);
  };

  return (
    <div className="profile-login-form">
      <h3>Login to your account</h3>

      <p className="profile-login-description">
        Enter your mobile number to continue shopping and manage your orders.
      </p>

      <div className="account-field">
        <label htmlFor="profile-mobile">Mobile Number</label>

        <div className="account-input">
          <span className="account-input-prefix">+91</span>

          <input
            id="profile-mobile"
            type="tel"
            value={mobile}
            maxLength={10}
            inputMode="numeric"
            placeholder="Enter mobile number"
            onChange={(event) => {
              setMobile(event.target.value.replace(/\D/g, ""));
              setError("");
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
      >
        <span>Continue</span>
        <i className="bi bi-arrow-right"></i>
      </button>

      <div className="account-divider">
        <span></span>
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

      <p className="account-terms">
        By continuing, you agree to our <span>Terms of Use</span> and{" "}
        <span>Privacy Policy</span>.
      </p>
    </div>
  );
};

export default ProfileLoginForm;
