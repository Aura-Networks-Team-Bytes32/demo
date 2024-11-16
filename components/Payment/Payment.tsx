"use client";
import React, { useContext } from "react";
import { CartContext } from "@/context";
import EmptyCart from "@/components/Payment/EmptyCart";
import { PaymentMethod } from "@/components/Payment/PaymentDetails";
import Cart from "@/components/Payment/Cart";

const Payment = () => {
  const { cart } = useContext(CartContext);

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="payment-grid gap-6 justify-around mt-8 md:mt-12">
      <Cart />
      <PaymentMethod />
    </div>
  );
};

export default Payment;
