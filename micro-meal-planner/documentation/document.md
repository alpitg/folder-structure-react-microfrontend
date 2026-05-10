### Detailed pricing and measurement logic -

- 📐 Dimensions and chargeable area
- 💰 Glass cost per sq.in/sq.ft
- 🎨 Moulding types and multipliers
- 🧰 Additional charges like:
  - Varnish cost
  - Lamination cost
  - Router cutting


| Feature                                         | Input                | Type                     |
| ----------------------------------------------- | -------------------- | ------------------------ |
| Art Width & Height                              | Numeric              | For base area            |
| Mounting Required                               | Yes/No               | Toggle                   |
| Varnish & Lamination                            | Yes/No               | Checkboxes               |
| Glass Type                                      | Select               | Auto calculate per sq.in |
| Frame Type                                      | Select               | Multiplier-driven        |
| Final Area (auto)                               | Text                 | Sq. inches, sq. feet     |
| Additional Charges (Router Cut, Laminate, etc.) | Auto/Checkbox driven | Cost-added               |


Order -> Invoice (discount/advance) -> Generate payment -> update accounting record


  
```js
// customers

{
  _id: ObjectId,
  name: String,
  contact: { phone: String, email: String },
  billingAddress: { street: String, city: String, state: String, postcode: String, country: String },
  // ...
}
```

<!-- orders -->
```js
{
  _id: ObjectId,
  customerId: ObjectId,
  createdAt: ISODate,
  status: "pending" | "fulfilled" | "partial" | "cancelled",
  items: [
    {
      productId: ObjectId,
      description: String,
      quantity: Number,
      unitPrice: Number,

      discountedQuantity: Number?,       // items that got discount
      discountAmount: Number,            // total discount value on this line

      cancelledQty: Number,              // if partially cancelled
      netQuantity: Number,               // billable qty = quantity - cancelledQty

      amountBeforeDiscount: Number,
      amountAfterDiscount: Number        // unitPrice * netQuantity − discountAmount
    }
  ],
  subtotal: Number,
  totalDiscountAmount: Number,           // sum of all line discounts
  totalAmount: Number,                   // subtotal - totalDiscountAmount
  cancelledAmount: Number,
  note: String
}
```

<!-- invoices -->
```js
{
  _id: ObjectId,
  customerId: ObjectId,
  orderIds: [ObjectId],
  createdAt: ISODate,
  status: "draft" | "issued" | "paid",
  items: [
    {
      orderId: ObjectId,
      productId: ObjectId,
      description: String,
      quantity: Number,
      unitPrice: Number,

      discountAmount: Number,

      amountBeforeDiscount: Number,
      amountAfterDiscount: Number
    }
  ],
  subtotal: Number,
  totalDiscountAmount: Number,
  totalAmount: Number,           // subtotal - totalDiscountAmount
  paidAmount: Number,
  balanceAmount: Number,
  paymentMethod: String,
  paymentStatus: String
}

```

### In Accounting
- * Orders - 1 Invoice
- Multiple purchase orders (POs) can be merged in 1 Invoice - as long as the customer is the same across orders.

| Factor                    | Requirement                                                           |
| ------------------------- | --------------------------------------------------------------------- |
| Customer must be the same | Multiple orders must belong to one customer                           |
| Billing terms align       | Same payment terms, billing date, and address                         |
| Order state compatibility | All orders must be invoiced or confirmed                              |
| Software must support it  | Via built-in features or plugins/extensions                           |
| Accounting integrity      | A/R aging, revenue recognition, and audit trails must remain accurate |



Start
⬇️

1. Customer places orders
[Order 1], [Order 2], … (same or multiple sessions)
✅ All orders linked to same customer
⬇️

2. Order Status Evaluation (for each order)
Is order cancelled?

Yes → Mark order as Cancelled → No invoice

No → proceed
⬇️

Is order partially cancelled or partially fulfilled?

Yes → split out fulfilled vs cancelled items

Fulfilled portion moves forward

Cancelled portion marked and excluded from billing

No → full order is billable
⬇️

3. Group billable orders
If multiple orders remain billable for customer, consolidate them into one invoice (if your system supports grouping)
⬇️

4. Create Invoice
Draft invoice: includes all billable items from grouped orders

Approval / validation step
⬇️

5. Invoice Issued
Invoice finalized and sent to customer

Records update: AR ledger, revenue recognition
⬇️

6. Payment and closing process
Payment received?

Yes → mark invoice Paid → if any order fully billed, mark as Completed

No → aging or follow-up process
⬇️

End
