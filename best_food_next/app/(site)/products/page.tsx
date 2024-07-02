import ProductList from "@/components/productlist/ProductList";

const AllProduct = () => {
  return (
    <div className="max-w-[1500px] mx-auto px-6 mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      <ProductList />
    </div>
  );
};

export default AllProduct;
