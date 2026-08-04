import { formatPrice } from "../../utils/formatPrice";
import { routes } from "../../utils/routes";

function ProductCard({ product, onQuickView }) {
  return (
    <article className="group">
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
          onClick={() => onQuickView(product)}
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
  );
}

export default ProductCard;
