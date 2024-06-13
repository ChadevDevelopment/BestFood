import Image from "next/image";
const ProductListItem = () => {
  return (
    <div className="cursor-pointer mr-6 mb-6">
      <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
          fill
          src="/pizza3.png"
          sizes="(max-width:768px) 768px, (max-width:1200px) : 768px, 768px"
          className="hover:scale-105 object-cover transition h-full w-full"
          alt="pizza"
        />
      </div>

      <div className="mt-1 ">
        <p className="text-xl font-bold">Product Name</p>
      </div>
      <div className="mt-1 ">
        <p className="text-xs font-bold">Product Description</p>
      </div>
      <div className="mt-3 ">
        <p className="text-md font-bold">CHF Product Price</p>
      </div>
    </div>
  );
};

export default ProductListItem;
