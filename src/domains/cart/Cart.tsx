import Currency from "@/components/Currency";
import PrimaryButton from "@/components/UIKit/buttons/PrimaryButton";
import TextButton from "@/components/UIKit/buttons/TextButton";
import styled from "styled-components";
import CartItem from "./CartItem";
import getCartQuantity from "./getCartQuantity";
import useCart from "./useCart";

type Props = {
  onClose: () => void;
};

const Cart = ({ onClose }: Props) => {
  const { cart, addOneToCart, removeOneFromCart, removeFromCart } = useCart();

  const total = cart.items.reduce(
    (acc, item) => acc + item.product.price.amount * item.quantity,
    0,
  );
  const taxes = total * 0.2;
  const currencySymbol = cart.items[0]?.product.price.currency.symbol;

  return (
    <Container>
      <Header>
        <TextButton onClick={() => onClose()}>
          <img src="/icons/close.svg" alt="close" />
        </TextButton>
        <TextButton>
          <img src="/icons/shopping-cart.svg" alt="cart" />
          {getCartQuantity(cart)}
        </TextButton>
      </Header>
      <Content>
        {!!cart?.items?.length
          ? cart.items.map((item) => (
              <CartItem
                cartItem={item}
                key={item.product.id}
                onAddOne={addOneToCart}
                onRemoveOne={removeOneFromCart}
                onDelete={removeFromCart}
              />
            ))
          : "Your cart is empty"}
      </Content>
      {!!cart.items.length && (
        <Footer>
          <Taxes>
            Taxes: <Currency amount={taxes} />
          </Taxes>
          <Total>
            Total: <Currency amount={total} />
          </Total>
          <PrimaryButton>Go to checkout</PrimaryButton>
        </Footer>
      )}
    </Container>
  );
};

export default Cart;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  min-width: 200px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Taxes = styled.div`
  color: #545454;
  font-size: 24px;
  font-weight: 300;
  text-align: right;
  text-transform: uppercase;

  span {
    font-weight: 100;
  }
`;

const Total = styled.div`
  color: #545454;
  font-size: 48px;
  font-weight: 300;
  text-align: right;
  text-transform: uppercase;

  span {
    font-weight: 100;
  }
`;
