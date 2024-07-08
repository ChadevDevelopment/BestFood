"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menuData from "./menuData";
import DropDown from "../dropdown/dropdown";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { cartItemCount } = useCart();

  const pathUrl = usePathname();

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
    <header
      className={`fixed top-0 w-full z-99999 bg-white shadow !py-3 transition duration-100 ${
        stickyMenu
          ? "bg-white shadow transition duration-100"
          : "absolute bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0 lg:flex items-center justify-between relative">
        <div className="w-full lg:w-1/4 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              priority
              width={130}
              height={30}
              className="w-full"
            />
          </Link>

          <button
            onClick={() => setNavigationOpen(!navigationOpen)}
            id="navbarToggler"
            aria-label="Mobile Menu"
            // className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
            className="lg:hidden block"
          >
            <span
              className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                navigationOpen ? " top-[7px] rotate-45" : " "
              }`}
            />
            <span
              className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                navigationOpen ? "opacity-0 " : " "
              }`}
            />
            <span
              className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${
                navigationOpen ? " top-[-8px] -rotate-45" : " "
              }`}
            />
          </button>
        </div>

        <div
          className={`w-full lg:w-full h-0 lg:h-auto invisible lg:visible lg:flex items-center justify-end ${
            navigationOpen &&
            "!visible bg-white shadow-solid-5 h-auto max-h-[400px] overflow-y-scroll rounded-md mt-4 p-7.5"
          }`}
        >
          <nav>
            <ul className="flex lg:items-center flex-col lg:flex-row gap-5 lg:gap-10">
              {menuData.map((menuItem, key) => (
                <li
                  key={key}
                  className={menuItem.submenu && "group relative"}
                  onClick={() => setNavigationOpen(false)}
                >
                  {menuItem.submenu ? (
                    <></>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      className={
                        pathUrl === menuItem.path
                          ? "hover:text-black text-black"
                          : "hover:text-black"
                      }
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div>
            {/* <DropDown /> */}

            <div className="relative flex items-center">
              <Link href="/shopping-cart">
                <svg
                  className="w-6 h-6 flex items-center"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
                {cartItemCount > 0 && (
                  <div className="absolute border  -top-2 -right-3 w-5 h-5 bg-crimson text-white font-extrabold text-xs flex items-center justify-center rounded-2xl">
                    {cartItemCount}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
