"use client";
import {
  createContext,
  ReactNode,
  FC,
  useContext,
  useState,
  useEffect,
} from "react";

interface CartContextType {
  cartItemCount: number;
  increaseCartItemCount: () => void;
  decreaseCartItemCount: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItemCount: 0,
  increaseCartItemCount: () => {},
  decreaseCartItemCount: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

// Browser render edildiginde sepet sayisini LocalStorage'da saklamak icin
const CART_ITEM_COUNT_KEY = "cartItemCount";

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  // isInitialized ilk kez yuklenip yuklenmedigini kontrol etmek icin
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      const savedCount = localStorage.getItem(CART_ITEM_COUNT_KEY);
      // console.log("Saved count from localStorage:", savedCount);
      if (savedCount) {
        setCartItemCount(parseInt(savedCount, 10));
        // console.log("Cart item count set to:", parseInt(savedCount, 10));
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      localStorage.setItem(CART_ITEM_COUNT_KEY, cartItemCount.toString());
    }
  }, [cartItemCount, isInitialized]);

  const increaseCartItemCount = () => {
    setCartItemCount((prevCount) => prevCount + 1);
  };

  const decreaseCartItemCount = () => {
    if (cartItemCount > 0) {
      setCartItemCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItemCount, increaseCartItemCount, decreaseCartItemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
