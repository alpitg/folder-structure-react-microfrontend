import { Outlet } from "react-router";
import ToastApp from "../ui/toast/toast";
import { clearToast } from "../../app/redux/core/app-settings/app-settings.slice";
import { useDispatch } from "react-redux";
import { useToast } from "../../hooks/use-toast";

const AuthApp = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{
          backgroundImage: "url('/static/media/img/login-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="card shadow-lg m-10 w-100 w-lg-500px">
          <div className="card-body p-10">
            <Outlet />
          </div>
        </div>
      </div>

      <ToastApp
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => dispatch(clearToast())}
      />
    </>
  );
};

export default AuthApp;
