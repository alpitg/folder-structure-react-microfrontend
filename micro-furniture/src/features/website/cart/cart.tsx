import "./cart.scss";

import EmptyCartApp from "./empty-cart/empty-cart";
import { NavLink } from "react-router";
import { ROUTE_URL } from "../../../routes/constants/routes.const";
import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const CartApp = () => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Art Deco Home",
      image: "/static/media/img/product-1.png",
      price: 30,
      quantity: 6,
    },
    {
      id: 2,
      name: "Art Deco Home",
      image: "/static/media/img/product-1.png",
      price: 30,
      quantity: 6,
    },
  ]);

  const increase = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const remove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="cart-app py-5">
      {items?.length === 0 ? (
        <EmptyCartApp />
      ) : (
        <div className="container">
          <div className="table-responsive">
            <table className="table align-middle cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart-image me-3"
                        />

                        <h6 className="mb-0 fw-medium">{item.name}</h6>
                      </div>
                    </td>

                    <td>${item.price.toFixed(2)}</td>

                    <td>
                      <div className="quantity-box">
                        <button
                          className="btn-qty"
                          onClick={() => decrease(item.id)}
                        >
                          -
                        </button>

                        <input readOnly value={item.quantity} />

                        <button
                          className="btn-qty"
                          onClick={() => increase(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td>${(item.price * item.quantity).toFixed(2)}</td>

                    <td className="text-end">
                      {/* <button
                      className="btn btn-link text-dark p-0"
                      onClick={() => remove(item.id)}
                    >
                      ✕
                    </button> */}

                      <i
                        className="bi bi-x-lg text-dark ms-2 cursor-pointer"
                        onClick={() => remove(item.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between flex-wrap gap-3 mt-5">
            <NavLink
              className="btn btn-dark px-4"
              to={ROUTE_URL.WEBSITE.PRODUCTS}
            >
              ← Continue Shopping
            </NavLink>

            <button className="btn btn-outline-dark px-4" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="row mt-5 gy-4">
            <div className="col-lg-6">
              <h5 className="mb-4">Coupon Discount</h5>

              <p className="text-muted">
                Enter your coupon code if you have one.
              </p>

              <input className="form-control" placeholder="Coupon code" />

              <button className="btn btn-outline-dark mt-4 px-4">
                Apply Coupon
              </button>
            </div>

            <div className="col-lg-6">
              <div className="cart-summary ms-lg-auto">
                <div className="d-flex justify-content-between border-bottom pb-3">
                  <strong>Subtotal</strong>

                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between pt-3">
                  <strong>Total</strong>

                  <strong>${subtotal.toFixed(2)}</strong>
                </div>

                <button className="btn btn-dark w-100 mt-4">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartApp;
