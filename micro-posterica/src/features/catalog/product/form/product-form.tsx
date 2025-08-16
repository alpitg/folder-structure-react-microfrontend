import { NavLink, useParams } from "react-router";

import ProductHeaderApp from "../header/product-header";
import { ROUTE_URL } from "../../../../components/auth/constants/routes.const";

type ProductFormAppProps = {
  mode: "add" | "edit";
};

const ProductFormApp = ({ mode }: ProductFormAppProps) => {
  const isEditMode = mode === "edit";
  const { id } = useParams<{ id?: string }>();

  return (
    <div className="product-form-app">
      <ProductHeaderApp
        header={isEditMode ? "Edit Product" : "Add Product"}
        description={
          isEditMode
            ? "Update existing product details."
            : "Create a new product."
        }
      >
        <NavLink to={ROUTE_URL.CATALOG.PRODUCT.LIST}>
          <span className="btn btn-light btn-active-secondary btn-sm me-5">
            <i className="bi bi-chevron-left fs-5"></i>
            Back to Order List
          </span>
        </NavLink>

        {isEditMode && id && (
          <NavLink to={ROUTE_URL.CATALOG.PRODUCT.EDIT?.replace(":id", id)}>
            <span className="btn btn-primary btn-sm">
              <i className="bi bi-pencil-square"></i>
              Edit Product
            </span>
          </NavLink>
        )}
      </ProductHeaderApp>

      <form
        id="kt_ecommerce_add_product_form"
        className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
        data-kt-redirect="/keen/demo1/apps/ecommerce/catalog/products.html"
      >
        <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
          {/* Thumbnail */}
          <div className="card card-flush py-4">
            <div className="card-header">
              <div className="card-title">
                <h2>Thumbnail</h2>
              </div>
            </div>

            <div className="card-body text-center pt-0">
              <style>
                {`
              .image-input-placeholder {
                background-image: url("/keen/demo1/assets/media/svg/files/blank-image.svg");
              }
              [data-bs-theme="dark"] .image-input-placeholder {
                background-image: url("/keen/demo1/assets/media/svg/files/blank-image-dark.svg");
              }
            `}
              </style>

              <div
                className="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                data-kt-image-input="true"
              >
                <div className="image-input-wrapper w-150px h-150px"></div>

                {/* Change */}
                <label
                  className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i className="bi bi-pencil"></i>
                  <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                  <input type="hidden" name="avatar_remove" />
                </label>

                {/* Cancel */}
                <span
                  className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="cancel"
                  data-bs-toggle="tooltip"
                  title="Cancel avatar"
                >
                  <i className="bi bi-x-lg"></i>
                </span>

                {/* Remove */}
                <span
                  className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  title="Remove avatar"
                >
                  <i className="bi bi-trash"></i>
                </span>
              </div>

              <div className="text-muted fs-7">
                Set the product thumbnail image. Only *.png, *.jpg and *.jpeg
                image files are accepted
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="card card-flush py-4">
            <div className="card-header">
              <div className="card-title">
                <h2>Status</h2>
              </div>
              <div className="card-toolbar">
                <div
                  className="rounded-circle bg-success w-15px h-15px"
                  id="kt_ecommerce_add_product_status"
                ></div>
              </div>
            </div>

            <div className="card-body pt-0">
              <select
                className="form-select mb-2"
                defaultValue="published"
                id="kt_ecommerce_add_product_status_select"
              >
                <option value=""></option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="inactive">Inactive</option>
              </select>

              <div className="text-muted fs-7">Set the product status.</div>
            </div>
          </div>

          {/* Product Details */}
          <div className="card card-flush py-4">
            <div className="card-header">
              <div className="card-title">
                <h2>Product Details</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              {/* Categories */}
              <label className="form-label">Categories</label>
              <select className="form-select mb-2" multiple>
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
              <div className="text-muted fs-7 mb-7">
                Add product to a category.
              </div>

              <a
                href="/keen/demo1/apps/ecommerce/catalog/add-category.html"
                className="btn btn-light-primary btn-sm mb-10"
              >
                <i className="bi bi-plus-lg me-1"></i> Create new category
              </a>

              {/* Tags */}
              <label className="form-label d-block">Tags</label>
              <input
                id="kt_ecommerce_add_product_tags"
                name="kt_ecommerce_add_product_tags"
                className="form-control mb-2"
              />
              <div className="text-muted fs-7">Add tags to a product.</div>
            </div>
          </div>

          {/* Weekly Sales */}
          <div className="card card-flush py-4">
            <div className="card-header">
              <div className="card-title">
                <h2>Weekly Sales</h2>
              </div>
            </div>
            <div className="card-body pt-0">
              <span className="text-muted">
                No data available. Sales data will begin capturing once product
                has been published.
              </span>
            </div>
          </div>

          {/* Product Template */}
          <div className="card card-flush py-4">
            <div className="card-header">
              <div className="card-title">
                <h2>Product Template</h2>
              </div>
            </div>

            <div className="card-body pt-0">
              <label
                htmlFor="kt_ecommerce_add_product_store_template"
                className="form-label"
              >
                Select a product template
              </label>

              <select
                className="form-select mb-2"
                id="kt_ecommerce_add_product_store_template"
                defaultValue="default"
              >
                <option value=""></option>
                <option value="default">Default template</option>
                <option value="electronics">Electronics</option>
                <option value="office">Office stationary</option>
                <option value="fashion">Fashion</option>
              </select>

              <div className="text-muted fs-7">
                Assign a template from your current theme to define how a single
                product is displayed.
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <ul
            className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                className="nav-link text-active-primary pb-4 active"
                data-bs-toggle="tab"
                href="#catalog_add_product_general"
                aria-selected="true"
                role="tab"
              >
                <i className="bi bi-info-circle me-2"></i> General
              </a>
            </li>

            <li className="nav-item" role="presentation">
              <a
                className="nav-link text-active-primary pb-4"
                data-bs-toggle="tab"
                href="#catalog_add_product_advanced"
                aria-selected="false"
                role="tab"
                tabIndex={-1}
              >
                <i className="bi bi-gear me-2"></i> Advanced
              </a>
            </li>
          </ul>

          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="catalog_add_product_general"
              role="tab-panel"
            >
              <div className="d-flex flex-column gap-7 gap-lg-10">
                <div className="card card-flush py-4">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>General</h2>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="mb-10 fv-row fv-plugins-icon-container">
                      <label className="required form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="product_name"
                        className="form-control mb-2"
                        placeholder="Product name"
                        value=""
                      />
                      <div className="text-muted fs-7">
                        A product name is required and recommended to be unique.
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>
                    <div>
                      <label className="form-label">Description</label>
                      <div role="toolbar" className="ql-toolbar ql-snow">
                        <span className="ql-formats">
                          <select className="ql-header">
                            <option value="1"></option>
                            <option value="2"></option>
                            <option selected={true}></option>
                          </select>
                        </span>
                        <span className="ql-formats">
                          <button type="button" className="ql-bold"></button>
                          <button type="button" className="ql-italic"></button>
                          <button
                            type="button"
                            className="ql-underline"
                          ></button>
                        </span>
                        <span className="ql-formats">
                          <button type="button" className="ql-image"></button>
                          <button
                            type="button"
                            className="ql-code-block"
                          ></button>
                        </span>
                      </div>
                      <div
                        id="catalog_add_product_description"
                        className="min-h-200px mb-2 ql-container ql-snow"
                      >
                        <div
                          className="ql-editor ql-blank"
                          contentEditable="true"
                          data-placeholder="Type your text here..."
                        >
                          <p>
                            <br />
                          </p>
                        </div>
                      </div>
                      <div className="text-muted fs-7">
                        Set a description to the product for better visibility.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card card-flush py-4">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>Media</h2>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="fv-row mb-2">
                      <div
                        className="dropzone dz-clickable"
                        id="catalog_add_product_media"
                      >
                        <div className="dz-message needsclick">
                          <i className="bi bi-upload text-primary fs-3x"></i>
                          <div className="ms-4">
                            <h3 className="fs-5 fw-bold text-gray-900 mb-1">
                              Drop files here or click to upload.
                            </h3>
                            <span className="fs-7 fw-semibold text-gray-500">
                              Upload up to 10 files
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-muted fs-7">
                      Set the product media gallery.
                    </div>
                  </div>
                </div>

                <div className="card card-flush py-4">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>Pricing</h2>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="mb-10 fv-row fv-plugins-icon-container">
                      <label className="required form-label">Base Price</label>
                      <input
                        type="text"
                        name="price"
                        className="form-control mb-2"
                        placeholder="Product price"
                        value=""
                      />
                      <div className="text-muted fs-7">
                        Set the product price.
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>

                    <div className="fv-row mb-10">
                      <label className="fs-6 fw-semibold mb-2">
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
                        <div className="col">
                          <label
                            className="btn btn-outline btn-outline-dashed btn-active-light-primary active d-flex text-start p-6"
                            data-kt-button="true"
                          >
                            <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="discount_option"
                                value="1"
                                checked={true}
                              />
                            </span>
                            <span className="ms-5">
                              <span className="fs-4 fw-bold text-gray-800 d-block">
                                No Discount
                              </span>
                            </span>
                          </label>
                        </div>
                        <div className="col">
                          <label
                            className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6"
                            data-kt-button="true"
                          >
                            <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="discount_option"
                                value="2"
                              />
                            </span>
                            <span className="ms-5">
                              <span className="fs-4 fw-bold text-gray-800 d-block">
                                Percentage %
                              </span>
                            </span>
                          </label>
                        </div>
                        <div className="col">
                          <label
                            className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6"
                            data-kt-button="true"
                          >
                            <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="discount_option"
                                value="3"
                              />
                            </span>
                            <span className="ms-5">
                              <span className="fs-4 fw-bold text-gray-800 d-block">
                                Fixed Price
                              </span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div
                      className="d-none mb-10 fv-row"
                      id="catalog_add_product_discount_percentage"
                    >
                      <label className="form-label">
                        Set Discount Percentage
                      </label>
                      <div className="d-flex flex-column text-center mb-5">
                        <div className="d-flex align-items-start justify-content-center mb-7">
                          <span
                            className="fw-bold fs-3x"
                            id="catalog_add_product_discount_label"
                          >
                            10
                          </span>
                          <span className="fw-bold fs-4 mt-1 ms-2">%</span>
                        </div>
                        <div
                          id="catalog_add_product_discount_slider"
                          className="noUi-sm noUi-target noUi-ltr noUi-horizontal noUi-txt-dir-ltr"
                        ></div>
                      </div>
                      <div className="text-muted fs-7">
                        Set a percentage discount to be applied on this product.
                      </div>
                    </div>

                    <div
                      className="d-none mb-10 fv-row"
                      id="catalog_add_product_discount_fixed"
                    >
                      <label className="form-label">
                        Fixed Discounted Price
                      </label>
                      <input
                        type="text"
                        name="discounted_price"
                        className="form-control mb-2"
                        placeholder="Discounted price"
                      />
                      <div className="text-muted fs-7">
                        Set the discounted product price. The product will be
                        reduced at the determined fixed price
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-5">
                      <div className="fv-row w-100 flex-md-root fv-plugins-icon-container">
                        <label className="required form-label">Tax Class</label>
                        <select
                          className="form-select mb-2"
                          name="tax"
                          data-control="select2"
                          data-hide-search="true"
                          data-placeholder="Select an option"
                        >
                          <option></option>
                          <option value="0">Tax Free</option>
                          <option value="1">Taxable Goods</option>
                          <option value="2">Downloadable Product</option>
                        </select>
                        <div className="text-muted fs-7">
                          Set the product tax class.
                        </div>
                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                      </div>
                      <div className="fv-row w-100 flex-md-root">
                        <label className="form-label">VAT Amount (%)</label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          value=""
                        />
                        <div className="text-muted fs-7">
                          Set the product VAT about.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="catalog_add_product_advanced"
              role="tab-panel"
            >
              <div className="d-flex flex-column gap-7 gap-lg-10">
                <div className="card card-flush py-4">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>
                        <i className="bi bi-box-seam me-2"></i>Inventory
                      </h2>
                    </div>
                  </div>

                  <div className="card-body pt-0">
                    <div className="mb-10 fv-row fv-plugins-icon-container">
                      <label className="required form-label">
                        <i className="bi bi-upc-scan me-2"></i>SKU
                      </label>
                      <input
                        type="text"
                        name="sku"
                        className="form-control mb-2"
                        placeholder="SKU Number"
                        value=""
                      />
                      <div className="text-muted fs-7">
                        Enter the product SKU.
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>

                    <div className="mb-10 fv-row fv-plugins-icon-container">
                      <label className="required form-label">
                        <i className="bi bi-upc me-2"></i>Barcode
                      </label>
                      <input
                        type="text"
                        name="barcode"
                        className="form-control mb-2"
                        placeholder="Barcode Number"
                        value=""
                      />
                      <div className="text-muted fs-7">
                        Enter the product barcode number.
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>

                    <div className="mb-10 fv-row fv-plugins-icon-container">
                      <label className="required form-label">
                        <i className="bi bi-stack me-2"></i>Quantity
                      </label>
                      <div className="d-flex gap-3">
                        <input
                          type="number"
                          name="shelf"
                          className="form-control mb-2"
                          placeholder="On shelf"
                          value=""
                        />
                        <input
                          type="number"
                          name="warehouse"
                          className="form-control mb-2"
                          placeholder="In warehouse"
                        />
                      </div>
                      <div className="text-muted fs-7">
                        Enter the product quantity.
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>

                    <div className="fv-row">
                      <label className="form-label">
                        <i className="bi bi-cart-x me-2"></i>Allow Backorders
                      </label>
                      <div className="form-check form-check-custom form-check-solid mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                        />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="text-muted fs-7">
                        Allow customers to purchase products that are out of
                        stock.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card card-flush py-4">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>Variations</h2>
                    </div>
                  </div>

                  <div className="card-body pt-0">
                    <div data-kt-ecommerce-catalog-add-product="auto-options">
                      <label className="form-label">
                        Add Product Variations
                      </label>

                      <div id="catalog_add_product_options">
                        <div className="form-group">
                          <div
                            data-repeater-list="catalog_add_product_options"
                            className="d-flex flex-column gap-3"
                          >
                            <div
                              data-repeater-item=""
                              className="form-group d-flex flex-wrap align-items-center gap-5"
                            >
                              <div className="w-100 w-md-200px">
                                <select
                                  className="form-select"
                                  name="catalog_add_product_options[0][product_option]"
                                  data-placeholder="Select a variation"
                                  data-kt-ecommerce-catalog-add-product="product_option"
                                >
                                  <option></option>
                                  <option value="color">Color</option>
                                  <option value="size">Size</option>
                                  <option value="material">Material</option>
                                  <option value="style">Style</option>
                                </select>
                              </div>

                              <input
                                type="text"
                                className="form-control mw-100 w-200px"
                                name="catalog_add_product_options[0][product_option_value]"
                                placeholder="Variation"
                              />

                              <button
                                type="button"
                                data-repeater-delete=""
                                className="btn btn-sm btn-icon btn-light-danger"
                              >
                                <i className="bi bi-x-lg fs-5"></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="form-group mt-5">
                          <button
                            type="button"
                            data-repeater-create=""
                            className="btn btn-sm btn-light-primary"
                          >
                            <i className="bi bi-plus-lg fs-5"></i> Add another
                            variation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                          className="form-check-input"
                          type="checkbox"
                          id="catalog_add_product_shipping_checkbox"
                          value="1"
                        />
                        <label className="form-check-label">
                          This is a physical product
                        </label>
                      </div>

                      <div className="text-muted fs-7">
                        Set if the product is a physical or digital item.
                        Physical products may require shipping.
                      </div>
                    </div>

                    <div
                      id="catalog_add_product_shipping"
                      className="d-none mt-10"
                    >
                      <div className="mb-10 fv-row">
                        <label className="form-label">Weight</label>
                        <input
                          type="text"
                          name="weight"
                          className="form-control mb-2"
                          placeholder="Product weight"
                          value=""
                        />
                        <div className="text-muted fs-7">
                          Set a product weight in kilograms (kg).
                        </div>
                      </div>

                      <div className="fv-row">
                        <label className="form-label">Dimension</label>
                        <div className="d-flex flex-wrap flex-sm-nowrap gap-3">
                          <input
                            type="number"
                            name="width"
                            className="form-control mb-2"
                            placeholder="Width (w)"
                            value=""
                          />
                          <input
                            type="number"
                            name="height"
                            className="form-control mb-2"
                            placeholder="Height (h)"
                            value=""
                          />
                          <input
                            type="number"
                            name="length"
                            className="form-control mb-2"
                            placeholder="Length (l)"
                            value=""
                          />
                        </div>
                        <div className="text-muted fs-7">
                          Enter the product dimensions in centimeters (cm).
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card card-flush py-4">
                  <div className="card-header">
                    <div className="card-title">
                      <h2>Meta Options</h2>
                    </div>
                  </div>

                  <div className="card-body pt-0">
                    <div className="mb-10">
                      <label className="form-label">Meta Tag Title</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        name="meta_title"
                        placeholder="Meta tag name"
                      />
                      <div className="text-muted fs-7">
                        Set a meta tag title. Recommended to be simple and
                        precise keywords.
                      </div>
                    </div>

                    <div className="mb-10">
                      <label className="form-label">Meta Tag Description</label>
                      <div role="toolbar" className="ql-toolbar ql-snow">
                        <span className="ql-formats">
                          <select className="ql-header form-select form-select-sm w-auto d-inline-block">
                            <option value="1">H1</option>
                            <option value="2">H2</option>
                            <option selected={true}>Normal</option>
                          </select>
                        </span>
                        <span className="ql-formats">
                          <button
                            type="button"
                            className="btn btn-sm btn-light"
                          >
                            <i className="bi bi-type-bold"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-light"
                          >
                            <i className="bi bi-type-italic"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-light"
                          >
                            <i className="bi bi-type-underline"></i>
                          </button>
                        </span>
                        <span className="ql-formats">
                          <button
                            type="button"
                            className="btn btn-sm btn-light"
                          >
                            <i className="bi bi-image"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-light"
                          >
                            <i className="bi bi-code-slash"></i>
                          </button>
                        </span>
                      </div>
                      <div
                        id="catalog_add_product_meta_description"
                        className="min-h-100px mb-2 ql-container ql-snow"
                      >
                        <div
                          className="ql-editor ql-blank"
                          contentEditable="true"
                          data-placeholder="Type your text here..."
                        >
                          <p>
                            <br />
                          </p>
                        </div>
                      </div>
                      <div className="text-muted fs-7">
                        Set a meta tag description to the product for increased
                        SEO ranking.
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Meta Tag Keywords</label>
                      <input
                        id="catalog_add_product_meta_keywords"
                        name="catalog_add_product_meta_keywords"
                        className="form-control mb-2"
                      />
                      <div className="text-muted fs-7">
                        Set a list of keywords that the product is related to.
                        Separate the keywords by adding a comma <code>,</code>{" "}
                        between each keyword.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductFormApp;
