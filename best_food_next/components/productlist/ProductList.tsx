"use client";
import { useState } from "react";
import ProductListItem, { Product } from "./ProductListItem";
import products from "@/app/data/products.json";
import Modal from "../modals/Modal";

const EXTRAS = [
  {
    name: "Fior di latte",
    price: 2.0,
    image: "./chooseIngredients/mozarella.png",
  },
  {
    name: "Buffalo mozzarella",
    price: 3.0,
    image: "./chooseIngredients/mozarella.png",
  },
  {
    name: "Basillikum",
    price: 2.0,
    image: "./chooseIngredients/basillikum.png",
  },
  {
    name: "Mascarpone",
    price: 2.5,
    image: "./chooseIngredients/mascarpone.png",
  },
  {
    name: "Egg",
    price: 2.0,
    image: "./chooseIngredients/egg.png",
  },
  {
    name: "Olives",
    price: 2.0,
    image: "./chooseIngredients/olives.png",
  },
];

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extras, setExtras] = useState<Record<string, number>>({
    "Fior di latte": 0,
    "Buffalo mozzarella": 0,
    Basillikum: 0,
    Mascarpone: 0,
    Egg: 0,
    Olives: 0,
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setExtras({
      "Fior di latte": 0,
      "Buffalo mozzarella": 0,
      Basillikum: 0,
      Mascarpone: 0,
      Egg: 0,
      Olives: 0,
    });
  };

  const handleExtraChange = (extra: string, change: number) => {
    setExtras((prev) => ({
      ...prev,
      [extra]: Math.max(0, (prev[extra] || 0) + change),
    }));
  };

  const handleOrder = () => {
    console.log("Ordered product:", selectedProduct);
    console.log("Selected extras:", extras);
    handleCloseModal();
  };

  return (
    <>
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          onClick={handleProductClick}
        />
      ))}

      {selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onOrder={handleOrder}
          label={selectedProduct.name}
        >
          <div className="w-1/2 p-4">
            <h3 className="text-lg font-bold mb-4">Choose Ingredients</h3>

            {EXTRAS.map((extra) => (
              <div key={extra.name} className="flex items-center mb-4">
                <img
                  src={extra.image}
                  alt={extra.name}
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div className="flex-1">
                  <p className="text-md font-bold">{extra.name}</p>
                  <p className="text-sm text-gray-600">
                    CHF {extra.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleExtraChange(extra.name, 1)}
                  className="p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleExtraChange(extra.name, -1)}
                  className=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="w-1/2 p-4">
            <h3 className="text-lg font-bold">{selectedProduct.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedProduct.description}
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-4">
              CHF {selectedProduct.price.toFixed(2)}
            </p>
            <div className="mb-4">
              <h4 className="text-md font-bold">Amount:</h4>
              <div className="flex items-center">
                <button
                  onClick={() => handleExtraChange("amount", -1)}
                  className="p-2 bg-gray-200 rounded-full text-black mr-2"
                >
                  -
                </button>
                <span>{extras["amount"] || 1}</span>
                <button
                  onClick={() => handleExtraChange("amount", 1)}
                  className="p-2 bg-gray-200 rounded-full text-black ml-2"
                >
                  +
                </button>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-md font-bold">Total:</h4>
              <p className="text-lg font-semibold text-gray-800">
                CHF{" "}
                {(
                  selectedProduct.price +
                  Object.keys(extras).reduce((total, key) => {
                    return (
                      total +
                      extras[key] *
                        (EXTRAS.find((extra) => extra.name === key)?.price || 0)
                    );
                  }, 0)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductList;
