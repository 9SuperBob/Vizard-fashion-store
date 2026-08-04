import { formatPrice } from "../utils/formatPrice";
import { routes } from "../utils/routes";

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

export default ProductDetailPage;
