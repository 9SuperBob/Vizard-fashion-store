import { useEffect, useState } from "react";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

import { journalEntries, products } from "./data/storefrontData";
import AboutPage from "./pages/AboutPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import CollectionPage from "./pages/CollectionPage";
import HomePage from "./pages/HomePage";
import JournalDetailPage from "./pages/JournalDetailPage";
import JournalPage from "./pages/JournalPage";
import LookbookPage from "./pages/LookbookPage";
import MensPage from "./pages/MensPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SizeGuidePage from "./pages/SizeGuidePage";
import WomensPage from "./pages/WomensPage";
import mensProducts from "./components/Product/MensProducts";
import womensProducts from "./components/Product/WomensProducts";
import QuickViewModal from "./components/products/QuickViewModal";
import { getPageFromHash, routes } from "./utils/routes";

function App() {
  const [routeState, setRouteState] = useState(
    getPageFromHash(window.location.hash),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    document.title = "Vizard Fashion Store";
  }, []);

  useEffect(() => {
    if (!window.location.hash) window.location.hash = routes.home;
    const handleHashChange = () => {
      setRouteState(getPageFromHash(window.location.hash));
      setMenuOpen(false);
      setQuickViewProduct(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const collectionCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const activeEntry = journalEntries.find(
    (entry) => entry.slug === routeState.slug,
  );
  const allProducts = [...products, ...mensProducts, ...womensProducts];
  const activeProduct = allProducts.find(
    (product) => product.slug === routeState.slug,
  );
  const currentPage =
    routeState.page === "journalDetail"
      ? "journal"
      : routeState.page === "productDetail"
        ? "collection"
        : routeState.page;

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink)]">
      <div className="border-b border-black/10 bg-[var(--ink)] px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-white sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between">
          <p>Bangkok Atelier</p>
          <p>Private fitting appointments available this week</p>
          <p>Complimentary shipping over $300</p>
        </div>
      </div>
      <Navbar
        currentPage={currentPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {routeState.page === "home" && (
          <HomePage setQuickViewProduct={setQuickViewProduct} />
        )}
        {routeState.page === "mens" && (
          <MensPage setQuickViewProduct={setQuickViewProduct} />
        )}
        {routeState.page === "womens" && (
          <WomensPage setQuickViewProduct={setQuickViewProduct} />
        )}
        {routeState.page === "collection" && (
          <CollectionPage
            categories={collectionCategories}
            products={products}
            setQuickViewProduct={setQuickViewProduct}
          />
        )}
        {routeState.page === "journal" && <JournalPage />}
        {routeState.page === "journalDetail" && (
          <JournalDetailPage entry={activeEntry} />
        )}
        {routeState.page === "productDetail" && (
          <ProductDetailPage
            product={activeProduct}
            setQuickViewProduct={setQuickViewProduct}
          />
        )}
        {routeState.page === "lookbook" && <LookbookPage />}
        {routeState.page === "sizeGuide" && <SizeGuidePage />}
        {routeState.page === "appointments" && <AppointmentsPage />}
        {routeState.page === "about" && <AboutPage />}
      </main>
      <Footer />
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}

export default App;
