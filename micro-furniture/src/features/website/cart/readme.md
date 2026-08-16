src/
└── components/
    └── website/
        ├── cart/
        │   ├── cart.tsx
        │   ├── cart.scss
        │   └── components/
        │       ├── cart-steps.tsx
        │       ├── cart-items.tsx
        │       ├── cart-item.tsx
        │       ├── cart-price-details.tsx
        │       ├── cart-empty.tsx
        │       ├── cart-address.tsx
        │       ├── cart-payment.tsx
        │       └── cart-login.tsx
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