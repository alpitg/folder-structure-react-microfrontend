import { useEffect, useMemo } from "react";

import CustomSliderApp from "../../../../../../components/ui/slider/slider";
import type { IProductData } from "../../../interface/product/product.model";
import { useFormContext } from "react-hook-form";

const ProductPricing = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<IProductData>();

  const discountEnabled = watch("price.discount.isActive");
  const discountType = watch("price.discount.type");
  const discountValue = watch("price.discount.value") ?? 0;
  const selectedTaxClass = watch("price.tax.className");
  const taxRate = watch("price.tax.rate");

  const discountTypes = useMemo(
    () => [
      {
        id: 1,
        value: "none",
        displayName: "No discount",
      },
      {
        id: 2,
        value: "percentage",
        displayName: "Percentage %",
      },
      {
        id: 3,
        value: "fixed",
        displayName: "Fixed Price",
      },
    ],
    [],
  );

  const taxClasses = useMemo(
    () => [
      {
        id: 1,
        value: "tax_free",
        displayName: "Tax Free / Exempt",
        rate: 0,
      },
      {
        id: 2,
        value: "gst_5",
        displayName: "GST 5%",
        rate: 5,
      },
      {
        id: 3,
        value: "gst_12",
        displayName: "GST 12%",
        rate: 12,
      },
      {
        id: 4,
        value: "gst_18",
        displayName: "GST 18%",
        rate: 18,
      },
      {
        id: 5,
        value: "gst_28",
        displayName: "GST 28%",
        rate: 28,
      },
      {
        id: 6,
        value: "vat_5",
        displayName: "VAT 5%",
        rate: 5,
      },
      {
        id: 7,
        value: "vat_10",
        displayName: "VAT 10%",
        rate: 10,
      },
      {
        id: 8,
        value: "vat_15",
        displayName: "VAT 15%",
        rate: 15,
      },
      {
        id: 9,
        value: "vat_20",
        displayName: "VAT 20%",
        rate: 20,
      },
      {
        id: 10,
        value: "vat_25",
        displayName: "VAT 25%",
        rate: 25,
      },
      {
        id: 11,
        value: "luxury_40",
        displayName: "Luxury/Sin Goods 40%",
        rate: 40,
      },
    ],
    [],
  );

  /**
   * Auto update tax rate
   */
  useEffect(() => {
    const selected = taxClasses.find((x) => x.value === selectedTaxClass);

    if (selected) {
      setValue("price.tax.rate", selected.rate, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [selectedTaxClass, setValue, taxClasses]);

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Pricing</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        {/* Base Price */}

        <div className="mb-10">
          <label className="required form-label">Base Price</label>

          <input
            type="number"
            className={`form-control form-control-solid mb-2 ${
              errors.price?.basePrice ? "is-invalid" : ""
            }`}
            placeholder="Product price"
            {...register("price.basePrice", {
              required: "Product base price is required",
              valueAsNumber: true,
            })}
            onWheel={(e) => e.currentTarget.blur()}
          />
        </div>

        {/* Enable Discount */}

        <div className="mb-10">
          <div className="form-check form-switch form-check-custom form-check-solid">
            <input
              className="form-check-input"
              type="checkbox"
              id="discountEnabled"
              {...register("price.discount.isActive")}
            />

            <label
              className="form-check-label fw-semibold ms-3"
              htmlFor="discountEnabled"
            >
              Enable Discount
            </label>
          </div>

          <div className="text-muted fs-7 mt-2">
            Turn on to apply a discount to this product.
          </div>
        </div>

        {/* Discount Settings */}

        {discountEnabled && (
          <>
            <div className="fv-row mb-10">
              <label className="form-label">Discount Type</label>

              <div className="row g-5">
                {discountTypes.map((x) => (
                  <div className="col" key={x.id}>
                    <label
                      className={`btn btn-outline btn-outline-dashed d-flex ${
                        discountType === x.value ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        className="form-check-input me-3"
                        value={x.value}
                        {...register("price.discount.type")}
                      />

                      {x.displayName}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {discountType === "percentage" && (
              <div className="mb-10">
                <label className="form-label">Discount Percentage</label>

                <CustomSliderApp
                  value={discountValue}
                  onChange={(value) =>
                    setValue("price.discount.value", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
              </div>
            )}

            {discountType === "fixed" && (
              <div className="mb-10">
                <label className="form-label required">
                  Fixed Discounted Price
                </label>

                <input
                  type="number"
                  min={0}
                  className={`form-control form-control-solid mb-2 ${
                    errors.price?.basePrice ? "is-invalid" : ""
                  }`}
                  placeholder="Discounted price"
                  {...register("price.sellingPrice", {
                    required: "Fixed Discounted Price is required",
                    valueAsNumber: true,
                    min: 0,
                  })}
                  onWheel={(e) => e.currentTarget.blur()}
                />
              </div>
            )}
          </>
        )}

        {/* Tax */}

        <div className="row g-5">
          <div className="col-md-6">
            <label className="required form-label">Tax Class</label>

            <select
              className="form-select"
              {...register("price.tax.className")}
            >
              <option value="">Select Tax Class</option>

              {taxClasses.map((x) => (
                <option key={x.value} value={x.value}>
                  {x.displayName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Tax Amount (%)</label>

            <input
              type="number"
              className="form-control"
              value={taxRate ?? ""}
              onWheel={(e) => e.currentTarget.blur()}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;
