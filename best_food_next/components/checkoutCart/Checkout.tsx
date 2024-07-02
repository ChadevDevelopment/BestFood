"use client";
import { useState } from "react";
import InvoiceAndShipping from "./InvoiceAndShipping";
import YourOrders from "./YourOrders";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    createAccount: false,
    termsAccepted: false,
    deliveryMethod: "Pickup" /*I selected defaultvalue Pickup*/,
    zipcode: "",
    street: "",
    canton: "",
    city: "",
    pickupTime: "",
    additionalInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 bg-manatee">
      <h1 className="text-2xl text-center text-white font-bold mb-5">
        Checkout
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row">
          {/* INVOICE AND SHIPPING SIDE */}
          <InvoiceAndShipping formData={formData} handleChange={handleChange} />

          {/* YOUR ORDERS SIDE */}
          <YourOrders formData={formData} handleChange={handleChange} />
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
