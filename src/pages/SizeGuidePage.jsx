import { sizeRows } from "../data/storefrontData";
import { routes } from "../utils/routes";

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

export default SizeGuidePage;
