import type { IProductData } from "../../../interface/product/product.model";
import { useFormContext } from "react-hook-form";

const ProductGeneralApp = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IProductData>();

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>General</h2>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="mb-10 fv-row fv-plugins-icon-container">
          <label className="required form-label" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            className={`form-control form-control-solid mb-2 ${
              errors?.name ? "is-invalid" : ""
            }`}
            placeholder="Product name"
            {...register("name", {
              required: "Product Name is required",
            })}
          />
          {errors?.name?.message ? (
            <div className="invalid-feedback">{errors.name.message}</div>
          ) : (
            <div className="text-muted fs-7">
              A product name is required and recommended to be unique.
            </div>
          )}

          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>
        <div>
          <label className="form-label" htmlFor="product-description">
            Description
          </label>
          <input
            id="product-description"
            type="text"
            className="form-control mb-2"
            placeholder="Product description"
            {...register("description")}
          />

          <div className="text-muted fs-7">
            Set a description to the product for better visibility.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGeneralApp;
