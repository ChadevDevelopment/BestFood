"use client";

import Link from "next/link";
import { FC } from "react";

interface MenuLinkProps {
  label: string;
  href?: string;
  onClick: () => void;
}

const MenuLink: FC<MenuLinkProps> = ({ label, href, onClick }) => {
  if (href) {
    return (
      <Link href={href}>
        <div
          onClick={onClick}
          className="px-5 py-4 cursor-pointer hover:bg-gray-100 transition"
        >
          {label}
        </div>
      </Link>
    );
  }
};

export default MenuLink;
