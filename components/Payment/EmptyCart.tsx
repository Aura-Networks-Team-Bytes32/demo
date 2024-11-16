import { useRouter } from "next/navigation";

const EmptyCart = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center p-4 mt-12 md:mt-[84px]">
      <img
        src="/empty-cart.png"
        alt="Empty cart"
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-3 bg-blend-normal" // Style for the cart image
      />
      <h2 className="text-xl sm:text-2xl font-black mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-3 sm:mb-6 text-sm sm:text-base text-center font-semibold">
        Looks like you haven't added anything in your cart
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-black text-white text-sm sm:text-base py-2 px-6 font-semibold rounded max-w-fit hover:bg-gray-800"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
