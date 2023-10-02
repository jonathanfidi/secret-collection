import { NextResponse } from "next/server";

export type Product = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: {
    amount: number;
    currency: {
      code: string;
      symbol: string;
    };
  };
};

//TODO: use a database
const products: Product[] = [
  {
    id: "08f321a9-af29-4596-8e8c-13329c474a9d",
    image: "/images/men-shirt.png",
    title: "Men shirt",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: { amount: 1900000, currency: { code: "EUR", symbol: "€" } },
  },
  {
    id: "e24972f8-bd73-44d4-bf5b-5174826f1bfd",
    image: "/images/lady-bag.png",
    title: "Lady bag",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: { amount: 300000, currency: { code: "EUR", symbol: "€" } },
  },
  {
    id: "d282c0f2-b7d3-41a2-8860-47386a6137f7",
    image: "/images/dior-jewelry.png",
    title: "Dior jewelery",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    price: { amount: 10000000, currency: { code: "EUR", symbol: "€" } },
  },
];

export const GET = async () => {
  return NextResponse.json(products);
};
