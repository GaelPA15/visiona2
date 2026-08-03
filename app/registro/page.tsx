"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";

import Link from "next/link";
import {
  useState,
  type FormEvent,
} from "react";

import { useAuth } from "@/components/AuthProvider";
import Logo from "@/components/Logo";

const interestOptions = [
  "Tecnología",
  "Empleo",
  "Emprendimiento",
  "Finanzas",
  "Diseño",
  "Bienestar",
  "Educación",
  "Comunidad",
];

export default function RegisterPage() {
  const { register } = useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [stage, setStage] =
    useState("");

  const [mainGoal, setMainGoal] =
    useState("");

  const [interests, setInterests] =
    useState<string[]>([]);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    acceptedTerms,
    setAcceptedTerms,
  ] = useState(false);

  const [message, setMessage] =
    useState("");

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    accountCreated,
    setAccountCreated,
  ] = useState(false);

  const [
    registeredName,
    setRegisteredName,
  ] = useState("");

  const [
    registeredEmail,
    setRegisteredEmail,
  ] = useState("");

  function toggleInterest(
    interest: string,
  ): void {
    setInterests((currentInterests) => {
      if (
        currentInterests.includes(interest)
      ) {
        return currentInterests.filter(
          (currentInterest) =>
            currentInterest !== interest,
        );
      }

      return [
        ...currentInterests,
        interest,
      ];
    });
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    setMessage("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setMessage(
        "Completa tu nombre, correo y contraseña.",
      );

      return;
    }

    if (!stage) {
      setMessage(
        "Selecciona la etapa en la que te encuentras.",
      );

      return;
    }

    if (!mainGoal) {
      setMessage(
        "Selecciona qué quieres lograr primero.",
      );

      return;
    }

    if (interests.length === 0) {
      setMessage(
        "Selecciona al menos un interés.",
      );

      return;
    }

    if (password.length < 8) {
      setMessage(
        "La contraseña debe tener al menos 8 caracteres.",
      );

      return;
    }

    if (
      password !== confirmPassword
    ) {
      setMessage(
        "Las contraseñas no coinciden.",
      );

      return;
    }

    if (!acceptedTerms) {
      setMessage(
        "Acepta los términos para continuar.",
      );

      return;
    }

    setSubmitting(true);

    window.setTimeout(() => {
      const result = register({
        name,
        email,
        password,
        stage,
        mainGoal,
        interests,
      });

      if (!result.success) {
        setMessage(
          result.message ??
            "No fue posible crear la cuenta.",
        );

        setSubmitting(false);
        return;
      }

      const normalizedEmail =
        email.trim().toLowerCase();

      localStorage.setItem(
        "visiona_last_registered_email",
        normalizedEmail,
      );

      setRegisteredName(name.trim());
      setRegisteredEmail(normalizedEmail);
      setAccountCreated(true);
      setSubmitting(false);
    }, 800);
  }

  return (
    <main className="auth-page auth-page-register">
      <section className="auth-showcase register-showcase">
        <div className="auth-showcase-overlay" />

        <div className="auth-showcase-content">
          <Logo light />

          <div className="auth-showcase-message">
            <div className="eyebrow eyebrow-dark">
              <Sparkles size={16} />
              Tu historia comienza ahora
            </div>

            <h1>
              Construye una vida con dirección,
              propósito y posibilidades.
            </h1>

            <p>
              Crea tu perfil y comienza a
              descubrir rutas profesionales,
              oportunidades y herramientas
              diseñadas para ti.
            </p>

            <div className="register-benefits">
              <span>
                <Check size={18} />
                Perfil personalizado
              </span>

              <span>
                <Check size={18} />
                Recomendaciones profesionales
              </span>

              <span>
                <Check size={18} />
                Metas y proyecto de vida
              </span>
            </div>
          </div>

          <span className="auth-showcase-footer">
            Tu futuro empieza cuando
            descubres quién eres
          </span>
        </div>
      </section>

      <section className="auth-form-section">
        <div className="auth-form-wrapper register-form-wrapper">
          <Link
            href="/"
            className="auth-back-link"
          >
            <ArrowLeft size={18} />
            Volver al inicio
          </Link>

          <div className="auth-mobile-logo">
            <Logo />
          </div>

          {accountCreated ? (
            <div className="registration-success-card">
              <div className="registration-success-icon">
                <CheckCircle2 size={42} />
              </div>

              <span className="registration-success-label">
                REGISTRO COMPLETADO
              </span>

              <h2>
                ¡Cuenta creada correctamente!
              </h2>

              <p>
                Hola,{" "}
                <strong>
                  {registeredName}
                </strong>
                . Tu espacio en Visiona ya
                está preparado.
              </p>

              <div className="registered-account-summary">
                <span>
                  Correo registrado
                </span>

                <strong>
                  {registeredEmail}
                </strong>
              </div>

              <p className="registration-login-message">
                Ahora inicia sesión utilizando
                tu correo y la contraseña que
                acabas de registrar.
              </p>

              <Link
                href="/iniciar-sesion"
                className="button button-primary registration-login-button"
              >
                Ir a iniciar sesión
                <ArrowRight size={19} />
              </Link>

              <Link
                href="/"
                className="registration-home-link"
              >
                Regresar a la página principal
              </Link>
            </div>
          ) : (
            <>
              <div className="auth-heading">
                <span>
                  Comienza gratis
                </span>

                <h2>
                  Crea tu cuenta en Visiona
                </h2>

                <p>
                  Cuéntanos un poco sobre ti
                  para preparar una experiencia
                  relacionada con tus objetivos.
                </p>
              </div>

              <form
                className="auth-form register-complete-form"
                onSubmit={handleSubmit}
              >
                <label>
                  Nombre completo

                  <div className="auth-input-wrapper">
                    <UserRound size={19} />

                    <input
                      type="text"
                      placeholder="Escribe tu nombre completo"
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target.value,
                        )
                      }
                      autoComplete="name"
                    />
                  </div>
                </label>

                <label>
                  Correo electrónico

                  <div className="auth-input-wrapper">
                    <Mail size={19} />

                    <input
                      type="email"
                      placeholder="nombre@correo.com"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value,
                        )
                      }
                      autoComplete="email"
                    />
                  </div>
                </label>

                <div className="register-form-row">
                  <label>
                    Contraseña

                    <div className="auth-input-wrapper">
                      <LockKeyhole
                        size={19}
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChange={(event) =>
                          setPassword(
                            event.target.value,
                          )
                        }
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        className="password-visibility"
                        onClick={() =>
                          setShowPassword(
                            (current) =>
                              !current,
                          )
                        }
                        aria-label={
                          showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                      >
                        {showPassword ? (
                          <EyeOff
                            size={19}
                          />
                        ) : (
                          <Eye
                            size={19}
                          />
                        )}
                      </button>
                    </div>
                  </label>

                  <label>
                    Confirmar contraseña

                    <div className="auth-input-wrapper">
                      <LockKeyhole
                        size={19}
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Repite la contraseña"
                        value={
                          confirmPassword
                        }
                        onChange={(event) =>
                          setConfirmPassword(
                            event.target.value,
                          )
                        }
                        autoComplete="new-password"
                      />
                    </div>
                  </label>
                </div>

                <label>
                  ¿En qué etapa te encuentras?

                  <select
                    className="visiona-select"
                    value={stage}
                    onChange={(event) =>
                      setStage(
                        event.target.value,
                      )
                    }
                  >
                    <option value="">
                      Selecciona una opción
                    </option>

                    <option value="Preparatoria">
                      Estudio la preparatoria
                    </option>

                    <option value="Universidad">
                      Estudio la universidad
                    </option>

                    <option value="Recién egresado">
                      Soy recién egresado
                    </option>

                    <option value="Buscando empleo">
                      Estoy buscando empleo
                    </option>

                    <option value="Emprendiendo">
                      Estoy emprendiendo
                    </option>

                    <option value="Reinvención profesional">
                      Quiero reinventarme
                      profesionalmente
                    </option>
                  </select>
                </label>

                <label>
                  ¿Qué quieres lograr primero?

                  <select
                    className="visiona-select"
                    value={mainGoal}
                    onChange={(event) =>
                      setMainGoal(
                        event.target.value,
                      )
                    }
                  >
                    <option value="">
                      Selecciona tu objetivo
                    </option>

                    <option value="Descubrir mi vocación">
                      Descubrir mi vocación
                    </option>

                    <option value="Encontrar empleo">
                      Encontrar empleo
                    </option>

                    <option value="Crear un negocio">
                      Crear un negocio
                    </option>

                    <option value="Aprender nuevas habilidades">
                      Aprender nuevas habilidades
                    </option>

                    <option value="Construir mi proyecto de vida">
                      Construir mi proyecto
                      de vida
                    </option>

                    <option value="Mejorar mi bienestar">
                      Mejorar mi bienestar
                    </option>
                  </select>
                </label>

                <fieldset className="interests-fieldset">
                  <legend>
                    ¿Qué temas te interesan?
                  </legend>

                  <p>
                    Puedes seleccionar más de uno.
                  </p>

                  <div className="interest-options">
                    {interestOptions.map(
                      (interest) => {
                        const selected =
                          interests.includes(
                            interest,
                          );

                        return (
                          <button
                            key={interest}
                            type="button"
                            className={
                              selected
                                ? "interest-option interest-option-selected"
                                : "interest-option"
                            }
                            onClick={() =>
                              toggleInterest(
                                interest,
                              )
                            }
                          >
                            {selected && (
                              <Check
                                size={14}
                              />
                            )}

                            {interest}
                          </button>
                        );
                      },
                    )}
                  </div>
                </fieldset>

                <label className="terms-label">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) =>
                      setAcceptedTerms(
                        event.target.checked,
                      )
                    }
                  />

                  <span>
                    Acepto los términos de uso
                    y el aviso de privacidad
                    de Visiona.
                  </span>
                </label>

                {message && (
                  <div className="auth-error">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  className="button button-primary auth-submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Creando tu cuenta..."
                    : "Registrarme"}

                  {!submitting && (
                    <ArrowRight
                      size={19}
                    />
                  )}
                </button>
              </form>

              <p className="auth-switch">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/iniciar-sesion">
                  Inicia sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}