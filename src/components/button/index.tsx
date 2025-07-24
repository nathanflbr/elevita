import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "callToAction";
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
}: ButtonProps) {
  const variants = {
    primary: {
      button: "bg-elevita text-white",
      icon: "bg-white/40 border-white",
    },
    secondary: {
      button: "text-[#566624]",
      icon: "bg-[#6D812D] border-[#BBD85E]",
    },
    callToAction: {
      button: "text-[#D43B4B]",
      icon: "bg-[#D43B4B] border-[#D43B4B]",
    },
  };

  const currentVariant = variants[variant];

  return (
    <button
      onClick={onClick}
      className={`flex items-center text-start gap-3 ${
        variant === "secondary" ? "bg-[#BBD85E]" : currentVariant.button
      } px-4 py-3 rounded-full font-semibold hover:cursor-pointer ${className}`}
    >
      <div className={`${currentVariant.icon} rounded-full p-2 border`}>
        <div>
          <ArrowUpRight
            size={variant === "secondary" ? 14 : 20}
            color={variant === "secondary" ? "#BBD85E" : "white"}
          />
        </div>
      </div>
      {children}
    </button>
  );
}
