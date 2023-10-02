import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Overlay = ({ children }: Props) => {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
};

export default Overlay;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 700px;
  height: 100vh;
  padding: 2rem;
  background-color: #fff;
`;
