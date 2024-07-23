import React from "react";

type Address = {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

const addresses: Address[] = [
  {
    id: 1,
    name: "Home",
    street: "Zurichstrasse",
    city: "Zurich",
    state: "Zurich",
    zipCode: "8052",
    country: "Switzerland",
  },
];

const Addresses = () => {
  return (
    <div className="mx-auto mr-24 ml-24 mb-5 mt-5">
      <h1 className="text-2xl font-bold mb-4">Invoice Address</h1>
      <div>
        {addresses.map((address) => (
          <div key={address.id} className=" p-4 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold">{address.name}</h2>
            <p>{address.street}</p>
            <p>
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p>{address.country}</p>
            <div className="mt-4">
              <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                Edit
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
