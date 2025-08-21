"use client";
import Link from "next/link";
import { FaUtensils } from "react-icons/fa";

const DeliveryHeader = () => {
  const themeColor = "#009966";

  

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <FaUtensils
            className="text-2xl mr-2"
            style={{ color: themeColor }}
          />
          <span className="text-2xl font-bold" style={{ color: themeColor }}>
            RestoFinder
          </span>
        </Link>

        {/* Home Link */}
        <Link
          href="/"
          className="font-medium hover:text-green-600 transition-colors"
          style={{ color: themeColor }}
        >
          Home
        </Link>
      </div>
    </nav>
  );
};

export default DeliveryHeader;
