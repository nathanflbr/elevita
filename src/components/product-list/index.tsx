import { Truck } from "lucide-react";
import Image from "next/image";
import Button from "../button";
import Link from "next/link";
import { getAllProducts } from "@/data/products";
import { Product } from "@/types/product";

export default function ProductList() {
  const products = getAllProducts();
  
  return (
    <section className="py-16 px-4 bg-complement-background">
      <div id="products" className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Seu Kit de Transformação Completo
          </h2>
          <p className="text-lg text-support max-w-2xl mx-auto">
            Produtos cientificamente formulados para resultados extraordinários
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: Product) => (
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
                      de {product.originalPrice.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })} por:
                    </span>
                  )}
                  <span className="text-4xl font-extrabold text-elevita block">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>

                <div className="text-center mb-4">
                  <span className="text-sm text-support">
                    ou 12x de {(product.price / 12).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })} sem juros
                  </span>
                </div>

                <div className="mt-auto flex flex-col items-center justify-center">
                  <Link href={product.linkCheckout}>
                    <Button variant="secondary">Comprar agora</Button>
                  </Link>

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
