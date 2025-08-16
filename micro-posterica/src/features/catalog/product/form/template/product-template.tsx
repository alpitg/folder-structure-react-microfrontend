const ProductTemplateApp = () => {
  return (
    <div className="card card-flush py-4">
      <div className="card-header">
        <div className="card-title">
          <h2>Product Template</h2>
        </div>
      </div>

      <div className="card-body pt-0">
        <label
          htmlFor="catalog_add_product_store_template"
          className="form-label"
        >
          Select a product template
        </label>

        <select
          className="form-select mb-2"
          id="catalog_add_product_store_template"
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
  );
};

export default ProductTemplateApp;
