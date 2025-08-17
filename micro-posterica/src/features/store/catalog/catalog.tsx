import { Outlet } from "react-router";

const CatalogApp = () => {
  return (
    <div className="catalog-app">
      <Outlet />
    </div>
  );
};

export default CatalogApp;
