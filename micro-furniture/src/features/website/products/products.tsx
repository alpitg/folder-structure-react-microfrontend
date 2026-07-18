import "./products.scss";

import {
  addItemToBag,
  decreaseBagItemQuantity,
  removeBagItem,
} from "../../../app/redux/core/shopping-bag/shopping-bag.slice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import type { AppState } from "../../../app/store";
import NotFoundApp from "./not-found/not-found";
import { useGetProductsQuery } from "../../../app/redux/catalog/product/product.api";

const Products = () => {
  const blankImage = "/static/media/img/svg/blank-image.svg";

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  const route = useNavigate();
  const dispatch = useDispatch();
  const bagItems = useSelector(
    (state: AppState) => state.core.shoppingBag.items,
  );

  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetProductsQuery({
    page: 1,
    pageSize: 10,
  });
  const productsFromStore = useSelector(
    (state: AppState) => state.catalog.products.products,
  );

  const products =
    productsFromStore.length > 0
      ? productsFromStore
      : (productsResponse?.items ?? []);

  const filteredProducts = category
    ? products?.filter((product) =>
        product?.categories.find((c) => c === category),
      )
    : products;

  const handleQuickView = (productId: string) => {
    route(`/products/${productId}`);
  };

  return (
    <section className="products-app container py-5 mb-20">
      {isLoading && <div className="text-center py-5">Loading products...</div>}
      {isError && (
        <div className="text-center py-5 text-danger">
          Unable to load products right now.
        </div>
      )}
      {filteredProducts?.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product?.id} className="col-sm-6 col-md-4 col-lg-4 p-3">
              <div className="product-card position-relative d-flex flex-column">
                <div className="product-img position-relative overflow-hidden rounded-4 p-6">
                  <img
                    src={
                      product?.media?.[0]?.url
                        ? product?.media?.[0]?.url
                        : blankImage
                    }
                    alt={product?.name}
                    className="img-fluid w-100 product-image"
                  />

                  {product?.isNewArrival && (
                    <div className="badge">
                      <span>
                        <i className="bi bi-stars me-1"></i>
                      </span>
                      <span className="fw-semibold me-1">New in</span>
                    </div>
                  )}

                  {/* Hover actions */}
                  <div className="product-actions d-flex gap-2">
                    {(() => {
                      const quantity =
                        bagItems.find((item) => item?.id === product?.id)
                          ?.quantity ?? 0;

                      if (quantity === 0) {
                        return (
                          <button
                            className="btn btn-dark btn-sm rounded-pill shadow px-3"
                            onClick={() =>
                              dispatch(
                                addItemToBag({
                                  id: product?.id,
                                  name: product?.name,
                                  image: product?.media?.[0]?.url ?? blankImage,
                                  price: product?.price?.basePrice ?? 0,
                                  quantity: 1,
                                }),
                              )
                            }
                          >
                            <i className="bi bi-cart"></i> Add to Cart
                          </button>
                        );
                      }

                      return (
                        <div
                          className="d-flex align-items-center justify-content-between bg-dark rounded-pill px-3 py-1 shadow"
                          style={{ minWidth: 96 }}
                        >
                          <button
                            className="btn btn-link p-0 d-flex align-items-center justify-content-center rounded-circle border border-light qty-control-btn"
                            style={{ width: 28, height: 28 }}
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
                            className="btn btn-link p-0 d-flex align-items-center justify-content-center rounded-circle border border-light qty-control-btn"
                            style={{ width: 28, height: 28 }}
                            onClick={() =>
                              dispatch(
                                addItemToBag({
                                  id: product?.id,
                                  name: product?.name,
                                  image: product?.media?.[0]?.url ?? blankImage,
                                  price: product?.price?.basePrice ?? 0,
                                  quantity: 1,
                                }),
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      );
                    })()}
                    <button
                      className="btn btn-light btn-sm rounded-pill shadow px-3"
                      onClick={() => handleQuickView(product?.id)}
                    >
                      <i className="bi bi-arrows-fullscreen"></i> Quick view
                    </button>
                  </div>
                </div>

                <div className="product-content px-2 pt-3 pb-2">
                  <h6 className="fw-semibold mb-1">{product?.name}</h6>
                  <p className="text-muted small mb-2">
                    {product?.description}
                  </p>

                  <div>
                    <div className="product-price">
                      <span className="sale-price">
                        ₹
                        {Math.round(
                          (product?.price?.basePrice ?? 0) -
                            ((product?.price?.basePrice ?? 0) *
                              (product?.price?.discountPercentage ?? 0)) /
                              100,
                        ).toLocaleString("en-IN")}
                      </span>
                      <span className="mrp-price">
                        ₹ {product?.price?.basePrice}
                      </span>
                      <span className="discount">
                        {product?.price?.discountPercentage}% OFF
                      </span>
                    </div>

                    {product?.reviews > 0 && (
                      <div className="small text-muted">
                        <i className="bi bi-star-fill text-warning me-2"></i>
                        {product?.rating} ({product?.reviews ?? 0} reviews)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotFoundApp />
      )}
    </section>
  );
};

export default Products;
