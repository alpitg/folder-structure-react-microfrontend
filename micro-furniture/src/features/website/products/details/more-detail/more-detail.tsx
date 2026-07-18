import type { IProductData } from "../../../../store/catalog/interface/product/product.model";

const MoreDetailApp = ({ product }: { product?: IProductData }) => {
  return (
    <div className="more-detail-app">
      <h2 className="h4 fw-semibold mb-3">Product Details</h2>
      <p className="text-muted mb-0">
        {product?.description ??
          "A well-crafted piece designed to blend comfort and elegance."}
      </p>
    </div>
  );
};

export default MoreDetailApp;
