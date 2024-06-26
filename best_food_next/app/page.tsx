
import Categories from "@/components/categories/Categories";
import ProductList from "@/components/productlist/ProductList";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-20">
      <Hero />
      <Categories />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  ">
        <ProductList />
      </div>
    </main>
  );
}
