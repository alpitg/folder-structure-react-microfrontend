import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { Route } from "react-router";
import { lazy } from "react";

const LeadsDashboardApp = lazy(() => import("../dashboard/dashboard"));

const LeadsApp = lazy(() => import("../leads"));
const LeadsListApp = lazy(() => import("../list/leads-list"));

export const LeadsRoutes = () => {
  return (
    <Route path={ROUTE_URL.LEADS.BASE} element={<LeadsApp />}>
      <Route path={ROUTE_URL.LEADS.DASHBOARD} element={<LeadsDashboardApp />} />
      <Route path={ROUTE_URL.LEADS.LIST} element={<LeadsListApp />} />
    </Route>
  );
};
