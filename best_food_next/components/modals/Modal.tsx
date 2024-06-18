"use client";
import { FC, useCallback, useEffect, useState } from "react";

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    imageUrl: string;
    description: string;
    price: number;
  };
}

const Modal: FC<ModelProps> = ({ isOpen, onClose, product }) => {
  const [showModal, setShowModal] = useState(isOpen);

  // isOpen degistiginde showModali useEffect ile guncelledim.
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // modelin kapanmasi icin handleCLose kullandim.
  const handleClose = useCallback(() => {
    setShowModal(false);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/70">
      <div className="relative w-[90%] md:[80%] lg:w-[700px] my-6 mx-auto h-auto">
        <div
          className={`translate duration-600 h-full ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-10"
          }`}
        >
          <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
            {/* kapatma dugmesi */}
            <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border-b">
              <div
                onClick={handleClose}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     handleClose();
                //   }
                // }}
                // role="button"
                // tabIndex={0}
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
              <h2 className="text-lg font-mono ">{product.name}</h2>
            </header>

            <div className="p-6">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full rounded-xl mb-4"
              />
              <p className="text-sm text-gray-600 mb-2">
                {product.description}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
