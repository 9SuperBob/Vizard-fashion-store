import { lookbookMoments } from "../data/storefrontData";

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

export default LookbookPage;
