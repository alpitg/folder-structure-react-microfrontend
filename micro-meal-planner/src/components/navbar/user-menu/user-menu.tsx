import { useState, type FC } from "react";
import { clearCredentials } from "../../../app/redux/administration/auth/auth.slice";
import { useDispatch } from "react-redux";
import ChangePasswordApp from "./change-password/change-password";
import UserSettingApp from "./user-setting/user-setting";
import { useAuth } from "../../../hooks/use-auth";

const UserMenuApp: FC = () => {
  const { user } = useAuth();

  const dispatch = useDispatch();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showUserSettingApp, setShowUserSettingApp] = useState(false);

  return (
    <div className="user-menu-app">
      <div className="dropdown">
        {/* Avatar Trigger */}
        <button
          className="btn btn-link text-hover-primary p-0 border-0"
          type="button"
          id="userMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label="User profile"
        >
          {/* <img
          src="/static/media/img/svg/blank-image.svg"
          alt="User"
          className="rounded-circle"
          width="40"
          height="40"
        /> */}
          <i className="bi bi-person-circle fs-1"></i>
        </button>

        {/* Dropdown Menu */}
        <ul
          className="dropdown-menu dropdown-menu-end shadow"
          aria-labelledby="userMenuButton"
          style={{ minWidth: "275px" }}
        >
          {/* User Info */}
          <li className="px-3 py-2 d-flex align-items-center">
            {/* <img
            src="/assets/media/avatars/300-3.jpg"
            alt="Logo"
            className="rounded-circle me-3"
            width="50"
            height="50"
          /> */}
            <i className="bi bi-person-circle fs-1 w-50px h-50px"></i>
            <div>
              <div className="fw-bold d-flex align-items-center">
                {user?.user?.name} {user?.user?.surname}
                <span className="badge bg-success text-white ms-2">Pro</span>
              </div>
              <small className="text-muted">{user?.user?.emailAddress}</small>
            </div>
          </li>

          {/* <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <a className="dropdown-item" href="/account/overview">
              <i className="bi bi-person me-2 fs-3"></i> My Profile
            </a>
          </li>
          <li>
            <a
              className="dropdown-item d-flex justify-content-between align-items-center"
              href="/projects/list"
            >
              <span>
                <i className="bi bi-briefcase me-2 fs-3"></i> My Projects
              </span>
              <span className="badge bg-danger rounded-pill">3</span>
            </a>
          </li> */}

          <li>
            <hr className="dropdown-divider" />
          </li>

          <li>
            <button
              className="dropdown-item"
              onClick={() => setShowUserSettingApp(!showUserSettingApp)}
            >
              <i className="bi bi-gear me-2 fs-3 fs-3"></i> Account Settings
            </button>
          </li>

          <li>
            <button
              className="dropdown-item"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              <i className="bi bi-key me-2 fs-3 fs-3"></i> Change password
            </button>
          </li>

          <li>
            <button
              className="dropdown-item text-danger"
              type="button"
              onClick={() => dispatch(clearCredentials())}
            >
              <i className="bi bi-box-arrow-right me-2 fs-3"></i> Sign Out
            </button>
          </li>
        </ul>
      </div>

      {showChangePassword && (
        <ChangePasswordApp
          show={showChangePassword}
          handleClose={() => setShowChangePassword(!showChangePassword)}
        />
      )}
      {showUserSettingApp && (
        <UserSettingApp
          show={showUserSettingApp}
          handleClose={() => setShowUserSettingApp(!showUserSettingApp)}
        />
      )}
    </div>
  );
};

export default UserMenuApp;
