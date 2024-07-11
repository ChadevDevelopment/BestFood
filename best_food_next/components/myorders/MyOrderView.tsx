"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Product, Order } from "@/types/interfaces";
import { useRouter } from "next/navigation";

const MyOrderView: FC = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState<Product | null>(null);

  useEffect(() => {
    const selectedOrderData = localStorage.getItem("selectedOrder");
    if (selectedOrderData) {
      try {
        const parsedOrderData: Product = JSON.parse(selectedOrderData);

        setOrderData(parsedOrderData);
      } catch (error) {
        console.log(
          "Error parsing selected order data from localStorage",
          error
        );
      }
    }
  }, []);

  if (!orderData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src="/loading.gif" alt="Loading..." className="w-65 h-65" />
      </div>
    );
  }

  return (
    <main className="max-w-[1500px] mx-auto mb-6 px-6 pb-6 shadow-2xl rounded-2xl">
      <h1 className="my-5 text-2xl text-center font-bold">Order Details</h1>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-2xl border rounded-xl">
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
          <Image
            fill
            src={orderData.image}
            className="hover:scale-110 object-cover transition-transform"
            alt={orderData.name}
          />
        </div>

        {/* Product Info */}
        <div className="md:col-span-1">
          <h2 className="mb-4 text-xl font-black">{orderData.name}</h2>
          <p className="mb-2 text-lg">
            <strong>Order Number:</strong> {orderData.id}
          </p>
          <p className="mb-2 text-lg">
            <strong>Order Date:</strong> {new Date().toLocaleDateString()}
          </p>
          <p className="mb-2 text-lg">
            <strong>Quantity:</strong> {orderData.amount}
          </p>

          <p className="mb-2 text-lg">
            <strong>Extras:</strong>
            {orderData?.extras && Object.keys(orderData?.extras).length > 0 ? (
              <ul className="list-disc list-inside">
                {Object.entries(orderData.extras).map(([key, value]) =>
                  value > 0 ? (
                    <li key={key} className="text-lg">
                      {key}: {value}
                    </li>
                  ) : null
                )}
                {Object.values(orderData.extras).every(
                  (value) => value <= 0
                ) && <li className="text-lg">No extras added</li>}
              </ul>
            ) : (
              <p className="text-lg">No extras added</p>
            )}
          </p>

          <p className="mb-2 text-lg">
            <strong>Total Price:</strong> CHF {orderData.totalPrice}
          </p>

          {/* Back to orders button */}
          <div className="flex justify-end">
            <button
              onClick={() => router.push("/myorders")}
              className="text-black border p-3 rounded-xl bg-white hover:bg-black hover:text-crimson flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <span className="font-light"> Back to My Orders</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyOrderView;
