import { LOCALSTORAGE_AUTH_KEY } from "../../../constants/global/global-key.const";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { clearCredentials } from "../../../app/redux/crm/administration/auth/auth.slice";
import errorImage from "/static/media/img/svg/error-404.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const ErrorLoginAgainApp = ({ description }: { description?: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClearAndLogin = () => {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
    dispatch(clearCredentials());
    navigate(ROUTE_URL.LOGIN, { replace: true });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        padding: "20px",
        paddingTop: "10rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
        Oops! Something went wrong.
      </h1>
      <p style={{ color: "#6c757d" }}>{description}</p>

      <img
        src={errorImage}
        alt="Error"
        style={{ maxWidth: "300px", marginBottom: "20px" }}
      />

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClearAndLogin}
      >
        Clear cache and go to login
      </button>
    </div>
  );
};

export default ErrorLoginAgainApp;
