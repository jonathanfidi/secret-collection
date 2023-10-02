import styled from "styled-components";

const PrimaryButton = styled.button`
  padding: 1.3rem 3rem;
  cursor: pointer;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 200;
  // font-size: 2.28571rem;
  font-family: inherit;
  // font-weight: 300;
  text-transform: uppercase;
  border: none;
  border-radius: 10px;
  background: linear-gradient(180deg, #1e1e1e 0%, #424242 100%);

  &:hover {
    background: #000;
  }

  &:active {
    transform: scale(0.99);
  }
`;

export default PrimaryButton;
