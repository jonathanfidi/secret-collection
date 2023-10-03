import PrimaryButton from "@/components/UIKit/buttons/PrimaryButton";
import TextButton from "@/components/UIKit/buttons/TextButton";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useCart from "../cart/useCart";
import ProductCard from "./ProductCard";
import Product from "./product";
import useProductsXOffsets from "./useProductsXOffsets";

type Props = {
  products: Product[];
};

const ProductsCarousel = ({ products }: Props) => {
  const { addOneToCart, openCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [productWidth, setProductWidth] = useState(370);
  const { productsXOffsets } = useProductsXOffsets(
    products.length,
    productWidth,
  );

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1600) return setProductWidth(544);
      if (window.innerWidth >= 720) return setProductWidth(430);
      if (window.innerWidth >= 420) return setProductWidth(280);
      return setProductWidth(200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const selectedProductXOffset =
    selectedProduct && productsXOffsets[products.indexOf(selectedProduct)];

  return (
    !!products?.length && (
      <Container>
        <Track>
          <Products
            style={{ transform: `translateX(${selectedProductXOffset})` }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
                disabled={selectedProduct?.id !== product.id}
                style={{
                  flex: `0 0 ${productWidth}px`,
                  transform:
                    selectedProduct?.id === product.id
                      ? "scale(1.5)"
                      : "scale(1)",
                  transformOrigin: "bottom center",
                  zIndex: selectedProduct?.id === product.id ? 1 : 0,
                }}
              />
            ))}
          </Products>
        </Track>
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
    )
  );
};

export default ProductsCarousel;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Track = styled.div`
  position: relative;
  height: 270px;
  overflow: visible;
  text-align: center;

  @media (min-width: 420px) {
    height: 340px;
  }

  @media (min-width: 460px) {
    height: 400px;
  }

  @media (min-width: 720px) {
    height: 540px;
  }
`;

const Products = styled.div`
  display: flex;
  gap: 200px;
  width: 1500px;
  align-items: flex-end;
  height: 100%;
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
  top: 35%;
  left: 0;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;

  @media (min-width: 420px) {
    top: 40%;
  }

  @media (min-width: 720px) {
    top: 50%;

    button {
      transform: scale(1);
    }
  }

  button {
    transform: scale(0.5);

    &:hover {
      opacity: 0.5;
      transform: scale(0.6);
      transition: all 0.35s ease;
    }

    @media (min-width: 720px) {
      transform: scale(1);

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;
