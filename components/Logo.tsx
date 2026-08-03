import Link from "next/link";
import { Sparkles } from "lucide-react";

interface LogoProps {
  compact?: boolean;
  light?: boolean;
}

export default function Logo({
  compact = false,
  light = false,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`visiona-logo ${light ? "visiona-logo-light" : ""}`}
      aria-label="Ir al inicio de Visiona"
    >
      <span className="visiona-logo-icon">
        <Sparkles size={20} strokeWidth={2.5} />
      </span>

      {!compact && (
        <span className="visiona-logo-name">
          Visiona<span>.</span>
        </span>
      )}
    </Link>
  );
}