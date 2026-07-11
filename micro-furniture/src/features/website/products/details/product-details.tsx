import "./product-details.scss";

import {
  addItemToBag,
  decreaseBagItemQuantity,
  removeBagItem,
} from "../../../../app/redux/core/shopping-bag/shopping-bag.slice";
import { useDispatch, useSelector } from "react-redux";

import type { AppState } from "../../../../app/store";
import type { IProductData } from "../../../../features/store/catalog/interface/product/product.model";
import NewArrivals from "./new-arrivals/new-arrivals";
import ProductGallery from "./gallery/product-gallery";
import { useGetProductsQuery } from "../../../../app/redux/catalog/product/product.api";
import { useMemo } from "react";
import { useParams } from "react-router";

interface ProductDetailsItem extends IProductData {
  image?: string;
  images?: string[];
  reviews?: number;
  colors?: string[];
}

const ProductDetails = () => {
  const { id } = useParams();
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

  const product = useMemo(() => {
    const products = (
      productsFromStore.length > 0
        ? productsFromStore
        : (productsResponse?.items ?? [])
    ) as ProductDetailsItem[];

    return products.find((item) => String(item.id) === String(id)) ?? null;
  }, [productsFromStore, productsResponse, id]);

  const features = [
    { title: "Free shipping", desc: "On orders over ₹500", bg: "bg-light" },
    { title: "Easy returns", desc: "Fast and simple returns", bg: "bg-light" },
    {
      title: "Nationwide delivery",
      desc: "Fast delivery across India",
      bg: "bg-light",
    },
    { title: "Refund policy", desc: "60 days return window", bg: "bg-light" },
  ];

  if (isLoading) {
    return <div className="container py-5 text-center">Loading product...</div>;
  }

  if (isError || !product) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold mb-3">404</h2>
        <p className="text-muted mb-4">Product not found.</p>
        <a className="btn btn-dark" href="/products">
          Back to products
        </a>
      </div>
    );
  }

  const quantityInBag =
    bagItems.find((item) => item.id === Number(product.id))?.quantity ?? 0;

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : ([product.image].filter(Boolean) as string[]);

  return (
    <div className="product-details-app container py-5 mb-20">
      <div className="row g-5">
        <div className="col-lg-6">
          <ProductGallery images={productImages} />
        </div>

        <div className="col-lg-6">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb small mb-2">
              <li className="breadcrumb-item">
                <a href="/products">Products</a>
              </li>
              <li className="breadcrumb-item active">{product.name}</li>
            </ol>
          </nav>

          <h1 className="h3 fw-semibold">{product.name}</h1>

          <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
            <div className="border rounded px-3 py-1 fw-semibold detail-pill fs-5">
              ₹{Number(product.price ?? 0).toFixed(2)}
            </div>
            <div className="text-warning small d-flex align-items-center gap-1">
              <i className="bi bi-star-fill text-warning"></i>
              {product.rating ?? 4.5}
              <span className="text-muted">
                · {product.reviews ?? 0} reviews
              </span>
            </div>
            <div className="text-success small fw-medium">
              <i className="bi bi-check-circle text-success me-1"></i>
              In Stock
            </div>
          </div>

          <div className="mt-4">
            <label className="form-label fw-semibold">Color</label>
            <div className="d-flex gap-2">
              {(product.colors ?? ["var(--bs-dark)", "var(--bs-success)"]).map(
                (color, index) => (
                  <div
                    key={`${color}-${index}`}
                    className="rounded-circle border border-secondary"
                    style={{ width: 32, height: 32, backgroundColor: color }}
                  />
                ),
              )}
            </div>
          </div>

          <div className="d-flex align-items-center gap-3 mt-4 product-details-actions">
            {quantityInBag === 0 ? (
              <button
                className="btn btn-dark btn-sm rounded-pill shadow px-3 detail-bag-btn"
                onClick={() =>
                  dispatch(
                    addItemToBag({
                      id: Number(product.id),
                      name: product.name,
                      image: product.image ?? "/static/media/img/product-1.png",
                      price: Number(product.price ?? 0),
                      quantity: 1,
                    }),
                  )
                }
              >
                <i className="bi bi-cart"></i> Add to bag
              </button>
            ) : (
              <div
                className="d-flex align-items-center justify-content-between bg-dark rounded-pill px-3 py-1 shadow quantity-pill"
                style={{ minWidth: 96 }}
              >
                <button
                  className="btn btn-link p-0 d-flex align-items-center justify-content-center rounded-circle border border-light qty-control-btn"
                  style={{ width: 28, height: 28 }}
                  onClick={() =>
                    quantityInBag > 1
                      ? dispatch(decreaseBagItemQuantity(Number(product.id)))
                      : dispatch(removeBagItem(Number(product.id)))
                  }
                >
                  -
                </button>
                <span className="fw-semibold text-light">{quantityInBag}</span>
                <button
                  className="btn btn-link p-0 d-flex align-items-center justify-content-center rounded-circle border border-light qty-control-btn"
                  style={{ width: 28, height: 28 }}
                  onClick={() =>
                    dispatch(
                      addItemToBag({
                        id: Number(product.id),
                        name: product.name,
                        image:
                          product.image ?? "/static/media/img/product-1.png",
                        price: Number(product.price ?? 0),
                        quantity: 1,
                      }),
                    )
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>

          <div className="row g-3 mt-4">
            {features.map((item, index) => (
              <div key={`${item.title}-${index}`} className="col-12 col-sm-6">
                <div className="p-3 rounded feature-card h-100">
                  <h6 className="fw-semibold mb-1">{item.title}</h6>
                  <p className="small text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h2 className="h4 fw-semibold mb-3">Product Details</h2>
          <p className="text-muted mb-0">
            {product.description ??
              "A well-crafted piece designed to blend comfort and elegance."}
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <NewArrivals />
      </div>
    </div>
  );
};

export default ProductDetails;
