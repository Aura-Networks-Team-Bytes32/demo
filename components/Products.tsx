"use client";
import React, { useContext } from "react";
import { PRODUCTS, Product } from "@/constants";
import Image from "next/image";
import { CartContext, CartItem } from "@/context";
import Footer from "./Footer";
import IncrementDecrementButton from "./Button/IncrementDecrementButton";

const Products = () => {
  const { cart, addToCart, updateQuantity } =
    useContext(CartContext);

  const handleIncrement = (product: Product) => {
    updateQuantity(
      product.id,
      (cart.find((item: CartItem) => item.id === product.id)
        ?.quantity || 0) + 1
    );
  };

  const handleDecrement = (product: Product) => {
    updateQuantity(
      product.id,
      (cart.find((item: CartItem) => item.id === product.id)
        ?.quantity || 0) - 1
    );
  };

  return (
    <>
      <div className="pt-8 xs:pt-10 md:pt-12 px-6">
        <h1 className="text-2xl xs:text-4xl md:text-5xl font-black text-center mb-6 xs:mb-8 md:mb-12">
          NEW ARRIVALS
        </h1>
        <div className="grid xs:grid-cols-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 md:gap-y-10 mb-[80px] md:mb-[100px]">
          {PRODUCTS.map((product: Product) => (
            <div
              key={product.id}
              className="flex flex-col justify-center items-center xs:justify-start xs:items-start"
            >
              <div>
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  width={360}
                  height={360}
                  className="rounded-sm mb-1"
                />
                <h2 className="text-sm sm:text-base font-bold">
                  {product.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-700 mb-1">
                  {product.description}
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-1">
                  ${product.price}
                </p>
                {cart.find(
                  (item: CartItem) => item.id === product.id
                ) ? (
                  <IncrementDecrementButton
                    handleDecrement={() =>
                      handleDecrement(product)
                    }
                    quantity={
                      cart.find(
                        (item: CartItem) =>
                          item.id === product.id
                      )?.quantity || 0
                    }
                    handleIncrement={() =>
                      handleIncrement(product)
                    }
                  />
                ) : (
                  <button
                    className="bg-black text-white text-sm sm:text-base py-2 px-6 font-semibold rounded max-w-fit hover:bg-gray-800"
                    onClick={() =>
                      addToCart({ ...product, quantity: 1 })
                    }
                  >
                    ADD
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
