import OrganizationUnitApp from "./organization/organization-unit";
import { ROUTE_URL } from "../../components/auth/constants/routes.const";
import { Route } from "react-router";
import { lazy } from "react";

const AdministrationApp = lazy(() => import("./administration"));
const RolesApp = lazy(() => import("./roles/roles"));
const UsersApp = lazy(() => import("./users/users"));

export const AdministrationRoutes = () => {
  return (
    <Route path={ROUTE_URL.ADMINISTRATION.BASE} element={<AdministrationApp />}>
      <Route
        path={ROUTE_URL.ADMINISTRATION.ORGANIZATION_UNIT.BASE}
        element={<OrganizationUnitApp />}
      >
        {/* <Route
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
        /> */}
      </Route>

      <Route path={ROUTE_URL.ADMINISTRATION.ROLES.BASE} element={<RolesApp />}>
        {/* <Route
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
        /> */}
      </Route>

      <Route path={ROUTE_URL.ADMINISTRATION.USERS.BASE} element={<UsersApp />}>
        {/* <Route
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
        /> */}
      </Route>
    </Route>
  );
};
