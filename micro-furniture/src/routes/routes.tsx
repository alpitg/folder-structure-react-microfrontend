import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import LoadingApp from "../components/loading/loading";
import { ROUTE_URL } from "./constants/routes.const";
import { useAuthInit } from "../hooks/use-auth-init";

const HomeApp = lazy(() => import("../features/website/home/home"));
const WebsiteApp = lazy(() => import("../features/website/website"));
const ProductsApp = lazy(() => import("../features/website/products/products"));
const ProductDetailsApp = lazy(
  () => import("../features/website/products/details/product-details"),
);

const CartApp = lazy(() => import("../features/website/cart/cart"));

const RoutesApp = () => {
  useAuthInit(); // run once at app start

  return (
    <Suspense fallback={<LoadingApp />}>
      <BrowserRouter>
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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default RoutesApp;
