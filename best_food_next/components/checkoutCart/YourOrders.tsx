"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/interfaces";
import { useCart } from "@/context/CartContext";

interface YourOrder {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const saveOrderToLocalStorage = (cartItems: Product[]) => {
  const storedOrderData = JSON.parse(localStorage.getItem("orderData") || "{}");

  // Global bir orderId belirleyelim
  const lastOrderId = Object.values(storedOrderData).reduce(
    (maxId: number, dayData: any) => {
      return dayData.orders.reduce((maxId: number, order: any) => {
        return order.orderId > maxId ? order.orderId : maxId;
      }, maxId);
    },
    0
  );

  const newOrderId = lastOrderId + 1;

  // Yeni siparişleri ekle
  const today = new Date()
    .toLocaleString("en-CH", { timeZone: "Europe/Zurich" })
    .slice(0, 10)
    .replace("T", " ");

  if (!storedOrderData[today]) {
    storedOrderData[today] = { orders: [] };
  }

  const existingOrders = storedOrderData[today].orders;

  const newOrder = {
    orderId: newOrderId,
    date: today,
    totalPrice: cartItems.reduce((total, item) => total + item.totalPrice, 0),
    quantity: cartItems.length,
    items: cartItems,
  };

  storedOrderData[today].orders.push(newOrder);

  localStorage.setItem("orderData", JSON.stringify(storedOrderData));

  // Cleaned ShoppingCart
  localStorage.removeItem("cartItems");
};

const YourOrders: FC<YourOrder> = ({ formData, handleChange }) => {
  const router = useRouter(); /*to redirect to the myorders page*/
  const { clearCart } = useCart();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems") || "[]";

    if (storedCartItems) {
      try {
        const parsedItems = JSON.parse(storedCartItems);
        // verilerin dogru bicimde alindigini kontrol etmek icin
        const validatedItems = parsedItems.map((item: any) => ({
          id: item.product?.id || "Cannot find Id",
          name: item.product?.name || "Unknown Product",
          description: item.product?.description || "Can't description",
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
    clearCart();
    router.push("/myorders");
  };

  const totalAmount = cartItems.reduce(
    (total, product) => total + (product.totalPrice || 0),
    0
  );

  const formattedTotalAmount =
    typeof totalAmount === "number" ? totalAmount.toFixed(2) : "0.00";

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
                  {formattedTotalAmount} CHF (inkl. 0.72 CHF / 2.6% MwSt)
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
