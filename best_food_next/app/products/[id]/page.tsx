import OrderSideBar from "@/components/productlist/OrderSideBar";
import Image from "next/image";

const ProductDetailPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[90vh] mb-4 overflow-hidden rounded-xl relative">
        <Image
          fill
          src="/images/product/pizza1.jpg"
          className="object-cover w-full h-full"
          alt="burgermenu"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">Product name</h1>
          <span className="mb-6 block text-lg text-gray-600">
            <p className="mt-6 text-lg">Productdescription</p>
          </span>

          <div className="py-6 flex items-center space-x-4">
            <Image
              src="/images/user/user.png"
              width={40}
              height={40}
              className="rounded-full"
              alt="userimage"
            />

            <p>
              <strong>Mehmet</strong>
            </p>
          </div>
        </div>
        <OrderSideBar />
      </div>
    </main>
  );
};

export default ProductDetailPage;
