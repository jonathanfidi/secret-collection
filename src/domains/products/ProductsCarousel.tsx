import PrimaryButton from "@/components/UIKit/buttons/PrimaryButton";
import TextButton from "@/components/UIKit/buttons/TextButton";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useCart from "../cart/useCart";
import ProductCard from "./ProductCard";
import Product from "./product";

type Props = {
  products: Product[];
};

const ProductsCarousel = ({ products }: Props) => {
  const { addOneToCart, openCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  useEffect(() => {
    if (!selectedProduct) setSelectedProduct(products[0]);
  }, [products, selectedProduct]);

  const selectPreviousProduct = useCallback(() => {
    const selectedProductIndex =
      selectedProduct && products.indexOf(selectedProduct);
    if (selectedProductIndex === undefined) return;
    setSelectedProduct(products[selectedProductIndex - 1]);
  }, [products, selectedProduct]);

  const selectNextProduct = useCallback(() => {
    const selectedProductIndex =
      selectedProduct && products.indexOf(selectedProduct);
    if (selectedProductIndex === undefined) return;
    setSelectedProduct(products[selectedProductIndex + 1]);
  }, [products, selectedProduct]);

  const handleKeyDown = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === "ArrowLeft") selectPreviousProduct();
      if (key === "ArrowRight") selectNextProduct();
    },
    [selectNextProduct, selectPreviousProduct],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const productsXOffsets = getProductsOffsets(products.length);
  const selectedProductXOffset =
    selectedProduct && productsXOffsets[products.indexOf(selectedProduct)];

  return (
    <Container>
      <Products style={{ transform: `translateX(${selectedProductXOffset})` }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={setSelectedProduct}
            disabled={selectedProduct?.id !== product.id}
            style={{
              transform:
                selectedProduct?.id === product.id ? "scale(1.5)" : "scale(1)",
              transformOrigin: "bottom center",
              zIndex: selectedProduct?.id === product.id ? 1 : 0,
            }}
          />
        ))}
      </Products>
      <Navigation>
        <TextButton onClick={() => selectPreviousProduct()}>
          <img src="/icons/arrow-left.svg" alt="Previous" />
        </TextButton>
        <TextButton onClick={() => selectNextProduct()}>
          <img src="/icons/arrow-right.svg" alt="Next" />
        </TextButton>
      </Navigation>
      <Footer>
        <AddToCartButton
          onClick={() => {
            if (selectedProduct) {
              addOneToCart(selectedProduct);
              openCart();
            }
          }}
          disabled={!selectedProduct}
        >
          Add to cart
        </AddToCartButton>
      </Footer>
    </Container>
  );
};

export default ProductsCarousel;

function getProductsOffsets(productCount: number): string[] {
  const offsets = [];
  const stepLength = 100 / productCount;
  let lastOffset = stepLength;
  for (let i = 0; i < productCount; i++) {
    offsets.push(lastOffset + "vw");
    lastOffset -= stepLength;
  }
  return offsets;
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Products = styled.div`
  display: flex;
  gap: 14rem;
  align-items: flex-end;
  height: 540px;
  transition: transform 0.5s ease;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
`;

const AddToCartButton = styled(PrimaryButton)`
  width: 90%;
  max-width: 586px;
  border-radius: 3.28571rem;
  background: linear-gradient(180deg, #1e1e1e 0%, #424242 100%);
`;

const Navigation = styled.nav`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  & > button:hover {
    opacity: 0.5;
    transform: scale(1.1);
    transition: all 0.35s ease;
  }
`;
