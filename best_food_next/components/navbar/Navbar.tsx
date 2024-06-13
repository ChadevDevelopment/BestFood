"use client";

import Link from "next/link";
import Image from "next/image";
import SearchFilters from "./SearchFilter";
import UserNav from "./UserNav";
import AddPropertyButton from "./AddPropertyButton";
import React, { useState, useEffect } from "react";


const Navbar = () => {
  const [stickyMenu, setStickyMenu] = useState(false);
  
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <>
      <header
        className={`fixed top-0 w-full z-99999 bg-white shadow !py-3 transition duration-100 ${
        stickyMenu
          ? "bg-white shadow transition duration-100"
          : "absolute bg-transparent"
      }`}
    >
        <div className="max-w-[1500px] mx-auto px-18">
          <div className="flex justify-between items-center">
              <Link href="/">
                <Image  src="/logo.png" 
                    className="w-full" 
                    alt="BestFoodLogo" 
                    width={70} 
                    height={50} 
                  />
              </Link>
            {/* Search Kismi */}
            <div className="flex-grow flex justify-center">
              <SearchFilters />
            </div>
            {/* home Contact Login About kismi */}
            <div className="flex items-center space-x-6">
              <AddPropertyButton />
              <UserNav />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
