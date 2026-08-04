import { useState } from "react";
import CategoryFilter from "../components/products/CategoryFilter";
import ProductGrid from "../components/products/ProductGrid";

function CollectionPage({ products, categories, setQuickViewProduct }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const visibleProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-10 border-b border-black/10 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="space-y-5">
          <p className="section-eyebrow">Collection</p>
          <h1 className="section-title max-w-3xl">
            Collection that feels curated, not duplicated.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-black/65">
            This page turns the site into something people can actually browse.
            Filters are usable, product information is clearer, and the layout
            now adapts properly for smaller screens.
          </p>
        </div>
        <div className="surface-panel">
          <p className="text-xs uppercase tracking-[0.32em] text-black/55">
            Season focus
          </p>
          <p className="mt-4 text-sm leading-7 text-black/72">
            Lightweight tailoring, structured outerwear, and accessories
            selected to work together as a complete wardrobe system.
          </p>
        </div>
      </section>
      <section className="py-8">
        <div className="flex flex-wrap gap-3">
          <CategoryFilter
            categories={categories}
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

export default CollectionPage;
