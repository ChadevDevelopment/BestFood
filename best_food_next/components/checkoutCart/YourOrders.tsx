import React, { FC } from "react";

interface YourOrder {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const YourOrders: FC<YourOrder> = ({ formData, handleChange }) => {
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
          <table className="w-full">
            <tbody className="bg-white">
              <tr>
                <td className="px-6 py-3 text-sm font-medium">
                  Burger1 (Product)
                </td>
                <td className="px-6 py-3 text-sm font-medium">x</td>
                <td className="px-6 py-3 text-sm">3 (amount)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Total Amount</h3>
          <table>
            <tbody className="bg-white divide-y">
              <tr>
                <td className="px-6 py-3 text-sm font-medium">Subtotal:</td>
                <td className="px-6 py-3 text-sm">
                  28.50 CHF (Product x amount)
                </td>
              </tr>
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
                  28.50 CHF (inkl. 0.72 CHF / 2.6% MwSt) (Subtotal + Shipping)
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
        type="submit"
        className="w-full bg-white py-2 rounded-xl shadow-2xl hover:bg-blackho hover:text-white"
      >
        Order with costs
      </button>
    </div>
  );
};

export default YourOrders;
