import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { Route } from "react-router";
import { lazy } from "react";

const TermsOfUseApp = lazy(() => import("./terms-of-use/terms-of-use"));
const PrivacyPolicyApp = lazy(() => import("./privacy-policy/privacy-policy"));

export const LegalRoutes = () => {
  return (
    <>
      <Route
        path={ROUTE_URL.WEBSITE.TERMS_OF_USE}
        element={<TermsOfUseApp />}
      />

      <Route
        path={ROUTE_URL.WEBSITE.PRIVACY_POLICY}
        element={<PrivacyPolicyApp />}
      />
    </>
  );
};
