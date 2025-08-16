import type { IProductData } from "../../../interface/product/product.model";
import { useFormContext } from "react-hook-form";

const ProductInventoryApp = () => {
  const { register } = useFormContext<IProductData>();

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
            className="form-control mb-2"
            {...register("inventory.sku")}
          />
          <div className="text-muted fs-7">Enter the product SKU.</div>
        </div>

        <div className="mb-10 fv-row">
          <label className="required form-label">
            <i className="bi bi-upc me-2"></i>Barcode
          </label>
          <input
            type="text"
            placeholder="Barcode Number"
            className="form-control mb-2"
            {...register("inventory.barcode")}
          />
          <div className="text-muted fs-7">
            Enter the product barcode number.
          </div>
        </div>

        <div className="mb-10 fv-row">
          <label className="required form-label">
            <i className="bi bi-stack me-2"></i>Quantity
          </label>
          <div className="d-flex gap-3">
            <input
              type="number"
              placeholder="On shelf"
              className="form-control mb-2"
              {...register("inventory.quantityInShelf", {
                valueAsNumber: true,
              })}
            />
            <input
              type="number"
              placeholder="In warehouse"
              className="form-control mb-2"
              {...register("inventory.quantityInWarehouse")}
            />
          </div>
          <div className="text-muted fs-7">Enter the product quantity.</div>
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
