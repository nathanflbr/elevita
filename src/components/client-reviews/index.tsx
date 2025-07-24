import { Star } from "lucide-react";
import Image from "next/image";
import Button from "../button";

interface Review {
  id: number;
  name: string;
  age: number;
  photo: string;
  review: string;
  stars: number;
}
const reviews: Review[] = [
  {
    id: 1,
    name: "Maria Silva",
    age: 34,
    photo: "/clients/avatar-1.png",
    review:
      "Incrível! Em apenas 3 meses usando o Elevita, perdi 12kg e me sinto muito mais disposta. Minha pele também melhorou significativamente. Recomendo para todas as minhas amigas!",
    stars: 5,
  },
  {
    id: 2,
    name: "Marília Souza",
    age: 42,
    photo: "/clients/avatar-2.png",
    review:
      "Amei o Elevita! Minha digestão foi muito melhor e a energia foi significativamente aumentada. Recomendo a todos que buscam uma vida mais saudável!",
    stars: 5,
  },
  {
    id: 3,
    name: "Ana Costa",
    age: 28,
    photo: "/clients/avatar-3.png",
    review:
      "Sofria com ansiedade e compulsão alimentar. O Elevita me ajudou a controlar esses sintomas e ainda consegui emagrecer de forma saudável. Mudou minha vida!",
    stars: 4,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "fill-elevita text-elevita" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ClientReviews() {
  return (
    <section className="py-16 px-4 bg-gray-50 lg:pt-24 lg:py-0">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold text-elevita mb-4">
            O Que Nossos Clientes Dizem
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-linear-to-b from-[#F83A4E4D] to-[#FF84951A] rounded-lg p-6 border border-elevita"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-20 h-20 rounded-[8px] overflow-hidden mr-4">
                  <Image
                    src={review.photo}
                    alt={review.name}
                    width={150}
                    height={150}
                    quality={100}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-2xl">
                    {review.name}
                  </h3>
                  <p className="text-sm text-support font-semibold">
                    {review.age} anos
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-700 font-semibold leading-relaxed mb-4">
                &ldquo;{review.review}&rdquo;
              </blockquote>
              <StarRating rating={review.stars} />
            </div>
          ))}
        </div>
        <div className="relative top-12">
          <div className="flex flex-col items-center p-8 bg-gradient-to-r from-[#D43B4B] to-[#FF8495] rounded-2xl mt-12 text-center text-white lg:mt-20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Não Perca Esta Oportunidade Única!
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Transforme sua vida hoje mesmo com nossos nutracêuticos premium
            </p>
            <div className="flex justify-center mb-6">
              <Button variant="callToAction" className="bg-white">
                Começar Minha Transformação Agora!
              </Button>
            </div>
            <p className="text-sm opacity-80">
              Oferta por tempo limitado - Últimas unidades disponíveis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
