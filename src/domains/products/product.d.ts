type Product = {
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

export default Product;
