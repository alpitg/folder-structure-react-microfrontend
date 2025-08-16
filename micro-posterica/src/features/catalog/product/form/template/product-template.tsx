import type { IProductData } from "../../../interface/product/product.model";
import { useFormContext } from "react-hook-form";

const ProductTemplateApp = () => {
  const { register } = useFormContext<IProductData>();

  const templates = [
    {
      id: 1,
      displayName: "Default template",
      value: "default",
    },
    {
      id: 2,
      displayName: "Electronics",
      value: "electronics",
    },
    {
      id: 3,
      displayName: "Office stationary",
      value: "office_stationary",
    },
    {
      id: 4,
      displayName: "Fashion",
      value: "fashion",
    },
  ];

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Product Template</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <label
          htmlFor="catalog_add_product_store_template"
          className="form-label"
        >
          Select a product template
        </label>

        <select
          className="form-select mb-2"
          id="catalog_add_product_store_template"
          defaultValue="default"
          {...register("template")}
        >
          {templates?.map((x) => {
            return <option value={x?.value}>{x?.displayName}</option>;
          })}
        </select>

        <div className="text-muted fs-7">
          Assign a template from your current theme to define how a single
          product is displayed.
        </div>
      </div>
    </div>
  );
};

export default ProductTemplateApp;
