import Currency from "@/components/Currency";
import TextButton from "@/components/UIKit/buttons/TextButton";
import Image from "next/image";
import styled from "styled-components";
import Product from "../products/product";
import { CartItem as CartItemType } from "./useCart";

type Props = {
  cartItem: CartItemType;
  onAddOne: (product: Product) => void;
  onRemoveOne: (product: Product) => void;
  onDelete: (product: Product) => void;
};

const CartItem = ({ cartItem, onAddOne, onRemoveOne, onDelete }: Props) => {
  const { product } = cartItem;

  return (
    <Container>
      <ImageContainer>
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: "contain", objectPosition: "left" }}
        />
      </ImageContainer>
      <Details>
        <Title>{product.title}</Title>
        <Price>
          <Currency amount={product.price.amount} />
        </Price>
        <Quantity>
          <QuantityButton onClick={() => onRemoveOne(product)}>
            -
          </QuantityButton>{" "}
          {cartItem.quantity} item{" "}
          <QuantityButton onClick={() => onAddOne(product)}>+</QuantityButton>
        </Quantity>
      </Details>
      <Actions>
        <TextButton onClick={() => onDelete(product)}>
          <img src="/icons/trash.svg" width={28} height={28} alt="delete" />
        </TextButton>
      </Actions>
    </Container>
  );
};

export default CartItem;

const Container = styled.article`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  justify-content: flex-end;
  height: 200px;
  color: #000;
  font-size: 16px;
  font-weight: 100;
  text-transform: uppercase;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  flex: 1;
  text-align: left;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 70%;
`;

const Title = styled.h3`
  color: #000;
  font-size: 32px;
  font-weight: 100;
`;

const Price = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 100;
`;

const Quantity = styled.div``;

const QuantityButton = styled(TextButton)`
  width: 25px;
  height: 25px;
  color: #969696;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
`;

const Actions = styled.div`
  align-self: center;
`;
