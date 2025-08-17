const ProductShippingApp = () => {
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
            Set if the product is a physical or digital item. Physical products
            may require shipping.
          </div>
        </div>

        <div id="catalog_add_product_shipping" className="d-none mt-10">
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
  );
};

export default ProductShippingApp;
