import { Outlet } from "react-router";

const CustomerApp = () => {
  return (
    <div className="customer-app">
      <Outlet />
    </div>
  );
};

export default CustomerApp;
