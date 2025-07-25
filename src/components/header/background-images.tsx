import Image from "next/image";

export default function BackgroundImages() {
  return (
    <>
      <Image
        src="/bgs/bg-one-optimized.png"
        alt=""
        fill
        priority
        fetchPriority="high"
        quality={85}
        className="object-cover object-top hidden lg:block"
        sizes="(min-width: 1024px) 100vw, 0px"
      />

      <Image
        src="/bgs/bg-phone-layer-one.png"
        alt=""
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center opacity-30 lg:hidden"
        sizes="(max-width: 1023px) 100vw, 0px"
      />

      <Image
        src="/bgs/bg-phone-layer-two.png"
        alt=""
        width={356}
        height={584}
        loading="eager"
        className="absolute top-0 right-[-30px] opacity-40 z-[1] sm:hidden"
        sizes="356px"
      />

      <Image
        src="/bgs/bg-phone-layer-three.png"
        alt=""
        width={570}
        height={760}
        loading="eager"
        className="absolute top-0 left-0 opacity-30 z-[1] sm:hidden"
        sizes="570px"
      />

      <Image
        src="/bgs/bg-phone-layer-two-1024.png"
        alt=""
        width={490}
        height={753}
        loading="eager"
        className="absolute top-0 right-[-30px] opacity-100 z-[1] hidden sm:block lg:hidden"
        sizes="490px"
      />

      <Image
        src="/bgs/bg-phone-layer-one-1024.png"
        alt=""
        width={1024}
        height={760}
        loading="eager"
        className="absolute top-0 left-0 opacity-50 z-[1] hidden sm:block lg:hidden"
        sizes="1024px"
      />
    </>
  );
}
