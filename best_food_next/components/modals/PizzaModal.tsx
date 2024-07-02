"use client";
import { FC, useEffect, useState } from "react";
import Modal from "./Modal";
import { Product } from "../productlist/ProductListItem";

const EXTRAS = [
  {
    name: "Fior di latte",
    price: 2.0,
    image: "./chooseIngredients/pizzaIngredients/mozarella.png",
  },
  {
    name: "Buffalo mozzarella",
    price: 3.0,
    image: "./chooseIngredients/pizzaIngredients/mozarella.png",
  },
  {
    name: "Basillikum",
    price: 2.0,
    image: "./chooseIngredients/pizzaIngredients/basillikum.png",
  },
  {
    name: "Mascarpone",
    price: 2.5,
    image: "./chooseIngredients/pizzaIngredients/mascarpone.png",
  },
  {
    name: "Egg",
    price: 2.0,
    image: "./chooseIngredients/pizzaIngredients/egg.png",
  },
  {
    name: "Olives",
    price: 2.0,
    image: "./chooseIngredients/pizzaIngredients/olives.png",
  },
];

interface PizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const PizzaModal: FC<PizzaModalProps> = ({ isOpen, onClose, product }) => {
  const [extras, setExtras] = useState<Record<string, number>>({
    "Fior di latte": 0,
    "Buffalo mozzarella": 0,
    Basillikum: 0,
    Mascarpone: 0,
    Egg: 0,
    Olives: 0,
  });
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setExtras({
        "Fior di latte": 0,
        "Buffalo mozzarella": 0,
        Basillikum: 0,
        Mascarpone: 0,
        Egg: 0,
        Olives: 0,
      });
      setAmount(1);
    }
  }, [isOpen]);

  const handleExtraChange = (extra: string, change: number) => {
    setExtras((prev) => ({
      ...prev,
      [extra]: Math.max(0, (prev[extra] || 0) + change),
    }));
  };

  const handleAmountChange = (change: number) => {
    setAmount((prev) => Math.max(1, prev + change));
  };

  // Saved with handleOrder in LocalStorage
  const handleOrder = () => {
    const orderDetails = {
      product,
      extras,
      amount,
      totalPrice,
      timestamp: Date.now(),
    };

    const existingCartItemsRaw = localStorage.getItem("cartItems");
    const existingCartItems = existingCartItemsRaw
      ? JSON.parse(existingCartItemsRaw)
      : [];

    const expirationTime = 3 * 60 * 60 * 1000; // 3 hour

    const now = Date.now();

    const updatedCartItems = existingCartItems.filter((item: any) => {
      return now - item.timestamp <= expirationTime;
    });
    // added new order details
    updatedCartItems.push(orderDetails);

    // guncellenmos olani locale kaydettim.
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    onClose();
  };

  const totalPrice = product
    ? (
        (product.price +
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOrder={handleOrder}
      label={product.name}
      className="max-h-screen overflow-y-auto"
    >
      {/* CHOOSE INGREDIENTS */}
      <div className="w-1/2 p-4">
        <h3 className="text-lg font-bold mb-4 border-b">Choose Ingredients</h3>
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
              className="p-1 rounded-full"
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
            <button onClick={() => handleExtraChange(extra.name, -1)}>
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
                <li key={key} className="flex justify-between py-2 border-b">
                  <div>
                    <span className="text-gray-600">{key}</span>
                    <span className="text-gray-900 font-bold flex items-center ">
                      {value}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleExtraChange(key, -value)}
                      className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              )
          )}
        </ul>
        <div className="mt-4 flex items-center">
          <h4 className="text-lg font-semibold">Amount:</h4>
          <div className="flex items-center ml-4">
            <button onClick={() => handleAmountChange(1)} className="p-2">
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
          <h4 className="text-lg font-semibold mr-2">Total:</h4>
          <p className="text-xl font-bold text-gray-900">CHF {totalPrice}</p>
        </div>
      </div>
    </Modal>
  );
};

export default PizzaModal;
