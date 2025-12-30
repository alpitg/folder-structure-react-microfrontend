import InvoiceSettingApp from "./invoice/invoice-setting";
import NotificationSettingApp from "./notification/notification-setting";
import PageHeaderApp from "../../components/header/page-header/page-header";
import SecuritySettingApp from "./security/security-setting";

const SettingsApp = () => {
  return (
    <div>
      <PageHeaderApp
        header={"Application settings"}
        description="Configure your application settings including invoice and notification preferences."
      />

      <div className="d-flex flex-column flex-md-row gap-5">
        <div className="flex-row-fluid">
          <SecuritySettingApp />
        </div>

        <div className="flex-row-fluid">
          <InvoiceSettingApp />
        </div>

        <div className="flex-row-fluid">
          <NotificationSettingApp />
        </div>
      </div>

    </div>
  );
};

export default SettingsApp;
