import { BrowserRouter, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import LoadingApp from "../loading/loading";
import { ROUTE_URL } from "./constants/routes.const";

const LandingPageApp = lazy(() => import("../landing-page/landing-page"));
const DashboardApp = lazy(() => import("../../features/dashboard/dashboard"));
const SettingsApp = lazy(() => import("../../features/settings/settings"));
const AdministrationApp = lazy(
  () => import("../../features/administration/administration")
);

const UIApp = lazy(() => import("../../components/ui/ui"));

const MasterApp = lazy(() => import("../../features/master/master"));
const FrameTypesApp = lazy(
  () => import("../../features/master/frame/frame-types/frame-types")
);

const GlassTypesApp = lazy(
  () => import("../../features/master/glass-types/glass-types")
);

const MiscChargesApp = lazy(
  () => import("../../features/master/misc-charges/misc-charges")
);

const CreateInvoiceApp = lazy(
  () => import("../../features/bills/invoice/create/create-invoice")
);

const ViewInvoiceApp = lazy(
  () => import("../../features/bills/invoice/view/view-invoice")
);

const SalesApp = lazy(() => import("../../features/finance/sales/sales"));
const OrderEditApp = lazy(
  () => import("../../features/finance/sales/order/edit/order-edit")
);

const RoutesApp = () => {
  return (
    <Suspense fallback={<div>{<LoadingApp />}</div>}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_URL.DASHBOARD} element={<LandingPageApp />}>
            <Route path={ROUTE_URL.DASHBOARD} element={<DashboardApp />} />
            <Route path={ROUTE_URL.UI} element={<UIApp />} />
            <Route
              path={ROUTE_URL.ADMIN.BASE}
              element={<AdministrationApp />}
            />
            <Route path={ROUTE_URL.APP_SETTINGS} element={<SettingsApp />} />

            <Route path={ROUTE_URL.FINANCE.SALES.BASE} element={<SalesApp />} />
            <Route
              path={ROUTE_URL.FINANCE.SALES.EDIT}
              element={<OrderEditApp />}
            />

            <Route
              path={ROUTE_URL.INVOICE_MANAGER.CREATE}
              element={<CreateInvoiceApp />}
            />
            <Route
              path={ROUTE_URL.INVOICE_MANAGER.VIEW}
              element={<ViewInvoiceApp />}
            />
            <Route path={ROUTE_URL.MASTER.BASE} element={<MasterApp />}>
              <Route
                path={ROUTE_URL.MASTER.FRAME_TYPES.BASE}
                element={<FrameTypesApp />}
              />
              <Route
                path={ROUTE_URL.MASTER.GLASS_TYPES.BASE}
                element={<GlassTypesApp />}
              />
              <Route
                path={ROUTE_URL.MASTER.MISC_CHARGES.BASE}
                element={<MiscChargesApp />}
              />
            </Route>
          </Route>

          {/* PAGES */}
          {/* <Route>
              <Route path={ROUTE_URL.ABOUT} element={<About />} />
              <Route path={ROUTE_URL.CONTACT} element={<Contact />} />
              <Route
                path={ROUTE_URL.SOCIAL_MEDIA_MANAGEMENT}
                element={<SocialMedia />}
              />
              <Route path={ROUTE_URL.UI} element={<UI />} />
            </Route> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default RoutesApp;
