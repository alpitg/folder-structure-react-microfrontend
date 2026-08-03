import "./new-arrivals.scss";

import type { AppDispatch, AppState } from "../../../../../app/store";
import {
  addItemToBag,
  decreaseBagItemQuantity,
  removeBagItem,
} from "../../../../../app/redux/core/shopping-bag/shopping-bag.slice";
import { useDispatch, useSelector } from "react-redux";

import type { IProductData } from "../../../../store/catalog/interface/product/product.model";
import { useGetProductsQuery } from "../../../../../app/redux/website/product/website-product.api";

type ProductItem = IProductData;

const NewArrivals = () => {
  const blankImage = "/static/media/img/svg/blank-image.svg";

  const dispatch = useDispatch<AppDispatch>();

  const bagItems = useSelector(
    (state: AppState) => state.core.shoppingBag.items,
  );

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery({
    page: 1,
    pageSize: 10,
    sort: "newest",
  });

  const products = productsData?.items ?? [];

  const getQuantity = (productId: string) =>
    bagItems.find((item) => item.id === productId)?.quantity ?? 0;

  const handleAddToBag = (
    product: ProductItem,
    event?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event?.preventDefault();
    event?.stopPropagation();

    dispatch(
      addItemToBag({
        id: product.id,
        name: product.name,
        image: product.media?.[0]?.url ?? blankImage,
        price: product.price?.sellingPrice ?? 0,
        quantity: 1,
      }),
    );
  };

  if (isLoading) {
    return <div className="container py-5">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="container py-5 text-danger">Failed to load products</div>
    );
  }

  return (
    <section className="new-arrivals-app container py-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-12">
          <p className="fw-bold fs-1 mb-0">
            Discover more.
            <span className="text-muted ms-2">
              Good things are waiting for you
            </span>
          </p>
        </div>
      </div>

      <div className="product-carousel-wrapper position-relative">
        <div className="product-carousel d-flex gap-4 overflow-auto hide-scrollbar pb-3">
          {products.map((product) => {
            const quantity = getQuantity(product.id);

            return (
              <div key={product.id} className="product-slide flex-shrink-0">
                <div className="product-card card border-0 shadow-sm h-100 position-relative overflow-hidden">
                  <div className="product-img position-relative overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={product.media?.[0]?.url ?? blankImage}
                      alt={product.name}
                      className="product-image"
                    />

                    {product.isNewArrival && (
                      <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2 shadow-sm">
                        <i className="bi bi-stars me-1"></i>
                        New
                      </span>
                    )}

                    <div className="product-actions">
                      {quantity === 0 ? (
                        <button
                          type="button"
                          className="btn btn-dark btn-sm rounded-pill px-3"
                          onClick={(event) => handleAddToBag(product, event)}
                          aria-label="Add product to cart"
                        >
                          <i className="bi bi-cart me-1"></i>
                          Add to Cart
                        </button>
                      ) : (
                        <div className="icon-cross d-flex align-items-center justify-content-between bg-dark rounded-pill px-3 py-1 shadow">
                          <button
                            type="button"
                            className="btn btn-link p-0 d-flex align-items-center justify-content-center rounded-circle border border-light qty-control-btn"
                            onClick={() =>
                              quantity > 1
                                ? dispatch(decreaseBagItemQuantity(product.id))
                                : dispatch(removeBagItem(product.id))
                            }
                          >
                            -
                          </button>

                          <span className="fw-semibold text-light">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            className="btn btn-link p-0 d-flex align-items-center justify-content-center rounded-circle border border-light qty-control-btn"
                            onClick={() => handleAddToBag(product)}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="card-body">
                    <h6 className="fw-semibold mb-1">{product.name}</h6>

                    <div className="text-muted small mb-2">
                      <i className="bi bi-box-seam me-1"></i>
                      Premium quality product
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-success">
                        ₹
                        {(product.price?.sellingPrice ?? 0).toLocaleString(
                          "en-IN",
                        )}
                      </span>

                      {product.rating && (
                        <small className="text-muted">
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          {product.rating} ({product.reviews ?? 0})
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
