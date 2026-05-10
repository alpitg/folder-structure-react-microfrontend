import { Outlet } from "react-router";

const ProductApp = () => {
  return (
    <div className="product-app">
      <Outlet />
    </div>
  );
};

export default ProductApp;
