function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return categories.map((category) => (
    <button
      key={category}
      type="button"
      onClick={() => onSelect(category)}
      className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.24em] transition ${selectedCategory === category ? "border-[var(--ink)] bg-[var(--ink)] text-white" : "border-black/10 bg-white/80 text-black/60 hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}
    >
      {category}
    </button>
 ));
}

export default CategoryFilter;
