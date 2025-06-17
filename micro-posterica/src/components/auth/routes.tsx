import { BrowserRouter, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import LoadingApp from "../loading/loading";
import { ROUTE_URL } from "./constants/routes.const";

const LandingPageApp = lazy(() => import("../landing-page/landing-page"));
const AdministrationApp = lazy(
  () => import("../../features/administration/administration")
);

const RoutesApp = () => {
  return (
    <Suspense fallback={<div>{<LoadingApp />}</div>}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_URL.DASHBOARD} element={<LandingPageApp />}>
            <Route
              path={ROUTE_URL.ADMIN.BASE}
              element={<AdministrationApp />}
            />
          </Route>

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
