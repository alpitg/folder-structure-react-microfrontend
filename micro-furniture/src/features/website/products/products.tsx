import "./products.scss";

import type { AppDispatch, AppState } from "../../../app/store";
import {
  addItemToBag,
  decreaseBagItemQuantity,
  removeBagItem,
} from "../../../app/redux/core/shopping-bag/shopping-bag.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import NotFoundApp from "./not-found/not-found";
import { useGetProductsQuery } from "../../../app/redux/website/product/website-product.api";
import { websiteProductApi } from "../../../app/redux/website/product/website-product.api";

const Products = () => {
  const blankImage = "/static/media/img/svg/blank-image.svg";

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  const route = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const bagItems = useSelector(
    (state: AppState) => state.core.shoppingBag.items,
  );

  // Pagination
  const [page, setPage] = useState(1);
  // const [sort, setSort] = useState("newest");
  const pageSize = 10;

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetProductsQuery({
    searchText: "",
    page,
    pageSize,
    sort: "newest",
  });

  /**
   * Prefetch next page
   */
  useEffect(() => {
    dispatch(
      websiteProductApi.util.prefetch(
        "getProducts",
        {
          searchText: "",
          page: page + 1,
          pageSize,
          sort: "newest",
        },
        {
          force: false,
        },
      ),
    );
  }, [dispatch, page]);

  const products = productsResponse?.items ?? [];

  /**
   * Category filtering
   */
  const filteredProducts = useMemo(() => {
    if (!category) {
      return products;
    }

    return products.filter((product) =>
      product?.categories?.includes(category),
    );
  }, [products, category]);

  const handleQuickView = (productId: string) => {
    route(`/products/${productId}`);
  };

  return (
    <section className="products-app container py-5 mb-20">
      {isLoading && <div className="text-center py-5">Loading products...</div>}

      {isFetching && !isLoading && (
        <div className="text-center small text-muted mb-3">
          Updating products...
        </div>
      )}

      {isError && (
        <div className="text-center py-5 text-danger">
          Unable to load products right now.
        </div>
      )}

      {filteredProducts?.length > 0 ? (
        <>
          <div className="row">
            {/* <div className="card-toolbar flex-row-fluid justify-content-end align-items-center gap-4 mt-3 mt-md-0 position-relative">
              <div className="dropdown">
                <button
                  className="btn btn-light"
                  type="button"
                  id="productSortDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Sort products"
                >
                  Sort By: {sort === "newest" ? "Newest first" : "Oldest first"}
                  s
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end p-0"
                  aria-labelledby="productSortDropdown"
                  role="menu"
                >
                  <li>
                    <button
                      className={`dropdown-item ${
                        sort === "newest" ? "active" : ""
                      }`}
                      onClick={() => setSort("newest")}
                      role="menuitem"
                    >
                      Newest first
                    </button>
                  </li>
                  <li>
                    <button
                      className={`dropdown-item ${
                        sort === "oldest" ? "active" : ""
                      }`}
                      onClick={() => setSort("oldest")}
                      role="menuitem"
                    >
                      Oldest first
                    </button>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product?.id} className="col-sm-6 col-md-4 col-lg-3 p-3">
                <div className="product-card position-relative d-flex flex-column">
                  <div className="product-img position-relative overflow-hidden rounded-4">
                    <img
                      loading="lazy"
                      src={
                        product?.media?.[0]?.url
                          ? product.media[0].url
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
                                    image:
                                      product?.media?.[0]?.url ?? blankImage,
                                    price: product?.price?.sellingPrice ?? 0,
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
                            style={{
                              minWidth: 96,
                            }}
                          >
                            <button
                              className="btn btn-link p-0 d-flex align-items-center justify-content-center rounded-circle border border-light qty-control-btn"
                              style={{
                                width: 28,
                                height: 28,
                              }}
                              onClick={() =>
                                quantity > 1
                                  ? dispatch(
                                      decreaseBagItemQuantity(product.id),
                                    )
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
                              style={{
                                width: 28,
                                height: 28,
                              }}
                              onClick={() =>
                                dispatch(
                                  addItemToBag({
                                    id: product?.id,
                                    name: product?.name,
                                    image:
                                      product?.media?.[0]?.url ?? blankImage,
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
                        onMouseEnter={() =>
                          dispatch(
                            websiteProductApi.util.prefetch(
                              "getProductDetail",
                              product.id,
                              {
                                force: false,
                              },
                            ),
                          )
                        }
                        onClick={() => handleQuickView(product.id)}
                      >
                        <i className="bi bi-arrows-fullscreen"></i>
                        Quick view
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
                          {(product?.price?.sellingPrice ?? 0).toLocaleString(
                            "en-IN",
                          )}
                        </span>

                        {product?.price?.discount?.value ? (
                          <span className="d-flex align-items-center">
                            <span className="mrp-price me-2">
                              ₹ {product?.price?.basePrice}
                            </span>
                            <span className="discount">
                              {product?.price?.discount?.value}% OFF
                            </span>
                          </span>
                        ) : null}
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
          <div className="d-flex justify-content-center align-items-center mt-20">
            <button
              className="btn btn-light btn-sm d-flex align-items-center gap-2"
              disabled={page === 1}
              onClick={() => setPage((previous) => previous - 1)}
            >
              <i className="bi bi-arrow-left"></i>
              Previous
            </button>

            <span className="align-self-center px-3">
              Page {page} of {productsResponse?.total ?? 0}
            </span>

            <button
              className="btn btn-light btn-sm d-flex align-items-center gap-2"
              disabled={filteredProducts.length < pageSize}
              onClick={() => setPage((previous) => previous + 1)}
            >
              Next
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </>
      ) : (
        !isLoading && <NotFoundApp />
      )}
    </section>
  );
};

export default Products;
