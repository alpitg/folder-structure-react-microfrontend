import type { IProductData } from "../../../interface/product/product.model";
import { useFormContext } from "react-hook-form";

const ProductShippingApp = () => {
  const { register, watch } = useFormContext<IProductData>();

  // Watch checkbox value
  const isPhysical = watch("shipping.isPhysical", false);

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Shipping</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <div className="fv-row">
          <div className="form-check form-check-custom form-check-solid mb-2">
            <input
              type="checkbox"
              id="catalog_add_product_shipping_checkbox"
              className="form-check-input"
              {...register("shipping.isPhysical")}
            />
            <label
              className="form-check-label"
              htmlFor="catalog_add_product_shipping_checkbox"
            >
              This is a physical product
            </label>
          </div>

          <div className="text-muted fs-7">
            Set if the product is a physical or digital item. Physical products
            may require shipping.
          </div>
        </div>

        {isPhysical && (
          <div id="catalog_add_product_shipping" className="mt-10">
            <div className="mb-10 fv-row">
              <label className="form-label">Weight</label>
              <input
                type="number"
                step="0.01"
                {...register("shipping.weightInKg")}
                className="form-control mb-2"
                placeholder="Product weight (kg)"
              />
              <div className="text-muted fs-7">
                Set a product weight in kilograms (kg).
              </div>
            </div>

            <div className="fv-row">
              <label className="form-label">Dimensions</label>
              <div className="d-flex flex-wrap flex-sm-nowrap gap-3">
                <input
                  type="number"
                  {...register("shipping.widthInCm")}
                  className="form-control mb-2"
                  placeholder="Width (w)"
                />
                <input
                  type="number"
                  {...register("shipping.heightInCm")}
                  className="form-control mb-2"
                  placeholder="Height (h)"
                />
                <input
                  type="number"
                  {...register("shipping.lengthInCm")}
                  className="form-control mb-2"
                  placeholder="Length (l)"
                />
              </div>
              <div className="text-muted fs-7">
                Enter the product dimensions in centimeters (cm).
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShippingApp;
