"use client";

import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  ClipboardCheck,
  Compass,
  Crown,
  HeartPulse,
  Home,
  Lightbulb,
  LogOut,
  Menu,
  Search,
  Target,
  UserRound,
  Users,
  X,
} from "lucide-react";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  useAuth,
} from "@/components/AuthProvider";

import Logo from "@/components/Logo";

/* =====================================================
   NAVEGACIÓN
===================================================== */

const navigationItems = [
  {
    href: "/dashboard",
    label: "Inicio",
    icon: Home,
  },
  {
    href: "/dashboard/descubre",
    label: "Descubre",
    icon: Compass,
  },
  {
    href: "/dashboard/empleos",
    label: "Empleos",
    icon: BriefcaseBusiness,
  },
  {
    href: "/dashboard/negocios",
    label: "Negocios",
    icon: Lightbulb,
  },
  {
    href: "/dashboard/aprendizaje",
    label: "Aprendizaje",
    icon: BookOpen,
  },

  /*
    NUEVO APARTADO PREMIUM
  */
  {
    href: "/dashboard/premium",
    label: "Visiona Premium",
    icon: Crown,
  },

  {
    href: "/dashboard/salud",
    label: "Salud y bienestar",
    icon: HeartPulse,
  },
  {
    href: "/dashboard/futuro",
    label: "Mi futuro",
    icon: Target,
  },
  {
    href: "/dashboard/comunidad",
    label: "Comunidad",
    icon: Users,
  },
  {
    href: "/dashboard/solicitudes",
    label: "Solicitudes",
    icon: ClipboardCheck,
  },
];

/* =====================================================
   TÍTULOS DE LAS RUTAS
===================================================== */

const routeTitles: Record<string, string> = {
  "/dashboard":
    "Resumen",

  "/dashboard/descubre":
    "Descubre tu camino",

  "/dashboard/empleos":
    "Oportunidades laborales",

  "/dashboard/negocios":
    "Ideas y emprendimiento",

  "/dashboard/aprendizaje":
    "Aprendizaje",

  /*
    NUEVA RUTA PREMIUM
  */
  "/dashboard/premium":
    "Visiona Premium",

  "/dashboard/salud":
    "Salud y bienestar",

  "/dashboard/futuro":
    "Mi proyecto de vida",

  "/dashboard/comunidad":
    "Comunidad",

  "/dashboard/solicitudes":
    "Mis solicitudes",

  "/dashboard/perfil":
    "Mi perfil",
};

/* =====================================================
   DASHBOARD SHELL
===================================================== */

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const {
    user,
    loading,
    logout,
  } = useAuth();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  /*
    Si no existe una sesión,
    regresamos al inicio de sesión.
  */
  useEffect(() => {
    if (!loading && !user) {
      router.replace(
        "/iniciar-sesion",
      );
    }
  }, [
    loading,
    user,
    router,
  ]);

  /*
    Cerramos los menús cada vez
    que cambia la página.
  */
  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  /*
    Título superior dependiendo
    de la sección actual.
  */
  const currentTitle =
    useMemo(
      () =>
        routeTitles[pathname] ??
        "Visiona",
      [pathname],
    );

  function handleLogout(): void {
    logout();

    router.push("/");
  }

  /*
    Pantalla de carga mientras
    recuperamos la sesión.
  */
  if (loading || !user) {
    return (
      <main className="dashboard-loader">
        <Logo />

        <div className="loader-ring" />

        <p>
          Preparando tu espacio...
        </p>
      </main>
    );
  }

  const firstName =
    user.name.split(" ")[0];

  /*
    Gael es la cuenta principal
    con información precargada.

    Los usuarios nuevos empiezan
    desde cero.
  */
  const accountIsGael =
    user.id === "gael-demo";

  return (
    <div className="dashboard-shell">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`dashboard-sidebar ${
          sidebarOpen
            ? "dashboard-sidebar-open"
            : ""
        }`}
      >
        {/* LOGO */}

        <div className="sidebar-header">
          <Logo light />

          <button
            type="button"
            className="sidebar-close"
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        </div>

        {/* PERFIL */}

        <div className="sidebar-profile">
          <div className="sidebar-profile-avatar">
            {firstName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <strong>
              {firstName}
            </strong>

            <span>
              Nivel {user.level} · Explorador
            </span>
          </div>
        </div>

        {/* NIVEL */}

        <div className="sidebar-level">
          <div>
            <span>
              Tu siguiente nivel
            </span>

            <strong>
              {user.points} pts
            </strong>
          </div>

          <div className="sidebar-level-track">
            <span
              style={{
                width:
                  accountIsGael
                    ? "62%"
                    : "0%",
              }}
            />
          </div>
        </div>

        {/* NAVEGACIÓN */}

        <nav className="sidebar-navigation">
          <span className="sidebar-section-label">
            TU ESPACIO
          </span>

          {navigationItems.map(
            (navigationItem) => {
              const Icon =
                navigationItem.icon;

              const isActive =
                navigationItem.href ===
                "/dashboard"
                  ? pathname ===
                    "/dashboard"
                  : pathname.startsWith(
                      navigationItem.href,
                    );

              /*
                Gael tiene dos solicitudes
                iniciales.

                Las cuentas nuevas no muestran
                ningún número.
              */
              const showRequestsBadge =
                navigationItem.href ===
                  "/dashboard/solicitudes" &&
                accountIsGael;

              /*
                Detectamos el apartado Premium
                para mostrar la insignia PRO.
              */
              const isPremiumItem =
                navigationItem.href ===
                "/dashboard/premium";

              return (
                <Link
                  href={
                    navigationItem.href
                  }
                  key={
                    navigationItem.href
                  }
                  className={
                    isActive
                      ? "sidebar-link-active"
                      : ""
                  }
                >
                  <Icon size={20} />

                  <span>
                    {
                      navigationItem.label
                    }
                  </span>

                  {/* BADGE PREMIUM */}

                  {isPremiumItem && (
                    <small className="sidebar-premium-badge">
                      PRO
                    </small>
                  )}

                  {/* CONTADOR SOLICITUDES GAEL */}

                  {showRequestsBadge && (
                    <small>
                      2
                    </small>
                  )}
                </Link>
              );
            },
          )}
        </nav>

        {/* PARTE INFERIOR */}

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div>
              <Lightbulb size={18} />
            </div>

            <strong>
              Consejo del día
            </strong>

            <p>
              Los avances pequeños
              también construyen grandes
              cambios.
            </p>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={19} />

            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* =================================================
          OVERLAY MÓVIL
      ================================================= */}

      {sidebarOpen && (
        <button
          type="button"
          className="dashboard-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
          aria-label="Cerrar menú"
        />
      )}

      {/* =================================================
          CONTENIDO PRINCIPAL
      ================================================= */}

      <section className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-header">

          {/* IZQUIERDA */}

          <div className="dashboard-header-left">
            <button
              type="button"
              className="dashboard-menu-button"
              onClick={() =>
                setSidebarOpen(true)
              }
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>

            <div>
              <span>
                VISIONA
              </span>

              <h1>
                {currentTitle}
              </h1>
            </div>
          </div>

          {/* DERECHA */}

          <div className="dashboard-header-actions">

            {/* BUSCADOR */}

            <div className="dashboard-search">
              <Search size={18} />

              <input
                type="search"
                placeholder="Buscar en Visiona..."
              />
            </div>

            {/* NOTIFICACIONES */}

            <button
              type="button"
              className="dashboard-icon-button"
              aria-label="Notificaciones"
            >
              <Bell size={20} />

              {accountIsGael && (
                <span className="notification-dot" />
              )}
            </button>

            {/* PERFIL */}

            <div className="dashboard-profile-menu">
              <button
                type="button"
                className="dashboard-profile-button"
                onClick={() =>
                  setProfileOpen(
                    (current) =>
                      !current,
                  )
                }
              >
                <div className="dashboard-profile-avatar">
                  {firstName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <strong>
                    {firstName}
                  </strong>

                  <span>
                    {user.role
                      .toLowerCase()}
                  </span>
                </div>

                <ChevronDown
                  size={17}
                />
              </button>

              {/* MENÚ PERFIL */}

              {profileOpen && (
                <div className="profile-dropdown">

                  <Link href="/dashboard/perfil">
                    <UserRound
                      size={18}
                    />

                    Mi perfil
                  </Link>

                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                  >
                    <LogOut
                      size={18}
                    />

                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENIDO DE CADA PÁGINA */}

        <div className="dashboard-content">
          {children}
        </div>
      </section>
    </div>
  );
}