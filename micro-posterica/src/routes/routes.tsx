import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import { AdministrationRoutes } from "../features/administration/administration.routes";
import AppInitializer from "./app-initializer";
import { CatalogRoutes } from "../features/store/catalog/routes/catalog.routes";
import { CustomerRoutes } from "../features/store/customer/routes/customer.route";
import LoadingApp from "../components/loading/loading";
import PrivateRoute from "./private-route";
import { ROUTE_URL } from "./constants/routes.const";
import { useAuthInit } from "../hooks/use-auth-init";

const AuthApp = lazy(() => import("../components/auth/auth"));
const LoginApp = lazy(() => import("../components/auth/login/login"));
const ForgetPasswordApp = lazy(
  () => import("../components/auth/forget-password/forget-password")
);
const ResetPasswordApp = lazy(
  () => import("../components/auth/reset-password/reset-password")
);
const ForbiddenApp = lazy(
  () => import("../components/auth/forbidden/forbidden")
);

const LandingPageApp = lazy(
  () => import("../components/landing-page/landing-page")
);
const DashboardApp = lazy(() => import("../features/dashboard/dashboard"));
const SettingsApp = lazy(() => import("../features/settings/settings"));
const UIApp = lazy(() => import("../components/ui/ui"));
const MasterApp = lazy(() => import("../features/store/master/master"));
const FrameTypesApp = lazy(
  () => import("../features/store/master/frame/frame-types/frame-types")
);
const GlassTypesApp = lazy(
  () => import("../features/store/master/glass-types/glass-types")
);
const MiscChargesApp = lazy(
  () => import("../features/store/master/misc-charges/misc-charges")
);
const SalesApp = lazy(() => import("../features/store/sales/sales"));
const OrderListApp = lazy(
  () => import("../features/store/sales/order/list/order-list")
);
const OrderFormApp = lazy(
  () => import("../features/store/sales/order/form/order-form")
);
const OrderViewApp = lazy(
  () => import("../features/store/sales/order/view/order-view")
);

const RoutesApp = () => {
  useAuthInit(); // run once at app start

  return (
    <Suspense fallback={<LoadingApp />}>
      <BrowserRouter>
        <Routes>
          {/* 🔓 Public */}
          <Route element={<AuthApp />}>
            <Route path={ROUTE_URL.LOGIN} element={<LoginApp />} />
            <Route
              path={ROUTE_URL.FORGET_PASSWORD}
              element={<ForgetPasswordApp />}
            />
            <Route
              path={ROUTE_URL.RESET_PASSWORD}
              element={<ResetPasswordApp />}
            />
            <Route path={ROUTE_URL.FORBIDDEN} element={<ForbiddenApp />} />
          </Route>

          {/* 🔒 Protected */}
          <Route element={<AppInitializer />}>
            <Route element={<PrivateRoute />}>
              <Route path={ROUTE_URL.DASHBOARD} element={<LandingPageApp />}>
                <Route path={ROUTE_URL.DASHBOARD} element={<DashboardApp />} />
                <Route path={ROUTE_URL.UI} element={<UIApp />} />
                <Route
                  path={ROUTE_URL.APP_SETTINGS}
                  element={<SettingsApp />}
                />

                <Route path={ROUTE_URL.SALES.BASE} element={<SalesApp />}>
                  <Route
                    path={ROUTE_URL.SALES.ORDER.LIST}
                    element={<OrderListApp />}
                  />
                  <Route
                    path={ROUTE_URL.SALES.ORDER.ADD}
                    element={<OrderFormApp />}
                  />
                  <Route
                    path={ROUTE_URL.SALES.ORDER.EDIT}
                    element={<OrderFormApp />}
                  />
                  <Route
                    path={ROUTE_URL.SALES.ORDER.VIEW}
                    element={<OrderViewApp />}
                  />
                </Route>

                {CatalogRoutes()}
                {CustomerRoutes()}
                {AdministrationRoutes()}

                <Route path={ROUTE_URL.MASTER.BASE} element={<MasterApp />}>
                  <Route
                    path={ROUTE_URL.MASTER.FRAME_TYPES.BASE}
                    element={<FrameTypesApp />}
                  />
                  <Route
                    path={ROUTE_URL.MASTER.GLASS_TYPES.BASE}
                    element={<GlassTypesApp />}
                  />
                  <Route
                    path={ROUTE_URL.MASTER.MISC_CHARGES.BASE}
                    element={<MiscChargesApp />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default RoutesApp;
