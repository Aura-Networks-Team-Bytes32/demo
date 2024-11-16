"use client";
import React from "react";
import Navbar from "./Navbar";
import { CartProvider } from "@/context";

const Layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <CartProvider>
      <Navbar />
      {children}
    </CartProvider>
  );
};

export default Layout;
