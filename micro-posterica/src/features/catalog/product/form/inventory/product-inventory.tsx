const ProductInventoryApp = () => {
  return (
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
          <div className="text-muted fs-7">Enter the product SKU.</div>
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
          <div className="text-muted fs-7">Enter the product quantity.</div>
          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
        </div>

        <div className="fv-row">
          <label className="form-label">
            <i className="bi bi-cart-x me-2"></i>Allow Backorders
          </label>
          <div className="form-check form-check-custom form-check-solid mb-2">
            <input className="form-check-input" type="checkbox" value="" />
            <label className="form-check-label">Yes</label>
          </div>
          <div className="text-muted fs-7">
            Allow customers to purchase products that are out of stock.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInventoryApp;
