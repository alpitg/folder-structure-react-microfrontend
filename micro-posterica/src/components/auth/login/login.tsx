import "./login.scss";
// import { useEffect, useState } from "react";
// import { Card } from "primereact/card";
// import { InputText } from "primereact/inputtext";
// import { useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { authenticateRequest } from "../../../store/actions/auth.action";
// import { IAuthenticationRequestModel } from "../../../interfaces/auth.model";
// import { ROUTE_URL } from "../constants/routes.const";
// import SaveLoaderButtonApp from "../../ui/save-loader-button/save-loader-button";
// import AuthService from "../../../services/auth.service";
// import { AppState } from "../../../store/reducers/root.reducer";
// import MessagesApp from "../../ui/messages/messages";

const LoginApp = () => {
  //   const auth = useSelector((x: AppState) => x.authenticate);
  //   const isAuthenticated = AuthService.getAuthDetail()?.isAuthenticated;
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  //   const [useLoginDetail, setUseLoginDetail] =
  //     useState<IAuthenticationRequestModel>({
  //       userName: "admin@gmail.com",
  //       password: "admin@123",
  //       remoteIp: "",
  //       latitude: "",
  //       longitude: "",
  //     });

  //   useEffect(() => {
  //     // NOTE: Currently checking both localstorage & store for auth flag
  //     if (isAuthenticated || auth?.result?.isAuthenticated) {
  //       navigate(ROUTE_URL.DASHBOARD);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [auth?.result?.isAuthenticated]);

  //   const onLogin = (e: any) => {
  //     e?.preventDefault();
  //     dispatch(authenticateRequest(useLoginDetail));
  //   };

  return (
    <div className="login-app">
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="d-flex flex-lg-row-fluid w-lg-50 bgi-position-center">
          <div className="d-flex flex-column flex-center p-6 p-lg-10 w-100">
            <a href="/keen/demo1/index.html" className="mb-0 mb-lg-20">
              <img
                alt="Logo"
                src="/static/media/img/logo.png"
                className="h-40px h-lg-50px"
              />
            </a>

            <img
              className="d-none d-lg-block mx-auto w-300px w-lg-75 w-xl-500px mb-10 mb-lg-20"
              src="/static/media/img/login-auth.png"
              alt=""
            />

            <h1 className="d-none d-lg-block text-white fs-2qx fw-bold text-center mb-7">
              Fast, Efficient and Productive
            </h1>

            <div className="d-none d-lg-block text-white fs-base text-center">
              In this kind of post,
              <a
                href="#"
                className="opacity-75-hover text-warning fw-semibold me-1"
              >
                the blogger
              </a>
              introduces a person they've interviewed <br />
              and provides some background information about{" "}
              <a
                href="#"
                className="opacity-75-hover text-warning fw-semibold me-1"
              >
                the interviewee
              </a>
              and their <br />
              work following this is a transcript of the interview.
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10">
          <div className="d-flex flex-center flex-column flex-lg-row-fluid">
            <div className="w-lg-500px p-10">
              <form
                className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                id="kt_sign_in_form"
                noValidate
                data-kt-redirect-url="/keen/demo1/index.html"
              >
                <div className="text-center mb-11">
                  <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
                  <div className="text-gray-500 fw-semibold fs-6">
                    Your Personalized App
                  </div>
                </div>

                <div className="row g-3 mb-9 justify-content-center">
                  <div className="col-md-6">
                    <a
                      href="#"
                      className="btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap"
                    >
                      <img
                        alt="Logo"
                        src="/static/media/icon/google-icon.svg"
                        className="h-15px me-3"
                      />
                      Sign in with Google
                    </a>
                  </div>
                </div>

                <div className="separator separator-content my-14">
                  <span className="w-125px text-gray-500 fw-semibold fs-7">
                    Or with email
                  </span>
                </div>

                <div className="fv-row mb-8 fv-plugins-icon-container">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="form-control bg-transparent"
                  />
                  <div className="fv-plugins-message-container invalid-feedback" />
                </div>

                <div className="fv-row mb-3 fv-plugins-icon-container">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    autoComplete="off"
                    className="form-control bg-transparent"
                  />
                  <div className="fv-plugins-message-container invalid-feedback" />
                </div>

                <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                  <div />
                  <a
                    href="/keen/demo1/authentication/layouts/corporate/reset-password.html"
                    className="link-primary"
                  >
                    Forgot Password ?
                  </a>
                </div>

                <div className="d-grid mb-10">
                  <button
                    type="submit"
                    id="kt_sign_in_submit"
                    className="btn btn-primary"
                  >
                    <span className="indicator-label">Sign In</span>
                  </button>
                </div>

                <div className="text-gray-500 text-center fw-semibold fs-6">
                  Not a Member yet?
                  <a
                    href="/keen/demo1/authentication/layouts/corporate/sign-up.html"
                    className="link-primary"
                  >
                    Sign up
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-center flex-wrap px-5">
            <div className="d-flex fw-semibold text-primary fs-base">
              <a
                href="https://keenthemes.com"
                className="px-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms
              </a>
              <a
                href="https://devs.keenthemes.com"
                className="px-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plans
              </a>
              <a
                href="https://themes.getbootstrap.com/product/keen-the-ultimate-bootstrap-admin-theme/"
                className="px-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginApp;
