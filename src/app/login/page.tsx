"use client";

import PrimaryButton from "@/components/UIKit/buttons/PrimaryButton";
import InputText from "@/components/UIKit/forms/InputText";
import { useRouter } from "next/navigation";

import styled from "styled-components";

interface FormData {
  login: { value: string };
  password: { value: string };
}

export default function Page() {
  const { push } = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { login, password } = e.target as typeof e.target & FormData;
    if (!!login?.value.length && !!password.value.length) {
      localStorage.setItem("token", JSON.stringify({ access: "granted" }));
      push("/");
    }
  };

  return (
    <Container>
      <Header>
        <h1>
          <Logo src="/dior-logo.svg" alt="DIOR" />
        </h1>
      </Header>
      <Content>
        <Welcome>
          <span style={{ color: "#868686" }}>BIENVENUE</span>
          <h2>WELCOME</h2>
          <span style={{ marginLeft: "2rem" }}>いらっしゃいませ</span>
        </Welcome>
        <Form onSubmit={handleSubmit}>
          <InputText name="login" type="text" placeholder="Login" />
          <InputText name="password" type="password" placeholder="Password" />
          <PrimaryButton style={{ marginTop: "3rem" }}>Login</PrimaryButton>
        </Form>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  min-height: 100vh;
  background: url("/images/tour-eiffel.png") no-repeat bottom center;
  background-size: auto 50vh;

  @media (min-width: 834px) {
    background-size: 585px 814px;
    background-position: right top;
  }

  @media (min-width: 1700px) {
    background-size: auto;
    background-position: right bottom;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
`;

const Logo = styled.img`
  height: 28px;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const Welcome = styled.div`
  text-align: left;
  transform: translateX(-90px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  max-width: 258px;
`;
