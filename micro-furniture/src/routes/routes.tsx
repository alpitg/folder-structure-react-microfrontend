import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import AppInitializer from "./app-initializer";
import AuthApp from "../components/auth/auth";
import { CatalogRoutes } from "../features/store/catalog/routes/catalog.routes";
import LoadingApp from "../components/loading/loading";
import LoginApp from "../components/auth/login/login";
import PrivateRoute from "./private-route";
import { ROUTE_URL } from "./constants/routes.const";
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

const OrderListApp = lazy(
  () => import("../features/store/sales/order/list/order-list"),
);

const OrderFormApp = lazy(
  () => import("../features/store/sales/order/form/order-form"),
);

const OrderViewApp = lazy(
  () => import("../features/store/sales/order/view/order-view"),
);

const SalesApp = lazy(() => import("../features/store/sales/sales"));
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
          </Route>

          {/* 🔓 Public */}
          <Route element={<AuthApp />}>
            <Route path={ROUTE_URL.LOGIN} element={<LoginApp />} />
          </Route>

          {/* 🔒 Protected */}
          <Route element={<AppInitializer />}>
            <Route element={<PrivateRoute />}>
              <Route path={ROUTE_URL.DASHBOARD} element={<LandingPageApp />}>
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
