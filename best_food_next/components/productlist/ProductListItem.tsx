import Image from "next/image";
import { FC } from "react";
import LikeButton from "../likebutton/LikeButton";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
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
      <div className="relative overflow-hidden rounded-xl flex flex-col h-full">
        <div className="relative aspect-square">
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
        <div className="p-4 flex flex-col justify-start flex-grow">
          <div>
            <p className="text-xl font-bold">{product.name}</p>
            <p className="text-xs font-bold mt-1">{product.description}</p>
            <p className="text-md  mt-3">CHF {product.price}</p>
          </div>
          <button
            onClick={handleDetailButtonClick}
            className="cursor-pointer mt-3 py-2 px-20 bg-orange-400 text-white font-mono hover:font-extrabold hover:bg-orange-500 rounded-xl self-start"
          >
            Detail Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
