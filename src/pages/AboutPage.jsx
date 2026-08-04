import { routes } from "../utils/routes";

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

export default AboutPage;
