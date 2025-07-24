import { LockKeyhole, Repeat } from "lucide-react";
import VideoPlayer from "./video-player";
import Button from "../button";
import Link from "next/link";

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
        <Link href={"#products"}>
          <Button variant="primary" className="mt-9">
            Garantir meu Kit Hoje Mesmo
          </Button>
        </Link>
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
