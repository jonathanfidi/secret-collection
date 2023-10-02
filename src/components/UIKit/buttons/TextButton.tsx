import styled from "styled-components";

const TextButton = styled.button`
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: #000;
  font-size: 1.14286rem;
  font-family: inherit;
  font-weight: 300;
  line-height: normal;
  text-transform: uppercase;
  background: none;
  border: none;
  cursor: pointer;

  &:active {
    transform: scale(0.99);
  }
`;

export default TextButton;
