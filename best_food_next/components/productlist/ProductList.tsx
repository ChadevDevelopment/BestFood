"use client";
import { useState } from "react";
import ProductListItem, { Product } from "./ProductListItem";
import productsData from "@/app/data/product.json";
import PizzaModal from "../modals/PizzaModal";
import FishModal from "../modals/FishModal";
import BurgerModal from "../modals/BurgerModal";
import WithAlcoholModal from "../modals/WithAlcoholModal";
import WithoutAlcoholModal from "../modals/WithoutAlcoholModal";
import { EXTRAS } from "@/config/extrasConfig";

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
          extras={EXTRAS.pizzas}
        />
      )}

      {selectedProduct && selectedProduct.category === "fish" && (
        <FishModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          extras={EXTRAS.fishs}
        />
      )}

      {selectedProduct && selectedProduct.category === "burger" && (
        <BurgerModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          extras={EXTRAS.burgers}
        />
      )}

      {selectedProduct && selectedProduct.category === "drinkwithalcohol" && (
        <WithAlcoholModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          extras={EXTRAS.drinkswithalcohols}
        />
      )}

      {selectedProduct &&
        selectedProduct.category === "drinkwithoutalcohol" && (
          <WithoutAlcoholModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            product={selectedProduct}
            extras={EXTRAS.drinkswithoutalcohol}
          />
        )}
    </>
  );
};

export default ProductList;
