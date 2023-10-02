"use client";

import Header from "@/components/Header";
import TextButton from "@/components/UIKit/buttons/TextButton";
import ProductsCarousel from "@/domains/products/ProductsCarousel";
import useProducts from "@/domains/products/useProducts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Page() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const products = useProducts();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return push("/login");
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    push("/login");
  };

  if (isLoading) return null;

  return (
    <>
      <Header />
      <main>
        <header>
          <Title onClick={handleLogout}>The Secret Collection</Title>
        </header>
        <ProductsListActions>
          <TextButton>
            <img height="22" src="/icons/filters.svg" alt="Filters" /> Filters
          </TextButton>
          <TextButton>
            <img height="22" src="/icons/sort.svg" alt="Sort" /> Sort
          </TextButton>
        </ProductsListActions>
        <ProductsCarousel products={products} />
      </main>
    </>
  );
}

const Title = styled.h2`
  padding: 56px;
  color: #000;
  font-size: 24px;
  font-weight: 200;
  text-transform: uppercase;
  background: url("/images/key.png") center top no-repeat;
`;

const ProductsListActions = styled.div`
  display: flex;

  & > * {
    flex: 1;
  }

  @media (min-width: 420px) {
    justify-content: flex-end;

    & > * {
      flex: unset;
    }
  }
`;
