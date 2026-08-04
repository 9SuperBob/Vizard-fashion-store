# Component Refactor Design

## Goal

Split the current monolithic `src/App.jsx` into focused, reusable components without changing the storefront's existing visual output or behavior.

## Architecture

`App.jsx` remains the composition root. It owns hash-route state, mobile-menu state, and quick-view state. It imports page components and chooses which page to render.

UI is divided into three areas:

- `components/layout`: shared `Navbar` and `Footer`.
- `components/products`: reusable product card, product grid, category filter, and quick-view modal.
- `pages`: one file per current destination: Home, Collection, Product Detail, Men, Women, Journal, Journal Detail, Lookbook, Size Guide, Appointments, and About.

Static lists move to `data/`, and small pure helpers such as currency formatting and hash-route parsing move to `utils/`.

## Data Flow

- `App` reads the hash and renders a page with the data and callbacks it needs.
- Collection, Men, and Women pages own their selected-category UI state.
- `ProductGrid` renders products through `ProductCard`.
- Product cards invoke the quick-view callback supplied by `App`.
- `QuickViewModal` receives the selected product and close callback from `App`.
- The product-detail page receives the matching active product from `App`.

## Compatibility

- Existing hash URLs and links remain unchanged.
- The existing `MensProducts.jsx` and `WomensProducts.jsx` data modules remain the source for their collections.
- Legacy `Product/Product.jsx`, `Product2/Trending_P.jsx`, and their data files are not wired in by this refactor because they are currently unused and do not match the active storefront implementation.
- Styling remains in the current CSS files and the existing Tailwind classes remain unchanged.

## Error Handling

The product-detail page continues to render its existing "Product not found" state when no matching product exists. The router continues to fall back to the home page for unknown hashes.

## Verification

- Run the project lint command.
- Run the production build.
- Confirm the app entry imports only the refactored composition root and no removed in-file page functions remain in `App.jsx`.
