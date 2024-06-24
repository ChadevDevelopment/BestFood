import Image from "next/image";
import { FC } from "react";
import LikeButton from "../likebutton/LikeButton";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductListItemProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductListItem: FC<ProductListItemProps> = ({ product, onClick }) => {
  const handleDetailButtonClick = () => {
    onClick(product);
  };

  return (
    <div className="cursor-pointer mr-6 mb-6">
      <div className="relative overflow-hidden aspect-square rounded-xl">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="hover:scale-105 object-cover transition h-full w-full"
        />
        <div className="absolute top-2 right-2">
          <LikeButton />
        </div>
      </div>

      <div className="mt-1">
        <p className="text-xl font-bold">{product.name}</p>
      </div>
      <div className="mt-1">
        <p className="text-xs font-bold">{product.description}</p>
      </div>
      <div className="mt-3">
        <p className="text-md font-bold">CHF {product.price}</p>
      </div>
      <button
        onClick={handleDetailButtonClick}
        className="cursor-pointer mt-3 inline-block py-2 px-24 bg-orange-400 text-white font-mono hover:font-extrabold hover:bg-orange-500 rounded-xl"
      >
        Detail Product
      </button>
    </div>
  );
};

export default ProductListItem;
