import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../../../app/redux/administration/auth/auth.api";
import { NavLink, useNavigate } from "react-router";
import { setCredentials } from "../../../app/redux/administration/auth/auth.slice";
import { useDispatch } from "react-redux";
import { useAutoFocus } from "../../../hooks/use-auto-focus";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { useAuth } from "../../../hooks/use-auth";

export interface ILoginForm {
  userName: string;
  password: string;
  rememberMe?: boolean;
}

export interface ILoginResponse {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

const LoginApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useAutoFocus<HTMLInputElement>();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ RTK Mutation hook
  const { isAuthenticated } = useAuth();
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (formData) => {
    try {
      const response = await login(formData).unwrap(); // unwrap to get raw response or throw error

      dispatch(
        setCredentials({
          tokenType: response.tokenType,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );

      // ✅ Redirect to home
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_URL.DASHBOARD);
    }
  }, [isAuthenticated]);

  return (
    <div className="login-app">
      <div className="mb-10 text-center">
        <h3 className="fw-bolder text-gray-900 fs-1">Log in</h3>
        <p className="text-muted">Access your account</p>
      </div>

      {/* Error message */}
      {isError && (
        <div
          className="alert bg-light-danger d-flex align-items-center p-4 mb-4"
          role="alert"
        >
          <i className="bi bi-shield-check fs-2 me-3 text-danger"></i>
          <div className="d-flex flex-column">
            <span className="text-danger">Invalid username or password</span>
          </div>
        </div>
      )}

      {/* Success */}
      {isSuccess && (
        <div
          className="alert bg-light-success d-flex align-items-center p-4 mb-4"
          role="alert"
        >
          <i className="bi bi-shield-check fs-2 me-3 text-success"></i>
          <div className="d-flex flex-column">
            <span className="text-success">
              Login successful! Redirecting...
            </span>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="d-flex flex-column gap-5">
          {/* Username */}
          <div>
            <input
              type="text"
              autoComplete="username"
              className={`form-control form-control-solid ${
                errors.userName ? "is-invalid" : ""
              }`}
              placeholder="User name or email *"
              tabIndex={-1}
              {...register("userName", { required: true })}
              ref={(e) => {
                register("userName")?.ref(e); // connect RHF (React Hook Form)
                inputRef.current = e; // keep local ref
              }}
            />
            {errors.userName && (
              <div className="invalid-feedback">
                Username or email is required
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                maxLength={32}
                className={`form-control form-control-solid ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Password *"
                {...register("password", { required: true })}
              />
              {!errors.password && (
                <button
                  type="button"
                  className="btn btn-sm btn-icon position-absolute top-50 end-0 translate-middle-y me-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye" : "bi-eye-slash"
                    } fs-4`}
                  ></i>
                </button>
              )}
            </div>
            {errors.password && (
              <div className="invalid-feedback d-block">
                Password is required
              </div>
            )}
          </div>

          {/* Remember Me */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input
                className="form-check-input cursor-pointer"
                type="checkbox"
                id="rememberMe"
                {...register("rememberMe")}
              />
              <label
                className="form-check-label cursor-pointer"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>

            <NavLink
              to={ROUTE_URL.FORGET_PASSWORD}
              className="text-muted text-hover-primary fw-semibold"
            >
              Forgot Password?
            </NavLink>
          </div>

          {/* Submit */}
          <div className="d-grid mb-3">
            <button
              type="submit"
              className="btn btn-primary fw-bold py-3"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </div>
      </form>

      {/* Sign up */}
      <div className="mt-4 text-center">
        <p className="mb-1">Not a member yet?</p>
        <div>
          <a
            href="/account/register"
            className="fw-semibold text-decoration-none me-2"
          >
            Create account
          </a>
          <span className="text-muted">|</span>
          <a
            href="/account/email-activation"
            className="fw-semibold text-decoration-none ms-2"
          >
            Email activation
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginApp;
