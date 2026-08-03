"use client";

import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  ClipboardCheck,
  Compass,
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
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/components/AuthProvider";
import Logo from "@/components/Logo";

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

const routeTitles: Record<string, string> = {
  "/dashboard": "Resumen",
  "/dashboard/descubre": "Descubre tu camino",
  "/dashboard/empleos": "Oportunidades laborales",
  "/dashboard/negocios": "Ideas y emprendimiento",
  "/dashboard/aprendizaje": "Aprendizaje",
  "/dashboard/salud": "Salud y bienestar",
  "/dashboard/futuro": "Mi proyecto de vida",
  "/dashboard/comunidad": "Comunidad",
  "/dashboard/solicitudes": "Mis solicitudes",
  "/dashboard/perfil": "Mi perfil",
};

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/iniciar-sesion");
    }
  }, [loading, user, router]);

  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const currentTitle = useMemo(
    () => routeTitles[pathname] ?? "Visiona",
    [pathname],
  );

  function handleLogout(): void {
    logout();
    router.push("/");
  }

  if (loading || !user) {
    return (
      <main className="dashboard-loader">
        <Logo />
        <div className="loader-ring" />
        <p>Preparando tu espacio...</p>
      </main>
    );
  }

  const firstName = user.name.split(" ")[0];

  return (
    <div className="dashboard-shell">
      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "dashboard-sidebar-open" : ""
        }`}
      >
        <div className="sidebar-header">
          <Logo light />

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
        </div>

        <div className="sidebar-profile">
          <div className="sidebar-profile-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{firstName}</strong>
            <span>Nivel {user.level} · Explorador</span>
          </div>
        </div>

        <div className="sidebar-level">
          <div>
            <span>Tu siguiente nivel</span>
            <strong>{user.points} pts</strong>
          </div>

          <div className="sidebar-level-track">
            <span />
          </div>
        </div>

        <nav className="sidebar-navigation">
          <span className="sidebar-section-label">TU ESPACIO</span>

          {navigationItems.map((navigationItem) => {
            const Icon = navigationItem.icon;

            const isActive =
              navigationItem.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(navigationItem.href);

            return (
              <Link
                href={navigationItem.href}
                key={navigationItem.href}
                className={isActive ? "sidebar-link-active" : ""}
              >
                <Icon size={20} />
                <span>{navigationItem.label}</span>

                {navigationItem.label === "Solicitudes" && (
                  <small>2</small>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div>
              <Lightbulb size={18} />
            </div>

            <strong>Consejo del día</strong>
            <p>Los avances pequeños también construyen grandes cambios.</p>
          </div>

          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={19} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <button
              className="dashboard-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>

            <div>
              <span>VISIONA</span>
              <h1>{currentTitle}</h1>
            </div>
          </div>

          <div className="dashboard-header-actions">
            <div className="dashboard-search">
              <Search size={18} />
              <input placeholder="Buscar en Visiona..." />
            </div>

            <button className="dashboard-icon-button" aria-label="Notificaciones">
              <Bell size={20} />
              <span className="notification-dot" />
            </button>

            <div className="dashboard-profile-menu">
              <button
                className="dashboard-profile-button"
                onClick={() => setProfileOpen((current) => !current)}
              >
                <div className="dashboard-profile-avatar">
                  {firstName.charAt(0).toUpperCase()}
                </div>

                <div>
                  <strong>{firstName}</strong>
                  <span>{user.role.toLowerCase()}</span>
                </div>

                <ChevronDown size={17} />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <Link href="/dashboard/perfil">
                    <UserRound size={18} />
                    Mi perfil
                  </Link>

                  <button onClick={handleLogout}>
                    <LogOut size={18} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-content">{children}</div>
      </section>
    </div>
  );
}