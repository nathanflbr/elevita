"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-elevita to-[#FF8495] py-8 px-4 flex items-center justify-center">
      <div className="relative max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-2xl relative">
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rotate-45"></div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Ops! Página não encontrada
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Parece que a página que você está procurando não existe ou foi removida. Que tal voltar para a página inicial e descobrir nossos produtos incríveis?
            </p>

            <Button
              className="w-full justify-center"
              onClick={() => router.push("/")}
            >
              Voltar para Início
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}