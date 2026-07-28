import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import { AdministrationRoutes } from "../features/administration/administration.routes";
import AppInitializer from "./app-initializer";
import AuthApp from "../components/auth/auth";
import { CatalogRoutes } from "../features/store/catalog/routes/catalog.routes";
import LoadingApp from "../components/loading/loading";
import LoginApp from "../components/auth/login/login";
import PrivateRoute from "./private-route";
import { ROUTE_URL } from "./constants/routes.const";
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

//#endregion

const RoutesApp = () => {
  useAuthInit(); // run once at app start

  return (
    <Suspense fallback={<LoadingApp />}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={ROUTE_URL.WEBSITE.BASE} element={<WebsiteApp />}>
            <Route path={ROUTE_URL.WEBSITE.BASE} element={<HomeApp />} />
            <Route
              path={ROUTE_URL.WEBSITE.PRODUCTS}
              element={<ProductsApp />}
            />
            <Route
              path={ROUTE_URL.WEBSITE.PRODUCT_DETAILS}
              element={<ProductDetailsApp />}
            />
            <Route path="/cart" element={<CartApp />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          {/* 🔓 Public */}
          <Route element={<AuthApp />}>
            <Route path={ROUTE_URL.LOGIN} element={<LoginApp />} />
          </Route>

          {/* 🔒 Protected */}
          <Route element={<AppInitializer />}>
            <Route element={<PrivateRoute />}>
              <Route path={ROUTE_URL.DASHBOARD} element={<LandingPageApp />}>
                {SalesRoutes()}
                {AdministrationRoutes()}
                {CatalogRoutes()}
                <Route
                  path="*"
                  element={<Navigate to={ROUTE_URL.DASHBOARD} replace />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default RoutesApp;
