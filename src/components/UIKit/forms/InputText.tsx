import styled from "styled-components";

const InputText = styled.input<{ error: boolean }>`
  color: ${({ error }) => (error ? "red" : "#afafaf")};
  padding: 0.79rem 5px;
  border: 0;
  border-bottom: 1px solid ${({ error }) => (error ? "red" : "#afafaf")};

  &::placeholder {
    color: ${({ error }) => (error ? "red" : "#afafaf")};
    text-transform: uppercase;
  }
`;

export default InputText;
