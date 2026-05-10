import { Controller, useFormContext } from "react-hook-form";

import type { IProductData } from "../../../interface/product/product.model";
import { useState } from "react";

const ProductCategoryTag = () => {
  const { control } = useFormContext<IProductData>();
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Product Details</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        {/* Categories */}
        <label className="form-label">Categories</label>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <select
              multiple
              className="form-select mb-2"
              value={field.value || []}
              onChange={(e) => {
                const selected = Array.from(
                  e.target.selectedOptions,
                  (o) => o.value
                );
                field.onChange(selected);
              }}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            >
              <option value="Computers">Computers</option>
              <option value="Watches">Watches</option>
              <option value="Headphones">Headphones</option>
              <option value="Footwear">Footwear</option>
              <option value="Cameras">Cameras</option>
              <option value="Shirts">Shirts</option>
              <option value="Household">Household</option>
              <option value="Handbags">Handbags</option>
              <option value="Wines">Wines</option>
              <option value="Sandals">Sandals</option>
            </select>
          )}
        />
        <div className="text-muted fs-7 mb-7">Add product to a category.</div>

        <a
          href="/keen/demo1/apps/ecommerce/catalog/add-category.html"
          className="btn btn-light-primary btn-sm mb-10"
        >
          <i className="bi bi-plus-lg me-1"></i> Create new category
        </a>

        {/* Tags */}
        <label className="form-label d-block">Tags</label>

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Type and press Enter"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const newTag = inputValue.trim();
                    if (newTag) {
                      field.onChange([...(field.value || []), newTag]);
                      setInputValue("");
                    }
                  }
                }}
              />
              <div className="text-muted fs-7">Add tags to a product.</div>

              {/* Tag chips */}
              <div className="d-flex flex-wrap gap-2 mt-2">
                {(field.value || []).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="badge badge-light-primary d-flex align-items-center"
                  >
                    {tag}
                    <i
                      className="bi bi-x ms-2 cursor-pointer"
                      role="button"
                      onClick={() =>
                        field.onChange(
                          (field.value || []).filter(
                            (_: string, i: number) => i !== idx
                          )
                        )
                      }
                    />
                  </span>
                ))}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ProductCategoryTag;
