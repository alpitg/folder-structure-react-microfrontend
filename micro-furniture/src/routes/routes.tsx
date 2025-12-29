import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

import LoadingApp from "../components/loading/loading";
import { ROUTE_URL } from "./constants/routes.const";
import { useAuthInit } from "../hooks/use-auth-init";

const WebsiteApp = lazy(() => import("../features/website/website"));

const RoutesApp = () => {
  useAuthInit(); // run once at app start

  return (
    <Suspense fallback={<LoadingApp />}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_URL.WEBSITE.BASE} element={<WebsiteApp />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default RoutesApp;
