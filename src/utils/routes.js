export const routes = {
  home: "#/",
  collection: "#/collection",
  mens: "#/mens",
  womens: "#/womens",
  journal: "#/journal",
  lookbook: "#/lookbook",
  appointments: "#/appointments",
  about: "#/about",
  sizeGuide: "#/size-guide",
  product: "#/product",
};

export function getPageFromHash(hash) {
  const normalized = hash.replace(/^#\/?/, "").toLowerCase();
  if (!normalized) return { page: "home", slug: null };
  if (normalized.startsWith("mens")) return { page: "mens", slug: null };
  if (normalized.startsWith("womens")) return { page: "womens", slug: null };
  if (normalized.startsWith("collection"))
    return { page: "collection", slug: null };
  if (normalized.startsWith("product")) {
    const [, slug = ""] = normalized.split("/");
    return slug
      ? { page: "productDetail", slug }
      : { page: "collection", slug: null };
  }
  if (normalized.startsWith("journal")) {
    const [, slug = ""] = normalized.split("/");
    return slug
      ? { page: "journalDetail", slug }
      : { page: "journal", slug: null };
  }
  if (normalized.startsWith("lookbook"))
    return { page: "lookbook", slug: null };
  if (normalized.startsWith("size-guide"))
    return { page: "sizeGuide", slug: null };
  if (normalized.startsWith("appointments"))
    return { page: "appointments", slug: null };
  if (normalized.startsWith("about")) return { page: "about", slug: null };
  return { page: "home", slug: null };
}
