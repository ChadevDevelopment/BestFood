"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toastError, toastSuccess } from "@/helpers/ToastHot";
import { useCart } from "@/context/CartContext";

interface ModelProps {
  label: string;
  isOpen: boolean;
  onClose: () => void;
  onOrder: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: FC<ModelProps> = ({
  isOpen,
  onClose,
  onOrder,
  children,
  label,
  className,
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(isOpen);
  const { increaseCartItemCount } = useCart();

  // isOpen degistiginde showModali useEffect ile guncelledim.
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // I used handleCLose to close the model.
  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  const handleOrder = useCallback(() => {
    if (!handleOrder) {
      toastError("Product not added");
    } else {
      toastSuccess("Product successfully added");
      onOrder();
      router.push("/shopping-cart");
      increaseCartItemCount(); //urun eklenince shoppincart uzerine urun sayisini yazdirdim.
    }
  }, [onOrder, router, increaseCartItemCount]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] md:[80%] lg:w-[700px] my-6 mx-auto h-auto"
      >
        <div
          className={`translate duration-600 h-full  ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-10"
          }`}
        >
          <div
            className={`w-full h-auto rounded-xl relative flex flex-col bg-white  ${className}`}
          >
            {/* kapatma dugmesi */}
            <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
              <div
                onClick={handleClose}
                className="p-3 absolute right-3 hover:bg-gray-300 rounded-full cursor-pointer"
              >
                {/* icon for onClose */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-mono ">{label}</h2>
            </header>

            <div className="p-6">{children}</div>
            <footer className="p-6 border-t flex gap-3">
              <button
                onClick={handleOrder}
                className="py-2 px-4 bg-orange text-white font-mono hover:font-extrabold hover:bg-orange-500 rounded-xl"
              >
                Add to Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>

              <button
                onClick={() => console.log("updated Product")}
                className="py-2 px-5 bg-orange text-white font-mono hover:font-extrabold hover:bg-orange-500 rounded-xl"
              >
                Update Your Product
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
