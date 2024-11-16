import { CartContext, CartItem } from "@/context";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import IncrementDecrementButton from "../Button/IncrementDecrementButton";
import { RiDeleteBin5Line } from "react-icons/ri";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } =
    useContext(CartContext);

  const handleUpdateQuantity = (
    id: number,
    quantity: number
  ) => {
    updateQuantity(id, quantity);
  };

  const handleDecrement = (item: CartItem) => {
    handleUpdateQuantity(item.id, item.quantity - 1);
  };

  const handleIncrement = (item: CartItem) => {
    handleUpdateQuantity(item.id, item.quantity + 1);
  };
  return (
    <div className="flex flex-col max-[768px]:items-center">
      <div className="max-[1024px]:mx-auto p-4 pt-0 xs:w-[85%] md:w-full w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <Link
            href={"/"}
            className="text-sm md:text-base underline"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="flex flex-col divide-y divide-gray-200">
          {cart.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-4 gap-2 md:gap-4"
            >
              <div className="flex justify-center">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  width={80}
                  height={80}
                />
                <div className="ml-4">
                  <h3 className="text-sm md:text-base font-bold">
                    {item.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 items-end">
                <IncrementDecrementButton
                  handleDecrement={() =>
                    handleDecrement(item)
                  }
                  handleIncrement={() =>
                    handleIncrement(item)
                  }
                  quantity={item.quantity}
                />
                <div className="flex items-center gap-3">
                  <p className="text-sm md:text-base font-bold ml-4">
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    className="hover:text-red-500 text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pb-4">
          <hr className="border-gray-200" />
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-base md:text-lg font-bold">
            Total:
          </h3>
          <p className="text-base md:text-lg font-bold">
            $
            {cart
              .reduce(
                (acc, item) =>
                  acc + item.price * item.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
