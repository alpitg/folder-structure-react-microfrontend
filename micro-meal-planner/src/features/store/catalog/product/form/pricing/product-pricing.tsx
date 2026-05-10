import CustomSliderApp from "../../../../../../components/ui/slider/slider";
import type { IProductData } from "../../../interface/product/product.model";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const ProductPricing = () => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<IProductData>();
  const discountType = watch("price.discountType");

  const discountTypes = [
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
  ];

  // Combine GST and VAT options in one unified list
  const taxClasses = [
    // Generic / default
    { id: 1, value: "tax_free", displayName: "Tax Free / Exempt", rate: 0 },

    // --- GST (India) ---
    { id: 2, value: "gst_5", displayName: "GST 5%", rate: 5 },
    { id: 3, value: "gst_12", displayName: "GST 12%", rate: 12 },
    { id: 4, value: "gst_18", displayName: "GST 18%", rate: 18 },
    { id: 5, value: "gst_28", displayName: "GST 28%", rate: 28 },

    // --- VAT (Global) ---
    { id: 6, value: "vat_5", displayName: "VAT 5%", rate: 5 },
    { id: 7, value: "vat_10", displayName: "VAT 10%", rate: 10 },
    { id: 8, value: "vat_15", displayName: "VAT 15%", rate: 15 },
    { id: 9, value: "vat_20", displayName: "VAT 20%", rate: 20 },
    { id: 10, value: "vat_25", displayName: "VAT 25%", rate: 25 },

    // --- Special ---
    {
      id: 11,
      value: "luxury_40",
      displayName: "Luxury/Sin Goods 40%",
      rate: 40,
    },
  ];

  const setDiscountPercentage = (value: number) => {
    setValue("price.discountPercentage", value);
  };

  const selectedTaxClass = watch("price.taxClass");

  // auto update tax percentage field when tax class changes
  useEffect(() => {
    const selected = taxClasses.find((x) => x.value === selectedTaxClass);
    if (selected && typeof selected.rate === "number") {
      setValue("price.taxPercent", selected.rate); // auto set VAT %
    }
  }, [selectedTaxClass, setValue]);

  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Pricing</h2>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="mb-10 fv-row fv-plugins-icon-container">
          <label htmlFor="basePrice" className="required form-label">
            Base Price
          </label>
          <input
            id="basePrice"
            type="number"
            className={`form-control form-control-solid mb-2 ${
              errors.price?.basePrice ? "is-invalid" : ""
            }`}
            placeholder="Product price"
            {...register("price.basePrice", {
              required: "Product base price is required",
              valueAsNumber: true,
            })}
          />

          {errors.price?.basePrice?.message ? (
            <div className="invalid-feedback">
              {errors.price.basePrice.message}
            </div>
          ) : (
            <div className="text-muted fs-7">Set the product price.</div>
          )}

          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>

        <div className="fv-row mb-10">
          <label className="fs-6 fw-semibold mb-2" htmlFor="discount_option">
            Discount Type
            <span
              className="ms-1"
              data-bs-toggle="tooltip"
              aria-label="Select a discount type that will be applied to this product"
              data-bs-original-title="Select a discount type that will be applied to this product"
            >
              <i className="bi bi-info-circle text-gray-500 fs-6"></i>
            </span>
          </label>
          <div
            className="row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9"
            data-kt-buttons="true"
            data-kt-buttons-target="[data-kt-button='true']"
          >
            {discountTypes?.map((x) => {
              return (
                <div className="col" key={"discount-type-" + x?.id}>
                  <label
                    htmlFor={"discount-type-" + x?.id}
                    className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 ${
                      x?.value == discountType ? "active" : ""
                    }`}
                    data-kt-button="true"
                  >
                    <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                      <input
                        id={"discount-type-" + x?.id}
                        className="form-check-input"
                        type="radio"
                        {...register("price.discountType")}
                        value={x?.value}
                      />
                    </span>
                    <span className="ms-5">
                      <span className="fs-4 fw-bold text-gray-800 d-block">
                        {x?.displayName}
                      </span>
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {discountType === discountTypes?.[1].value && (
          <div
            className="mb-10 fv-row"
            id="catalog_add_product_discount_percentage"
          >
            <label htmlFor="discount_percentage_input" className="form-label">
              Set Discount Percentage
            </label>
            <div className="d-flex flex-column text-center">
              <CustomSliderApp getValue={(e) => setDiscountPercentage(e)} />
            </div>
            <div className="text-muted fs-7">
              Set a percentage discount to be applied on this product.
            </div>
          </div>
        )}

        {discountType === discountTypes?.[2].value && (
          <div className="mb-10 fv-row" id="catalog_add_product_discount_fixed">
            <label htmlFor="discounted_price" className="form-label">
              Fixed Discounted Price
            </label>
            <input
              id="discounted_price"
              type="number"
              min={0}
              {...register("price.fixedDiscountedPrice", {
                valueAsNumber: true,
                min: 0,
              })}
              className="form-control mb-2"
              placeholder="Discounted price"
            />
            <div className="text-muted fs-7">
              Set the discounted product price. The product will be reduced at
              the determined fixed price
            </div>
          </div>
        )}

        {/* Tax & VAT */}
        <div className="d-flex flex-wrap gap-5">
          <div className="fv-row w-100 flex-md-root fv-plugins-icon-container">
            <label htmlFor="tax" className="required form-label">
              Tax Class
            </label>
            <select
              id="tax"
              className="form-select mb-2"
              {...register("price.taxClass")}
              data-control="select2"
              data-hide-search="true"
              data-placeholder="Select an option"
            >
              {taxClasses?.map((x) => (
                <option key={x?.value} value={x?.value}>
                  {x?.displayName}
                </option>
              ))}
            </select>
            <div className="text-muted fs-7">Set the product tax class.</div>
          </div>
          <div className="fv-row w-100 flex-md-root">
            <label htmlFor="vat_amount" className="form-label">
              Tax Amount (%)
            </label>
            <input
              id="vat_amount"
              className={`form-control mb-2 ${
                errors.price?.taxPercent ? "is-invalid" : ""
              }`}
              type="number"
              min={0}
              max={100}
              {...register("price.taxPercent", {
                valueAsNumber: true,
                min: 0,
                max: 100,
              })}
              disabled={true} 
            />
            <div className="text-muted fs-7">
              This is auto-filled from the selected tax class. You can override
              if needed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;
