import CatalogApp from "../catalog";
import { ROUTE_URL } from "../../../components/auth/constants/routes.const";
import { Route } from "react-router";
import { lazy } from "react";

const ProductApp = lazy(() => import("../product/product"));
const ProductListApp = lazy(() => import("../product/list/product-list"));
const ProductFormApp = lazy(() => import("../product/form/product-form"));

const CategoryApp = lazy(() => import("../category/product-category"));
const CategoryListApp = lazy(
  () => import("../category/list/product-category-list")
);
const CategoryFormApp = lazy(
  () => import("../category/form/product-category-form")
);
const CategoryViewApp = lazy(
  () => import("../category/view/product-category-view")
);

export const CatalogRoutes = () => {
  return (
    <Route path={ROUTE_URL.CATALOG.BASE} element={<CatalogApp />}>
      <Route path={ROUTE_URL.CATALOG.PRODUCT.BASE} element={<ProductApp />}>
        <Route
          path={ROUTE_URL.CATALOG.PRODUCT.LIST}
          element={<ProductListApp />}
        />
        <Route
          path={ROUTE_URL.CATALOG.PRODUCT.ADD}
          element={<ProductFormApp mode="add" />}
        />
        <Route
          path={ROUTE_URL.CATALOG.PRODUCT.EDIT}
          element={<ProductFormApp mode="edit" />}
        />
      </Route>

      <Route path={ROUTE_URL.CATALOG.CATEGORY.BASE} element={<CategoryApp />}>
        <Route
          path={ROUTE_URL.CATALOG.CATEGORY.LIST}
          element={<CategoryListApp />}
        />
        <Route
          path={ROUTE_URL.CATALOG.CATEGORY.ADD}
          element={<CategoryFormApp mode="add" />}
        />
        <Route
          path={ROUTE_URL.CATALOG.CATEGORY.EDIT}
          element={<CategoryFormApp mode="edit" />}
        />
        <Route
          path={ROUTE_URL.CATALOG.CATEGORY.VIEW}
          element={<CategoryViewApp />}
        />
      </Route>
    </Route>
  );
};
