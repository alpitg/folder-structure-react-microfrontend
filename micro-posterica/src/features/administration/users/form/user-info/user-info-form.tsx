import React, { useState } from "react";

import type { IUserWithPermissions } from "../../../interfaces/users.model";
import { useFormContext } from "react-hook-form";

const UserInfoFormApp: React.FC = () => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<IUserWithPermissions>();

  const [showPassword, setShowPassword] = useState(false);
  // Watch the checkbox to determine if password input should be disabled
  const setRandomPassword = watch("user.setRandomPassword", false);

  return (
    <div className="user-info-form-app">
      <div className="row">
        {/* Profile Picture */}
        <div className="col-sm-3 text-center mb-5 mt-5">
          <img
            width="128"
            height="128"
            className="img-thumbnail rounded-circle"
            src="https://demo.aspnetzero.com/assets/common/images/default-profile-picture.png"
            alt="Profile"
          />
        </div>

        {/* Form Fields */}
        <div className="col-sm-9">
          {/* First Name */}
          <div className="mb-5">
            <label htmlFor="Name" className="form-label required">
              First Name
            </label>
            <input
              id="Name"
              type="text"
              maxLength={64}
              className={`form-control form-control-solid ${
                errors?.user?.name ? "is-invalid" : ""
              }`}
              placeholder="Enter first name"
              {...register("user.name", { required: "First name is required" })}
            />
            {errors?.user?.name && (
              <div className="invalid-feedback">{errors.user.name.message}</div>
            )}
          </div>

          {/* Surname */}
          <div className="mb-5">
            <label htmlFor="Surname" className="form-label required">
              Surname
            </label>
            <input
              id="Surname"
              type="text"
              maxLength={64}
              className={`form-control form-control-solid ${
                errors?.user?.surname ? "is-invalid" : ""
              }`}
              placeholder="Enter surname"
              {...register("user.surname", { required: "Surname is required" })}
            />
            {errors?.user?.surname && (
              <div className="invalid-feedback">
                {errors.user.surname.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="EmailAddress" className="form-label required">
          Email address
        </label>
        <input
          id="EmailAddress"
          type="email"
          maxLength={256}
          className={`form-control form-control-solid ${
            errors?.user?.emailAddress ? "is-invalid" : ""
          }`}
          placeholder="user@example.com"
          {...register("user.emailAddress", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors?.user?.emailAddress && (
          <div className="invalid-feedback">
            {errors.user.emailAddress.message}
          </div>
        )}
      </div>

      {/* Phone Number */}
      <div className="mb-5">
        <label htmlFor="PhoneNumber" className="form-label">
          Phone number
        </label>
        <input
          id="PhoneNumber"
          type="text"
          maxLength={32}
          className="form-control form-control-solid"
          placeholder="e.g. +123456789"
          {...register("user.phoneNumber")}
        />
      </div>

      {/* Username with Icon */}
      <div className="mb-5">
        <label htmlFor="UserName" className="form-label required">
          User name
        </label>
        <input
          id="UserName"
          type="text"
          maxLength={256}
          className={`form-control form-control-solid ${
            errors?.user?.userName ? "is-invalid" : ""
          }`}
          placeholder="Username"
          {...register("user.userName", { required: "Username is required" })}
        />
        <span className="text-muted">
          Allowed characters: abcdefghijklmnopABCDEFGHIJKLMNOPQRSTUVWXYZ-.@_+
        </span>

        {errors?.user?.userName && (
          <div className="invalid-feedback d-block">
            {errors.user.userName.message}
          </div>
        )}
      </div>

      {/* Checkboxes */}
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="SetRandomPassword"
          {...register("user.setRandomPassword")}
        />
        <label className="form-check-label" htmlFor="SetRandomPassword">
          Set random password.
        </label>
      </div>

      {!setRandomPassword && (
        <div className="mb-4">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <div className="position-relative">
            <input
              id="Password"
              type={showPassword ? "text" : "password"}
              className="form-control form-control-solid"
              autoComplete="new-password"
              {...register("user.password", {
                required: !setRandomPassword || "Password is required",
                maxLength: 32,
              })}
            />
            <button
              type="button"
              className="btn btn-sm btn-icon position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              <i
                className={`bi ${
                  showPassword ? "bi-eye" : "bi-eye-slash"
                } fs-4`}
              ></i>
            </button>
          </div>
        </div>
      )}

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="ShouldChangePasswordOnNextLogin"
          {...register("user.shouldChangePasswordOnNextLogin")}
        />
        <label
          className="form-check-label"
          htmlFor="ShouldChangePasswordOnNextLogin"
        >
          Should change password on next login.
        </label>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="SendActivationEmail"
          {...register("user.sendActivationEmail")}
        />
        <label className="form-check-label" htmlFor="SendActivationEmail">
          Send activation email.
        </label>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="IsActive"
          {...register("user.isActive")}
        />
        <label className="form-check-label" htmlFor="IsActive">
          Active
        </label>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="IsLockoutEnabled"
          {...register("user.isLockoutEnabled")}
        />
        <label className="form-check-label" htmlFor="IsLockoutEnabled">
          Lockout enabled
          <i className="bi bi-info-circle ms-2"></i>
        </label>
      </div>
    </div>
  );
};

export default UserInfoFormApp;
