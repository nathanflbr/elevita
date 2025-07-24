export default function Header() {
  return (
    <header className="flex flex-col items-center pt-[72px]">
      <h1 className="text-center text-4xl font-bold text-elevita leading-8">
        Transforme Sua Saúde e Beleza com Nossos Nutraceuticos Revolucionários
      </h1>
      <button className="bg-elevita text-white px-8 py-3 rounded-full mt-9 font-semibold">
        Garantir meu Kit Hoje Mesmo
      </button>
      <ul className="flex flex-col justify-center items-center text-support font-semibold mt-6">
        <li>Compra Segura</li>
        <li>7 Dias de Garantia</li>
      </ul>
    </header>
  );
}
