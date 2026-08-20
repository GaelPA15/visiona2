import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Compass,
  HeartPulse,
  Lightbulb,
  Network,
  Play,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import Logo from "@/components/Logo";

const features = [
  {
    icon: Compass,
    title: "Descubre quién eres",
    description:
      "Conoce tus intereses, talentos, habilidades y áreas profesionales ideales.",
    className: "feature-purple",
  },
  {
    icon: BriefcaseBusiness,
    title: "Encuentra oportunidades",
    description:
      "Explora primeros empleos, prácticas profesionales y vacantes para jóvenes.",
    className: "feature-blue",
  },
  {
    icon: Lightbulb,
    title: "Construye tu negocio",
    description:
      "Convierte tus ideas en proyectos mediante herramientas y rutas prácticas.",
    className: "feature-orange",
  },
  {
    icon: Target,
    title: "Diseña tu futuro",
    description:
      "Define metas, visualiza escenarios y crea un proyecto de vida realista.",
    className: "feature-green",
  },
  {
    icon: HeartPulse,
    title: "Cuida tu bienestar",
    description:
      "Registra hábitos, emociones y avances dentro de un espacio de apoyo.",
    className: "feature-pink",
  },
  {
    icon: Network,
    title: "Conecta y colabora",
    description:
      "Encuentra personas con intereses similares y construye proyectos en equipo.",
    className: "feature-cyan",
  },
];

const steps = [
  {
    number: "01",
    title: "Cuéntanos sobre ti",
    description:
      "Responde algunas preguntas sobre tus intereses, habilidades y objetivos.",
  },
  {
    number: "02",
    title: "Descubre tus posibilidades",
    description:
      "Visiona analiza tu perfil y te presenta carreras, empleos e ideas compatibles.",
  },
  {
    number: "03",
    title: "Construye tu ruta",
    description:
      "Obtén acciones, metas, cursos y oportunidades para avanzar paso a paso.",
  },
];

export default function HomePage() {
  return (
    <main className="landing-page">
      <nav className="landing-navbar">
        <div className="landing-container navbar-content">
          <Logo />

          <div className="landing-nav-links">
            <a href="#funciones">Funciones</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#impacto">Impacto</a>
          </div>

          <div className="landing-nav-actions">
            <Link href="/iniciar-sesion" className="navbar-login">
              Iniciar sesión
            </Link>

            <Link href="/registro" className="button button-primary button-small">
              Crear cuenta
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-decoration hero-decoration-one" />
        <div className="hero-decoration hero-decoration-two" />

        <div className="landing-container hero-grid">
          <div className="hero-content">
            <div className="eyebrow">
              <Sparkles size={16} />
              Tu futuro comienza aquí
            </div>

            <h1>
              Descubre quién quieres ser y{" "}
              <span>construye tu futuro.</span>
            </h1>

            <p className="hero-description">
              Visiona reúne orientación, oportunidades, aprendizaje,
              emprendimiento y bienestar en un solo lugar creado para jóvenes
              que quieren encontrar su camino.
            </p>

            <div className="hero-actions">
              <Link href="/registro" className="button button-primary">
                Comenzar mi camino
                <ArrowRight size={19} />
              </Link>

              <a href="#como-funciona" className="button button-secondary">
                <span className="play-icon">
                  <Play size={16} fill="currentColor" />
                </span>
                Conocer Visiona
              </a>
            </div>

            <div className="hero-trust">
              <div className="hero-avatars">
                <span>G</span>
                <span>M</span>
                <span>A</span>
                <span>+</span>
              </div>

              <div>
                <div className="hero-stars">★★★★★</div>
                <p>Una plataforma pensada para tu crecimiento</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow" />

            <div className="future-card">
              <div className="future-card-header">
                <div>
                  <span className="future-card-label">MI RUTA PERSONAL</span>
                  <h3>Hola, Alberto 👋</h3>
                </div>

                <div className="future-avatar">G</div>
              </div>

              <div className="future-progress">
                <div className="future-progress-copy">
                  <span>Tu progreso esta semana</span>
                  <strong>68%</strong>
                </div>

                <div className="progress-track">
                  <div className="progress-value progress-value-68" />
                </div>
              </div>

              <div className="future-recommendation">
                <div className="recommendation-icon">
                  <Rocket size={21} />
                </div>

                <div>
                  <span>Recomendación para ti</span>
                  <strong>Explora emprendimiento digital</strong>
                  <p>Tu perfil tiene 89% de compatibilidad.</p>
                </div>

                <ChevronRight size={20} />
              </div>

              <div className="future-mini-grid">
                <div className="future-mini-card">
                  <BriefcaseBusiness size={19} />
                  <span>Vacantes nuevas</span>
                  <strong>24</strong>
                </div>

                <div className="future-mini-card">
                  <BookOpen size={19} />
                  <span>Cursos activos</span>
                  <strong>3</strong>
                </div>

                <div className="future-mini-card">
                  <Target size={19} />
                  <span>Metas logradas</span>
                  <strong>7</strong>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <div className="floating-icon floating-icon-green">
                <TrendingUp size={18} />
              </div>
              <div>
                <span>Progreso mensual</span>
                <strong>+24%</strong>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <div className="floating-icon floating-icon-purple">
                <Sparkles size={18} />
              </div>
              <div>
                <span>Nueva coincidencia</span>
                <strong>Diseño UX/UI</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-stats" id="impacto">
        <div className="landing-container stats-grid">
          <article>
            <strong>7</strong>
            <span>áreas integradas</span>
          </article>

          <article>
            <strong>360°</strong>
            <span>visión de tu futuro</span>
          </article>

          <article>
            <strong>1</strong>
            <span>ruta personalizada</span>
          </article>

          <article>
            <strong>∞</strong>
            <span>posibilidades para crecer</span>
          </article>
        </div>
      </section>

      <section className="features-section" id="funciones">
        <div className="landing-container">
          <div className="section-heading">
            <div className="eyebrow eyebrow-centered">
              <Sparkles size={16} />
              Todo lo que necesitas
            </div>

            <h2>Un ecosistema para construir tu mejor versión</h2>

            <p>
              No necesitas tener resuelto todo tu futuro. Visiona te ayuda a
              descubrir posibilidades y convertirlas en acciones.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  className={`feature-card ${feature.className}`}
                  key={feature.title}
                >
                  <div className="feature-icon">
                    <Icon size={25} />
                  </div>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>

                  <span className="feature-link">
                    Explorar
                    <ArrowRight size={17} />
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="process-section" id="como-funciona">
        <div className="landing-container process-grid">
          <div className="process-copy">
            <div className="eyebrow">
              <Compass size={16} />
              Una ruta hecha para ti
            </div>

            <h2>Empieza sin tener todas las respuestas</h2>

            <p>
              Visiona convierte tus intereses, habilidades y sueños en una ruta
              clara con objetivos que sí puedes comenzar a trabajar.
            </p>

            <div className="process-benefits">
              <span>
                <CheckCircle2 size={19} />
                Recomendaciones personalizadas
              </span>

              <span>
                <CheckCircle2 size={19} />
                Avance guardado en tu perfil
              </span>

              <span>
                <CheckCircle2 size={19} />
                Herramientas prácticas y visuales
              </span>
            </div>

            <Link href="/registro" className="button button-primary">
              Crear mi ruta
              <ArrowRight size={19} />
            </Link>
          </div>

          <div className="steps-list">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">{step.number}</span>

                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="community-section">
        <div className="landing-container community-content">
          <div className="community-icon">
            <Users size={36} />
          </div>

          <h2>No tienes que descubrir tu futuro a solas</h2>

          <p>
            Comparte proyectos, encuentra colaboradores y aprende con personas
            que también están construyendo su siguiente etapa.
          </p>

          <Link href="/registro" className="button button-light">
            Unirme a Visiona
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container footer-grid">
          <div>
            <Logo light />
            <p>
              Encuentra tu camino, desarrolla tu potencial y construye la vida
              que imaginas.
            </p>
          </div>

          <div>
            <strong>Plataforma</strong>
            <a href="#funciones">Descubre</a>
            <a href="#funciones">Empleos</a>
            <a href="#funciones">Negocios</a>
          </div>

          <div>
            <strong>Bienestar</strong>
            <a href="#funciones">Proyecto de vida</a>
            <a href="#funciones">Salud</a>
            <a href="#funciones">Comunidad</a>
          </div>

          <div>
            <strong>Visiona</strong>
            <a href="#como-funciona">Cómo funciona</a>
            <Link href="/iniciar-sesion">Iniciar sesión</Link>
            <Link href="/registro">Crear cuenta</Link>
          </div>
        </div>

        <div className="landing-container footer-bottom">
          <span>© 2026 Visiona. Proyecto académico.</span>
          <span>Tu futuro empieza cuando descubres quién eres.</span>
        </div>
      </footer>
    </main>
  );
}