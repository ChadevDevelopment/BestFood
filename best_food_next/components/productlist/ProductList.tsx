"use client";
import { useState } from "react";
import ProductListItem, { Product } from "./ProductListItem";
import productsData from "@/app/data/product.json";
import PizzaModal from "../modals/PizzaModal";
import FishModal from "../modals/FishModal";
import BurgerModal from "../modals/BurgerModal";

const getAllProducts = () => {
  const { pizzas, burgers, fishs, drinkswithalcohols, drinkswithoutalcohol } =
    productsData;
  return [
    ...pizzas,
    ...burgers,
    ...fishs,
    ...drinkswithalcohols,
    ...drinkswithoutalcohol,
  ];
};

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Ich habe es getan, um alle Produkte mit dem folgenden Code zu erhalten.
  const products = getAllProducts();

  return (
    <>
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          onClick={handleProductClick}
        />
      ))}

      {selectedProduct && selectedProduct.category === "pizza" && (
        <PizzaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}

      {selectedProduct && selectedProduct.category === "fish" && (
        <FishModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}

      {selectedProduct && selectedProduct.category === "burger" && (
        <BurgerModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </>
  );
};

export default ProductList;
