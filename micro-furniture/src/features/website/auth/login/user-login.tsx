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

type LoginStep = "mobile" | "otp";

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
  const [step, setStep] = useState<LoginStep>("mobile");
  const [mobile, setMobile] = useState("");
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

  const resetOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
  };

  const focusFirstOtpInput = () => {
    window.setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

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

  const handleSendOtp = async () => {
    const cleanMobile = mobile.replace(/\D/g, "");

    if (!cleanMobile) {
      setError("Please enter your mobile number.");
      return;
    }

    if (cleanMobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    try {
      const response = await sendLoginOtp({
        mobile: cleanMobile,
      }).unwrap();

      if (!response?.success) {
        setError(response?.message || "Unable to send OTP. Please try again.");
        return;
      }

      setMobile(cleanMobile);
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

  const handleOtpChange = (index: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");

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

  const handleVerifyOtp = async () => {
    if (isLoading) {
      return;
    }

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== OTP_LENGTH) {
      setError(`Please enter the ${OTP_LENGTH}-digit OTP.`);
      return;
    }

    if (!mobile || mobile.length !== 10) {
      setError("Invalid mobile number. Please try again.");
      return;
    }

    setError("");

    try {
      const response = await verifyLoginOtp({
        mobile,
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
       * IMPORTANT:
       * Your backend refresh endpoint expects:
       *
       * {
       *   "refresh_token": "..."
       * }
       *
       * Therefore refreshToken MUST be stored here.
       */
      const websiteAuth = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        tokenType: response.token_type || "bearer",
        customerId: String(customerId),
        mobile: customer?.mobile || mobile,
        name: customer?.name || "",
        email: customer?.email || "",
      };

      localStorage.setItem(WEBSITE_AUTH_KEY, JSON.stringify(websiteAuth));

      onLogin?.(String(customerId), customer?.mobile || mobile, {
        id: String(customerId),
        name: customer?.name,
        email: customer?.email,
        mobile: customer?.mobile || mobile,
      });

      onClose?.();
    } catch (error) {
      setError(getApiErrorMessage(error, "Invalid OTP. Please try again."));
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || isLoading) {
      return;
    }

    if (!mobile) {
      setError("Mobile number is missing. Please try again.");
      return;
    }

    setError("");

    try {
      const response = await resendLoginOtp({
        mobile,
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

  const handleChangeMobile = () => {
    if (isLoading) {
      return;
    }

    setStep("mobile");
    resetOtp();
    setError("");
    setResendTimer(DEFAULT_RESEND_TIMER);
  };

  const handleClose = () => {
    if (isLoading) {
      return;
    }

    onClose?.();
  };

  return (
    <div className="user-login-app">
      <div className="user-login-backdrop">
        <div
          className="user-login-container"
          role="dialog"
          aria-modal="true"
          aria-label={step === "mobile" ? "Login" : "Verify OTP"}
        >
          {step === "mobile" ? (
            <>
              <div className="user-login-header">
                <div>
                  <h5 className="user-login-title">Login to your account</h5>

                  <p className="user-login-description">
                    Enter your mobile number to continue shopping and manage
                    your orders.
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
                <div className="account-field">
                  <label htmlFor="user-mobile">Mobile Number</label>

                  <div
                    className={`account-input ${
                      error ? "account-input-error" : ""
                    }`}
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
                    Verify your mobile number
                  </h5>

                  <p className="user-login-description">
                    Enter the OTP sent to{" "}
                    <strong>
                      +91 {mobile.slice(0, 5)} {mobile.slice(5)}
                    </strong>
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
                  <span>Wrong mobile number?</span>

                  <button
                    type="button"
                    onClick={handleChangeMobile}
                    disabled={isLoading}
                  >
                    Change number
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
