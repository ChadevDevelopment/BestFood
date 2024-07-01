"use client";

import { FC, useCallback, useEffect, useState } from "react";

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
  const [showModal, setShowModal] = useState(isOpen);

  // isOpen degistiginde showModali useEffect ile guncelledim.
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // modelin kapanmasi icin handleCLose kullandim.
  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed insert-0 flex items-center justify-center transform overflow-hidden rounded-2xl bg-white 
      max-w-lg sm:max-w-2xl sm:w-full p-6 text-left align-middle shadow-xl transition-all"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] md:[80%] lg:w-[700px] my-6 mx-auto h-auto"
      >
        <div
          className={`translate duration-300 h-full  ${
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
                className="p-3 absolute right-3 hover:bg-black rounded-full cursor-pointer"
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
              <h2 className="text-lg font-sm">{label}</h2>
            </header>

            <div className="p-6">{children}</div>
            <footer className="p-6 border-t">
              <button
                onClick={onOrder}
                className="py-2 px-4 bg-black text-white font-sm hover:font-extrabold hover:bg-black rounded-xl"
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
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
