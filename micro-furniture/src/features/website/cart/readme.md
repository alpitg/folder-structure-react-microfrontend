User adds/updates product
        ↓
API: update cart
        ↓
Backend calculates:
  - item prices
  - discounts
  - tax
  - misc charges
  - shipping
  - coupon
  - subtotal
  - grand total
        ↓
Return complete CartResponse
        ↓
Redux stores cart response
        ↓
UI displays backend totals