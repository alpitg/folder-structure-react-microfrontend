# AI Agent Instructions — Ecommerce + CRM Application

## 1. Project Overview

This project is a production-oriented **Ecommerce platform with an integrated CRM/Admin Panel**.

The application consists of:

- **Frontend:** React
- **Backend:** FastAPI / Python
- **Database:** MongoDB Atlas
- **Infrastructure:** Microsoft Azure VM
- **Authentication & Authorization:** Authentication with role-based access control (RBAC)
- **Admin Panel:** CRM-style management interface for users, customers, products, orders, and business operations.

The AI agent must treat this as a **production application**, not a prototype.

Prioritize:

1. Security
2. Data integrity
3. Maintainability
4. Scalability
5. Performance
6. Clear separation of responsibilities
7. Backward compatibility
8. Good developer experience

Do not make architectural changes casually.

---

# 2. High-Level Architecture

```text
                         ┌─────────────────────┐
                         │      Customer       │
                         │   Web Browser       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │                     │
                         │ Ecommerce           │
                         │ CRM / Admin Panel   │
                         └──────────┬──────────┘
                                    │ HTTPS
                                    ▼
                         ┌─────────────────────┐
                         │   FastAPI Backend   │
                         │                     │
                         │ REST APIs           │
                         │ Authentication      │
                         │ Authorization/RBAC  │
                         │ Business Logic      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    MongoDB Atlas    │
                         │                     │
                         │ Users               │
                         │ Customers           │
                         │ Products            │
                         │ Orders              │
                         │ Users               │
                         │ Roles/Permissions   │
                         │ CRM Data            │
                         └─────────────────────┘

                         Azure VM
                 ┌─────────────────────────────┐
                 │ Frontend + Backend runtime  │
                 │ Reverse proxy / HTTPS       │
                 │ Application configuration   │
                 └─────────────────────────────┘
```

The React frontend must never connect directly to MongoDB.

All database operations must go through the FastAPI backend.

---

# 3. Core Engineering Principles

The AI agent MUST follow these principles.

## 3.1 Do Not Over-Engineer

Use the existing architecture unless there is a clear reason to change it.

Do not introduce:

- Microservices
- Kubernetes
- Redis
- Kafka
- RabbitMQ
- GraphQL
- Additional databases
- Additional cloud services

unless explicitly requested or there is a documented architectural requirement.

Prefer a modular monolith initially.

---

## 3.2 Separation of Concerns

Keep responsibilities separated.

### Frontend

Responsible for:

- UI
- Routing
- Forms
- Client-side validation
- API calls
- Authentication state
- Permission-aware UI
- Loading/error states
- User experience

The frontend must NOT be trusted for security authorization.

### Backend

Responsible for:

- Authentication
- Authorization
- RBAC enforcement
- Business rules
- Validation
- Database access
- API contracts
- Audit logging
- Security controls

The backend is the ultimate authority.

### Database

Responsible for:

- Persistent data
- Indexes
- Data relationships/references
- Query performance
- Data integrity

Do not put business logic inside database queries when it belongs in the service layer.

---

# 4. Suggested Backend Structure

Follow a modular structure similar to:

```text
backend/
├── app/
│   ├── main.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   ├── database.py
│   │   └── dependencies.py
│   │
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── customers.py
│   │   │   ├── products.py
│   │   │   ├── orders.py
│   │   │   ├── roles.py
│   │   │   └── permissions.py
│   │   └── router.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   ├── customer.py
│   │   ├── product.py
│   │   ├── order.py
│   │   ├── role.py
│   │   └── audit_log.py
│   │
│   ├── schemas/
│   │   ├── auth.py
│   │   ├── user.py
│   │   ├── customer.py
│   │   ├── product.py
│   │   ├── order.py
│   │   └── role.py
│   │
│   ├── services/
│   │   ├── auth_service.py
│   │   ├── user_service.py
│   │   ├── customer_service.py
│   │   ├── product_service.py
│   │   ├── order_service.py
│   │   └── audit_service.py
│   │
│   └── repositories/
│       ├── user_repository.py
│       ├── customer_repository.py
│       ├── product_repository.py
│       └── order_repository.py
│
├── tests/
├── requirements.txt
└── .env
```

Adapt this structure to the existing repository rather than blindly recreating it.

---

# 5. Suggested Frontend Structure

Prefer a feature-oriented React structure.

```text
frontend/
├── src/
│   ├── app/
│   │   ├── router/
│   │   ├── providers/
│   │   └── store/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── customers/
│   │   ├── orders/
│   │   ├── users/
│   │   ├── roles/
│   │   └── dashboard/
│   │
│   ├── components/
│   ├── layouts/
│   │   ├── PublicLayout/
│   │   └── AdminLayout/
│   │
│   ├── services/
│   │   └── api/
│   │
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── pages/
│
└── package.json
```

Reuse existing project conventions if the repository already has an established structure.

---

# 6. Authentication

Authentication must be handled by the backend.

The agent must:

- Never store plaintext passwords.
- Hash passwords using a modern password hashing algorithm.
- Never return password hashes through API responses.
- Validate authentication tokens on protected endpoints.
- Implement token expiration.
- Handle logout/token invalidation according to the application's authentication strategy.
- Protect administrative endpoints.
- Avoid storing sensitive authentication data unnecessarily in browser storage.
- Never expose secrets in frontend code.

If JWT is used, keep signing secrets exclusively on the backend.

Example conceptual flow:

```text
Login
  ↓
POST /api/auth/login
  ↓
Validate credentials
  ↓
Generate access token
  ↓
Return authenticated session/token
  ↓
React stores authentication state
  ↓
Protected API requests
  ↓
FastAPI validates authentication
  ↓
FastAPI checks permissions
  ↓
Execute operation
```

---

# 7. RBAC — Role Based Access Control

RBAC is a core requirement of the CRM/Admin Panel.

Authorization must be enforced **server-side**.

Never rely solely on hiding frontend buttons.

A user seeing a "Delete" button is not the security boundary.

The backend must reject unauthorized requests.

---

# 8. RBAC Model

Use the following conceptual model:

```text
User
  │
  └── Role(s)
        │
        └── Permission(s)
```

A permission should represent an actionable capability.

Examples:

```text
products.view
products.create
products.update
products.delete

orders.view
orders.create
orders.update
orders.cancel
orders.refund

customers.view
customers.create
customers.update
customers.delete

users.view
users.create
users.update
users.delete

roles.view
roles.create
roles.update
roles.delete

reports.view

settings.view
settings.update
```

Avoid permissions such as:

```text
can_do_everything
is_admin
super_user
```

as the primary authorization mechanism.

Use explicit permissions.

---

# 9. Recommended Roles

The exact roles can be changed according to business requirements.

A reasonable initial model is:

### Super Admin

Full system access.

Typical permissions:

```text
*
```

The super-admin role should be protected carefully.

### Admin

Can manage most operational areas but should not necessarily have access to the most sensitive system-level operations.

### Manager

Can manage operational resources such as:

- Products
- Orders
- Customers
- Reports

but may not manage system users or roles.

### Sales / CRM Staff

Can manage:

- Customers
- Leads
- Customer interactions
- Orders

but should not manage system configuration.

### Support Staff

Can:

- View customers
- View orders
- Handle support-related workflows

but should have limited modification capabilities.

### Viewer

Read-only access.

---

# 10. Permission Enforcement

Backend endpoints must check permissions.

Conceptually:

```python
@router.delete("/products/{product_id}")
async def delete_product(
    product_id: str,
    current_user = Depends(require_permission("products.delete"))
):
    ...
```

The actual implementation must follow the project's existing dependency/service architecture.

Do not duplicate permission-checking logic throughout every endpoint.

Centralize authorization where practical.

---

# 11. Frontend RBAC

The frontend should also be permission-aware for good UX.

Examples:

```text
User has products.view
    → Show Products page

User has products.create
    → Show "Add Product"

User has products.update
    → Show "Edit"

User has products.delete
    → Show "Delete"
```

However:

> Frontend permission checks are for UX only. Backend permission checks are mandatory for security.

Users should not see navigation items for modules they cannot access.

Direct URL navigation must also be handled gracefully.

Example:

```text
/admin/products
```

If the user lacks:

```text
products.view
```

the frontend should display an appropriate unauthorized/forbidden page.

---

# 12. MongoDB Atlas

MongoDB Atlas is the application's persistent database.

The AI agent must:

- Use connection strings from environment variables.
- Never hardcode MongoDB credentials.
- Never commit `.env` files containing secrets.
- Use appropriate indexes.
- Avoid unbounded queries.
- Use pagination for large collections.
- Validate IDs before database operations.
- Handle missing documents gracefully.
- Avoid N+1 query patterns.
- Avoid loading entire collections unnecessarily.

---

# 13. Recommended Collections

The exact schema should follow the existing implementation, but the conceptual data model includes:

```text
users
roles
permissions
customers
products
categories
orders
order_items
audit_logs
customer_notes
customer_activities
```

Additional collections may be introduced when justified by the business requirements.

Do not create duplicate collections for the same business concept.

---

# 14. MongoDB Document Design

Prefer documents that represent clear business entities.

Example conceptual user:

```json
{
  "_id": "...",
  "email": "user@example.com",
  "name": "John Doe",
  "role_ids": ["..."],
  "status": "active",
  "created_at": "...",
  "updated_at": "..."
}
```

Do not expose internal database implementation details unnecessarily through the API.

API schemas should be separate from persistence models where appropriate.

---

# 15. Database Indexing

The agent should consider indexes for frequently queried fields such as:

```text
users.email
users.status

customers.email
customers.phone
customers.created_at

products.slug
products.status
products.category_id

orders.order_number
orders.customer_id
orders.status
orders.created_at

audit_logs.user_id
audit_logs.created_at
```

Do not create indexes blindly.

Indexes should be based on actual query patterns and expected scale.

---

# 16. API Design

Use REST APIs consistently.

Example:

```text
POST   /api/auth/login

GET    /api/products
POST   /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}

GET    /api/customers
POST   /api/customers
GET    /api/customers/{id}
PUT    /api/customers/{id}

GET    /api/orders
GET    /api/orders/{id}
PUT    /api/orders/{id}

GET    /api/users
POST   /api/users
PUT    /api/users/{id}

GET    /api/roles
POST   /api/roles
PUT    /api/roles/{id}
```

Use consistent HTTP status codes.

Examples:

```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error
```

Do not return `200 OK` for authorization failures.

---

# 17. API Response Consistency

Responses should have predictable structures.

For example:

```json
{
  "data": {},
  "message": "Operation successful"
}
```

For paginated resources:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

Follow the project's existing response format if one already exists.

Do not introduce a second response convention.

---

# 18. Validation

Validate all input on the backend.

Never trust:

- Request body
- Query parameters
- Path parameters
- Headers
- Client-side validation
- Frontend permission checks

Use appropriate FastAPI/Pydantic validation mechanisms.

Validation should provide useful errors without exposing sensitive internal information.

---

# 19. Ecommerce Business Rules

Business rules must live on the backend.

Examples:

### Product

Validate:

- Name
- SKU
- Price
- Stock
- Status
- Category
- Product slug

### Order

Validate:

- Customer
- Items
- Quantity
- Price
- Order status
- Payment state
- Shipping information

Never trust product prices or totals sent by the frontend.

For example, do not blindly accept:

```json
{
  "price": 10,
  "quantity": 5,
  "total": 50
}
```

The backend should calculate authoritative values from trusted product data.

---

# 20. Order Integrity

When processing orders:

```text
Frontend request
      ↓
Validate product IDs
      ↓
Load products from database
      ↓
Verify product availability
      ↓
Determine authoritative prices
      ↓
Calculate totals
      ↓
Create order
      ↓
Persist order
```

Never allow the frontend to dictate the final payable amount.

---

# 21. CRM Requirements

The CRM/Admin Panel may include:

- Customer management
- Customer profiles
- Customer history
- Customer notes
- Customer activity
- Orders
- Customer segmentation
- Lead management
- Sales information
- Support information
- Admin users
- Roles
- Permissions
- Reports
- Dashboard metrics

All CRM functionality must respect RBAC.

---

# 22. Audit Logging

Sensitive administrative actions should be auditable.

Examples:

```text
User created
User updated
Role changed
Permission changed
Product created
Product updated
Product deleted
Order status changed
Customer data modified
Settings changed
```

An audit log should conceptually capture:

```json
{
  "user_id": "...",
  "action": "product.update",
  "resource_type": "product",
  "resource_id": "...",
  "timestamp": "...",
  "metadata": {}
}
```

Do not store passwords, access tokens, secrets, or other sensitive authentication material in audit logs.

---

# 23. Security Requirements

The agent MUST treat security as a first-class concern.

Never:

- Hardcode secrets.
- Commit credentials.
- Expose database credentials.
- Expose private keys.
- Trust frontend authorization.
- Log passwords.
- Log access tokens.
- Return sensitive user information unnecessarily.
- Allow arbitrary MongoDB queries from clients.
- Construct unsafe queries from unvalidated input.
- Disable authentication to "make development easier" without explicit instruction.

Use environment variables for secrets.

Example:

```env
MONGODB_URI=
DATABASE_NAME=
JWT_SECRET=
JWT_EXPIRATION=
CORS_ORIGINS=
```

Never place these values directly into source code.

---

# 24. CORS

Configure CORS explicitly.

Do not use unrestricted origins in production.

Avoid:

```text
allow_origins=["*"]
```

for authenticated production APIs unless there is a specific, reviewed reason.

Production origins should be explicitly configured.

---

# 25. Azure VM

The application is hosted on an Azure VM.

The agent should assume:

```text
Internet
   ↓
HTTPS / Reverse Proxy
   ↓
React application
   ↓
FastAPI application
   ↓
MongoDB Atlas
```

The VM should not expose unnecessary ports.

Only required services should be publicly reachable.

Do not expose MongoDB directly to the internet.

MongoDB Atlas network access should be restricted appropriately.

---

# 26. Environment Configuration

Different environments should be supported.

Conceptually:

```text
Development
Staging
Production
```

Do not mix development and production credentials.

Use environment variables or a secure configuration mechanism.

Never commit production secrets.

---

# 27. Error Handling

Do not expose internal exceptions to users.

Bad:

```json
{
  "error": "MongoServerSelectionError: connection refused ..."
}
```

Better:

```json
{
  "message": "Unable to process the request."
}
```

Detailed technical errors should be available through secure server-side logs.

---

# 28. Logging

Logs should be useful for debugging and operations.

Include information such as:

```text
timestamp
log level
request path
HTTP method
request ID
user ID where appropriate
operation
error information
```

Never log:

```text
passwords
JWT/access tokens
API keys
database passwords
payment secrets
```

---

# 29. Frontend Security

The React frontend must:

- Avoid rendering untrusted HTML.
- Sanitize content when HTML rendering is genuinely required.
- Avoid exposing environment secrets.
- Handle authentication expiration.
- Handle 401/403 responses consistently.
- Prevent unauthorized navigation.
- Avoid trusting URL parameters for authorization.
- Avoid putting sensitive information into client-side logs.

---

# 30. UI/UX Guidelines

The Admin Panel should feel like a professional business application.

Use:

- Consistent navigation
- Responsive tables
- Search
- Filters
- Pagination
- Sorting
- Confirmation dialogs for destructive operations
- Toasts/notifications
- Loading states
- Empty states
- Error states
- Form validation
- Permission-aware actions

Destructive operations should require confirmation.

For example:

```text
Delete Product?

This action cannot be undone.

[Cancel] [Delete]
```

---

# 31. Tables

Admin tables should support, where relevant:

```text
Search
Filter
Sort
Pagination
Bulk actions
Column visibility
Row actions
```

Do not load thousands of records into the browser unnecessarily.

Use server-side pagination for large datasets.

---

# 32. API Pagination

Prefer pagination for collections.

Example:

```text
GET /api/products?page=1&page_size=20
```

The backend should enforce a reasonable maximum page size.

For example:

```text
page_size <= 100
```

The exact limit should be determined by the application.

Never allow unlimited database queries from the frontend.

---

# 33. Code Quality

When modifying code:

- Follow existing coding conventions.
- Prefer small, focused changes.
- Avoid unrelated refactoring.
- Reuse existing utilities.
- Avoid duplicated logic.
- Use descriptive names.
- Add type hints where appropriate.
- Keep functions focused.
- Keep components maintainable.
- Remove dead code only when safe.

Do not rewrite entire modules when a small change is sufficient.

---

# 34. Backward Compatibility

Before changing an API:

1. Inspect existing consumers.
2. Inspect frontend API calls.
3. Check existing tests.
4. Determine whether existing response formats are relied upon.
5. Avoid breaking existing functionality.

If a breaking change is unavoidable, clearly document it.

---

# 35. Testing

Every meaningful backend feature should have tests.

Important test categories:

### Authentication

```text
Valid login
Invalid login
Expired token
Missing token
```

### RBAC

```text
Authorized user
Unauthorized user
Missing permission
Multiple roles
Admin access
Viewer access
```

### Products

```text
Create
Read
Update
Delete
Validation
Duplicate SKU
```

### Orders

```text
Create
Invalid product
Insufficient stock
Incorrect price manipulation
Status transitions
```

### Customers

```text
Create
Read
Update
Search
Authorization
```

---

# 36. RBAC Testing Requirements

For every protected endpoint, test both:

```text
Allowed
Denied
```

Example:

```text
products.delete

Super Admin → allowed
Admin       → allowed/denied according to configured permission
Manager     → denied if permission absent
Viewer      → denied
Unauthenticated → denied
```

Do not consider RBAC complete until unauthorized API calls are rejected.

---

# 37. Database Migration / Schema Changes

MongoDB is flexible, but schema changes still need planning.

When changing document structure:

- Consider existing records.
- Maintain backward compatibility where possible.
- Provide migration logic for large changes.
- Do not assume all existing documents have the newest fields.

Code should gracefully handle legacy documents during transitions.

---

# 38. Performance

Avoid:

```text
SELECT-like full collection scans
```

or their MongoDB equivalents where indexes could be used.

Consider:

- Proper indexes
- Pagination
- Projection
- Aggregation pipelines
- Efficient queries
- Caching only when justified

Do not optimize prematurely.

Measure first when possible.

---

# 39. API Documentation

FastAPI's generated OpenAPI documentation should remain accurate.

For new endpoints:

- Use meaningful endpoint names.
- Define request schemas.
- Define response schemas.
- Document authentication requirements.
- Document expected errors where useful.

---

# 40. Development Workflow

Before modifying code, the AI agent should:

1. Inspect the repository.
2. Understand the existing architecture.
3. Identify relevant files.
4. Check existing patterns.
5. Check existing tests.
6. Implement the smallest appropriate change.
7. Run relevant tests.
8. Check for lint/type issues where configured.
9. Review security implications.
10. Summarize the changes.

Do not assume the repository matches this document exactly.

The repository is the source of truth for implementation details.

This document defines architectural intent and engineering rules.

---

# 41. Change Strategy

For every requested feature:

```text
Understand
   ↓
Inspect existing implementation
   ↓
Plan
   ↓
Implement
   ↓
Test
   ↓
Security review
   ↓
Regression check
   ↓
Summarize
```

Do not immediately start writing code without inspecting the existing implementation.

---

# 42. Feature Development Example

For a new "Customer Management" feature:

### Backend

Implement:

```text
Customer model/schema
Customer repository
Customer service
Customer API routes
Permission checks
Validation
Tests
```

### Permissions

Potential permissions:

```text
customers.view
customers.create
customers.update
customers.delete
```

### Frontend

Implement:

```text
Customer list
Customer search
Customer filters
Customer details
Create customer
Edit customer
Delete customer
Permission-aware actions
Loading states
Error handling
```

### Security

Verify:

```text
Unauthenticated → denied
Authenticated without permission → denied
Authenticated with permission → allowed
```

---

# 43. Destructive Operations

For operations such as:

```text
Delete user
Delete product
Delete customer
Cancel order
Change role
Remove permissions
```

the agent should consider:

- Authorization
- Confirmation
- Audit logging
- Referential/data integrity
- Whether soft-delete is more appropriate

Do not permanently delete important business data without considering the application's retention requirements.

---

# 44. Soft Delete

For important CRM/business entities, consider soft deletion where appropriate.

Conceptually:

```json
{
  "deleted": true,
  "deleted_at": "...",
  "deleted_by": "..."
}
```

The exact approach must follow business requirements and existing project conventions.

Do not introduce soft deletion everywhere automatically.

---

# 45. Sensitive Operations

The following should receive additional authorization scrutiny:

```text
Changing user roles
Changing permissions
Deleting users
Changing order/payment state
Refund operations
Changing system settings
Exporting customer data
Viewing sensitive customer information
```

These operations should be protected by explicit permissions.

---

# 46. Data Privacy

Customer data should be treated as sensitive business information.

Do not expose unnecessary customer information in:

- API responses
- Logs
- Error messages
- Browser storage
- Audit metadata

Only return the fields required by the current operation.

---

# 47. Admin Route Security

Admin routes should be protected at both levels:

### Frontend

```text
Require authentication
Require required permission
```

### Backend

```text
Require authentication
Require required permission
```

Example:

```text
/admin/users
        │
        ├── Frontend auth check
        ├── Frontend users.view check
        │
        └── Backend users.view enforcement
```

---

# 48. Permission Naming Convention

Use a consistent format:

```text
resource.action
```

Examples:

```text
users.view
users.create
users.update
users.delete

roles.view
roles.create
roles.update
roles.delete

products.view
products.create
products.update
products.delete

orders.view
orders.create
orders.update
orders.cancel
orders.refund

customers.view
customers.create
customers.update
customers.delete

reports.view
settings.view
settings.update
```

Avoid inconsistent naming such as:

```text
view_products
product_read
canEditProduct
PRODUCT_UPDATE
```

---

# 49. Role Assignment

Users should not be able to arbitrarily assign themselves roles.

Role-management operations must require explicit permissions.

Example:

```text
User A
   ↓
users.update
   +
roles.assign
   ↓
Can modify User B's role
```

The exact permission model can be simplified if the application uses a different design, but privilege escalation must be prevented.

---

# 50. Privilege Escalation Prevention

The agent must specifically consider privilege escalation.

Examples of dangerous behavior:

```text
Normal user modifies their own role → must be prevented
Manager grants themselves admin permissions → must be prevented
User modifies another user's permissions without authorization → must be prevented
Frontend sends role=super_admin → backend blindly accepts → must be prevented
```

Never trust role or permission fields coming from the client.

---

# 51. Super Admin Protection

If a Super Admin role exists:

- Do not expose unrestricted role assignment casually.
- Protect role-management APIs.
- Consider preventing accidental deletion of the final Super Admin.
- Log changes to privileged accounts.
- Treat permission changes as sensitive operations.

---

# 52. Transactions and Data Consistency

MongoDB operations that affect multiple pieces of business-critical data should be designed carefully.

For example:

```text
Create order
   ↓
Reserve/decrement inventory
   ↓
Create order record
```

If atomicity is required, evaluate MongoDB transaction support rather than assuming individual operations will remain consistent.

Do not implement distributed consistency mechanisms without understanding the existing database configuration.

---

# 53. Payments

If payment processing is introduced later:

- Never store raw card information.
- Never trust payment status supplied by the frontend.
- Verify payment provider webhooks server-side.
- Validate webhook authenticity.
- Keep payment secrets exclusively on the backend.
- Audit payment-state changes.

Payment processing must be treated as a security-sensitive subsystem.

---

# 54. External Integrations

For integrations such as:

```text
Payment gateways
Email providers
SMS providers
Shipping providers
Analytics
CRM integrations
```

keep integration-specific code isolated.

Do not spread third-party API calls throughout business logic.

Prefer a service/integration abstraction.

---

# 55. Environment-Specific Behavior

Never use production behavior as a shortcut during development.

Examples:

```text
Development
→ detailed errors
→ local database/configuration

Production
→ sanitized errors
→ secure configuration
→ HTTPS
→ restricted CORS
→ production logging
```

Use explicit configuration rather than checking arbitrary environment values throughout the codebase.

---

# 56. What the AI Agent Must NOT Do

Do not:

- Rewrite the architecture without approval.
- Replace MongoDB without approval.
- Replace FastAPI without approval.
- Replace React without approval.
- Introduce microservices unnecessarily.
- Remove RBAC.
- Bypass authentication during implementation.
- Disable authorization to fix an API error.
- Hardcode secrets.
- Commit `.env` files containing secrets.
- Trust frontend-provided permissions.
- Trust frontend-provided prices.
- Expose database credentials.
- Make destructive database changes without understanding their impact.
- Delete existing functionality to simplify implementation.
- Change unrelated files unnecessarily.
- Upgrade major dependencies without evaluating compatibility.

---

# 57. When Requirements Are Ambiguous

When a requirement is unclear:

1. Inspect the existing code.
2. Infer the behavior from established project conventions.
3. Prefer the least disruptive implementation.
4. Preserve backward compatibility.
5. Ask for clarification when the ambiguity materially affects security, data integrity, or architecture.

Do not invent complex business rules.

---

# 58. Definition of Done

A feature is considered complete only when:

```text
[ ] Backend implementation complete
[ ] Frontend implementation complete
[ ] Authentication handled
[ ] RBAC handled
[ ] Backend authorization enforced
[ ] Input validation implemented
[ ] Error handling implemented
[ ] Loading/empty/error UI handled
[ ] Database queries reviewed
[ ] Required indexes considered
[ ] Audit logging considered for sensitive operations
[ ] Tests added/updated
[ ] Existing functionality not broken
[ ] Security implications reviewed
[ ] Documentation updated where necessary
```

---

# 59. Agent Response Format

When completing a development task, provide a concise summary:

```text
## Changes
- What was implemented

## Backend
- API/service/database changes

## Frontend
- UI/routes/components changes

## RBAC
- Permissions added/changed

## Tests
- Tests added/run

## Security
- Relevant security considerations

## Notes
- Any assumptions
- Any remaining work
```

Do not claim tests were run if they were not actually run.

Do not claim deployment was completed unless deployment was actually performed.

---

# 60. Priority Rules

When making implementation decisions, prioritize in this order:

```text
1. Security
2. Data integrity
3. Existing application behavior
4. Business requirements
5. Maintainability
6. Performance
7. Developer convenience
```

If convenience conflicts with security, choose security.

If a requested feature conflicts with existing architecture, inspect the existing implementation before changing architecture.

---

# 61. Final Agent Principle

The AI agent should behave like a senior production engineer working on an existing ecommerce and CRM system.

The agent should:

> Understand before changing.
> Reuse before rebuilding.
> Secure before exposing.
> Validate before persisting.
> Test before claiming completion.
> Keep business logic on the backend.
> Treat RBAC as a security boundary.
> Preserve existing functionality unless change is explicitly required.

The application should remain secure, maintainable, scalable, and understandable as new ecommerce and CRM features are added.
