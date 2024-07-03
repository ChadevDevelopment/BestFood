"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../shoppingCart/ShoppingCart";
import Link from "next/link";

const MyOrdersPage: FC = () => {
  const [orderData, setOrderData] = useState<Product[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems") || "[]";

    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        // verilerin dogru bicimde alindigini kontrol etmek icin
        const validatedItems = parsedItems.map((item: any) => ({
          ...item,
          id: item.product?.id || "Cannot find Id",
          name: item.product?.name || "Unknown Product",
          image: item.product?.image || "/Error.png",
          price: parseFloat(item.product?.price) || 0,
          amount: parseInt(item.amount) || 0,
          totalPrice: parseFloat(item.totalPrice) || 0,
          extras: item.extras || {},
        }));
        setOrderData(validatedItems);
      } catch (error) {
        console.log("Error parsing cart items from localStorage", error);
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
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-5 text-2xl text-center font-bold">My orders</h1>

      <div className="space-y-4">
        {orderData
          .slice(0)
          .reverse()
          .map((product) => (
            <div
              key={product.id}
              className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border rounded-xl"
            >
              <div className="col-span-1">
                <div className="relative overflow-hidden aspect-video rounded-xl">
                  <Image
                    fill
                    src={product.image}
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={product.name}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-3">
                <h2 className="mb-4 text-xl font-black">{product.name}</h2>
                <p className="mb-2">
                  <strong>Order number: </strong>
                  Siparis Numarasi
                </p>
                <p className="mb-2">
                  <strong>Order date: </strong>
                  {new Date().toLocaleDateString()}
                </p>
                <p className="mb-2">
                  <strong>Quantity: </strong>
                  {product.amount}
                </p>
                <p className="mb-2">
                  <strong>Total Price: </strong>CHF {product.totalPrice}
                </p>

                {/* Back to products button */}
                <div className="pt-5 flex justify-end">
                  <Link
                    href="/products"
                    className="text-crimson flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 28 28"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 "
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
            </div>
          ))}
      </div>
    </main>
  );
};

export default MyOrdersPage;
