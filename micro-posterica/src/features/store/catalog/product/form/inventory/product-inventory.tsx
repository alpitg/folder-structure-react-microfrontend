import type { IProductData } from "../../../interface/product/product.model";
import { useFormContext } from "react-hook-form";

const ProductInventoryApp = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IProductData>();

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>
            <i className="bi bi-box-seam me-2"></i>Inventory
          </h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <div className="mb-10 fv-row">
          <label className="required form-label">
            <i className="bi bi-upc-scan me-2"></i>SKU
          </label>
          <input
            type="text"
            placeholder="SKU Number"
            className={`form-control form-control-solid mb-2 ${
              errors?.inventory?.sku ? "is-invalid" : ""
            }`}
            {...register("inventory.sku", {
              required: "SKU number is required",
            })}
          />

          {errors?.inventory?.sku?.message ? (
            <div className="invalid-feedback">
              {errors?.inventory?.sku?.message}
            </div>
          ) : (
            <div className="text-muted fs-7">Enter the product SKU.</div>
          )}
        </div>

        <div className="mb-10 fv-row">
          <label className="required form-label">
            <i className="bi bi-upc me-2"></i>Barcode
          </label>
          <input
            type="text"
            placeholder="Barcode Number"
            className={`form-control mb-2 ${
              errors?.inventory?.barcode ? "is-invalid" : ""
            }`}
            {...register("inventory.barcode", {
              required: "Barcode number is required",
            })}
          />

          {errors?.inventory?.barcode?.message ? (
            <div className="invalid-feedback">
              {errors?.inventory?.barcode?.message}
            </div>
          ) : (
            <div className="text-muted fs-7">
              Enter the product barcode number.
            </div>
          )}
        </div>

        <div className="mb-10 fv-row">
          <label className="required form-label">
            <i className="bi bi-stack me-2"></i>Quantity
          </label>
          <div className="d-flex gap-3">
            <input
              type="number"
              placeholder="On shelf"
              className={`form-control  mb-2 ${
                errors?.inventory?.quantityInShelf ? "is-invalid" : ""
              }`}
              {...register("inventory.quantityInShelf", {
                valueAsNumber: true,
                required: "On Shelf quantity is required",
              })}
            />
            <input
              type="number"
              placeholder="In warehouse"
              className={`form-control mb-2 ${
                errors?.inventory?.quantityInWarehouse ? "is-invalid" : ""
              }`}
              {...register("inventory.quantityInWarehouse", {
                required: "In-Warehouse quantity is required",
              })}
            />
          </div>
          {errors?.inventory?.quantityInWarehouse?.message ? (
            <div className="invalid-feedback">
              {errors?.inventory?.quantityInWarehouse?.message}
            </div>
          ) : (
            <div className="text-muted fs-7">Enter the product quantity.</div>
          )}
        </div>

        <div className="fv-row">
          <label className="form-label">
            <i className="bi bi-cart-x me-2"></i>Allow Backorders
          </label>
          <div className="form-check form-check-custom form-check-solid mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              {...register("inventory.allowBackorders", {
                valueAsNumber: true,
              })}
            />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="text-muted fs-7">
            Allow customers to purchase products that are out of stock.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInventoryApp;
