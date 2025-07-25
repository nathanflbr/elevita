import { LockKeyhole, Repeat } from "lucide-react";
import Button from "../button";
import Link from "next/link";
import BackgroundImages from "./background-images";
import VideoPlayer from "./video-player";

export default function Header() {
  return (
    <header className="header-optimized min-h-[720px] py-[72px] px-3 relative overflow-clip">
      <BackgroundImages />
      <div className="flex flex-col items-center relative z-10 max-w-[842px] mx-auto">
        <h1 className="text-center text-4xl font-bold text-elevita leading-8 md:text-5xl md:leading-11">
          Transforme Sua Saúde e Beleza com Nossos Nutraceuticos Revolucionários
        </h1>
        <VideoPlayer
          className="pt-9"
          videoId="dQw4w9WgXcQ"
          title="Descubra o Segredo dos Nutracêuticos"
          description="Assista ao vídeo completo e entenda como transformar sua saúde de forma natural"
          thumbnailQuality="hqdefault"
          autoplay={false}
          showControls={true}
          showInfo={true}
          rootMargin="200px"
          threshold={0.05}
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
