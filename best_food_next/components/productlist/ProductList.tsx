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
  const [amount, setAmount] = useState(1);

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
    setAmount(1);
  };

  const handleExtraChange = (extra: string, change: number) => {
    setExtras((prev) => ({
      ...prev,
      [extra]: Math.max(0, (prev[extra] || 0) + change),
    }));
  };

  const handleAmountChange = (change: number) => {
    setAmount((prev) => Math.max(1, prev + change));
  };

  const handleOrder = () => {
    console.log("Ordered product:", selectedProduct);
    console.log("Selected extras:", extras);
    handleCloseModal();
  };

  const totalPrice = selectedProduct
    ? (
        (selectedProduct.price +
          Object.keys(extras).reduce((total, key) => {
            return (
              total +
              extras[key] *
                (EXTRAS.find((extra) => extra.name === key)?.price || 0)
            );
          }, 0)) *
        amount
      ).toFixed(2)
    : "0.0";

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
          className="max-h-screen overflow-y-auto"
        >
          {/* CHOOSE INGREDIENTS */}
          <div className="w-1/2 p-4">
            <h3 className="text-lg font-bold mb-4 border-b">
              Choose Ingredients
            </h3>

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
                  className="p-1  rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 hover:bg-orange-200 rounded-full"
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
                    className="size-8 hover:bg-orange-200 rounded-full"
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
          {/* SUMMARY  */}
          <div className="w-1/2 p-6 bg-white shadow-md rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
              Summary
            </h3>
            <ul className="mb-4">
              {Object.entries(extras).map(
                ([key, value]) =>
                  value > 0 && (
                    <li
                      key={key}
                      className="flex justify-between py-2 border-b "
                    >
                      <span className="text-gray-600">{key}</span>
                      <span className="text-gray-900 font-medium">{value}</span>
                    </li>
                  )
              )}
            </ul>
            <div className="mt-4 flex items-center">
              <h4 className="text-lg font-semibold ">Amount:</h4>
              <div className="flex items-center ml-4">
                <button onClick={() => handleAmountChange(1)} className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6  hover:bg-orange-200 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>

                <span className="mx-4 text-gray-900 text-lg">{amount}</span>

                <button onClick={() => handleAmountChange(-1)} className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 hover:bg-orange-200 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <h4 className="text-lg font-semibold  mr-2">Total:</h4>
              <p className="text-xl font-bold text-gray-900">
                CHF {totalPrice}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProductList;
