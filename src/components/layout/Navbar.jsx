import { routes } from "../../utils/routes";

const navItems = [
  ["home", "Home"],
  ["mens", "Men's"],
  ["womens", "Women's"],
  ["collection", "All Collection"],
  ["lookbook", "Lookbook"],
  ["sizeGuide", "Size Guide"],
  ["journal", "Journal"],
  ["appointments", "Appointments"],
];

function Navbar({ currentPage, menuOpen, setMenuOpen }) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[color:rgba(247,243,238,0.9)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.22em] lg:flex">
          {navItems.map(([key, label]) => (
            <a
              key={key}
              href={routes[key]}
              className={`nav-link ${currentPage === key ? "text-[var(--ink)]" : "text-black/55"}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 text-sm lg:flex">
          <a
            href={routes.collection}
            className="text-black/60 transition hover:text-[var(--ink)]"
          >
            Search
          </a>
          <a
            href={routes.about}
            className="rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.24em] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            About
          </a>
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-black/10 px-4 py-2 text-xs uppercase tracking-[0.24em] lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>
      </div>
      {menuOpen && (
        <div className="border-t border-black/8 bg-[var(--canvas)] px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navItems.map(([key, label]) => (
              <a
                key={key}
                href={routes[key]}
                className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.2em] text-black/70 transition hover:bg-black hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href={routes.about}
              className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.2em] text-black/70 transition hover:bg-black hover:text-white"
            >
              About
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
