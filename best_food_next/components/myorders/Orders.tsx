"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Order } from "@/types/interfaces";

const Orders: FC = () => {
  const [orderData, setOrderData] = useState<Order | null>(null);

  useEffect(() => {
    const selectedOrderData = localStorage.getItem("selectedOrder");
    if (selectedOrderData) {
      try {
        const parsedOrderData: Order = JSON.parse(selectedOrderData);
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
    <main className="max-w-[1500px] mx-auto mb-6 px-6 pb-6 shadow-2xl rounded-2xl ">
      {orderData.items.map((item, index) => (
        <div
          key={index}
          className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-2xl border rounded-xl mb-5"
        >
          <div className="relative overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
            <Image
              fill
              src={item.image}
              className="hover:scale-110 object-cover transition-transform"
              alt={item.name}
            />
          </div>
          <div className="md:col-span-1">
            <h2 className="mb-4 text-xl font-black">{item.name}</h2>
            <p className="mb-2 text-lg">
              <strong>Order Number:</strong> {orderData.orderId}
            </p>
            <p className="mb-2 text-lg">
              <strong>Order Date:</strong> {orderData.date}
            </p>
            <p className="mb-2 text-lg">
              <strong>Quantity:</strong> {item.amount}
            </p>
            <p className="mb-2 text-lg">
              <strong>Extras:</strong>
              {item?.extras && Object.keys(item?.extras).length > 0 ? (
                <ul className="list-disc list-inside">
                  {Object.entries(item.extras).map(([key, value]) =>
                    value > 0 ? (
                      <li key={key} className="text-lg">
                        {key}: {value}
                      </li>
                    ) : null
                  )}
                  {Object.values(item.extras).every((value) => value <= 0) && (
                    <li className="text-lg">No extras added</li>
                  )}
                </ul>
              ) : (
                <p className="text-lg">No extras added</p>
              )}
            </p>
            <p className="mb-2 text-lg">
              <strong>Total Price:</strong> CHF {item.totalPrice}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Orders;
