import OrganizationUnitApp from "./organization/organization-unit";
import OrganizationUnitsListApp from "./organization/list/organization-units-list";
import PrivateRoute from "../../routes/private-route";
import { ROUTE_URL } from "../../routes/constants/routes.const";
import RoleListApp from "./roles/list/role-list";
import { Route } from "react-router";
import UserListApp from "./users/list/users-list";
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
        <Route
          element={
            <PrivateRoute
              requiredPermission={["Pages.Administration.OrganizationUnits"]}
            />
          }
        >
          <Route
            path={ROUTE_URL.ADMINISTRATION.ORGANIZATION_UNIT.LIST}
            element={<OrganizationUnitsListApp />}
          />
        </Route>
      </Route>

      <Route path={ROUTE_URL.ADMINISTRATION.ROLES.BASE} element={<RolesApp />}>
        <Route
          element={
            <PrivateRoute requiredPermission={["Pages.Administration.Roles"]} />
          }
        >
          <Route
            path={ROUTE_URL.ADMINISTRATION.ROLES.LIST}
            element={<RoleListApp />}
          />
        </Route>
      </Route>

      <Route path={ROUTE_URL.ADMINISTRATION.USERS.BASE} element={<UsersApp />}>
        <Route
          element={
            <PrivateRoute requiredPermission={["Pages.Administration.Users"]} />
          }
        >
          <Route
            path={ROUTE_URL.ADMINISTRATION.USERS.LIST}
            element={<UserListApp />}
          />
        </Route>
      </Route>
    </Route>
  );
};
