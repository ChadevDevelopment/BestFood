import React from "react";
import { usePathname } from "next/navigation";
import Dashboard from "./Dashboard";
import Addresses from "./Addresses";
import AccountDetails from "./AccountDetails";
import Orders from "./Orders";
import Logout from "./Logout";

const DynamicContent = () => {
  const pathname = usePathname();
  const renderContent = () => {
    if (pathname === "/myorders/dashboard") {
      return <Dashboard />;
    } else if (pathname === "/myorders/orders") {
      return <Orders />;
    } else if (pathname === "/myorders/addresses") {
      return <Addresses />;
    } else if (pathname === "/myorders/account") {
      return <AccountDetails />;
    } else if (pathname === "/myorders/login") {
      return <Logout />;
    } else {
      return <Orders />;
    }
  };

  return <div className="p-4">{renderContent()}</div>;
};

export default DynamicContent;
