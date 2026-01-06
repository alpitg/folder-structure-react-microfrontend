import { useForm, type SubmitHandler } from "react-hook-form";
import { useResetPasswordMutation } from "../../../app/redux/administration/auth/auth.api";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setToast } from "../../../app/redux/core/app-settings/app-settings.slice";

export interface IResetPasswordForm {
  code: string;
  password: string;
  confirmPassword: string;
}

const ResetPasswordFormApp = () => {
  //   const { token } = useParams<{ token: string }>(); // token from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resetPassword, { isLoading, isError, isSuccess, error }] =
    useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPasswordForm>();

  const onSubmit: SubmitHandler<IResetPasswordForm> = async (formData) => {
    try {
      await resetPassword({
        code: formData.code,
        newPassword: formData.password,
      }).unwrap();

      // ✅ Show toast message
      dispatch(
        setToast({
          show: true,
          message: "Password reset successful!",
          variant: "success",
        })
      );

      // ✅ Redirect to login page
      navigate(ROUTE_URL.LOGIN);
    } catch (err) {
      console.error("Reset password failed:", err);
    }
  };

  return (
    <div className="reset-password-app">
      <div className="mb-10 text-center">
        <h3 className="fw-bolder text-gray-900 fs-1">Reset Password</h3>
        <p className="text-muted">
          Enter your reset code and new password below.
        </p>
      </div>

      {/* Error */}
      {isError && (
        <div
          className="alert bg-light-danger d-flex align-items-center p-4 mb-4"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle fs-2 me-3 text-danger"></i>
          <span className="text-danger">
            {"data" in error &&
            typeof error.data === "object" &&
            error.data !== null &&
            "detail" in error.data
              ? (error.data as { detail?: string }).detail
              : "Something went wrong."}
          </span>
        </div>
      )}

      {/* Success */}
      {isSuccess && (
        <div
          className="alert bg-light-success d-flex align-items-center p-4 mb-4"
          role="alert"
        >
          <i className="bi bi-check-circle fs-2 me-3 text-success"></i>
          <span className="text-success">Password reset successful! </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="d-flex flex-column gap-5">
          {/* Code */}
          <div>
            <input
              type="text"
              autoComplete="one-time-code"
              className={`form-control form-control-solid ${
                errors.code ? "is-invalid" : ""
              }`}
              placeholder="Reset code *"
              {...register("code", {
                required: "Reset code is required",
              })}
            />
            {errors.code && (
              <div className="invalid-feedback">{errors.code.message}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              autoComplete="new-password"
              className={`form-control form-control-solid ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="New password *"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              autoComplete="new-password"
              className={`form-control form-control-solid ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              placeholder="Confirm password *"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Submit + Cancel */}
          <div className="d-flex gap-5 justify-content-end">
            <button
              type="submit"
              className="btn btn-primary py-3"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
            <NavLink
              to={ROUTE_URL.LOGIN}
              type="button"
              className="btn btn-secondary py-3"
            >
              Back to Login
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordFormApp;
