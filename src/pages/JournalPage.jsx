import { journalEntries } from "../data/storefrontData";
import { routes } from "../utils/routes";

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

export default JournalPage;
