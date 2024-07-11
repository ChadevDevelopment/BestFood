export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  amount: number;
  totalPrice: number;
  extras: Record<string, number>;
  description: string;
  category: string;
}

// for Myorders.tsx file
export interface Order {
  product: Product;
  orderId: number;
  date: string;
  amount: number;
  totalPrice: number;
  deliveryAddress?: string;
}
// for Myorders.tsx file
export interface StoredOrderData {
  [key: string]: {
    orderId: number;
    orders: Order[];
  };
}
