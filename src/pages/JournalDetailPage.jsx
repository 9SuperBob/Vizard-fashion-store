import { routes } from "../utils/routes";

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

export default JournalDetailPage;
