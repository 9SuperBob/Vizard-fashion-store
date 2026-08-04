import { useState } from "react";
import mensProducts from "../components/Product/MensProducts";
import CategoryFilter from "../components/products/CategoryFilter";
import ProductGrid from "../components/products/ProductGrid";

function MensPage({ setQuickViewProduct }) {
  const mensCategories = [
    "All",
    ...new Set(mensProducts.map((product) => product.category)),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const visibleProducts =
    selectedCategory === "All"
      ? mensProducts
      : mensProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-10 border-b border-black/10 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-5">
          <p className="section-eyebrow">Men's Collection</p>
          <h1 className="section-title max-w-3xl">
            Premium menswear built for everyday confidence.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-black/65">
            Curated selection of shirts, blazers, trousers, and accessories
            designed for the modern man. Quality craftsmanship meets comfortable
            styling.
          </p>
        </div>
        <div className="surface-panel">
          <p className="text-xs uppercase tracking-[0.32em] text-black/55">
            Collection highlights
          </p>
          <p className="mt-4 text-sm leading-7 text-black/72">
            Premium fabrics, tailored fits, and timeless designs for work,
            casual, and formal occasions.
          </p>
        </div>
      </section>
      <section className="py-8">
        <div className="flex flex-wrap gap-3">
          <CategoryFilter
            categories={mensCategories}
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

export default MensPage;
