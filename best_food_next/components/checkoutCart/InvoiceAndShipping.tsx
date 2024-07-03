import React, { FC } from "react";

interface InvoiceShipping {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const InvoiceAndShipping: FC<InvoiceShipping> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 md:w-3/5 md:mr-2">
      <h2 className="text-lg font-semibold mb-4">Invoice & Shipping</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Please enter first name"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Please enter last name"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="Please enter phone number"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">E-Mail Adresse</label>
        <input
          type="email"
          name="email"
          placeholder="Please enter Your EmailAdress"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full"
          required
        />
      </div>
      {formData.deliveryMethod === "Pickup" && (
        <>
          <div className="mb-4">
            <label className="inline-flex font-bold  items-center">
              <input
                type="checkbox"
                name="createAccount"
                checked={formData.createAccount}
                onChange={handleChange}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-2 text-crimson">
                Open a customer account?
              </span>
            </label>
          </div>
        </>
      )}
      {formData.deliveryMethod === "Delivery" && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium">Street</label>
            <input
              type="text"
              name="street"
              value={formData.street}
              placeholder="Please enter your street"
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Zip code</label>
            <input
              type="text"
              name="zipcode"
              placeholder="Please enter your zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Place / City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              placeholder="Please enter your place/city"
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Canton</label>
            <select
              name="canton"
              value={formData.canton}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            >
              <option>Zürich</option>
              <option>Aargau</option>
              <option>St.Gallen</option>
              <option>Luzern</option>
              <option>Ticino</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="inline-flex font-bold items-center">
              <input
                type="checkbox"
                name="createAccount"
                checked={formData.createAccount}
                onChange={handleChange}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-2 text-crimson">
                Open a customer account?
              </span>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceAndShipping;
