import { useEffect, useState } from "react";
import mensProducts from "./components/Product/MensProducts";
import womensProducts from "./components/Product/WomensProducts";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import {
  categories,
  journalEntries,
  lookbookMoments,
  products,
  sizeRows,
} from "./data/storefrontData";
import { formatPrice } from "./utils/formatPrice";
import { getPageFromHash, routes } from "./utils/routes";

const heroHighlights = [
  "Italian-milled wool and structured cotton",
  "Bangkok same-day pickup for selected pieces",
  "Private fitting appointments every Friday",
];
function App() {
  const [routeState, setRouteState] = useState(
    getPageFromHash(window.location.hash),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    document.title = "SuperBob Fashion Store";
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
  const visibleProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);
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
      <AnnouncementBar />
      <Navbar
        currentPage={currentPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {routeState.page === "home" && <HomePage />}
        {routeState.page === "mens" && (
          <MensPage setQuickViewProduct={setQuickViewProduct} />
        )}
        {routeState.page === "womens" && (
          <WomensPage setQuickViewProduct={setQuickViewProduct} />
        )}
        {routeState.page === "collection" && (
          <CollectionPage
            categories={collectionCategories}
            products={visibleProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
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

function AnnouncementBar() {
  return (
    <div className="border-b border-black/10 bg-[var(--ink)] px-4 py-3 text-[11px] uppercase tracking-[0.3em] text-white sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between">
        <p>Bangkok Atelier</p>
        <p>Private fitting appointments available this week</p>
        <p>Complimentary shipping over $300</p>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80"
            alt="Editorial portrait for SuperBob spring collection"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(22,18,15,0.78),rgba(22,18,15,0.24)_55%,rgba(22,18,15,0.64))]" />
        </div>
        <div className="relative mx-auto flex min-h-[calc(100svh-8.5rem)] max-w-7xl items-end px-4 pb-14 pt-20 sm:px-6 lg:px-10 lg:pb-20">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.1fr)_320px] lg:items-end">
            <div className="max-w-3xl space-y-6 reveal">
              <p className="text-xs uppercase tracking-[0.35em] text-white/72">
                Spring / Summer 2026
              </p>
              <h1 className="max-w-2xl text-5xl leading-none text-white sm:text-6xl lg:text-8xl">
                Quiet luxury built for city movement.
              </h1>
              <p className="max-w-xl text-base text-white/78 sm:text-lg">
                Refined silhouettes, lighter layers, and polished essentials
                designed to move from first meeting to late dinner without a
                reset.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href={routes.collection} className="button-primary">
                  Explore collection
                </a>
                <a
                  href={routes.lookbook}
                  className="button-secondary text-white"
                >
                  View lookbook
                </a>
              </div>
            </div>
            <div className="surface-panel reveal-delay">
              <p className="text-xs uppercase tracking-[0.32em] text-black/55">
                Atelier notes
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-black/72">
                {heroHighlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-18 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div className="space-y-5">
          <p className="section-eyebrow">Collection focus</p>
          <h2 className="section-title">
            A sharper edit of essentials, tailoring, and statement pieces.
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {products.slice(0, 4).map((product, index) => (
            <article
              key={product.id}
              className={`product-tile ${index % 2 === 1 ? "sm:translate-y-10" : ""}`}
            >
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[24rem] w-full object-cover transition duration-700 hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.26em] text-black/45">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-2xl text-[var(--ink)]">
                    {product.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-[var(--accent)]">
                  {formatPrice(product.price)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-2">
          {categories.map((category) => (
            <article
              key={category.title}
              className="group relative min-h-[32rem] overflow-hidden rounded-[2.5rem]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,15,0.08),rgba(20,18,15,0.72))]" />
              <div className="relative flex h-full flex-col justify-end p-8 sm:p-10">
                <p className="text-sm uppercase tracking-[0.28em] text-white/75">
                  Wardrobe edit
                </p>
                <h3 className="mt-3 text-4xl text-white sm:text-5xl">
                  {category.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/78">
                  {category.detail}
                </p>
                <a
                  href={
                    category.title === "Menswear" ? routes.mens : routes.womens
                  }
                  className="mt-6 inline-flex w-fit items-center border-b border-white/60 pb-1 text-sm uppercase tracking-[0.24em] text-white"
                >
                  Shop this mood
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-18 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div className="overflow-hidden rounded-[2.5rem]">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80"
            alt="Tailoring studio interior"
            className="h-full min-h-[34rem] w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <p className="section-eyebrow">The atelier</p>
          <h2 className="section-title ">
            Clothes with enough structure for work and enough softness for real
            life.
          </h2>
          <p className="max-w-xl text-base leading-7 text-black/65">
            เราปรับปรุงหน้าแรกใหม่โดยจัดลำดับชั้นให้ชัดเจนยิ่งขึ้น
            เว้นระยะห่างมากขึ้น และมีส่วนต่างๆ ที่ให้ข้อมูลที่เป็นประโยชน์จริงๆ
            ผลลัพธ์ที่ได้ให้ความรู้สึก
            ใกล้เคียงกับร้านค้าแฟชั่นระดับพรีเมียมมากกว่าแค่ตัวอย่างสาธิต
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="border-t border-black/10 pt-4">
              <p className="text-3xl text-[var(--ink)]">48 ชั่วโมง</p>
              <p className="mt-2 text-sm text-black/60">
                โดยทั่วไปแล้ว การปรับแต่งรูปทรงของชิ้นส่วนหลักๆ จะใช้เวลาประมาณเท่านี้
              </p>
            </div>
            <div className="border-t border-black/10 pt-4">
              <p className="text-3xl text-[var(--ink)]">12</p>
              <p className="mt-2 text-sm text-black/60">
                Signature silhouettes refined through repeated fittings and wear
                tests.
              </p>
            </div>
          </div>
          <a href={routes.journal} className="button-primary w-fit">
            Discover our process
          </a>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-10">
        <div className="space-y-5">
          <p className="section-eyebrow">Explore more</p>
          <h2 className="section-title">
            Pages that fit a fashion store and help visitors keep moving.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <a
            href={routes.lookbook}
            className="rounded-[2rem] border border-black/8 bg-white/70 p-6 transition hover:-translate-y-1"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-black/42">
              Lookbook
            </p>
            <h3 className="mt-3 text-2xl text-[var(--ink)]">
              See full styling directions
            </h3>
            <p className="mt-3 text-sm leading-7 text-black/62">
              Editorial outfit stories for work, travel, and evening wear.
            </p>
          </a>
          <a
            href={routes.sizeGuide}
            className="rounded-[2rem] border border-black/8 bg-white/70 p-6 transition hover:-translate-y-1"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-black/42">
              Size Guide
            </p>
            <h3 className="mt-3 text-2xl text-[var(--ink)]">
              Find the right fit faster
            </h3>
            <p className="mt-3 text-sm leading-7 text-black/62">
              Measurements, fit notes, and sizing help before checkout.
            </p>
          </a>
          <a
            href={routes.appointments}
            className="rounded-[2rem] border border-black/8 bg-white/70 p-6 transition hover:-translate-y-1"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-black/42">
              Appointments
            </p>
            <h3 className="mt-3 text-2xl text-[var(--ink)]">
              Book a fitting session
            </h3>
            <p className="mt-3 text-sm leading-7 text-black/62">
              Private styling and tailoring consultations for key pieces.
            </p>
          </a>
          <a
            href={routes.about}
            className="rounded-[2rem] border border-black/8 bg-white/70 p-6 transition hover:-translate-y-1 sm:col-span-2 xl:col-span-1"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-black/42">
              About
            </p>
            <h3 className="mt-3 text-2xl text-[var(--ink)]">
              Learn the studio point of view
            </h3>
            <p className="mt-3 text-sm leading-7 text-black/62">
              Brand story, design process, and how the collection is developed.
            </p>
          </a>
        </div>
      </section>
    </>
  );
}

function CollectionPage({
  categories,
  products,
  selectedCategory,
  setSelectedCategory,
  setQuickViewProduct,
}) {
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
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.24em] transition ${selectedCategory === category ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-black/10 bg-white/80 text-black/60 hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      <section className="grid gap-8 pb-16 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="group">
            <a
              href={`${routes.product}/${product.slug}`}
              className="block overflow-hidden rounded-[2rem] bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-[26rem] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </a>
            <div className="mt-5 flex items-start justify-between gap-5">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-black/42">
                  {product.category}
                </p>
                <a href={`${routes.product}/${product.slug}`}>
                  <h2 className="mt-2 text-2xl text-[var(--ink)]">
                    {product.name}
                  </h2>
                </a>
                <p className="mt-2 text-sm text-black/58">
                  Palette: {product.palette}
                </p>
              </div>
              <p className="text-sm font-medium text-[var(--accent)]">
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                className="rounded-full border border-black/10 px-5 py-3 text-sm uppercase tracking-[0.22em] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Quick view
              </button>
              <a
                href={`${routes.product}/${product.slug}`}
                className="rounded-full border border-black/10 px-5 py-3 text-center text-sm uppercase tracking-[0.22em] transition hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
              >
                View details
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProductDetailPage({ product, setQuickViewProduct }) {
  if (!product)
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-10">
        <p className="section-eyebrow">Product not found</p>
        <h1 className="mt-4 text-5xl text-[var(--ink)]">
          This item is not available.
        </h1>
        <a href={routes.collection} className="button-primary mt-8">
          Back to collection
        </a>
      </div>
    );
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="overflow-hidden rounded-[2.5rem] bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-[34rem] w-full object-cover lg:h-[44rem]"
          />
        </div>
        <div className="space-y-6 lg:sticky lg:top-28">
          <p className="section-eyebrow">{product.category}</p>
          <h1 className="section-title">{product.name}</h1>
          <p className="text-xl text-[var(--accent)]">
            {formatPrice(product.price)}
          </p>
          <p className="max-w-xl text-base leading-7 text-black/66">
            {product.description}
          </p>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-black/45">
              Available sizes
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/68"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-black/45">
              Product notes
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-black/66">
              {product.notes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" className="button-primary">
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => setQuickViewProduct(product)}
              className="rounded-full border border-black/10 px-6 py-3 text-sm uppercase tracking-[0.22em] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Quick view
            </button>
          </div>
          <a
            href={routes.sizeGuide}
            className="inline-flex border-b border-black/20 pb-1 text-sm uppercase tracking-[0.22em] text-[var(--ink)]"
          >
            Check the size guide
          </a>
        </div>
      </section>
    </div>
  );
}

function QuickViewModal({ product, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 px-4 py-8"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem] bg-[var(--canvas)] p-4 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.28em] text-black/45">
            Quick view
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.22em]"
          >
            Close
          </button>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[2rem] bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="h-[26rem] w-full object-cover"
            />
          </div>
          <div className="space-y-5">
            <p className="section-eyebrow">{product.category}</p>
            <h2 className="text-4xl text-[var(--ink)]">{product.name}</h2>
            <p className="text-lg text-[var(--accent)]">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm leading-7 text-black/66">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="rounded-full border border-black/10 px-4 py-2 text-sm text-black/68"
                >
                  {size}
                </span>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" className="button-primary">
                Add to cart
              </button>
              <a
                href={`${routes.product}/${product.slug}`}
                className="rounded-full border border-black/10 px-6 py-3 text-center text-sm uppercase tracking-[0.22em] transition hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
              >
                Full details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JournalPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-12 border-b border-black/10 pb-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <p className="section-eyebrow">Journal</p>
          <h1 className="section-title max-w-2xl">
            Editorial notes for dressing well without overthinking it.
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-7 text-black/65">
          The journal now supports real article pages so the `Continue reading`
          action leads to complete content instead of ending on a teaser card.
        </p>
      </section>
      <section className="grid gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          {journalEntries.map((entry) => (
            <article
              key={entry.slug}
              className="rounded-[2rem] border border-black/8 bg-white/75 p-7"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-black/42">
                {entry.date}
              </p>
              <h2 className="mt-4 text-3xl text-[var(--ink)]">{entry.title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-black/64">
                {entry.summary}
              </p>
              <a
                href={`${routes.journal}/${entry.slug}`}
                className="mt-6 inline-flex border-b border-black/25 pb-1 text-sm uppercase tracking-[0.22em] text-[var(--ink)]"
              >
                Continue reading
              </a>
            </article>
          ))}
        </div>
        <aside className="overflow-hidden rounded-[2.5rem]">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
            alt="Editorial styling session"
            className="h-full min-h-[32rem] w-full object-cover"
          />
        </aside>
      </section>
    </div>
  );
}

function JournalDetailPage({ entry }) {
  if (!entry)
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-10">
        <p className="section-eyebrow">Article not found</p>
        <h1 className="mt-4 text-5xl text-[var(--ink)]">
          This story is not available.
        </h1>
        <a href={routes.journal} className="button-primary mt-8">
          Back to journal
        </a>
      </div>
    );
  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-10">
      <a
        href={routes.journal}
        className="text-xs uppercase tracking-[0.26em] text-black/48"
      >
        Back to journal
      </a>
      <div className="mt-6 space-y-5">
        <p className="section-eyebrow">{entry.date}</p>
        <h1 className="section-title max-w-4xl">{entry.title}</h1>
        <p className="max-w-2xl text-base leading-7 text-black/64">
          {entry.summary}
        </p>
      </div>
      <div className="mt-10 overflow-hidden rounded-[2.5rem]">
        <img
          src={entry.heroImage}
          alt={entry.title}
          className="h-[24rem] w-full object-cover sm:h-[34rem]"
        />
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="surface-panel h-fit">
          <p className="text-xs uppercase tracking-[0.28em] text-black/46">
            Article detail
          </p>
          <p className="mt-4 text-sm leading-7 text-black/68">
            This page gives the journal a proper destination and makes the
            content feel like part of a working brand site.
          </p>
        </aside>
        <div className="space-y-6 text-base leading-8 text-black/72">
          {entry.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

function LookbookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-10 border-b border-black/10 pb-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <p className="section-eyebrow">Lookbook</p>
          <h1 className="section-title max-w-3xl">
            Outfit direction for the full week, not just product thumbnails.
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-7 text-black/65">
          A lookbook page helps a clothing site feel more premium because it
          shows how pieces are styled together. It gives visitors context, not
          just isolated product cards.
        </p>
      </section>
      <section className="grid gap-6 py-10 lg:grid-cols-3">
        {lookbookMoments.map((moment) => (
          <article
            key={moment.title}
            className="overflow-hidden rounded-[2rem] bg-white/70"
          >
            <img
              src={moment.image}
              alt={moment.title}
              className="h-[26rem] w-full object-cover"
            />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-black/42">
                Styled moment
              </p>
              <h2 className="mt-3 text-3xl text-[var(--ink)]">
                {moment.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-black/62">
                {moment.detail}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-10 border-b border-black/10 pb-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <p className="section-eyebrow">Size Guide</p>
          <h1 className="section-title max-w-3xl">
            Fit information that makes the store feel easier to trust.
          </h1>
        </div>
        <p className="max-w-2xl text-base leading-7 text-black/65">
          A good clothing site should help people choose size confidently. This
          page adds a practical step before purchase and reduces the feeling of
          guessing.
        </p>
      </section>
      <section className="grid gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2rem] border border-black/8 bg-white/75">
          <div className="grid grid-cols-4 border-b border-black/8 px-5 py-4 text-xs uppercase tracking-[0.24em] text-black/45">
            <p>Size</p>
            <p>Chest</p>
            <p>Waist</p>
            <p>Hip</p>
          </div>
          {sizeRows.map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-4 border-b border-black/6 px-5 py-4 text-sm text-black/72 last:border-b-0"
            >
              {row.map((cell) => (
                <p key={cell}>{cell}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="surface-panel">
          <p className="text-xs uppercase tracking-[0.3em] text-black/46">
            Fit notes
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-black/68">
            <p>
              Outerwear is designed with a relaxed shoulder and clean drape.
            </p>
            <p>Trousers sit slightly high on the waist for a longer line.</p>
            <p>
              If you prefer a sharper close fit, size down on knitwear and
              shirting.
            </p>
          </div>
          <a href={routes.appointments} className="button-primary mt-6">
            Need help choosing?
          </a>
        </div>
      </section>
    </div>
  );
}

function AppointmentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="space-y-5">
          <p className="section-eyebrow">Appointments</p>
          <h1 className="section-title max-w-3xl">
            Private fittings and styling sessions for pieces that need
            precision.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-black/65">
            This page gives the site a believable service layer. Fashion stores
            often need more than products alone, especially when tailoring and
            fit are part of the brand.
          </p>
        </div>
        <div className="surface-panel">
          <p className="text-xs uppercase tracking-[0.3em] text-black/46">
            Studio availability
          </p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-black/68">
            <p>Tuesday to Sunday</p>
            <p>11:00 AM to 7:00 PM</p>
            <p>Appointments for styling, fitting, and alteration review</p>
          </div>
          <button type="button" className="button-primary mt-6">
            Request an appointment
          </button>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="overflow-hidden rounded-[2.5rem]">
          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1400&q=80"
            alt="SuperBob studio detail"
            className="h-[32rem] w-full object-cover"
          />
        </div>
        <div className="space-y-5">
          <p className="section-eyebrow">About SuperBob</p>
          <h1 className="section-title">
            A label built around proportion, restraint, and repeat wear.
          </h1>
          <p className="text-base leading-7 text-black/65">
            This page anchors the brand side of the site. It explains why the
            collection exists, what the studio values, and gives visitors a
            reason to trust the product language across the rest of the website.
          </p>
          <a href={routes.collection} className="button-primary w-fit">
            Shop the collection
          </a>
        </div>
      </section>
    </div>
  );
}

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
          {mensCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.24em] transition ${selectedCategory === category ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-black/10 bg-white/80 text-black/60 hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      <section className="grid gap-8 pb-16 sm:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product) => (
          <article key={product.id} className="group">
            <a
              href={`${routes.product}/${product.slug}`}
              className="block overflow-hidden rounded-[2rem] bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-[26rem] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </a>
            <div className="mt-5 flex items-start justify-between gap-5">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-black/42">
                  {product.category}
                </p>
                <a href={`${routes.product}/${product.slug}`}>
                  <h2 className="mt-2 text-2xl text-[var(--ink)]">
                    {product.name}
                  </h2>
                </a>
                <p className="mt-2 text-sm text-black/58">
                  Palette: {product.palette}
                </p>
              </div>
              <p className="text-sm font-medium text-[var(--accent)]">
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                className="rounded-full border border-black/10 px-5 py-3 text-sm uppercase tracking-[0.22em] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Quick view
              </button>
              <a
                href={`${routes.product}/${product.slug}`}
                className="rounded-full border border-black/10 px-5 py-3 text-center text-sm uppercase tracking-[0.22em] transition hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
              >
                View details
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

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
          {womensCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.24em] transition ${selectedCategory === category ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-black/10 bg-white/80 text-black/60 hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      <section className="grid gap-8 pb-16 sm:grid-cols-2 xl:grid-cols-3">
        {visibleProducts.map((product) => (
          <article key={product.id} className="group">
            <a
              href={`${routes.product}/${product.slug}`}
              className="block overflow-hidden rounded-[2rem] bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-[26rem] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </a>
            <div className="mt-5 flex items-start justify-between gap-5">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-black/42">
                  {product.category}
                </p>
                <a href={`${routes.product}/${product.slug}`}>
                  <h2 className="mt-2 text-2xl text-[var(--ink)]">
                    {product.name}
                  </h2>
                </a>
                <p className="mt-2 text-sm text-black/58">
                  Palette: {product.palette}
                </p>
              </div>
              <p className="text-sm font-medium text-[var(--accent)]">
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                className="rounded-full border border-black/10 px-5 py-3 text-sm uppercase tracking-[0.22em] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Quick view
              </button>
              <a
                href={`${routes.product}/${product.slug}`}
                className="rounded-full border border-black/10 px-5 py-3 text-center text-sm uppercase tracking-[0.22em] transition hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
              >
                View details
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default App;
