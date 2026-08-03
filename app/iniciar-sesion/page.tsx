"use client";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { useAuth } from "@/components/AuthProvider";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleDemoAccount(): void {
    setEmail("gael@visiona.com");
    setPassword("Visiona123");
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Completa tu correo y contraseña.");
      return;
    }

    setSubmitting(true);

    window.setTimeout(() => {
      const result = login(email, password);

      if (!result.success) {
        setMessage(result.message ?? "No fue posible iniciar sesión.");
        setSubmitting(false);
        return;
      }

      router.push("/dashboard");
    }, 700);
  }

  return (
    <main className="auth-page">
      <section className="auth-showcase">
        <div className="auth-showcase-overlay" />

        <div className="auth-showcase-content">
          <Logo light />

          <div className="auth-showcase-message">
            <div className="eyebrow eyebrow-dark">
              <Sparkles size={16} />
              Continúa construyendo
            </div>

            <h1>Tu siguiente paso comienza donde lo dejaste.</h1>

            <p>
              Regresa a tus metas, descubre nuevas oportunidades y sigue
              construyendo el futuro que imaginas.
            </p>

            <div className="auth-quote">
              <span>“</span>
              No necesitas conocer todo el camino. Solo necesitas comenzar con
              el siguiente paso.
            </div>
          </div>

          <span className="auth-showcase-footer">
            Visiona · Descubre quién quieres ser
          </span>
        </div>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-wrapper">
          <Link href="/" className="auth-back-link">
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>

          <div className="auth-mobile-logo">
            <Logo />
          </div>

          <div className="auth-heading">
            <span>Bienvenido de nuevo</span>
            <h2>Inicia sesión en Visiona</h2>
            <p>Continúa avanzando en tu ruta personal y profesional.</p>
          </div>

          <button
            type="button"
            className="demo-account"
            onClick={handleDemoAccount}
          >
            <div className="demo-account-avatar">G</div>

            <div>
              <strong>Usar cuenta de demostración</strong>
              <span>Entrar como Gael</span>
            </div>

            <ArrowRight size={20} />
          </button>

          <div className="auth-divider">
            <span>o ingresa tus datos</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Correo electrónico

              <div className="auth-input-wrapper">
                <Mail size={19} />
                <input
                  type="email"
                  placeholder="nombre@correo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
            </label>

            <label>
              <div className="label-row">
                <span>Contraseña</span>
                <button type="button" className="forgot-password">
                  ¿La olvidaste?
                </button>
              </div>

              <div className="auth-input-wrapper">
                <LockKeyhole size={19} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Escribe tu contraseña"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-visibility"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </label>

            {message && <div className="auth-error">{message}</div>}

            <button
              type="submit"
              className="button button-primary auth-submit"
              disabled={submitting}
            >
              {submitting ? "Ingresando..." : "Iniciar sesión"}

              {!submitting && <ArrowRight size={19} />}
            </button>
          </form>

          <p className="auth-switch">
            ¿Todavía no tienes una cuenta?{" "}
            <Link href="/registro">Regístrate gratis</Link>
          </p>

          <div className="demo-credentials">
            <strong>Cuenta demo</strong>
            <span>Correo: gael@visiona.com</span>
            <span>Contraseña: Visiona123</span>
          </div>
        </div>
      </section>
    </main>
  );
}