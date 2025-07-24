import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex bg-white items-center justify-center min-h-[68px]">
      <div>
        <Image
          src="/elevita-logo.svg"
          alt="Elevita GRUPOSIX"
          width={155}
          height={42}
        />
      </div>
    </nav>
  );
}
