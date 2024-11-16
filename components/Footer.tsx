import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const { cart } = useContext(CartContext);

  const totalQuantity = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {totalQuantity > 0 && (
        <motion.footer
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 left-0 right-0 p-3 sm:p-5 flex justify-between items-center bg-white text-sm sm:text-base"
        >
          <p className="font-semibold">
            {totalQuantity}{" "}
            {totalQuantity === 1 ? "item" : "items"} added
            to cart.
          </p>
          <Link href="/payment">
            <p className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded text-sm sm:text-base">
              Pay Now
            </p>
          </Link>
        </motion.footer>
      )}
    </AnimatePresence>
  );
};

export default Footer;
