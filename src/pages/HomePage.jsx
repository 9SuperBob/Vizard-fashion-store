import { categories, products } from "../data/storefrontData";
import { formatPrice } from "../utils/formatPrice";
import { routes } from "../utils/routes";

const heroHighlights = [
  "Italian-milled wool and structured cotton",
  "Bangkok same-day pickup for selected pieces",
  "Private fitting appointments every Friday",
];

function HomePage({ setQuickViewProduct }) {
  void setQuickViewProduct;

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

export default HomePage;
