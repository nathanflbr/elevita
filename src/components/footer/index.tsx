import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#FEF4F9] pt-14 lg:pt-36">
      <div className="max-w-4xl mx-auto text-center px-3">
        <div className="mb-6">
          <Image
            src="/gruposix-logo.svg"
            alt="Grupo SIX"
            width={200}
            height={80}
            className="mx-auto"
          />
        </div>
        <p className="text-gray-600 text-sm mb-6 font-extrabold">
          CNPJ: 00.000.000/0000-00
        </p>
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">
            Os resultados podem variar de pessoa para pessoa. Consulte um
            profissional de saúde antes de iniciar qualquer novo suplemento ou
            programa de bem-estar. Este produto não se destina a diagnosticar,
            tratar, curar ou prevenir qualquer doença.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <a
            href="#"
            className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium"
          >
            Política de Privacidade
          </a>
          <a
            href="#"
            className="text-red-500 hover:text-red-600 transition-colors duration-200 font-medium"
          >
            Termos de Uso
          </a>
        </div>
      </div>
      <div className="bg-white px-3 flex items-center justify-center text-center">
        <p className="text-gray-500 text-sm min-h-14 py-8">
          © 2025 GrupoSIX. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
