import ProductCard from "./ProductCard";

function ProductGrid({ products, onQuickView }) {
  return products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      onQuickView={onQuickView}
    />
 ));
}

export default ProductGrid;
