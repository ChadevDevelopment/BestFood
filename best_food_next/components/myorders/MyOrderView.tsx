"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DynamicContent from "./DynamicContent";
import { Order, Product } from "@/types/interfaces";

const sections = [
  { name: "Dashboard", route: "dashboard" },
  { name: "Orders", route: "orders" },
  { name: "Addresses", route: "addresses" },
  { name: "Account Details", route: "account" },
  { name: "Logout", route: "login" },
];

const MyOrderView: FC = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [currentSection, setCurrentSection] = useState<string>("Orders");

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

  const handleSectionChange = (sectionName: string, route: string) => {
    setCurrentSection(sectionName);
    router.push(route);
  };

  // ! BURAYA TEKRAR BAK LOCALSTORAGE EKLENIYOR AMA SHOPPINGCARTTA GOREMIYORUM.
  const addToCart = (items: Product[]) => {
    const cartData = localStorage.getItem("cart");
    let cart: Product[] = cartData ? JSON.parse(cartData) : [];
    items.forEach((item) => {
      for (let i = 0; i < item.amount; i++) {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          existingItem.amount += 1;
        } else {
          cart.push({ ...item, amount: 1 });
        }
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleOrderAgain = () => {
    if (orderData) {
      addToCart(orderData.items);
      router.push("/shopping-cart");
    }
  };

  if (!orderData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src="/loading.gif" alt="Loading..." className="w-65 h-65" />
      </div>
    );
  }

  return (
    <main className="max-w-[1500px] mx-auto mb-6 px-6 pb-6 shadow-2xl rounded-2xl">
      <h1 className="my-5 text-2xl text-center font-bold">{currentSection}</h1>
      {/* Menu Buttons */}
      <div className="mt-6">
        <nav className="flex justify-center gap-14">
          {sections.map((section) => (
            <button
              key={section.route}
              onClick={() => handleSectionChange(section.name, section.route)}
              className={`px-7 py-2 border rounded-xl text-md font-medium ${
                currentSection === section.name
                  ? "bg-black text-white"
                  : "text-black hover:bg-black hover:text-white"
              }`}
            >
              {section.name}
            </button>
          ))}
        </nav>
        <DynamicContent />
      </div>

      {/* Buttons container */}
      <div className="flex justify-end space-x-4">
        {/* Again Order button */}
        <button
          onClick={handleOrderAgain}
          className="text-black border p-3 rounded-xl bg-white hover:bg-black hover:text-crimson flex items-center"
        >
          Order Again
        </button>

        {/* Back to orders button */}
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
          <span className="font-light">Back to My Orders</span>
        </button>
      </div>
    </main>
  );
};

export default MyOrderView;
