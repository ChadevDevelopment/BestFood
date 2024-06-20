import ProductListItem from "./ProductListItem";
import products from "@/app/data/products.json";

const ProductList = () => {
  return (
    <>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </>
  );
};

export default ProductList;
