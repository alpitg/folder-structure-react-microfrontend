const ProductCategoryTag = () => {
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
        <div className="text-muted fs-7 mb-7">Add product to a category.</div>

        <a
          href="/keen/demo1/apps/ecommerce/catalog/add-category.html"
          className="btn btn-light-primary btn-sm mb-10"
        >
          <i className="bi bi-plus-lg me-1"></i> Create new category
        </a>

        {/* Tags */}
        <label className="form-label d-block">Tags</label>
        <input
          id="catalog_add_product_tags"
          name="catalog_add_product_tags"
          className="form-control mb-2"
        />
        <div className="text-muted fs-7">Add tags to a product.</div>
      </div>
    </div>
  );
};

export default ProductCategoryTag;
