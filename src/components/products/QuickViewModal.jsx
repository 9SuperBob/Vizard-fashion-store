import { formatPrice } from "../../utils/formatPrice";
import { routes } from "../../utils/routes";

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

export default QuickViewModal;
