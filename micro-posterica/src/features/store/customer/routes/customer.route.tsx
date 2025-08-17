import { ROUTE_URL } from "../../../../components/auth/constants/routes.const";
import { Route } from "react-router";
import { lazy } from "react";

const CustomerApp = lazy(() => import("../customer"));
const CustomerListApp = lazy(() => import("../list/customer-list"));
const CustomerAddFormApp = lazy(() => import("../form/add/customer-add-form"));
const CustomerFormApp = lazy(() => import("../form/customer-form"));

export const CustomerRoutes = () => {
  return (
    <Route path={ROUTE_URL.CUSTOMER.BASE} element={<CustomerApp />}>
      <Route path={ROUTE_URL.CUSTOMER.LIST} element={<CustomerListApp />} />
      <Route
        path={ROUTE_URL.CUSTOMER.ADD}
        element={<CustomerAddFormApp mode="add" />}
      />
      <Route
        path={ROUTE_URL.CUSTOMER.EDIT}
        element={<CustomerFormApp mode="edit" />}
      />
    </Route>
  );
};
