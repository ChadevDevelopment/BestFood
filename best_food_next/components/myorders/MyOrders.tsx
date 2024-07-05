"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Product } from "../shoppingCart/ShoppingCart";

interface Order {
  product: Product;
  orderId: number;
  date: string;
  amount: number;
  totalPrice: number;
}

interface StoredOrderData {
  [key: string]: {
    orderId: number;
    orders: Order[];
  };
}

const MyOrdersPage = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrderData = localStorage.getItem("orderData");
    if (storedOrderData) {
      try {
        const parsedOrderData: StoredOrderData = JSON.parse(storedOrderData);
        const allOrders: Order[] = [];

        for (const [date, { orders }] of Object.entries(parsedOrderData)) {
          orders.forEach((order: Order) => {
            allOrders.push({
              ...order,
              date,
            });
          });
        }

        setOrderData(allOrders);
      } catch (error) {
        console.log("Error parsing order data from localStorage", error);
      }
    }
  }, []);

  if (orderData.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src="/loading.gif" alt="Loading..." className="w-65 h-65" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-socialicon rounded-2xl">
      <h1 className="text-center text-2xl font-bold mb-4">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b font-extrabold">Order ID</th>
              <th className="py-3 px-6 border-b font-extrabold">Date</th>
              <th className="py-3 px-6 border-b font-extrabold">
                Product Name
              </th>
              <th className="py-3 px-6 border-b font-extrabold">Status</th>
              <th className="py-3 px-6 border-b font-extrabold">Total</th>
              <th className="py-3 px-6 border-b font-extrabold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderData
              .slice(0)
              .reverse()
              .map((order, index) => (
                <tr key={index}>
                  <td className="py-3 px-10 border-b text-center">
                    {order.orderId}
                  </td>
                  <td className="py-3 px-10 border-b text-center">
                    {order.date}
                  </td>
                  <td className="py-3 px-10 border-b text-center">
                    {order.product.name}
                  </td>
                  <td className="py-3 px-10 border-b text-center">Status</td>
                  <td className="py-3 px-10 border-b text-center">
                    CHF {order.totalPrice} / {order.product.amount} quantity
                  </td>
                  <td className="py-3 px-10 border-b text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => console.log("ProductDetails View")}
                        className="text-black font-semibold border px-2 py-1 rounded-xl bg-titlebg2 hover:bg-crimson hover:text-white"
                      >
                        View
                      </button>
                      <button
                        onClick={() => console.log("Again Order")}
                        className="text-black font-semibold border px-2 py-1 rounded-xl bg-titlebg2 hover:bg-crimson hover:text-white"
                      >
                        Order Again
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="pt-5 flex justify-end">
        <Link href="/products" className="text-black flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 28 28"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>

          <span className="font-light"> Continue to shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default MyOrdersPage;
