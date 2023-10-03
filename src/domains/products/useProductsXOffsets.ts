import { useEffect, useState } from "react";

const useProductsXOffsets = (productCount: number, productWidth: number) => {
  const [productsXOffsets, setProductsXOffsets] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setProductsXOffsets(
        getProductsOffsets({
          productCount: productCount,
          productWidth: productWidth,
          gutterWidth: 200,
          wiewportWidth: window?.innerWidth,
        }),
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [productWidth, productCount]);

  return { productsXOffsets };
};

export default useProductsXOffsets;

type getProductsOffsetsParams = {
  productCount: number;
  productWidth: number;
  gutterWidth: number;
  wiewportWidth: number;
};

function getProductsOffsets({
  productCount,
  productWidth,
  gutterWidth,
  wiewportWidth,
}: getProductsOffsetsParams): string[] {
  const offsets = [];
  const startOffset = wiewportWidth / 2 - productWidth / 2;
  const stepLength = productWidth + gutterWidth;
  let lastOffset = startOffset;
  for (let i = 0; i < productCount; i++) {
    offsets.push(lastOffset + "px");
    lastOffset -= stepLength;
  }
  return offsets;
}
