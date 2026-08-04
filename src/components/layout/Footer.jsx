import { routes } from "../../utils/routes";

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#efe7df]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.7fr_0.7fr] lg:px-10">
        <div className="space-y-4">
          <p className="brand-mark text-2xl text-[var(--ink)]">SuperBob</p>
          <p className="max-w-md text-sm leading-7 text-black/62">
            A polished storefront with meaningful destinations for shopping,
            reading, styling inspiration, and bookings.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/48">
            Visit
          </p>
          <p className="mt-4 text-sm leading-7 text-black/68">
            18 Soi Somkid
            <br />
            Lumphini, Bangkok 10330
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-black/48">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-black/68">
            <a href={routes.lookbook}>Lookbook</a>
            <a href={routes.sizeGuide}>Size Guide</a>
            <a href={routes.journal}>Journal</a>
            <a href={routes.appointments}>Appointments</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
