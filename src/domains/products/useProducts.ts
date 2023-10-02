import { useEffect, useState } from "react";
import Product from "./product";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((products) => setProducts(products));
  }, []);

  return products;
};

export default useProducts;
