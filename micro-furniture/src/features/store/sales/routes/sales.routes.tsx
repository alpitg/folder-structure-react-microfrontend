import { ROUTE_URL } from "../../../../routes/constants/routes.const";
import { Route } from "react-router";
import { lazy } from "react";

const OrderListApp = lazy(
  () => import("../../../../features/store/sales/order/list/order-list"),
);

const OrderFormApp = lazy(
  () => import("../../../../features/store/sales/order/form/order-form"),
);

const OrderViewApp = lazy(
  () => import("../../../../features/store/sales/order/view/order-view"),
);

const SalesApp = lazy(() => import("../../../../features/store/sales/sales"));

export const SalesRoutes = () => {
  return (
    <Route path={ROUTE_URL.SALES.BASE} element={<SalesApp />}>
      <Route path={ROUTE_URL.SALES.ORDER.LIST} element={<OrderListApp />} />
      <Route path={ROUTE_URL.SALES.ORDER.ADD} element={<OrderFormApp />} />
      <Route path={ROUTE_URL.SALES.ORDER.EDIT} element={<OrderFormApp />} />
      <Route path={ROUTE_URL.SALES.ORDER.VIEW} element={<OrderViewApp />} />
    </Route>
  );
};
