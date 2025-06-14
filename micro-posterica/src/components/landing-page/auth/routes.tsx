import { BrowserRouter, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import { ROUTE_URL } from "./constants/routes.const";

const Login = lazy(() => import("../auth/login/login"));
const LandingPage = lazy(() => import("../../landing-page/landing-page"));

const RoutesApp = () => {
  return (
    <Suspense fallback={<div>{"LOADING..."}</div>}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_URL.LOGIN} element={<Login />} />
          <Route path={ROUTE_URL.DASHBOARD} element={<LandingPage />} />

          {/* PAGES */}
          {/* <Route>
              <Route path={ROUTE_URL.ABOUT} element={<About />} />
              <Route path={ROUTE_URL.CONTACT} element={<Contact />} />
              <Route
                path={ROUTE_URL.SOCIAL_MEDIA_MANAGEMENT}
                element={<SocialMedia />}
              />
              <Route path={ROUTE_URL.UI} element={<UI />} />
            </Route> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default RoutesApp;
