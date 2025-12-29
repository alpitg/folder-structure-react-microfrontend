import { useFieldArray, useFormContext } from "react-hook-form";

import type { IProductData } from "../../../interface/product/product.model";

const ProductVariantsApp = () => {
  const { control, register } = useFormContext<IProductData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Variations</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <label className="form-label">Add Product Variations</label>

        <div className="d-flex flex-column gap-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="form-group d-flex flex-wrap align-items-center gap-5"
            >
              {/* Variation type */}
              <div className="w-100 w-md-200px">
                <select
                  className="form-select"
                  {...register(`variations.${index}.name` as const)}
                >
                  <option value="">Select a variation</option>
                  <option value="color">Color</option>
                  <option value="size">Size</option>
                  <option value="material">Material</option>
                  <option value="style">Style</option>
                </select>
              </div>

              {/* Variation value */}
              <input
                type="text"
                className="form-control mw-100 w-200px"
                placeholder="Variation value"
                {...register(`variations.${index}.values` as const)}
              />

              {/* Delete button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-sm btn-icon btn-light-danger"
              >
                <i className="bi bi-x-lg fs-5"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Add variation button */}
        <div className="form-group mt-5">
          <button
            type="button"
            onClick={() => append({ name: "", values: "" })}
            className="btn btn-sm btn-light-primary"
          >
            <i className="bi bi-plus-lg fs-5"></i> Add another variation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantsApp;
