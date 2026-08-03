"use client";

import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Flame,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import Link from "next/link";

import { useAuth } from "@/components/AuthProvider";

const quickActions = [
  {
    href: "/dashboard/descubre",
    title: "Continuar mi test",
    description: "Descubre nuevas áreas compatibles contigo.",
    icon: Compass,
    className: "quick-action-purple",
  },
  {
    href: "/dashboard/empleos",
    title: "Explorar empleos",
    description: "Encuentra oportunidades pensadas para jóvenes.",
    icon: BriefcaseBusiness,
    className: "quick-action-blue",
  },
  {
    href: "/dashboard/negocios",
    title: "Crear una idea",
    description: "Genera una propuesta de negocio personalizada.",
    icon: Lightbulb,
    className: "quick-action-orange",
  },
  {
    href: "/dashboard/futuro",
    title: "Agregar una meta",
    description: "Construye paso a paso tu proyecto de vida.",
    icon: Target,
    className: "quick-action-green",
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const firstName = user?.name.split(" ")[0] ?? "Gael";

  return (
    <div className="dashboard-home">
      <section className="dashboard-welcome">
        <div className="dashboard-welcome-copy">
          <div className="dashboard-greeting">
            <Sparkles size={17} />
            Domingo de nuevas posibilidades
          </div>

          <h2>¡Hola, {firstName}! 👋</h2>

          <p>
            Cada paso que das te acerca a una versión más clara de tu futuro.
            Aquí tienes lo más importante para continuar hoy.
          </p>

          <Link href="/dashboard/descubre" className="button button-light">
            Continuar mi ruta
            <ArrowRight size={19} />
          </Link>
        </div>

        <div className="welcome-illustration">
          <div className="welcome-orbit welcome-orbit-one" />
          <div className="welcome-orbit welcome-orbit-two" />

          <div className="welcome-rocket">
            <Rocket size={52} />
          </div>

          <div className="welcome-floating welcome-floating-one">
            <Target size={18} />
            <span>Meta definida</span>
          </div>

          <div className="welcome-floating welcome-floating-two">
            <TrendingUp size={18} />
            <span>+24% progreso</span>
          </div>
        </div>
      </section>

      <section className="dashboard-statistics">
        <article className="statistic-card">
          <div className="statistic-icon statistic-purple">
            <Flame size={22} />
          </div>

          <div>
            <span>Racha actual</span>
            <strong>7 días</strong>
          </div>

          <small>+2 esta semana</small>
        </article>

        <article className="statistic-card">
          <div className="statistic-icon statistic-blue">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Metas completadas</span>
            <strong>7 de 12</strong>
          </div>

          <small>58% completado</small>
        </article>

        <article className="statistic-card">
          <div className="statistic-icon statistic-orange">
            <BookOpen size={22} />
          </div>

          <div>
            <span>Cursos activos</span>
            <strong>3 cursos</strong>
          </div>

          <small>8 lecciones pendientes</small>
        </article>

        <article className="statistic-card">
          <div className="statistic-icon statistic-green">
            <Users size={22} />
          </div>

          <div>
            <span>Conexiones</span>
            <strong>26 personas</strong>
          </div>

          <small>4 nuevas esta semana</small>
        </article>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <span>ACCESOS RÁPIDOS</span>
            <h3>¿Qué quieres hacer hoy?</h3>
          </div>
        </div>

        <div className="quick-actions-grid">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                href={action.href}
                className={`quick-action-card ${action.className}`}
                key={action.title}
              >
                <div className="quick-action-icon">
                  <Icon size={24} />
                </div>

                <div>
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>

                <ArrowRight size={20} className="quick-action-arrow" />
              </Link>
            );
          })}
        </div>
      </section>

      <div className="dashboard-bottom-grid">
        <section className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>TU CAMINO</span>
              <h3>Progreso de tu perfil</h3>
            </div>

            <Link href="/dashboard/perfil">Ver perfil</Link>
          </div>

          <div className="profile-progress-area">
            <div className="profile-progress-circle">
              <div>
                <strong>68%</strong>
                <span>completado</span>
              </div>
            </div>

            <div className="profile-progress-list">
              <div className="profile-progress-item completed">
                <CheckCircle2 size={20} />

                <div>
                  <strong>Información personal</strong>
                  <span>Completado</span>
                </div>
              </div>

              <div className="profile-progress-item completed">
                <CheckCircle2 size={20} />

                <div>
                  <strong>Intereses profesionales</strong>
                  <span>Completado</span>
                </div>
              </div>

              <div className="profile-progress-item">
                <Compass size={20} />

                <div>
                  <strong>Test vocacional</strong>
                  <span>7 de 10 preguntas</span>
                </div>
              </div>

              <div className="profile-progress-item">
                <Target size={20} />

                <div>
                  <strong>Proyecto de vida</strong>
                  <span>Pendiente</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-panel recommendation-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>RECOMENDADO PARA TI</span>
              <h3>Tu siguiente oportunidad</h3>
            </div>

            <Sparkles size={22} />
          </div>

          <div className="recommendation-banner">
            <div className="recommendation-banner-icon">
              <Rocket size={29} />
            </div>

            <span>89% de compatibilidad</span>
            <h4>Emprendimiento digital</h4>

            <p>
              Tus intereses en tecnología, creatividad y liderazgo pueden
              combinarse para crear productos digitales.
            </p>

            <div className="recommendation-skills">
              <span>Tecnología</span>
              <span>Creatividad</span>
              <span>Liderazgo</span>
            </div>

            <Link href="/dashboard/negocios">
              Explorar esta ruta
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>

      <div className="dashboard-bottom-grid">
        <section className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>ACTIVIDAD</span>
              <h3>Tu semana en Visiona</h3>
            </div>

            <CalendarDays size={21} />
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon activity-purple">
                <ClipboardCheck size={19} />
              </div>

              <div>
                <strong>Solicitud enviada</strong>
                <span>Orientación para primer empleo</span>
              </div>

              <time>Hoy</time>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-blue">
                <BookOpen size={19} />
              </div>

              <div>
                <strong>Lección completada</strong>
                <span>Finanzas personales desde cero</span>
              </div>

              <time>Ayer</time>
            </div>

            <div className="activity-item">
              <div className="activity-icon activity-orange">
                <Lightbulb size={19} />
              </div>

              <div>
                <strong>Nueva idea guardada</strong>
                <span>Servicios digitales para negocios locales</span>
              </div>

              <time>30 jul.</time>
            </div>
          </div>
        </section>

        <section className="dashboard-panel next-event-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>PRÓXIMO EVENTO</span>
              <h3>Sesión de orientación</h3>
            </div>
          </div>

          <div className="event-date">
            <span>AGO</span>
            <strong>06</strong>
          </div>

          <div className="event-information">
            <strong>Construye tu primer perfil profesional</strong>
            <span>Miércoles · 5:00 p. m.</span>
            <p>Sesión grupal en línea · 45 minutos</p>
          </div>

          <button className="button button-secondary">
            Ver detalles
            <ArrowRight size={18} />
          </button>
        </section>
      </div>
    </div>
  );
}