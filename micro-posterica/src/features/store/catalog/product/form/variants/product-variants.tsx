const ProductVariantsApp = () => {
  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Variations</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <div data-kt-ecommerce-catalog-add-product="auto-options">
          <label className="form-label">Add Product Variations</label>

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
                <i className="bi bi-plus-lg fs-5"></i> Add another variation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariantsApp;
