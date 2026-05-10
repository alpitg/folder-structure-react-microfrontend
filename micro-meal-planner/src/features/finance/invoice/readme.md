I am building a customer billing software using Node.js and MongoDB.

I already have an Order Management System. Now I want to implement a complete Invoice Management System for admin users.

Current situation:
- Orders are stored with items, pricing, discounts, and totals
- Invoice collection exists but only stores orderIds and summary fields
- This needs to be redesigned into a proper, production-ready invoicing system

Requirements:

1. Invoice Generation
- Admin can select one or more orders to generate an invoice
- Only orders without an invoiceId should be allowed
- Once invoice is generated, orders should be linked to the invoice

2. Invoice Data Design
- Invoice must be immutable after creation (except payment updates)
- Store a snapshot of order data inside invoice (items, pricing, discounts)
- Do NOT rely only on orderIds for calculations
- Include:
  - invoiceNumber (unique, human-readable)
  - billDate
  - billFrom (business details)
  - billTo (customer details)
  - items (copied from orders)
  - subtotal, discount, tax, totalAmount
  - advancePaid, balanceAmount
  - paymentMode, paymentStatus

3. Invoice Numbering
- Generate sequential invoice numbers like:
  INV-YYYYMMDD-0001
- Ensure uniqueness and concurrency safety

4. Business Logic
- Calculate totals from items during invoice creation
- Handle floating point precision correctly (2 decimal rounding)
- Support multiple orders in a single invoice

5. Order Updates
- After invoice creation:
  - Update all related orders with invoiceId
  - Prevent further modification of those orders

6. Payment Handling
- Allow updating:
  - paymentStatus (pending, partial, paid)
  - advancePaid and balanceAmount
- Optionally support partial payments

7. API Design
Provide REST APIs for:
- Create Invoice from orderIds
- Get Invoice by ID
- List Invoices (with filters)
- Update payment status
- Download invoice (PDF)

8. PDF Generation
- Generate a professional invoice PDF
- Use HTML template + PDF generator (like Puppeteer)
- Include:
  - business info
  - customer info
  - item table
  - totals
  - payment status

9. Edge Cases
- Prevent duplicate invoicing of same order
- Handle cancelled items or partial orders
- Ensure data consistency

10. Tech Stack
- Backend: Node.js (Express or NestJS)
- Database: MongoDB (Mongoose)

Expected Output:
- Mongoose schema design for Invoice
- API implementation (controllers + services)
- Invoice number generator logic
- Example PDF template
- Best practices for scalability and data integrity