## reference -
- https://preview.keenthemes.com/keen/demo1/apps/invoices/create.html# `MVP`
- https://geeks-react.netlify.app/dashboard/ecommerce/orders `MVP`
- - https://undraw.co/search/error `MVP` - `Illustrator svg`
- https://preview.keenthemes.com/keen/demo1/index.html?mode=light (charts/graphs)
- https://prium.github.io/phoenix/v1.22.0/modules/forms/advance/date-picker.html
- https://coderthemes.com/hyper/layouts/index.html
- https://demo.aspnetzero.com/account/login   - abp_tenancy_name=t94ff4aff

# React + TypeScript + Vite

```md

src/
│
├── app/                     # redux or global store
│   ├── store.ts
│   └── redux/
│       └── auth/
│           ├── auth.api.ts     # RTK Query calls (login, refresh, logout)
│           ├── auth.slice.ts   # stores token + user info
│           ├── auth.types.ts   # types for user, roles, permissions
│           └── role/           # role API + slice
│
├── components/
│   ├── auth/
│   │   ├── PrivateRoute.tsx    # route guard
│   │   ├── PermissionGuard.tsx # check if user has permission
│   │   └── constants/
│   │       └── routes.const.ts # route names
│   ├── layout/
│   └── ui/                     # generic UI
│
├── hooks/
│   ├── useAuth.ts              # check login + user
│   ├── usePermission.ts        # check if user has required permission
│
├── features/
│   ├── master/
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   └── ...
│
├── routes/
│   ├── AppRoutes.tsx           # central route config
│   └── ProtectedRoutes.tsx     # wraps routes with auth guard
│
└── utils/
    ├── storage.ts              # token handling
    ├── jwt.ts                  # decode JWT if needed
    └── helpers.ts

```

## Future plan -
1. Multi tenancy



```js
  <div className="col-sm-8">
    <input
      type="text"
      placeholder="Name"
      className={`form-control form-control-solid fs-6 fw-bold ${
        errors.order?.items?.[index]?.customizedDetails
          ?.name
          ? "is-invalid"
          : ""
      }`}
      {...register(
        `order.items.${index}.customizedDetails.name` as const,
        {
          required: "Art name is required",
        }
      )}
    />
    <div className="invalid-feedback">
      {
        errors.order?.items?.[index]?.customizedDetails
          ?.name?.message
      }
    </div>
  </div>
```



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```


┌──────────────────────────────────────────────────────────────────────────────┐
│                                  Client (Web)                               │
│  React (Vite/Next.js), Router, State (Redux/Zustand), TanStack Query        │
│  Auth UI (OIDC), Feature Flags, i18n                                        │
└──────────────────────────────────────────────────────────────────────────────┘
                │ HTTPS (JWT)                                    ▲ Webhooks
                ▼                                                 │
┌──────────────────────────────────────────────────────────────────────────────┐
│                                 API Gateway / Edge                           │
│  TLS termination, rate limiting, WAF, tenant routing by subdomain/header     │
└──────────────────────────────────────────────────────────────────────────────┘
                │                                                             
                ▼                                                             
┌──────────────────────────────────────────────────────────────────────────────┐
│                                Python Backend (FastAPI)                      │
│  Modules: auth, tenants, users, contacts, deals, activities, billing, files │
│  Patterns: service + repository, Pydantic schemas, dependency‑injection      │
│  Tenancy middleware: resolve tenant -> context -> row filtering/RLS          │
└──────────────────────────────────────────────────────────────────────────────┘
        │            │                 │                 │                  
        │            │                 │                 │                  
        ▼            ▼                 ▼                 ▼                  
┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────────┐ ┌─────────────┐
│ PostgreSQL  │ │ Redis        │ │ Object Store │ │ Message Queue │ │ Search      │
│ (RLS)       │ │ (cache,      │ │ (S3/minio)   │ │ (Celery+RQ)   │ │ (OpenSearch │
│             │ │ sessions,     │ │ tenant key   │ │ workers       │ │  optional)  │
└─────────────┘ │ rate limits)  │ │ prefixes)    │ │               │ └─────────────┘
                └──────────────┘ └──────────────┘ └───────────────┘




app/
  main.py
  core/        # settings, db, cache, security, logging
  middleware/  # tenant_resolver.py, rls.py, rate_limit.py
  modules/
    auth/
    tenants/
    crm/ (contacts, orgs, deals, pipelines, activities)
    billing/
    files/
  workers/     # Celery tasks (emails, webhooks, exports)


## PROMPTS
```shell
want to create a React component similar to the Angular HTML you shared (for editing user info: First Name, Surname, Email, Username), and implement it using React Hook Form + Bootstrap + Bootstrap Icons, similar to your ChangePasswordApp component.
```

```json
{
    "task": "provide me code to manage role & permissions in react app",
    "response": "To manage roles and permissions in a React app, you can use a combination of context and higher-order components (HOCs) or hooks. Below is an example of how to implement a simple role and permission management system using React Context API. // Only allow users with // the 'admin' role to access this page",
    "code": {
      "private_route_component": "",
  
      "route.ts": ""
    }
  }
  
  ```