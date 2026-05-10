const warningIcon = "/static/media/img/svg/warning-1.svg";

import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";

export interface IForgotPasswordForm {
  emailAddress: string;
}

const ForgetPasswordApp = () => {
  return (
    <div className="forget-password-app h-500">
      <div className="mb-10 text-center">
        <img src={warningIcon} height={150} />
        <h3 className="fw-bolder text-gray-900 fs-1">403 Forbidden</h3>
        <p className="text-muted">
          You don't have permission to access this page.
        </p>
      </div>

      <div className="d-flex gap-3 justify-content-center">
        <NavLink to={ROUTE_URL.DASHBOARD} className="btn btn-primary px-4 py-2">
          Go to Dashboard
        </NavLink>
        <NavLink
          to={ROUTE_URL.LOGIN}
          className="btn btn-outline-secondary px-4 py-2"
        >
          Back to Login
        </NavLink>
      </div>
    </div>
  );
};

export default ForgetPasswordApp;
