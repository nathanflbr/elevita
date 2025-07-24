import { ArrowUpRight, LockKeyhole, Repeat } from "lucide-react";
import VideoPlayer from "./video-player";

export default function Header() {
  return (
    <header className="test min-h-[720px] py-[72px] px-3 bg-cover bg-center bg-no-repeat">
      <div className="bg-layer-three"></div>
      <div className="flex flex-col items-center relative z-10 max-w-[842px] mx-auto">
        <h1 className="text-center text-4xl font-bold text-elevita leading-8 md:text-5xl md:leading-11">
          Transforme Sua Saúde e Beleza com Nossos Nutraceuticos Revolucionários
        </h1>
        <VideoPlayer
          className="pt-9"
          videoId="dQw4w9WgXcQ"
          title="Descubra o Segredo dos Nutracêuticos"
          description="Assista ao vídeo completo e entenda como transformar sua saúde de forma natural"
          showControls={true}
          showInfo={true}
        />
        <button className="flex items-center text-start gap-3 bg-elevita text-white px-4 py-3 rounded-full mt-9 font-semibold hover:cursor-pointer">
          <div className="bg-white/40 rounded-full p-2 w-fit border border-white">
            <ArrowUpRight />
          </div>
          Garantir meu Kit Hoje Mesmo
        </button>
        <ul className="flex flex-col justify-center items-center text-support font-semibold mt-6 gap-3 xs:flex-row">
          <li className="flex items-center gap-2">
            <LockKeyhole /> Compra Segura
          </li>
          <li className="flex items-center gap-2">
            <Repeat /> Dias de Garantia
          </li>
        </ul>
      </div>
    </header>
  );
}
