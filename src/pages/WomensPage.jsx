import { useState } from "react";
import womensProducts from "../components/Product/WomensProducts";
import CategoryFilter from "../components/products/CategoryFilter";
import ProductGrid from "../components/products/ProductGrid";

function WomensPage({ setQuickViewProduct }) {
  const womensCategories = [
    "All",
    ...new Set(womensProducts.map((product) => product.category)),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const visibleProducts =
    selectedCategory === "All"
      ? womensProducts
      : womensProducts.filter(
          (product) => product.category === selectedCategory,
        );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-10 border-b border-black/10 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-5">
          <p className="section-eyebrow">Women's Collection</p>
          <h1 className="section-title max-w-3xl">
            Sophisticated women's wear with refined elegance.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-black/65">
            Discover elegant blouses, timeless coats, tailored trousers, and
            signature pieces designed for the modern woman who values quality
            and style.
          </p>
        </div>
        <div className="surface-panel">
          <p className="text-xs uppercase tracking-[0.32em] text-black/55">
            Collection highlights
          </p>
          <p className="mt-4 text-sm leading-7 text-black/72">
            Luxurious fabrics, flattering silhouettes, and versatile designs for
            every occasion - from office to evening.
          </p>
        </div>
      </section>
      <section className="py-8">
        <div className="flex flex-wrap gap-3">
          <CategoryFilter
            categories={womensCategories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      </section>
      <section className="grid gap-8 pb-16 sm:grid-cols-2 xl:grid-cols-3">
        <ProductGrid
          products={visibleProducts}
          onQuickView={setQuickViewProduct}
        />
      </section>
    </div>
  );
}

export default WomensPage;
