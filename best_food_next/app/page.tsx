import Categories from "@/components/categories/Categories";
import Footer from "@/components/footer/footer";
import ProductList from "@/components/productlist/ProductList";

export default function Home() {
  return (
    <main className="max-w-[1450px] mx-auto px-6">
      <Categories />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <ProductList />
      </div>

      <Footer />
    </main>
  );
}
