import { Truck } from "lucide-react";
import Image from "next/image";
import Button from "../button";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  picked?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Elevita Essencial",
    description: "Início perfeito para sua jornada de transformação",
    price: 97,
    originalPrice: 147,
    image: "/product/1-products.png",
    badge: "Recomendado para 30 Dias",
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
  },
  {
    id: 3,
    name: "Elevita Pro",
    description: "Resultados profissionais em casa",
    price: 297,
    originalPrice: 397,
    image: "/product/3-products.png",
    badge: "Recomendado para 90 Dias",
  },
];

export default function ProductList() {
  return (
    <section className="py-16 px-4 bg-complement-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Seu Kit de Transformação Completo
          </h2>
          <p className="text-lg text-support max-w-2xl mx-auto">
            Produtos cientificamente formulados para resultados extraordinários
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-[6px] border overflow-hidden flex flex-col h-full py-6 px-6 ${
                product.picked ? "border-elevita border-2" : "border-gray-100"
              }`}
            >
              {product.badge && (
                <div className="text-center">
                  <span className="text-support px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                    {product.badge}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-center overflow-clip">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="object-contain"
                  priority={product.id <= 2}
                />
              </div>

              <div className="text-center flex flex-col flex-grow">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-support mb-4">{product.description}</p>

                <div className="text-center mb-2">
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through block">
                      de R$ {product.originalPrice} por:
                    </span>
                  )}
                  <span className="text-4xl font-extrabold text-elevita block">
                    R$ {product.price}
                  </span>
                </div>

                <div className="text-center mb-4">
                  <span className="text-sm text-support">
                    ou 12x de R${" "}
                    {(product.price / 12).toFixed(2).replace(".", ",")} sem
                    juros
                  </span>
                </div>

                <div className="mt-auto flex flex-col items-center justify-center">
                  <Button variant="secondary">Comprar agora</Button>

                  <div className="text-center mt-3">
                    <span className="inline-flex items-center text-elevita font-bold gap-2 text-sm">
                      <Truck /> Frete Grátis
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
