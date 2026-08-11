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


<!-- --------------------------------------------- -->
On place order button clikced
<!-- --------------------------------------------- -->
Cart
 ↓
PLACE ORDER
 ↓
Is user logged in?
 ├── No → Open UserLoginApp
 │          ↓
 │       OTP verified
 │          ↓
 │       User logged in
 │
 └── Yes
      ↓
AddressSelectionApp
      ↓
 ┌─────────────────────────────┐
 │ Select Delivery Address      │
 │                             │
 │ ○ Home                      │
 │   John Doe                  │
 │   123 Main Street           │
 │   Pune - 411001             │
 │                             │
 │ ○ Office                    │
 │   John Doe                  │
 │   ...                       │
 │                             │
 │ + Add New Address            │
 └─────────────────────────────┘
      ↓
Select address
      ↓
Continue
      ↓
Create Order
      ↓
Razorpay