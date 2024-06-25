"use client";
import { useState, ChangeEvent } from "react";

const OrderSideBar = () => {
  // Product price
  const sizes: { [key: string]: number } = {
    Small: 10,
    Medium: 20,
    Large: 30,
    Family: 40,
  };

  const [selectedSize, setSelectedSize] = useState("Small");
  const [quantity, setQuantity] = useState(1);

  const totalPrice =
    selectedSize in sizes
      ? sizes[selectedSize as keyof typeof sizes] * quantity
      : 0;

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  return (
    <aside className="mt-4 p-6 col-span-2 rounded-xl border border-orange-500 shadow-2xl">
      <div className="mb-6 p-3 border border-orange-500 rounded-xl">
        <input
          type="number"
          min="1"
          placeholder="Please enter quantity..."
          className="w-full -ml-1 text-xm"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>
      <div className="mb-6 p-3 border border-orange-500 rounded-xl">
        <label className="block text-sm font-medium text-orange-500 mb-1">
          Please select size...
        </label>
        <select
          name="size"
          className="block w-full px-1 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedSize}
          onChange={handleSizeChange}
        >
          {Object.keys(sizes).map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <h2 className="mb-5 text-2xl">${sizes[selectedSize]} Pizza price</h2>
      <button className="w-full mb-6 py-6 text-center font-extrabold text-white bg-red-500 rounded-2xl hover:bg-orange-400 transition ">
        Order
      </button>

      <div className="mb-4 flex justify-between align-center">
        <p>
          ${sizes[selectedSize]} Pizza price * {quantity}
        </p>

        <p>${totalPrice}</p>
      </div>

      <hr />
      <div className="mt-4 flex justify-between align-center">
        <p>Total Price</p>
        <p>${totalPrice}</p>
      </div>
    </aside>
  );
};

export default OrderSideBar;
