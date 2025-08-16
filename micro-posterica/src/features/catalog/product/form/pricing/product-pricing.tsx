import CustomSliderApp from "../../../../../components/ui/slider/slider";
import type { IProductData } from "../../../interface/product/product.model";
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

  const taxClasses = [
    {
      id: 1,
      value: "tax_free",
      displayName: "Tax Free",
    },
    {
      id: 2,
      value: "taxable_goods",
      displayName: "Taxable Goods",
    },
    {
      id: 3,
      value: "downloadable_product",
      displayName: "Downloadable Product",
    },
  ];

  const setDiscountPercentage = (value: number) => {
    setValue("price.discountPercentage", value);
  };

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
              {...register("price.fixedDiscountedPrice", {
                valueAsNumber: true,
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
              {taxClasses?.map((x) => {
                return (
                  <option key={`tax-classes- ${x?.id}`} value={x?.value}>
                    {x?.displayName}
                  </option>
                );
              })}
            </select>
            <div className="text-muted fs-7">Set the product tax class.</div>
            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
          </div>
          <div className="fv-row w-100 flex-md-root">
            <label htmlFor="vat_amount" className="form-label">
              VAT Amount (%)
            </label>
            <input
              id="vat_amount"
              type="number"
              min={0}
              max={100}
              {...register("price.vatPercent", {
                valueAsNumber: true,
                min: 0,
                max: 100,
              })}
              className="form-control mb-2"
            />
            <div className="text-muted fs-7">Set the product VAT amount.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;
