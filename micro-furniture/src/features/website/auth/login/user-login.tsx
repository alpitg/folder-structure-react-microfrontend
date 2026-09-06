import "./user-login.scss";

import { useEffect, useRef, useState } from "react";
import {
  useResendLoginOtpMutation,
  useSendLoginOtpMutation,
  useVerifyLoginOtpMutation,
} from "../../../../app/redux/website/auth/profile-login.api";

import { GetEnvConfig } from "../../../../app.config";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";
import { WEBSITE_AUTH_KEY } from "../../../../constants/global/global-key.const";

interface LoginCustomer {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;
}

interface UserLoginAppProps {
  onLogin?: (
    customerId: string,
    mobile: string,
    customer?: LoginCustomer,
  ) => void;
  onClose?: () => void;
}

type LoginStep = "identifier" | "otp";
type LoginType = "email" | "mobile";

interface ApiError {
  data?: {
    detail?: string | Array<{ msg?: string }>;
    message?: string;
  };
  error?: string;
  message?: string;
}

const OTP_LENGTH = 6;
const DEFAULT_RESEND_TIMER = 30;

const UserLoginApp = ({ onLogin, onClose }: UserLoginAppProps) => {
  /*
   * Email is the default login method.
   */
  const [loginType, setLoginType] = useState<LoginType>("email");

  const [step, setStep] = useState<LoginStep>("identifier");

  const [identifier, setIdentifier] = useState("");

  const [otp, setOtp] = useState<string[]>(() => Array(OTP_LENGTH).fill(""));

  const [error, setError] = useState("");

  const [resendTimer, setResendTimer] = useState(DEFAULT_RESEND_TIMER);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const appSettings = GetEnvConfig();

  const [sendLoginOtp, { isLoading: isSendingOtp }] = useSendLoginOtpMutation();

  const [verifyLoginOtp, { isLoading: isVerifyingOtp }] =
    useVerifyLoginOtpMutation();

  const [resendLoginOtp, { isLoading: isResendingOtp }] =
    useResendLoginOtpMutation();

  const isLoading = isSendingOtp || isVerifyingOtp || isResendingOtp;

  /*
   * OTP countdown timer.
   */
  useEffect(() => {
    if (step !== "otp" || resendTimer <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setResendTimer((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [step, resendTimer]);

  /*
   * Reset OTP fields.
   */
  const resetOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
  };

  /*
   * Focus first OTP input.
   */
  const focusFirstOtpInput = () => {
    window.setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  /*
   * Extract API error message.
   */
  const getApiErrorMessage = (error: unknown, fallback: string): string => {
    const apiError = error as ApiError;

    const detail = apiError?.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    if (Array.isArray(detail) && detail.length > 0) {
      return (
        detail
          .map((item) => item?.msg)
          .filter(Boolean)
          .join(", ") || fallback
      );
    }

    return (
      apiError?.data?.message ||
      apiError?.message ||
      apiError?.error ||
      fallback
    );
  };

  /*
   * Validate email/mobile.
   */
  const validateIdentifier = (): boolean => {
    const value = identifier.trim();

    if (!value) {
      setError(
        loginType === "email"
          ? "Please enter your email address."
          : "Please enter your mobile number.",
      );

      return false;
    }

    if (loginType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        setError("Please enter a valid email address.");

        return false;
      }

      return true;
    }

    const cleanMobile = value.replace(/\D/g, "");

    if (cleanMobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");

      return false;
    }

    setIdentifier(cleanMobile);

    return true;
  };

  /*
   * Send OTP.
   */
  const handleSendOtp = async () => {
    if (isLoading) {
      return;
    }

    if (!validateIdentifier()) {
      return;
    }

    setError("");

    try {
      const value = identifier.trim();

      const response =
        loginType === "email"
          ? await sendLoginOtp({
              email: value,
            }).unwrap()
          : await sendLoginOtp({
              mobile: value,
            }).unwrap();

      if (!response?.success) {
        setError(response?.message || "Unable to send OTP. Please try again.");

        return;
      }

      resetOtp();

      setResendTimer(response?.retryAfter || DEFAULT_RESEND_TIMER);

      setStep("otp");

      focusFirstOtpInput();
    } catch (error) {
      setError(
        getApiErrorMessage(error, "Unable to send OTP. Please try again."),
      );
    }
  };

  /*
   * Change Email / Mobile.
   */
  const handleChangeLogin = () => {
    if (isLoading) {
      return;
    }

    setStep("identifier");
    resetOtp();
    setError("");
    setResendTimer(DEFAULT_RESEND_TIMER);
  };

  /*
   * Change login type.
   */
  const handleChangeLoginType = (type: LoginType) => {
    if (isLoading) {
      return;
    }

    setLoginType(type);
    setIdentifier("");
    setError("");
  };

  /*
   * OTP input change.
   */
  const handleOtpChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");

    /*
     * Handle pasted/multiple digits.
     */
    if (numericValue.length > 1) {
      const pastedOtp = numericValue.slice(0, OTP_LENGTH).split("");

      const nextOtp = Array(OTP_LENGTH).fill("");

      pastedOtp.forEach((digit, pasteIndex) => {
        nextOtp[pasteIndex] = digit;
      });

      setOtp(nextOtp);
      setError("");

      const focusIndex = Math.min(pastedOtp.length, OTP_LENGTH - 1);

      window.setTimeout(() => {
        otpRefs.current[focusIndex]?.focus();
      }, 0);

      return;
    }

    const nextOtp = [...otp];

    nextOtp[index] = numericValue;

    setOtp(nextOtp);
    setError("");

    if (numericValue && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  /*
   * OTP keyboard handling.
   */
  const handleOtpKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }

      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();

      otpRefs.current[index - 1]?.focus();

      return;
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      event.preventDefault();

      otpRefs.current[index + 1]?.focus();

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      handleVerifyOtp();
    }
  };

  /*
   * Verify OTP.
   */
  const handleVerifyOtp = async () => {
    if (isLoading) {
      return;
    }

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== OTP_LENGTH) {
      setError(`Please enter the ${OTP_LENGTH}-digit OTP.`);

      return;
    }

    if (!identifier.trim()) {
      setError(
        loginType === "email"
          ? "Email address is missing. Please try again."
          : "Mobile number is missing. Please try again.",
      );

      return;
    }

    setError("");

    try {
      const value = identifier.trim();

      const response =
        loginType === "email"
          ? await verifyLoginOtp({
              email: value,
              otp: enteredOtp,
            }).unwrap()
          : await verifyLoginOtp({
              mobile: value,
              otp: enteredOtp,
            }).unwrap();

      if (!response?.success) {
        setError(response?.message || "Invalid OTP. Please try again.");

        return;
      }

      const customer = response?.customer;

      const customerId = customer?.id;

      if (!customerId) {
        setError(
          "Login successful, but customer information was not received.",
        );

        return;
      }

      if (!response?.access_token) {
        setError(
          "Login successful, but authentication token was not received.",
        );

        return;
      }

      if (!response?.refresh_token) {
        setError("Login successful, but refresh token was not received.");

        return;
      }

      /*
       * Store website authentication.
       *
       * Backend refresh endpoint expects:
       *
       * {
       *   "refresh_token": "..."
       * }
       */
      const websiteAuth = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        tokenType: response.token_type || "bearer",
        customerId: String(customerId),
        mobile: customer?.mobile || (loginType === "mobile" ? value : ""),
        name: customer?.name || "",
        email: customer?.email || (loginType === "email" ? value : ""),
      };

      localStorage.setItem(WEBSITE_AUTH_KEY, JSON.stringify(websiteAuth));

      /*
       * Existing onLogin callback expects mobile.
       *
       * For email login, use the customer's mobile
       * if available, otherwise pass an empty string.
       */
      onLogin?.(
        String(customerId),
        customer?.mobile || (loginType === "mobile" ? value : ""),
        {
          id: String(customerId),
          name: customer?.name,
          email: customer?.email || (loginType === "email" ? value : undefined),
          mobile:
            customer?.mobile || (loginType === "mobile" ? value : undefined),
        },
      );

      onClose?.();
    } catch (error) {
      setError(getApiErrorMessage(error, "Invalid OTP. Please try again."));
    }
  };

  /*
   * Resend OTP.
   */
  const handleResendOtp = async () => {
    if (resendTimer > 0 || isLoading) {
      return;
    }

    if (!identifier.trim()) {
      setError("Login information is missing. Please try again.");

      return;
    }

    setError("");

    try {
      const value = identifier.trim();

      const response =
        loginType === "email"
          ? await resendLoginOtp({
              email: value,
            }).unwrap()
          : await resendLoginOtp({
              mobile: value,
            }).unwrap();

      if (!response?.success) {
        setError(response?.message || "Unable to resend OTP.");

        return;
      }

      resetOtp();

      setResendTimer(response?.retryAfter || DEFAULT_RESEND_TIMER);

      focusFirstOtpInput();
    } catch (error) {
      setError(
        getApiErrorMessage(error, "Unable to resend OTP. Please try again."),
      );
    }
  };

  /*
   * Close login modal.
   */
  const handleClose = () => {
    if (isLoading) {
      return;
    }

    onClose?.();
  };

  /*
   * Displayed identifier.
   */
  const formattedIdentifier =
    loginType === "mobile"
      ? `+91 ${identifier.slice(0, 5)} ${identifier.slice(5)}`
      : identifier;

  return (
    <div className="user-login-app">
      <div className="user-login-backdrop">
        <div
          className="user-login-container"
          role="dialog"
          aria-modal="true"
          aria-label={step === "identifier" ? "Login" : "Verify OTP"}
        >
          {step === "identifier" ? (
            <>
              <div className="user-login-header">
                <div>
                  <h5 className="user-login-title">Login to your account</h5>

                  <p className="user-login-description">
                    Enter your email or mobile number to continue shopping and
                    manage your orders.
                  </p>
                </div>

                {onClose && (
                  <button
                    type="button"
                    className="user-login-close"
                    onClick={handleClose}
                    disabled={isLoading}
                    aria-label="Close"
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                )}
              </div>

              <div className="user-login-body">
                {/* Login Type Switcher */}
                <div className="d-flex border-bottom mb-4">
                  <button
                    type="button"
                    className={`flex-fill btn rounded-0 border-0 fw-semibold ${
                      loginType === "email"
                        ? "text-dark border-bottom border-2 border-dark"
                        : "text-muted"
                    }`}
                    onClick={() => handleChangeLoginType("email")}
                    disabled={isLoading}
                  >
                    EMAIL
                  </button>

                  <button
                    type="button"
                    className={`flex-fill btn rounded-0 border-0 fw-semibold ${
                      loginType === "mobile"
                        ? "text-dark border-bottom border-2 border-dark"
                        : "text-muted"
                    }`}
                    onClick={() => handleChangeLoginType("mobile")}
                    disabled={isLoading}
                  >
                    MOBILE
                  </button>
                </div>

                <div className="account-field">
                  <label htmlFor="user-identifier">
                    {loginType === "email" ? "Email Address" : "Mobile Number"}
                  </label>

                  <div
                    className={`account-input ${
                      error ? "account-input-error" : ""
                    }`}
                  >
                    {loginType === "mobile" && (
                      <span className="account-input-prefix">+91</span>
                    )}

                    <input
                      id="user-identifier"
                      type={loginType === "email" ? "email" : "tel"}
                      value={identifier}
                      maxLength={loginType === "mobile" ? 10 : undefined}
                      inputMode={loginType === "email" ? "email" : "numeric"}
                      autoComplete={loginType === "email" ? "email" : "tel"}
                      placeholder={
                        loginType === "email"
                          ? "Enter email address"
                          : "Enter mobile number"
                      }
                      disabled={isLoading}
                      onChange={(event) => {
                        const value =
                          loginType === "mobile"
                            ? event.target.value.replace(/\D/g, "")
                            : event.target.value;

                        setIdentifier(value);
                        setError("");
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleSendOtp();
                        }
                      }}
                    />
                  </div>

                  {error && (
                    <div className="account-error" role="alert">
                      <i className="bi bi-exclamation-circle" />

                      <span>{error}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="account-login-action"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                >
                  <span>{isSendingOtp ? "Sending OTP..." : "Continue"}</span>

                  {!isSendingOtp && <i className="bi bi-arrow-right" />}

                  {isSendingOtp && (
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
                      <i className="bi bi-bag-check" />
                    </div>

                    <div>
                      <strong>Easy Orders</strong>

                      <span>Track all your orders</span>
                    </div>
                  </div>

                  <div className="account-benefit">
                    <div className="account-icon">
                      <i className="bi bi-heart" />
                    </div>

                    <div>
                      <strong>Wishlist</strong>

                      <span>Save products you love</span>
                    </div>
                  </div>

                  <div className="account-benefit">
                    <div className="account-icon">
                      <i className="bi bi-lightning" />
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
                  </NavLink>{" "}
                  and{" "}
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
            </>
          ) : (
            <>
              <div className="user-login-header otp-login-header">
                <div>
                  <h5 className="user-login-title">
                    Verify your{" "}
                    {loginType === "email" ? "email" : "mobile number"}
                  </h5>

                  <p className="user-login-description">
                    Enter the OTP sent to <strong>{formattedIdentifier}</strong>
                  </p>
                </div>

                {onClose && (
                  <button
                    type="button"
                    className="user-login-close"
                    onClick={handleClose}
                    disabled={isLoading}
                    aria-label="Close"
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                )}
              </div>

              <div className="user-login-body otp-login-body">
                <div className="otp-change-mobile">
                  <span>
                    Wrong{" "}
                    {loginType === "email" ? "email address" : "mobile number"}?
                  </span>

                  <button
                    type="button"
                    onClick={handleChangeLogin}
                    disabled={isLoading}
                  >
                    Change {loginType === "email" ? "email" : "number"}
                  </button>
                </div>

                <div className="otp-field">
                  <label htmlFor="otp-0">Enter OTP</label>

                  <div className="otp-inputs">
                    {otp.map((digit, index) => (
                      <input
                        key={`otp-${index}`}
                        id={`otp-${index}`}
                        ref={(element) => {
                          otpRefs.current[index] = element;
                        }}
                        type="tel"
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        maxLength={1}
                        value={digit}
                        disabled={isLoading}
                        aria-label={`OTP digit ${index + 1}`}
                        onChange={(event) =>
                          handleOtpChange(index, event.target.value)
                        }
                        onPaste={(event) => {
                          event.preventDefault();

                          const pastedValue = event.clipboardData
                            .getData("text")
                            .replace(/\D/g, "")
                            .slice(0, OTP_LENGTH);

                          if (!pastedValue) {
                            return;
                          }

                          const nextOtp = Array(OTP_LENGTH).fill("");

                          pastedValue
                            .split("")
                            .forEach((pastedDigit, pasteIndex) => {
                              nextOtp[pasteIndex] = pastedDigit;
                            });

                          setOtp(nextOtp);
                          setError("");

                          const focusIndex = Math.min(
                            pastedValue.length,
                            OTP_LENGTH - 1,
                          );

                          window.setTimeout(() => {
                            otpRefs.current[focusIndex]?.focus();
                          }, 0);
                        }}
                        onKeyDown={(event) => handleOtpKeyDown(index, event)}
                        onFocus={(event) => event.target.select()}
                      />
                    ))}
                  </div>

                  {error && (
                    <div className="account-error otp-error" role="alert">
                      <i className="bi bi-exclamation-circle" />

                      <span>{error}</span>
                    </div>
                  )}
                </div>

                <div className="otp-resend">
                  {resendTimer > 0 ? (
                    <span>
                      Resend OTP in{" "}
                      <strong>
                        00:
                        {String(resendTimer).padStart(2, "0")}
                      </strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                    >
                      {isResendingOtp ? "Sending..." : "Resend OTP"}
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  className="account-login-action otp-verify-action"
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.join("").length !== OTP_LENGTH}
                >
                  <span>
                    {isVerifyingOtp ? "Verifying..." : "Verify & Continue"}
                  </span>

                  {!isVerifyingOtp && <i className="bi bi-arrow-right" />}

                  {isVerifyingOtp && (
                    <span
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    />
                  )}
                </button>

                <div className="otp-security-note">
                  <i className="bi bi-shield-check" />

                  <span>
                    Your login is secured with one-time password verification.
                  </span>
                </div>

                <div className="user-login-terms">
                  By continuing, you agree to {appSettings?.name}'s{" "}
                  <NavLink
                    to={ROUTE_URL.WEBSITE.TERMS_OF_USE}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Use
                  </NavLink>{" "}
                  and{" "}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLoginApp;
