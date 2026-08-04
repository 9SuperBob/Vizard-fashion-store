# Component Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the active storefront UI from `src/App.jsx` into focused, reusable components while preserving every current route and interaction.

**Architecture:** `App.jsx` becomes the composition root for hash routing and shared UI state. Pages own page-specific presentation and filters; shared layout and product controls live under `components/`; static lists and pure helpers move to `data/` and `utils/`.

**Tech Stack:** React 19, Vite 7, Tailwind CSS, Node built-in test runner.

## Global Constraints

- Preserve existing hash URLs, page copy, Tailwind classes, visual layout, product filtering, quick-view behavior, and the product-not-found fallback.
- Keep `MensProducts.jsx` and `WomensProducts.jsx` as the source data for those collections.
- Do not connect the currently unused legacy `Product/Product.jsx` or `Product2/Trending_P.jsx` files.
- Do not add dependencies solely for this refactor.

---

## File Structure

- `src/utils/routes.js`: hash parser and route constants.
- `src/utils/formatPrice.js`: currency formatter.
- `src/data/storefrontData.js`: shared products, categories, journal, lookbook, and size-guide rows.
- `src/components/layout/Navbar.jsx`, `Footer.jsx`: shared site chrome.
- `src/components/products/ProductCard.jsx`, `ProductGrid.jsx`, `CategoryFilter.jsx`, `QuickViewModal.jsx`: reusable catalogue UI.
- `src/pages/*.jsx`: each complete current destination.
- `src/App.jsx`: route, menu, and quick-view state plus page composition only.
- `test/routes.test.js`, `test/formatPrice.test.js`: executable tests for extracted pure behavior.

### Task 1: Extract and test pure routing and formatting helpers

**Files:**
- Create: `test/routes.test.js`
- Create: `test/formatPrice.test.js`
- Create: `src/utils/routes.js`
- Create: `src/utils/formatPrice.js`

**Interfaces:**
- Produces `routes`, `getPageFromHash(hash)`, and `formatPrice(price)` for `App` and page components.

- [ ] **Step 1: Write failing route tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { getPageFromHash } from '../src/utils/routes.js';

test('parses product and unknown hash routes', () => {
  assert.deepEqual(getPageFromHash('#/product/linea-wool-coat'), {
    page: 'productDetail', slug: 'linea-wool-coat',
  });
  assert.deepEqual(getPageFromHash('#/unknown'), { page: 'home', slug: null });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/routes.test.js`
Expected: FAIL because `src/utils/routes.js` does not exist.

- [ ] **Step 3: Implement `routes` and `getPageFromHash`**

Move the existing `routes` constant and `getPageFromHash` implementation from `App.jsx` unchanged into `src/utils/routes.js`, then export both by name.

- [ ] **Step 4: Write, run, and satisfy formatter test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice } from '../src/utils/formatPrice.js';

test('formats storefront prices as whole US dollars', () => {
  assert.equal(formatPrice(420), '$420');
});
```

Run: `node --test test/routes.test.js test/formatPrice.test.js`
Expected: PASS after moving the existing `Intl.NumberFormat` implementation to `src/utils/formatPrice.js`.

- [ ] **Step 5: Commit**

```bash
git add test src/utils
git commit -m "refactor: extract route and price helpers"
```

### Task 2: Extract shared data and layout

**Files:**
- Create: `src/data/storefrontData.js`
- Create: `src/components/layout/Navbar.jsx`
- Create: `src/components/layout/Footer.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `routes` from `src/utils/routes.js`.
- Produces: `Navbar({ currentPage, menuOpen, setMenuOpen })`, `Footer()`, and named storefront-data exports for pages.

- [ ] **Step 1: Add import smoke check before implementation**

Create `test/module-imports.test.js` that dynamically imports `../src/utils/routes.js` and asserts `routes.home === '#/'`. Run `node --test test/module-imports.test.js`; it must pass before moving JSX.

- [ ] **Step 2: Move static lists exactly once**

Move `products`, `categories`, `journalEntries`, `lookbookMoments`, and `sizeRows` from `App.jsx` to `storefrontData.js` as named exports. Import them in `App.jsx`; do not alter list contents.

- [ ] **Step 3: Move shared JSX**

Move the in-file `Navbar` and `Footer` functions into their layout files. Replace their dependencies with imports, and export each as default. Import them back into `App.jsx`.

- [ ] **Step 4: Verify extraction**

Run: `npm run build`
Expected: Vite completes without unresolved imports.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/data src/components/layout test/module-imports.test.js
git commit -m "refactor: extract storefront data and layout"
```

### Task 3: Create reusable product UI

**Files:**
- Create: `src/components/products/ProductCard.jsx`
- Create: `src/components/products/ProductGrid.jsx`
- Create: `src/components/products/CategoryFilter.jsx`
- Create: `src/components/products/QuickViewModal.jsx`

**Interfaces:**
- Consumes: `routes`, `formatPrice` and a product record with `id`, `slug`, `name`, `category`, `price`, `palette`, `image`, and `sizes`.
- Produces `ProductGrid({ products, onQuickView })`, `CategoryFilter({ categories, selectedCategory, onSelect })`, and `QuickViewModal({ product, onClose })`.

- [ ] **Step 1: Create a product interface fixture test**

Create `test/product-fixture.test.js` that imports the shared product list and asserts its first record has all eight required keys. Run `node --test test/product-fixture.test.js`; expected PASS.

- [ ] **Step 2: Move the repeated card markup into `ProductCard`**

Copy the repeated collection-card JSX from the current Collection, Men, and Women page functions. Accept `product` and `onQuickView`; use existing class names and links verbatim.

- [ ] **Step 3: Compose grid, filter, and modal**

Implement `ProductGrid` as a map of `ProductCard`; implement the pill button markup in `CategoryFilter`; move `QuickViewModal` unchanged except for imports.

- [ ] **Step 4: Verify all product UI imports compile**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/products test/product-fixture.test.js
git commit -m "refactor: extract reusable product components"
```

### Task 4: Extract all page components

**Files:**
- Create: `src/pages/HomePage.jsx`
- Create: `src/pages/CollectionPage.jsx`
- Create: `src/pages/ProductDetailPage.jsx`
- Create: `src/pages/MensPage.jsx`
- Create: `src/pages/WomensPage.jsx`
- Create: `src/pages/JournalPage.jsx`
- Create: `src/pages/JournalDetailPage.jsx`
- Create: `src/pages/LookbookPage.jsx`
- Create: `src/pages/SizeGuidePage.jsx`
- Create: `src/pages/AppointmentsPage.jsx`
- Create: `src/pages/AboutPage.jsx`

**Interfaces:**
- Consumes: shared data, `routes`, `formatPrice`, `ProductGrid`, and `CategoryFilter`.
- Produces default page components that accept only the data and callbacks currently supplied by `App`.

- [ ] **Step 1: Preserve the current page function signatures**

Move each in-file page function to its matching file. Keep current props except for category state, which belongs to its page: `HomePage({ setQuickViewProduct })`, `CollectionPage({ products, categories, setQuickViewProduct })`, `ProductDetailPage({ product, setQuickViewProduct })`, `MensPage({ setQuickViewProduct })`, `WomensPage({ setQuickViewProduct })`, `JournalDetailPage({ entry })`.

- [ ] **Step 2: Replace repeated catalogue markup**

In Collection, Men, and Women pages, replace card loops with `ProductGrid` and category-button loops with `CategoryFilter`. Keep selected-category state in the same page that owns it.

- [ ] **Step 3: Compile page modules through Vite**

Run: `npm run build`
Expected: PASS after all page modules exist; Vite transforms JSX and reports any unresolved page import.

- [ ] **Step 4: Build production bundle**

Run: `npm run build`
Expected: PASS with each page importing only the modules it uses.

- [ ] **Step 5: Commit**

```bash
git add src/pages src/components/products
git commit -m "refactor: move storefront pages into components"
```

### Task 5: Reduce App to composition root and verify behavior

**Files:**
- Modify: `src/App.jsx`
- Modify: `test/routes.test.js`

**Interfaces:**
- Consumes all layout, page, helper, and data exports created above.
- Produces the default `App` component.

- [ ] **Step 1: Add route-selection assertions**

Extend `test/routes.test.js` to assert `#/mens`, `#/womens`, `#/collection`, and `#/journal/travel-wardrobe` return their current page and slug values. Run `node --test test/routes.test.js`; expected PASS.

- [ ] **Step 2: Replace in-file declarations with imports**

Keep only `useEffect`, `useState`, route state, menu state, quick-view state, active-product lookup, active-journal lookup, and the existing conditional page rendering in `App.jsx`. Import every layout/page/helper/data dependency. `CollectionPage` owns its own selected-category state.

- [ ] **Step 3: Confirm App contains no view definitions**

Run: `rg -n '^function (Navbar|Footer|HomePage|CollectionPage|ProductDetailPage|QuickViewModal|MensPage|WomensPage|JournalPage|JournalDetailPage|LookbookPage|SizeGuidePage|AppointmentsPage|AboutPage)' src/App.jsx`
Expected: no matches.

- [ ] **Step 4: Run the full verification set**

Run: `node --test test/*.test.js`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx test/routes.test.js
git commit -m "refactor: compose storefront from page components"
```
