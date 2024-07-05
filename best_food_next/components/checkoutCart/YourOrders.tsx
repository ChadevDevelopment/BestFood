"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../shoppingCart/ShoppingCart";

interface YourOrder {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

// Sipariş verildiğinde localStorage'a kaydeden fonksiyon
const saveOrderToLocalStorage = (cartItems: Product[]) => {
  const today = new Date()
    .toLocaleString("en-CH", { timeZone: "Europe/Zurich" })
    .slice(0, 10)
    .replace("T", " ");
  const storedOrderData = JSON.parse(localStorage.getItem("orderData") || "{}");

  // Bugune ait bir siparis yoksa yeni bir orderId atadim.
  if (!storedOrderData[today]) {
    const lastOrderId = Object.keys(storedOrderData).reduce((maxId, date) => {
      const dayData = storedOrderData[date];
      return dayData.orderId > maxId ? dayData.orderId : maxId;
    }, 0);
    storedOrderData[today] = { orderId: lastOrderId + 1, orders: [] };
  }

  const currentOrderId = storedOrderData[today].orderId;

  // Mevcut siparişleri al
  const existingOrders = storedOrderData[today].orders;

  // Yeni siparişleri mevcut siparişlerle birleştir
  cartItems.forEach((newItem) => {
    const existingOrderIndex = existingOrders.findIndex(
      (order: { product: Product }) => order.product.id === newItem.id
    );

    if (existingOrderIndex !== -1) {
      // Ürün zaten mevcutsa, miktarı ve toplam fiyatı güncelle
      existingOrders[existingOrderIndex].amount += newItem.amount;
      existingOrders[existingOrderIndex].totalPrice += newItem.totalPrice;
    } else {
      // Ürün mevcut değilse, yeni ürün olarak ekle
      existingOrders.push({
        product: newItem,
        orderId: currentOrderId,
        date: today,
        amount: newItem.amount,
        totalPrice: newItem.totalPrice,
      });
    }
  });

  storedOrderData[today].orders = existingOrders;
  localStorage.setItem("orderData", JSON.stringify(storedOrderData));
};

const YourOrders: FC<YourOrder> = ({ formData, handleChange }) => {
  const router = useRouter(); /*to redirect to the myorders page*/
  const [cartItems, setCartItems] = useState<Product[]>([]);

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
          category: item.product?.category || "Unknown Category",
        }));
        setCartItems(validatedItems);
      } catch (error) {
        console.log("Error parsing cart items from localStorage", error);
      }
    }
  }, []);

  const handleMyOrders = () => {
    saveOrderToLocalStorage(cartItems);
    router.push("/myorders");
  };

  const totalAmount = cartItems.reduce(
    (total, product) => total + (product.totalPrice || 0),
    0
  );

  return (
    <div className="bg-titlebg2 p-4 rounded shadow-md mb-4 md:w-2/5 md:ml-2">
      <h2 className="text-lg font-semibold mb-4">Your Orders</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">
          <input
            type="radio"
            name="deliveryMethod"
            value="Delivery"
            checked={formData.deliveryMethod === "Delivery"}
            onChange={handleChange}
            className="mr-2"
          />
          Delivery
          <input
            type="radio"
            name="deliveryMethod"
            value="Pickup"
            checked={formData.deliveryMethod === "Pickup"}
            onChange={handleChange}
            className="ml-4 mr-2"
          />
          Pickup
        </label>
      </div>

      {formData.deliveryMethod === "Pickup" && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Pick up address:</label>
          <p className="mt-1 bg-white p-1 rounded-md">
            Zurichstrasse 9, 8052 Seebach
          </p>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium">Time until pickup:</label>
        <select
          name="pickupTime"
          value={formData.pickupTime}
          onChange={handleChange}
          className="mt-1 p-2 rounded w-full"
        >
          <option>Now</option>
          <option>In 30 Minuten</option>
          <option>In 1 Stunde</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Additional information
        </label>
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          className="mt-1 p-2 rounded w-full"
          placeholder="Notes on your order, e.g. special instructions for delivery"
        ></textarea>
      </div>
      <div>
        <div className="mb-4 ">
          <h3 className="text-lg font-semibold mb-2 ">Product</h3>
          <table className="w-full ">
            <tbody className="bg-white">
              {cartItems
                .slice(0)
                .reverse()
                .map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-2 py-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 object-cover"
                      />
                    </td>
                    <td className="px-1 py-1 text-sm font-extrabold ">
                      {product.name}
                      {Object.keys(product.extras).length > 0 && (
                        <ul className="text-xs">
                          {Object.entries(product.extras)
                            .filter(([key, value]) => value > 0)
                            .map(([key, value]) => (
                              <li key={key} className="py-1">
                                <span className="font-light">{key}: </span>
                                <span className="font-light">{value}</span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </td>
                    <td className="px-2 py-3 text-sm font-bold">x</td>
                    <td className="px-5 py-3 text-sm">{product.amount}</td>
                    <tr>
                      <td className="px-1 py-3 text-sm font-bold">Subtotal:</td>
                      <td className="px-1 py-3 text-sm">
                        {product.totalPrice}
                      </td>
                    </tr>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Total Amount</h3>
          <table>
            <tbody className="bg-white divide-y">
              <tr>
                <td className="px-6 py-3 text-sm font-medium">Shipping:</td>
                <td className="px-6 py-3 text-sm">
                  {formData.deliveryMethod === "Delivery"
                    ? "Free delivery"
                    : "Pick up on site"}
                </td>
              </tr>
              <tr className="bg-black">
                <td className="px-6 py-3 text-sm text-white font-bold">
                  Total amount:
                </td>
                <td className="px-6 py-3 text-sm text-white">
                  {totalAmount.toFixed(2)} CHF (inkl. 0.72 CHF / 2.6% MwSt)
                  (Subtotal + Shipping)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white mb-4 rounded-xl">
        <table>
          <tbody className="divide-y">
            <tr>
              <td className="px-6 py-3 text-sm font-medium ">
                Payment method:
              </td>
              <td className="px-6 py-3 text-sm">Cash payment on delivery</td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-sm font-medium">
                Payment options:
              </td>
              <td className="px-6 py-3 text-sm">
                Online, Twint or digital payment on site possible.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md mb-4">
        <p>
          Your personal data will be used to process your order, to support your
          experience on this website and for other purposes described in our
          [Privacy Policy].
        </p>
        <label className="inline-flex items-center mt-5">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="form-checkbox h-4 w-4"
            required
          />
          <span className="ml-3">
            I have read the website and agree to it
            <a href="#" className="text-crimson font-bold ml-1">
              Terms and conditions.
            </a>
          </span>
        </label>
      </div>

      <button
        onClick={handleMyOrders}
        type="submit"
        className="w-full bg-white py-2 rounded-xl shadow-2xl hover:bg-blackho hover:text-white"
      >
        Order with costs
      </button>
    </div>
  );
};

export default YourOrders;
