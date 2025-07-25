import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Elevita Essencial",
    description: "Início perfeito para sua jornada de transformação",
    price: 97,
    originalPrice: 147,
    image: "/product/1-products.png",
    badge: "Recomendado para 30 Dias",
    linkCheckout: "/checkout?id=1",
  },
  {
    id: 2,
    name: "Kit Elevita Premium",
    description: "Transformação completa com nossa fórmula revolucionária",
    price: 197,
    originalPrice: 297,
    image: "/product/2-products.png",
    badge: "Recomendado para 60 Dias",
    picked: true,
    linkCheckout: "/checkout?id=2",
  },
  {
    id: 3,
    name: "Elevita Pro",
    description: "Resultados profissionais em casa",
    price: 297,
    originalPrice: 397,
    image: "/product/3-products.png",
    badge: "Recomendado para 90 Dias",
    linkCheckout: "/checkout?id=3",
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getRecommendedProduct = (): Product | undefined => {
  return products.find((product) => product.picked);
};

export const getAllProducts = (): Product[] => {
  return products;
};
