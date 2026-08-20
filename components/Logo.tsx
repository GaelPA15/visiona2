import Link from "next/link";

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
      className={`visiona-logo ${
        light ? "visiona-logo-light" : ""
      }`}
      aria-label="Ir al inicio de Visiona"
    >
      <span className="visiona-logo-icon">
        <img
          src="/visiona-logo.jpg"
          alt="Logo de Visiona"
          className="visiona-logo-image"
        />
      </span>

      {!compact && (
        <span className="visiona-logo-name">
          Visiona<span>.</span>
        </span>
      )}
    </Link>
  );
}