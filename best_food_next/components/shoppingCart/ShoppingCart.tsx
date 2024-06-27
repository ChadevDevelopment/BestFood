"use client";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const ShoppingCartPage: FC = () => {
  const products = [
    {
      id: 1,
      name: "Pizza Margarihata",
      image: "/categoriesImage/pizzaImage/pizza1.jpg",
      price: 44.0,
      quantity: 1,
    },
    {
      id: 2,
      name: "Pizza Capricciosa",
      image: "/categoriesImage/pizzaImage/pizza2.png",
      price: 39.0,
      quantity: 2,
    },
    {
      id: 3,
      name: "Pizza Quattro Stagioni",
      image: "/categoriesImage/pizzaImage/pizza3.png",
      price: 49.0,
      quantity: 1,
    },
  ];

  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <section className="h-screen bg-purple">
      <div className="container mx-auto py-5 h-full">
        <div className="flex justify-center items-center h-full">
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-lg p-0">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-2/3 p-5  bg-stroke">
                  <div className="flex justify-between items-center mb-5 border-b">
                    <h1 className="font-bold text-3xl">Shopping Cart</h1>
                    <h6 className="text-muted">{products.length} items</h6>
                  </div>
                  {/* Product List */}
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center mb-6 border-b"
                    >
                      <div className="w-1/6">
                        <Image
                          src={product.image}
                          width={100}
                          height={100}
                          className="rounded-lg mb-4"
                          alt={product.name}
                        />
                      </div>
                      <div className="w-1/3">
                        <h6 className="font-bold">{product.name}</h6>
                      </div>

                      {/* Product price side */}
                      <div className="w-2/6">
                        <h6 className="font-bold">
                          CHF {product.price.toFixed(2)}
                        </h6>
                      </div>

                      {/* Quantity side*/}
                      <div className="w-2/6 flex items-center">
                        <button
                          onClick={() => console.log("Decrease quantity")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-3 h-3"
                          >
                            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          min="0"
                          defaultValue={product.quantity.toString()}
                          className="form-control form-control-sm text-center w-10 mx-2"
                        />
                        <button
                          onClick={() => console.log("Increase quantity")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="w-3 h-3"
                          >
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                          </svg>
                        </button>
                      </div>

                      {/* Total Amount side */}
                      <div className="w-1/6">
                        <h6 className="font-bold">
                          CHF {(product.price * product.quantity).toFixed(2)}
                        </h6>
                      </div>

                      {/* Product delete side */}
                      <div className="w-1/6 text-center">
                        <button onClick={() => console.log("Remove item")}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 text-orange"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Back to shop button */}
                  <div className="pt-5">
                    <Link
                      href="/products"
                      className="text-blacksection flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 26 26"
                        strokeWidth="2.0"
                        stroke="currentColor"
                        className="size-8 mr-2 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                        />
                      </svg>
                      <span className="font-extrabold">Back to shop</span>
                    </Link>
                  </div>
                </div>

                {/* Summary Side */}
                <div className="w-full lg:w-1/3 bg-manatee p-5">
                  <h3 className="font-light text-xl mb-5 mt-2 pt-1">Summary</h3>
                  <hr className="my-4" />
                  <div className="flex justify-between mb-4">
                    <h5 className="text-uppercase">items 3</h5>
                    <h5>CHF {totalPrice}</h5>
                  </div>
                  <h5 className="font-bold text-lg mb-3">Shipping</h5>
                  <div className="mb-4">
                    <select className="form-select block w-full border border-gray-300 px-3 py-2 rounded-lg">
                      <option value="1">Standard-Delivery- €5.00</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                    </select>
                  </div>

                  <h5 className="font-bold text-lg mb-3">Give code</h5>
                  <div className="mb-5">
                    <div className="relative">
                      <input
                        type="text"
                        id="form3Examplea2"
                        className="border  focus:ring-1 focus:ring-gray-500 focus:border-gray-500 block w-full px-3 py-2 rounded-lg placeholder-gray-400 text-md"
                        placeholder="Enter your code"
                      />
                      <label
                        htmlFor="form3Examplea2"
                        className="absolute top-2 left-3 -z-1 text-gray-500 text-xs"
                      >
                        Enter your code
                      </label>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between mb-5">
                    <h5 className="font-bold text-lg">Total price</h5>
                    <h5 className="font-extrabold">CHF {totalPrice}</h5>
                  </div>
                  <button
                    type="button"
                    className="text-white py-3 px-6 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                    onClick={() => console.log("Proceed to checkout")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCartPage;
