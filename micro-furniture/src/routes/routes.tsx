import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import { AdministrationRoutes } from "../features/administration/administration.routes";
import AppInitializer from "./app-initializer";
import AuthApp from "../components/auth/auth";
import { CatalogRoutes } from "../features/store/catalog/routes/catalog.routes";
import { CustomerRoutes } from "../features/store/customer/routes/customer.route";
import ForgetPasswordApp from "../components/auth/forget-password/forget-password";
import InitWebsiteApp from "../features/website/init-website/init-website";
import { LegalRoutes } from "../features/website/legal/legal.routes";
import LoadingApp from "../components/loading/loading";
import LoginApp from "../components/auth/login/login";
import OrderSuccessApp from "../features/website/cart/order-success/order-success";
import PrivateRoute from "./private-route";
import { ROUTE_URL } from "./constants/routes.const";
import ResetPassword from "../components/auth/reset-password/reset-password";
import { SalesRoutes } from "../features/store/sales/routes/sales.routes";
import ScrollToTop from "../hooks/scroll-to-top";
import { useAuthInit } from "../hooks/use-auth-init";

const HomeApp = lazy(() => import("../features/website/home/home"));
const WebsiteApp = lazy(() => import("../features/website/website"));
const ProductsApp = lazy(() => import("../features/website/products/products"));
const ProductDetailsApp = lazy(
  () => import("../features/website/products/details/product-details"),
);

const CartApp = lazy(() => import("../features/website/cart/cart"));

//#region admin panel
const LandingPageApp = lazy(
  () => import("../components/landing-page/landing-page"),
);

const DashboardApp = lazy(() => import("../features/dashboard/dashboard"));
const UIApp = lazy(() => import("../components/ui/ui"));
const SettingsApp = lazy(() => import("../features/settings/settings"));
const WishlistApp = lazy(() => import("../features/website/wishlist/wishlist"));

const ProfileApp = lazy(() => import("../features/website/profile/profile"));

//#endregion

const RoutesApp = () => {
  useAuthInit();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingApp />}>
        <ScrollToTop />

        <Routes>
          {/* PUBLIC WEBSITE */}

          <Route element={<InitWebsiteApp />}>
            <Route path={ROUTE_URL.WEBSITE.BASE} element={<WebsiteApp />}>
              <Route index element={<HomeApp />} />

              <Route
                path={ROUTE_URL.WEBSITE.PRODUCTS}
                element={<ProductsApp />}
              />

              <Route
                path={ROUTE_URL.WEBSITE.PRODUCT_DETAILS}
                element={<ProductDetailsApp />}
              />

              <Route path={ROUTE_URL.WEBSITE.CART} element={<CartApp />} />

              <Route
                path={ROUTE_URL.WEBSITE.ORDER_SUCCESS}
                element={<OrderSuccessApp />}
              />

              <Route
                path={ROUTE_URL.WEBSITE.WISHLIST}
                element={<WishlistApp />}
              />

              <Route
                path={ROUTE_URL.WEBSITE.PROFILE_EDIT}
                element={<ProfileApp />}
              />

              {LegalRoutes()}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>

          {/* AUTH */}
          <Route element={<AuthApp />}>
            <Route path={ROUTE_URL.LOGIN} element={<LoginApp />} />

            <Route
              path={ROUTE_URL.FORGET_PASSWORD}
              element={<ForgetPasswordApp />}
            />

            <Route
              path={ROUTE_URL.RESET_PASSWORD}
              element={<ResetPassword />}
            />
          </Route>

          {/* ADMIN */}
          <Route element={<AppInitializer />}>
            <Route element={<PrivateRoute />}>
              <Route path={ROUTE_URL.HOME} element={<LandingPageApp />}>
                <Route
                  index
                  element={<Navigate to={ROUTE_URL.DASHBOARD} replace />}
                />
                <Route path={ROUTE_URL.DASHBOARD} element={<DashboardApp />} />
                <Route path={ROUTE_URL.UI} element={<UIApp />} />
                <Route
                  path={ROUTE_URL.APP_SETTINGS}
                  element={<SettingsApp />}
                />

                {SalesRoutes()}
                {AdministrationRoutes()}
                {CatalogRoutes()}
                {CustomerRoutes()}

                <Route
                  path="*"
                  element={<Navigate to={ROUTE_URL.DASHBOARD} replace />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesApp;
