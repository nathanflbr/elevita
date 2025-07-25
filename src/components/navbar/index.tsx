import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex bg-white items-center justify-center min-h-[68px]">
      <Link href="/">
        <div className="relative w-[155px] h-[42px]">
          <Image
            src="/logo/elevita.png"
            alt="Elevita GRUPOSIX"
            fill
            sizes="155px"
            className="object-contain"
            priority={true}
          />
        </div>
      </Link>
    </nav>
  );
}
