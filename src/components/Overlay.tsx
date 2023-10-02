import styled from "styled-components";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Overlay = ({ isOpen, children }: Props) => {
  return (
    <Container isOpen={isOpen}>
      <Content isOpen={isOpen}>{children}</Content>
    </Container>
  );
};

export default Overlay;

const Container = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(100%)")};
  transition: opacity 0.5s ease;
`;

const Content = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 700px;
  height: 100vh;
  padding: 2rem;
  background-color: #fff;
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.5s ease;

  @media (min-width: 620px) {
    padding-left: 150px;
    clip-path: polygon(0% 100%, 17.5% 0%, 100% 0%, 100% 100%);
  }
`;
