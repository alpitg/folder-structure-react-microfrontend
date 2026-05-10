type ProductCategoryFormAppProps = {
  mode: "add" | "edit";
};

const ProductCategoryFormApp = ({ mode }: ProductCategoryFormAppProps) => {
  return (
    <div className="product-category-list-app">hi ProductCategory {mode}</div>
  );
};

export default ProductCategoryFormApp;
