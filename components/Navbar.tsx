import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto p-5 flex justify-start items-center">
        <Link href="/">
          <Image
            src="/SHOP.CO.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
