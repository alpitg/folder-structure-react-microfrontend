import { useForm, type SubmitHandler } from "react-hook-form";
import { useForgotPasswordMutation } from "../../../app/redux/administration/auth/auth.api";
import { useAutoFocus } from "../../../hooks/use-auto-focus";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { NavLink } from "react-router";

export interface IForgotPasswordForm {
  emailAddress: string;
}

const ForgetPasswordApp = () => {
  const inputRef = useAutoFocus<HTMLInputElement>();

  // ✅ RTK Mutation hook (change to your actual API slice method)
  const [forgotPassword, { isLoading, isError, isSuccess, error }] =
    useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordForm>();

  const onSubmit: SubmitHandler<IForgotPasswordForm> = async (formData) => {
    try {
      await forgotPassword({ emailAddress: formData.emailAddress }).unwrap();
      console.log("Reset request sent");
    } catch (err) {
      console.error("Forgot password failed:", err);
    }
  };

  return (
    <div className="forget-password-app">
      <div className="mb-10 text-center">
        <h3 className="fw-bolder text-gray-900 fs-1">Forgot Password?</h3>
        <p className="text-muted">Enter your email to reset your password.</p>
      </div>

      {/* Error message */}
      {isError && (
        <div
          className="alert bg-light-danger d-flex align-items-center p-4 mb-4"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle fs-2 me-3 text-danger"></i>
          <div className="d-flex flex-column">
            <span className="text-danger">
              {"data" in error &&
              typeof error.data === "object" &&
              error.data !== null &&
              "detail" in error.data
                ? (error.data as { detail?: string }).detail
                : "Something went wrong."}
            </span>
          </div>
        </div>
      )}

      {/* Success */}
      {isSuccess && (
        <div
          className="alert bg-light-success d-flex align-items-center p-4 mb-4"
          role="alert"
        >
          <i className="bi bi-envelope-check fs-2 me-3 text-success"></i>
          <div className="d-flex flex-column">
            <span className="text-success">
              Reset link has been sent to your email.
            </span>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="d-flex flex-column gap-5">
          {/* Email */}
          <div>
            <input
              type="email"
              autoComplete="email"
              className={`form-control form-control-solid ${
                errors.emailAddress ? "is-invalid" : ""
              }`}
              placeholder="Enter your email *"
              {...register("emailAddress", {
                required: "Email address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
                  message: "Please enter a valid email address",
                },
              })}
              ref={(e) => {
                register("emailAddress")?.ref(e);
                inputRef.current = e;
              }}
            />
            {errors.emailAddress && (
              <div className="invalid-feedback">
                {errors.emailAddress.message}
              </div>
            )}
          </div>

          {/* known token */}
          {isSuccess && (
            <div className="d-flex justify-content-end">
              <NavLink
                to={ROUTE_URL.RESET_PASSWORD}
                className="text-muted text-hover-primary fw-semibold"
              >
                Click here, if you hv token
              </NavLink>
            </div>
          )}

          {/* Submit + Cancel */}
          <div className="d-flex gap-5 justify-content-end">
            <button
              type="submit"
              className="btn btn-primary py-3"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
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

export default ForgetPasswordApp;
