import React from "react";

const AccountDetails = () => {
  return (
    <div className="flex items-center justify-center  ">
      <div className="p-4  shadow-lg rounded-lg w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-crimson">
          Account details
        </h1>
        <form>
          <div className="mb-4">
            <label className="text-sm font-medium">First name</label>
            <input
              type="text"
              className="mt-1 w-full border border-stroke rounded-md shadow-sm  sm:text-sm p-2"
              value="Customer Name"
            />
          </div>
          <div className="mb-4">
            <label className=" text-sm font-medium">Last name</label>
            <input
              type="text"
              className="mt-1  w-full border border-stroke rounded-md shadow-sm  sm:text-sm p-2"
              value="Customer Last Name"
            />
          </div>
          <div className="mb-4">
            <label className=" text-sm font-medium">Display name</label>
            <input
              type="text"
              className="mt-1  w-full border border-stroke rounded-md shadow-sm  sm:text-sm p-2"
              value="Customer Display Name"
            />
          </div>
          <div className="mb-4">
            <label className=" text-sm font-medium">E-mail address</label>
            <input
              type="email"
              className="mt-1  w-full border border-stroke rounded-md shadow-sm  sm:text-sm p-2"
              value="Customer Email Address"
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2 text-crimson">
              Change your password
            </h2>
            <label className=" text-sm font-medium">
              Current password (leave empty for no change)
            </label>
            <input
              type="password"
              className="mt-1  w-full border border-stroke rounded-md shadow-sm  sm:text-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label className=" text-sm font-medium">
              New password (leave empty for no change)
            </label>
            <input
              type="password"
              className="mt-1  w-full border border-stroke rounded-md shadow-sm  sm:text-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label className=" text-sm font-medium">Confirm new password</label>
            <input
              type="password"
              className="mt-1  w-full border border-stroke rounded-md shadow-sm  sm:text-sm p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-crimson"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
