import Button from "@/components/button";
import { Check, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/data/products";
import { redirect } from "next/navigation";

interface ObrigadoProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function Obrigado({ searchParams }: ObrigadoProps) {
  const { id: productId } = await searchParams;

  if (!productId) {
    redirect("/#products");
  }

  const product = getProductById(Number(productId));

  if (!product) {
    redirect("/#products");
  }
  return (
    <>
      <section className="flex flex-col justify-center min-h-screen bg-[#FEF4F9] py-12 px-4">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#24995E] rounded-[6px] mx-auto flex items-center justify-center mb-4">
            <Check color="#fff" />
          </div>
          <h1 className="text-2xl leading-6 md:text-4xl md:leading-9 font-bold text-gray-900 mb-2 text-center">
            Obrigado pela sua compra!
          </h1>
          <p className="text-gray-600">Seu pedido foi confirmado com sucesso</p>
        </div>
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 md:p-8">
          <div className="bg-white">
            <div className="flex flex-col sm:flex-row items-center mb-4 gap-2 justify-center text-center sm:text-left">
              <Package className="mx-auto sm:mx-0" />
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                Detalhes do Pedido
              </h2>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Número do Pedido
                </p>
                <p className="text-sm text-gray-600">#ENC-2024-001234</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-6 py-3 rounded-full">
                Confirmado
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center mb-6 p-4 bg-gray-50 rounded-lg gap-4">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-lg flex-shrink-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-medium text-gray-900 text-lg sm:text-base">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">Quantidade: 1</p>
              </div>
              <div className="text-right">
                {product.originalPrice && (
                  <p className="text-sm text-gray-500 line-through">
                    {product.originalPrice.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                )}
                <p className="font-semibold text-green-600 text-lg sm:text-base mt-2 sm:mt-0">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete:</span>
                <span className="text-green-600 font-medium">Grátis</span>
              </div>
              {product.originalPrice && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Desconto:</span>
                  <span className="text-green-600 font-medium">
                    -{(product.originalPrice - product.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Link href={"/"}>
            <Button className="w-full items-center justify-center">
              Continuar
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
