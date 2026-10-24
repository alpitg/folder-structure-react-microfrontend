src/
└── components/
    └── website/
        │
        ├── cart/
        │   ├── cart.tsx
        │   ├── cart.scss
        │   │
        │   └── components/
        │       │
        │       ├── cart-steps/
        │       │   ├── cart-steps.tsx
        │       │   └── cart-steps.scss
        │       │
        │       ├── cart-items/
        │       │   ├── cart-items.tsx
        │       │   └── cart-items.scss
        │       │
        │       ├── cart-item/
        │       │   ├── cart-item.tsx
        │       │   └── cart-item.scss
        │       │
        │       ├── cart-price-details/
        │       │   ├── cart-price-details.tsx
        │       │   └── cart-price-details.scss
        │       │
        │       ├── cart-empty/
        │       │   ├── cart-empty.tsx
        │       │   └── cart-empty.scss
        │       │
        │       ├── cart-address/
        │       │   ├── cart-address.tsx
        │       │   └── cart-address.scss
        │       │
        │       ├── cart-payment/
        │       │   ├── cart-payment.tsx
        │       │   └── cart-payment.scss
        │       │
        │       └── cart-login/
        │           ├── cart-login.tsx
        │           └── cart-login.scss
        │
        ├── address/
        │   └── address-selection/
        │       ├── address-selection.tsx
        │       └── address-selection.scss
        │
        └── order-success/
            ├── order-success.tsx
            └── order-success.scss

---

Product
  │
  ├── Add to Cart
  │
  ▼
Guest Cart ID
(localStorage)
  │
  ▼
┌─────────────────────┐
│        BAG          │
│                     │
│ Products            │
│ Quantity             │
│ Remove               │
│ Price Details        │
│ Continue Shopping    │
│ Proceed to Checkout  │
└──────────┬──────────┘
           │
           ▼
     Is customer logged in?
        │          │
       YES         NO
        │          │
        │       Login / OTP
        │          │
        │          ▼
        │    Merge Guest Cart
        │          │
        └────┬─────┘
             ▼
┌─────────────────────┐
│       ADDRESS       │
│                     │
│ Saved addresses     │
│ Add new address     │
│ Select address      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       PAYMENT       │
│                     │
│ Delivery address    │
│ Payment method      │
│ Price details       │
│ Place order         │
└──────────┬──────────┘
           │
           ▼
      Create Order
           │
      ┌────┴─────┐
      │          │
   Payment       COD/
   enabled       disabled
      │          │
 Razorpay       Success
      │
 Verify Payment
      │
      ▼
┌─────────────────────┐
│   ORDER SUCCESS     │
│                     │
│ Order ID            │
│ Continue Shopping   │
│ View Order          │
└─────────────────────┘