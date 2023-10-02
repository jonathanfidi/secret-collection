import Cart from "@/domains/cart/Cart";
import getCartQuantity from "@/domains/cart/getCartQuantity";
import useCart from "@/domains/cart/useCart";
import styled from "styled-components";
import Overlay from "./Overlay";
import TextButton from "./UIKit/buttons/TextButton";

const Header = () => {
  const { cart, isCartOpen, openCart, closeCart } = useCart();

  return (
    <>
      <Container>
        <h1>
          <Logo src="/dior-logo.svg" alt="DIOR" />
        </h1>
        <TextButton onClick={() => openCart()}>
          <img src="/icons/shopping-cart.svg" alt="Cart" />
          {getCartQuantity(cart)}
        </TextButton>
      </Container>

      <Overlay isOpen={isCartOpen}>
        <Cart onClose={() => closeCart()} />
      </Overlay>
    </>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
`;

const Logo = styled.img`
  height: 28px;
`;
