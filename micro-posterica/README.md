## reference -
- https://preview.keenthemes.com/keen/demo1/apps/invoices/create.html# `MVP`
- https://geeks-react.netlify.app/dashboard/ecommerce/orders `MVP`
- - https://undraw.co/search/error `MVP` - `Illustrator svg`
- https://preview.keenthemes.com/keen/demo1/index.html?mode=light (charts/graphs)
- https://prium.github.io/phoenix/v1.22.0/modules/forms/advance/date-picker.html
- https://coderthemes.com/hyper/layouts/index.html

# React + TypeScript + Vite

src/
├── components/
│   ├── ui/         # reusable buttons, inputs, cards
│   ├── estimates/
│   ├── bills/
│   └── customers/
├── features/
│   ├── Dashboard.tsx
│   ├── Customers.tsx
│   ├── EstimateForm.tsx
│   └── Bills.tsx
├── services/
│   └── api.ts      # axios-based API client
├── hooks/
├── utils/
└── App.tsx


## Future plan -
1. Multi tenancy






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
