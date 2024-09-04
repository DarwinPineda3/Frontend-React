# Possible UI templates
### 1. [Vite Soft UI Dashboard](https://github.com/creativetimofficial/vite-soft-ui-dashboard)
- **Description:** A beautiful and easy-to-use React/Vite template for building dashboards, inspired by Soft UI Design. It comes with a variety of components and a clean, modern design.
- **Features:**
  - Multiple page layouts
  - Easy integration with any back-end
  - Modular code for better maintainability
  - Soft UI-inspired design with smooth shadows and gradients

### 2. [Karciz React Vite Ticketing Admin Dashboard Template](https://themeforest.net/item/karciz-react-vite-ticketing-admin-dashboard-template/53714954)
- **Description:** Karciz is a modern and versatile admin dashboard template specifically designed for ticketing management. It offers a variety of UI elements and is built with React and Vite.
- **Features:**
  - Ticket management system
  - User-friendly interface
  - Multiple charting and data visualization options
  - Fully responsive design

## Color Palette

This project uses a modern color palette to ensure consistency and visual harmony across all UI elements. Below is the full color palette used in this project:

### Primary Colors
- **Primary 1:** `#212121`
- **Primary 2:** `#424242`
- **Primary 3:** `#616161`

### Secondary Colors
- **Secondary 1:** `#757575`
- **Secondary 2:** `#9E9E9E`
- **Secondary 3:** `#BDBDBD`

### Accent Colors
- **Accent 1:** `#FF5722`
- **Accent 2:** `#FFC107`
- **Accent 3:** `#8BC34A`

### Background Colors
- **Background 1:** `#F5F5F5`
- **Background 2:** `#EEEEEE`
- **Background 3:** `#E0E0E0`

### Text Colors
- **Text Primary:** `#212121`
- **Text Secondary:** `#757575`
- **Text Disabled:** `#BDBDBD`

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
