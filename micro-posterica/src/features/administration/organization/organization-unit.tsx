import OrganizationTreeApp from "./tree/organization-tree";
import PageHeaderApp from "../../../components/header/page-header/page-header";

const OrganizationUnitApp = () => {
  return (
    <div>
      <PageHeaderApp
        header="Organisation Units"
        description="Use organisation units to organise users and entities."
      />
      <OrganizationTreeApp />
    </div>
  );
};

export default OrganizationUnitApp;
