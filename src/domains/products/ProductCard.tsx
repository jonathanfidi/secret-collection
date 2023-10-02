"use client";

import Currency from "@/components/Currency";
import Image from "next/image";
import styled from "styled-components";
import type Product from "./product";

type Props = {
  product: Product;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick: (product: Product) => void;
};

const ProductCard = ({ product, disabled, style, onClick }: Props) => {
  return (
    <Container
      onClick={() => {
        onClick(product);
      }}
      style={{
        ...style,
        opacity: disabled ? 0.2 : 1,
        filter: disabled ? "grayscale(100%) blur(3px)" : "none",
      }}
    >
      <ImageContainer>
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "contain", objectPosition: "bottom left" }}
        />
      </ImageContainer>
      <Content>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Description>
        <Footer>
          <Title>{product.title}</Title>
          <Price>
            <Currency amount={product.price.amount} />
          </Price>
        </Footer>
      </Content>
    </Container>
  );
};

export default ProductCard;

const Container = styled.article`
  position: relative;
  width: 90%;
  max-width: 816px;
  min-height: 205px;
  aspect-ratio: 816 / 455;
  margin-top: 90px;
  padding: 1rem;
  text-align: right;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
`;

const ImageContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 150%;
`;

const Content = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 50%;
  height: 100%;
`;

const Description = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  color: #4b4b4b;
  font-size: 0.71429rem;
  font-style: italic;
  font-weight: 300;
  line-height: normal;
  text-align: left;

  @media (min-width: 390px) {
    font-size: 0.85714rem;
  }
`;

const Footer = styled.footer`
  justify-self: end;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3`
  color: #000;
  font-size: 1.42857rem;
  font-weight: 100;
  text-transform: uppercase;
`;

const Price = styled.span`
  color: #000;
  font-size: 1.14286rem;
  font-weight: 100;
`;
