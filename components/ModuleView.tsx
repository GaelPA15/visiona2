
"use client";

import {
  ArrowRight,
  Zap,
  Video,
  ShieldCheck,
  GraduationCap,
  Crown,
  Bot,
  BarChart3,
  BadgeCheck,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Compass,
  Heart,
  HeartPulse,
  Lightbulb,
  MapPin,
  MessageCircle,
  Plus,
  Rocket,
  Search,
  Send,
  Sparkles,
  Target,
  ThumbsUp,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

import { useParams } from "next/navigation";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { useAuth } from "@/components/AuthProvider";
import Logo from "@/components/Logo";

import type {
  RequestStatus,
  VisionRequest,
} from "@/types";

/* =====================================================
   CONFIGURACIÓN GENERAL
===================================================== */

const GAEL_ACCOUNT_ID = "gael-demo";

function isGaelAccount(userId?: string): boolean {
  return userId === GAEL_ACCOUNT_ID;
}

function createUserStorageKey(
  baseKey: string,
  userId?: string,
): string {
  return `${baseKey}_${userId ?? "guest"}`;
}

/* =====================================================
   SOLICITUDES
===================================================== */

const requestStatusLabels: Record<
  RequestStatus,
  string
> = {
  RECIBIDA: "Recibida",
  REGISTRADA: "Registrada",
  CLASIFICADA: "Clasificada",
  DATOS_INCOMPLETOS: "Datos incompletos",
  EN_PROCESO: "En proceso",
  PENDIENTE_APROBACION:
    "Pendiente de aprobación",
  EN_CORRECCION: "En corrección",
  APROBADA: "Aprobada",
  EN_EJECUCION: "En ejecución",
  FINALIZADA: "Finalizada",
};

const requestStatusOrder: RequestStatus[] = [
  "RECIBIDA",
  "REGISTRADA",
  "CLASIFICADA",
  "EN_PROCESO",
  "PENDIENTE_APROBACION",
  "APROBADA",
  "EN_EJECUCION",
  "FINALIZADA",
];

/*
  Estas solicitudes pertenecen únicamente
  a la cuenta de demostración de Gael.
*/
const initialGaelRequests: VisionRequest[] = [
  {
    id: "SOL-2401",
    title: "Orientación para primer empleo",
    type: "Empleo",
    description:
      "Quiero mejorar mi perfil y encontrar vacantes para recién egresados.",
    status: "EN_PROCESO",
    responsible: "Mariana Torres",
    createdAt: "29/07/2026",
    updatedAt: "01/08/2026",
    progress: 48,
  },
  {
    id: "SOL-2402",
    title: "Revisión de idea de negocio",
    type: "Emprendimiento",
    description:
      "Necesito orientación para validar una plataforma de servicios digitales.",
    status: "PENDIENTE_APROBACION",
    responsible: "Carlos Mendoza",
    createdAt: "30/07/2026",
    updatedAt: "02/08/2026",
    progress: 68,
  },
];

/* =====================================================
   EMPLEOS
===================================================== */

const jobFilters = [
  "Todos",
  "Acapulco",
  "Remoto",
  "Sistemas",
  "Administración",
  "Ventas",
  "Operativo",
  "Recién egresado",
];

const jobs = [
  {
    id: 1,
    title: "Auxiliar de Sistemas Computacionales",
    company: "NISSAN",
    location: "Acapulco, Guerrero",
    mode: "Presencial",
    salary: "$12,000 - $13,000 MXN / mes",
    category: "Sistemas",
    experience: "6 meses a 1 año",
    source: "Indeed / Talenteca",
    publishedAt: "Verificada 20 ago. 2026",
    description:
      "Soporte a usuarios, análisis de redes, cableado estructurado, mantenimiento de equipos, redes Wi-Fi e instalación de programas e impresoras.",
    tags: [
      "Sistemas",
      "Soporte técnico",
      "Redes",
      "Office",
      "Acapulco",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Auxiliar Administrativo de Ventas",
    company: "GEPP",
    location: "Acapulco, Guerrero",
    mode: "Presencial",
    salary: "$17,500 MXN / mes",
    category: "Administración",
    experience: "No especificada",
    source: "Indeed",
    publishedAt: "Verificada 20 ago. 2026",
    description:
      "Apoyo administrativo en CEDIS Renacimiento, estadísticas de ventas, administración de bases de datos y dispositivos Hand Held.",
    tags: [
      "Administración",
      "Ventas",
      "Bases de datos",
      "Acapulco",
    ],
    featured: true,
  },
  {
    id: 3,
    title: "Operador Administrativo de Ventas",
    company: "GEPP",
    location: "Acapulco, Guerrero",
    mode: "Presencial",
    salary: "Sueldo no publicado",
    category: "Administración",
    experience: "Licenciatura en Informática o afín",
    source: "Indeed",
    publishedAt: "Verificada 20 ago. 2026",
    description:
      "Vacante administrativa con perfil tecnológico. Solicita manejo de Excel con tablas dinámicas, PowerPoint e informática.",
    tags: [
      "Administración",
      "Ventas",
      "Informática",
      "Excel",
      "Acapulco",
    ],
    featured: false,
  },
  {
    id: 4,
    title: "Auxiliar Operativo Guerrero",
    company: "Farmacias de Similares",
    location: "Acapulco, Guerrero",
    mode: "Presencial",
    salary: "Sueldo no publicado",
    category: "Operativo",
    experience: "2 años en atención al público",
    source: "Indeed",
    publishedAt: "Verificada 20 ago. 2026",
    description:
      "Atención al público y seguimiento de procesos con autoridades, proveedores o beneficiarios. Incluye herramientas de trabajo y vales de despensa.",
    tags: [
      "Operativo",
      "Atención al cliente",
      "Administración",
      "Acapulco",
    ],
    featured: false,
  },
  {
    id: 5,
    title: "Ayudante de Bodega",
    company: "Grupo Modelo",
    location: "Acapulco, Guerrero",
    mode: "Presencial",
    salary: "Sueldo no publicado",
    category: "Operativo",
    experience: "No especificada",
    source: "Indeed",
    publishedAt: "Verificada 20 ago. 2026",
    description:
      "Apoyo en bodega para suministro al área de ventas y reparto, distribución y resguardo de producto.",
    tags: [
      "Bodega",
      "Almacén",
      "Operativo",
      "Logística",
      "Acapulco",
    ],
    featured: false,
  },
  {
    id: 6,
    title:
      "Auxiliar de Almacén / Ayudante General - Gersa Acapulco Hornos",
    company: "Muebles para Baño",
    location: "Acapulco, Guerrero",
    mode: "Presencial",
    salary: "$10,056 MXN / mes brutos",
    category: "Operativo",
    experience: "No especificada",
    source: "Indeed",
    publishedAt: "Verificada 20 ago. 2026",
    description:
      "Apoyo general de almacén, orden y manejo de mercancía. La publicación incluye vales de despensa y prestaciones.",
    tags: [
      "Almacén",
      "Operativo",
      "Logística",
      "Acapulco",
    ],
    featured: false,
  },
  {
    id: 7,
    title: "Recepcionista de Hotel Hotsson Acapulco",
    company: "Hotel Hotsson",
    location: "Acapulco, Guerrero",
    mode: "Presencial",
    salary: "Sueldo no publicado",
    category: "Turismo",
    experience: "1 año en hotelería",
    source: "Indeed",
    publishedAt: "Verificada 20 ago. 2026",
    description:
      "Recepción y atención a huéspedes en hotel. La publicación solicita experiencia comprobable en hoteles de categoría 5 estrellas.",
    tags: [
      "Turismo",
      "Recepción",
      "Atención al cliente",
      "Acapulco",
    ],
    featured: false,
  },
  {
    id: 8,
    title: "Auxiliar de Eventos",
    company: "Grupo KC",
    location: "Acapulco, Guerrero",
    mode: "Presencial",
    salary: "Sueldo no publicado",
    category: "Operativo",
    experience: "Apertura al aprendizaje",
    source: "Indeed",
    publishedAt: "Verificada 20 ago. 2026",
    description:
      "Montaje y desmontaje de mobiliario para eventos, incluyendo mesas, sillas, mantelería y carpas.",
    tags: [
      "Eventos",
      "Operativo",
      "Primer empleo",
      "Acapulco",
    ],
    featured: false,
  },
  {
    id: 9,
    title: "Junior React Developer - Remote Work",
    company: "INDI Staffing Services",
    location: "México",
    mode: "Remoto",
    salary: "Sueldo no publicado",
    category: "Sistemas",
    experience: "Junior",
    source: "LinkedIn",
    publishedAt: "Publicada recientemente",
    description:
      "Vacante remota enfocada en desarrollo con React y orientada a perfiles junior que buscan crecer en desarrollo web.",
    tags: [
      "React",
      "JavaScript",
      "Junior",
      "Recién egresado",
      "Remoto",
    ],
    featured: true,
  },
  {
    id: 10,
    title: "React Developer (Remote)",
    company: "Hire Feed",
    location: "México",
    mode: "Remoto",
    salary: "Sueldo no publicado",
    category: "Sistemas",
    experience: "Consultar publicación",
    source: "LinkedIn",
    publishedAt: "Publicada recientemente",
    description:
      "Oportunidad remota para desarrollo de interfaces y aplicaciones con React.",
    tags: [
      "React",
      "JavaScript",
      "Frontend",
      "Remoto",
    ],
    featured: false,
  },
  {
    id: 11,
    title: "Full Stack React Developer - Remote ONLY MÉXICO",
    company: "Scalepex",
    location: "México",
    mode: "Remoto",
    salary: "Sueldo no publicado",
    category: "Sistemas",
    experience: "Consultar publicación",
    source: "LinkedIn",
    publishedAt: "Vacante activa en búsqueda reciente",
    description:
      "Posición de desarrollo Full Stack para trabajar de forma remota desde México, con React como una de las tecnologías principales.",
    tags: [
      "React",
      "Full Stack",
      "JavaScript",
      "Remoto",
    ],
    featured: false,
  },
  {
    id: 12,
    title: "Frontend Engineer (Contract) - Remote",
    company: "Tech Holding",
    location: "México",
    mode: "Remoto",
    salary: "Sueldo no publicado",
    category: "Sistemas",
    experience: "3+ años",
    source: "LinkedIn",
    publishedAt: "Vacante activa",
    description:
      "Desarrollo frontend con React, TypeScript y Next.js. Incluye arquitectura de componentes, APIs, pruebas y optimización de rendimiento.",
    tags: [
      "React",
      "TypeScript",
      "Next.js",
      "Frontend",
      "Remoto",
    ],
    featured: false,
  },
  {
    id: 13,
    title:
      "Frontend Developer (React) - Remote Work | REF#294218",
    company: "BairesDev",
    location: "México",
    mode: "Remoto",
    salary: "Compensación en USD o moneda local",
    category: "Sistemas",
    experience: "4+ años",
    source: "LinkedIn",
    publishedAt: "Publicada recientemente",
    description:
      "Desarrollo de aplicaciones frontend con React y TypeScript, componentes responsivos, manejo de estado e integración con APIs REST o GraphQL.",
    tags: [
      "React",
      "TypeScript",
      "Redux",
      "Frontend",
      "Remoto",
    ],
    featured: false,
  },
  {
    id: 14,
    title: "UI Engineer (React) - Remote Work | REF#290603",
    company: "BairesDev",
    location: "México",
    mode: "Remoto",
    salary: "Sueldo no publicado",
    category: "Sistemas",
    experience: "Consultar publicación",
    source: "LinkedIn",
    publishedAt: "Publicada recientemente",
    description:
      "Vacante remota enfocada en ingeniería de interfaces de usuario y desarrollo de productos con React.",
    tags: [
      "React",
      "UI",
      "Frontend",
      "JavaScript",
      "Remoto",
    ],
    featured: false,
  },
  {
    id: 15,
    title: "Next.js Engineer - Remote Work | REF#290612",
    company: "BairesDev",
    location: "México",
    mode: "Remoto",
    salary: "Sueldo no publicado",
    category: "Sistemas",
    experience: "Consultar publicación",
    source: "LinkedIn",
    publishedAt: "Vacante activa",
    description:
      "Oportunidad remota especializada en desarrollo web con Next.js para candidatos ubicados en México.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Frontend",
      "Remoto",
    ],
    featured: true,
  },
  {
    id: 16,
    title: "FBS Frontend Web Developer (Remote)",
    company: "Capgemini",
    location: "México",
    mode: "Remoto",
    salary: "Consultar publicación",
    category: "Sistemas",
    experience: "Consultar publicación",
    source: "LinkedIn",
    publishedAt: "Publicada recientemente",
    description:
      "Vacante de desarrollo web frontend con modalidad remota para trabajar desde México.",
    tags: [
      "Frontend",
      "Web",
      "JavaScript",
      "Remoto",
    ],
    featured: false,
  },
];

/* =====================================================
   CURSOS
===================================================== */

const courses = [
  {
    title:
      "Finanzas personales desde cero",
    category: "Finanzas",
    duration: "2 h 30 min",
    lessons: 8,
    demoProgress: 65,
    icon: WalletCards,
  },
  {
    title:
      "Cómo validar una idea de negocio",
    category: "Emprendimiento",
    duration: "3 horas",
    lessons: 10,
    demoProgress: 30,
    icon: Rocket,
  },
  {
    title:
      "Marca personal para tu primer empleo",
    category: "Empleo",
    duration: "1 h 45 min",
    lessons: 6,
    demoProgress: 0,
    icon: BriefcaseBusiness,
  },
];

/* =====================================================
   COMPONENTE PRINCIPAL
===================================================== */

export default function ModuleView() {
  const params = useParams();
  const { user, loading } = useAuth();

  const moduleName = String(
    params.modulo ?? "",
  );

  if (loading || !user) {
    return (
      <div className="empty-module">
        <Sparkles size={46} />

        <h2>Preparando tu espacio</h2>

        <p>
          Estamos cargando la información de
          tu cuenta.
        </p>
      </div>
    );
  }

  switch (moduleName) {
    case "descubre":
      return <DiscoverModule />;

    case "empleos":
      return <JobsModule />;

    case "negocios":
      return <BusinessModule />;

    case "aprendizaje":
      return <LearningModule />;

    case "premium":
      return <PremiumModule />;

    case "salud":
      return <HealthModule />;

    case "futuro":
      return <FutureModule />;

    case "comunidad":
      return <CommunityModule />;

    case "solicitudes":
      return <RequestsModule />;

    case "perfil":
      return <ProfileModule />;

    default:
      return (
        <div className="empty-module">
          <Compass size={50} />

          <h2>Sección no encontrada</h2>

          <p>
            La sección que buscas todavía
            no está disponible.
          </p>
        </div>
      );
  }
}

/* =====================================================
   ENCABEZADO DE LOS MÓDULOS
===================================================== */

function ModuleHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="module-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}

/* =====================================================
   DESCUBRE
===================================================== */

function DiscoverModule() {
  const [testStarted, setTestStarted] =
    useState(false);

  const [question, setQuestion] =
    useState(0);

  const [completed, setCompleted] =
    useState(false);

  const questions = [
    {
      title:
        "¿Qué actividad disfrutas más?",
      options: [
        "Crear o programar cosas",
        "Organizar equipos",
        "Ayudar y escuchar personas",
        "Diseñar y comunicar ideas",
      ],
    },
    {
      title:
        "¿Qué problema preferirías resolver?",
      options: [
        "Un problema tecnológico",
        "Una necesidad de un negocio",
        "Una situación personal",
        "Una experiencia visual",
      ],
    },
    {
      title:
        "¿Qué entorno te llama más la atención?",
      options: [
        "Una empresa tecnológica",
        "Mi propio emprendimiento",
        "Una organización social",
        "Un estudio creativo",
      ],
    },
  ];

  function selectAnswer(): void {
    if (
      question <
      questions.length - 1
    ) {
      setQuestion(
        (current) => current + 1,
      );

      return;
    }

    setCompleted(true);
  }

  function restartTest(): void {
    setCompleted(false);
    setTestStarted(false);
    setQuestion(0);
  }

  if (
    testStarted &&
    !completed
  ) {
    return (
      <div className="module-page">
        <ModuleHeading
          eyebrow="TEST VOCACIONAL"
          title="Descubre lo que puede encajar contigo"
          description="Responde con sinceridad. Aquí no existen respuestas correctas o incorrectas."
        />

        <section className="test-card">
          <div className="test-progress-header">
            <span>
              Pregunta {question + 1} de{" "}
              {questions.length}
            </span>

            <strong>
              {Math.round(
                ((question + 1) /
                  questions.length) *
                  100,
              )}
              %
            </strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-value"
              style={{
                width: `${
                  ((question + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>

          <h3>
            {questions[question].title}
          </h3>

          <div className="test-options">
            {questions[
              question
            ].options.map((option) => (
              <button
                type="button"
                key={option}
                onClick={selectAnswer}
              >
                <span />
                {option}
                <ChevronRight size={19} />
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="module-page">
        <ModuleHeading
          eyebrow="TUS RESULTADOS"
          title="Encontramos rutas muy compatibles contigo"
          description="Estas recomendaciones se generan con base en tus respuestas."
        />

        <section className="results-hero">
          <div className="results-score">
            <strong>92%</strong>

            <span>
              compatibilidad principal
            </span>
          </div>

          <div>
            <span className="module-tag">
              MEJOR COINCIDENCIA
            </span>

            <h3>
              Tecnología y desarrollo digital
            </h3>

            <p>
              Tu perfil refleja pensamiento
              lógico, creatividad, curiosidad
              y gusto por resolver problemas
              mediante herramientas digitales.
            </p>

            <div className="tag-list">
              <span>Programación</span>
              <span>Innovación</span>
              <span>Productos digitales</span>
            </div>
          </div>
        </section>

        <div className="result-cards-grid">
          <article>
            <span>86%</span>
            <Rocket size={27} />

            <h3>
              Emprendimiento digital
            </h3>

            <p>
              Crea productos, servicios y
              soluciones mediante tecnología.
            </p>
          </article>

          <article>
            <span>79%</span>
            <Brain size={27} />

            <h3>
              Experiencia de usuario
            </h3>

            <p>
              Investiga necesidades y diseña
              experiencias útiles.
            </p>
          </article>

          <article>
            <span>74%</span>
            <TrendingUp size={27} />

            <h3>
              Analítica de negocios
            </h3>

            <p>
              Utiliza datos para tomar
              decisiones y mejorar resultados.
            </p>
          </article>
        </div>

        <button
          type="button"
          className="button button-secondary"
          onClick={restartTest}
        >
          Repetir evaluación
        </button>
      </div>
    );
  }

  return (
    <div className="module-page">
      <ModuleHeading
        eyebrow="DESCUBRE"
        title="Conoce tus talentos y posibilidades"
        description="Explora tus intereses, habilidades y formas de aprender para encontrar rutas compatibles contigo."
      />

      <section className="discover-hero">
        <div>
          <span className="module-tag">
            TEST PRINCIPAL
          </span>

          <h3>
            ¿Qué camino puede encajar
            mejor contigo?
          </h3>

          <p>
            Completa una evaluación
            interactiva para recibir
            recomendaciones de carreras,
            empleos y áreas de desarrollo.
          </p>

          <div className="discover-features">
            <span>
              <CheckCircle2 size={18} />
              Resultado personalizado
            </span>

            <span>
              <CheckCircle2 size={18} />
              Solo toma unos minutos
            </span>
          </div>

          <button
            type="button"
            className="button button-primary"
            onClick={() =>
              setTestStarted(true)
            }
          >
            Comenzar evaluación
            <ArrowRight size={19} />
          </button>
        </div>

        <div className="discover-visual">
          <Compass size={76} />
          <div className="discover-orbit" />
        </div>
      </section>

      <div className="module-card-grid">
        <article className="module-card">
          <Brain size={26} />

          <h3>Personalidad</h3>

          <p>
            Conoce cómo piensas, decides y
            colaboras con otras personas.
          </p>

          <span>
            0 de 12 preguntas
          </span>
        </article>

        <article className="module-card">
          <Sparkles size={26} />

          <h3>Habilidades</h3>

          <p>
            Identifica capacidades que ya
            tienes y otras que puedes
            desarrollar.
          </p>

          <span>
            0 de 10 preguntas
          </span>
        </article>

        <article className="module-card">
          <BookOpen size={26} />

          <h3>
            Estilo de aprendizaje
          </h3>

          <p>
            Descubre de qué manera aprendes
            con mayor facilidad.
          </p>

          <span>
            0 de 8 preguntas
          </span>
        </article>
      </div>
    </div>
  );
}

/* =====================================================
   EMPLEOS
===================================================== */

function JobsModule() {
  const [search, setSearch] =
    useState("");

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("Todos");

  const [
    favoriteJobs,
    setFavoriteJobs,
  ] = useState<number[]>([]);

  const [
    appliedJobs,
    setAppliedJobs,
  ] = useState<number[]>([]);

  const [
    selectedJobId,
    setSelectedJobId,
  ] = useState<number | null>(null);

  const normalizedSearch =
    search.trim().toLowerCase();

  const selectedJob =
    jobs.find(
      (job) =>
        job.id === selectedJobId,
    ) ?? null;

  function matchesActiveFilter(
    job: (typeof jobs)[number],
  ): boolean {
    switch (activeFilter) {
      case "Acapulco":
        return job.location
          .toLowerCase()
          .includes("acapulco");

      case "Remoto":
        return job.mode === "Remoto";

      case "Sistemas":
        return job.category === "Sistemas";

      case "Administración":
        return (
          job.category === "Administración" ||
          job.tags.includes("Administración")
        );

      case "Ventas":
        return job.tags.includes("Ventas");

      case "Operativo":
        return (
          job.category === "Operativo" ||
          job.tags.includes("Operativo") ||
          job.tags.includes("Almacén") ||
          job.tags.includes("Eventos")
        );

      case "Recién egresado":
        return (
          job.tags.includes("Recién egresado") ||
          job.tags.includes("Junior") ||
          job.tags.includes("Primer empleo")
        );

      default:
        return true;
    }
  }

  const visibleJobs = jobs.filter(
    (job) => {
      const searchableText = [
        job.title,
        job.company,
        job.location,
        job.mode,
        job.salary,
        job.category,
        job.experience,
        job.description,
        ...job.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        searchableText.includes(
          normalizedSearch,
        );

      return (
        matchesSearch &&
        matchesActiveFilter(job)
      );
    },
  );

  const acapulcoJobs =
    jobs.filter((job) =>
      job.location
        .toLowerCase()
        .includes("acapulco"),
    ).length;

  const remoteJobs =
    jobs.filter(
      (job) => job.mode === "Remoto",
    ).length;

  function toggleFavorite(
    jobId: number,
  ): void {
    setFavoriteJobs((current) =>
      current.includes(jobId)
        ? current.filter(
            (currentJobId) =>
              currentJobId !== jobId,
          )
        : [...current, jobId],
    );
  }

  function applyToJob(
    jobId: number,
  ): void {
    setAppliedJobs((current) =>
      current.includes(jobId)
        ? current
        : [...current, jobId],
    );
  }

  function buildJobResponsibilities(
    job: (typeof jobs)[number],
  ): string[] {
    if (job.category === "Sistemas") {
      return [
        "Participar en tareas y proyectos relacionados con el desarrollo, soporte o mantenimiento tecnológico.",
        `Trabajar con herramientas y conocimientos como ${job.tags.slice(0, 3).join(", ")}.`,
        "Documentar avances, incidencias y soluciones dentro del equipo.",
        "Colaborar con otras áreas para cumplir objetivos y entregables.",
      ];
    }

    if (job.category === "Administración") {
      return [
        "Dar seguimiento a información, reportes y procesos administrativos.",
        "Apoyar en la organización y actualización de datos del área.",
        "Coordinar actividades con ventas, operación u otras áreas relacionadas.",
        "Mantener documentación y registros actualizados.",
      ];
    }

    if (job.category === "Turismo") {
      return [
        "Brindar atención y seguimiento a huéspedes o clientes.",
        "Apoyar en procesos de recepción y servicio.",
        "Coordinar solicitudes con otras áreas.",
        "Mantener una experiencia de atención organizada y profesional.",
      ];
    }

    return [
      "Apoyar en las actividades operativas correspondientes al puesto.",
      "Mantener orden, seguimiento y cumplimiento de los procesos asignados.",
      "Coordinarse con el equipo para completar tareas y entregas.",
      "Cumplir lineamientos de seguridad, servicio y operación.",
    ];
  }

  function buildJobRequirements(
    job: (typeof jobs)[number],
  ): string[] {
    const requirements = [
      `Experiencia: ${job.experience}.`,
      `Modalidad: ${job.mode}.`,
    ];

    if (job.category === "Sistemas") {
      requirements.push(
        "Conocimientos básicos o experiencia relacionada con las tecnologías indicadas en la vacante.",
        "Capacidad para aprender, resolver problemas y trabajar en equipo.",
      );
    } else {
      requirements.push(
        "Responsabilidad, organización y disposición para aprender.",
        "Buena comunicación y trabajo en equipo.",
      );
    }

    return requirements;
  }

  return (
    <div className="module-page">
      <ModuleHeading
        eyebrow="EMPLEOS"
        title="Encuentra oportunidades reales sin salir de Visiona"
        description="Explora vacantes verificadas, consulta toda la información y simula tu postulación directamente desde tu perfil."
      />

      <section className="jobs-summary-strip">
        <article>
          <strong>{jobs.length}</strong>
          <span>
            Vacantes disponibles
          </span>
        </article>

        <article>
          <strong>
            {acapulcoJobs}
          </strong>
          <span>
            En Acapulco
          </span>
        </article>

        <article>
          <strong>
            {remoteJobs}
          </strong>
          <span>
            Remotas de tecnología
          </span>
        </article>

        <article>
          <strong>
            {appliedJobs.length}
          </strong>
          <span>
            Postulaciones
          </span>
        </article>
      </section>

      <section className="jobs-visiona-notice">
        <div>
          <BriefcaseBusiness
            size={22}
          />
        </div>

        <div>
          <strong>
            Todo el proceso dentro de Visiona
          </strong>

          <p>
            En la versión final, Visiona
            concentrará la información de la
            vacante, el perfil del candidato,
            su CV y el seguimiento de la
            postulación en un mismo lugar.
            Esta versión es una simulación
            funcional del flujo.
          </p>
        </div>
      </section>

      <section className="module-search-bar">
        <Search size={20} />

        <input
          placeholder="Buscar puesto, empresa, tecnología o habilidad..."
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value,
            )
          }
        />

        {search && (
          <button
            type="button"
            className="button button-secondary"
            onClick={() =>
              setSearch("")
            }
          >
            Limpiar
          </button>
        )}
      </section>

      <div className="jobs-filter-tabs">
        {jobFilters.map((filter) => (
          <button
            type="button"
            key={filter}
            className={
              activeFilter === filter
                ? "jobs-filter-tab jobs-filter-tab-active"
                : "jobs-filter-tab"
            }
            onClick={() =>
              setActiveFilter(filter)
            }
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="jobs-layout">
        <aside className="jobs-filters">
          <strong>
            Explora oportunidades
          </strong>

          <p className="jobs-filter-description">
            Filtra las vacantes por
            ubicación, modalidad o área.
          </p>

          <div className="jobs-filter-list">
            {jobFilters.map(
              (filter) => (
                <button
                  type="button"
                  key={filter}
                  className={
                    activeFilter ===
                    filter
                      ? "jobs-side-filter jobs-side-filter-active"
                      : "jobs-side-filter"
                  }
                  onClick={() =>
                    setActiveFilter(
                      filter,
                    )
                  }
                >
                  <span>
                    {filter}
                  </span>

                  <ChevronRight
                    size={16}
                  />
                </button>
              ),
            )}
          </div>

          <div className="jobs-profile-tip">
            <Sparkles size={21} />

            <strong>
              Información centralizada
            </strong>

            <p>
              Visiona presenta la
              información necesaria para
              evaluar una vacante sin obligar
              al usuario a investigar en
              distintas páginas.
            </p>
          </div>
        </aside>

        <section className="jobs-list">
          <div className="jobs-list-heading">
            <span>
              {visibleJobs.length}{" "}
              {visibleJobs.length === 1
                ? "oportunidad encontrada"
                : "oportunidades encontradas"}
            </span>

            <small>
              Dentro de Visiona
            </small>
          </div>

          {visibleJobs.length === 0 ? (
            <div className="jobs-empty-state">
              <Search size={38} />

              <h3>
                No encontramos vacantes
              </h3>

              <p>
                Prueba con otra palabra o
                selecciona un filtro
                diferente.
              </p>

              <button
                type="button"
                className="button button-secondary"
                onClick={() => {
                  setSearch("");
                  setActiveFilter(
                    "Todos",
                  );
                }}
              >
                Ver todas las vacantes
              </button>
            </div>
          ) : (
            visibleJobs.map((job) => {
              const isFavorite =
                favoriteJobs.includes(
                  job.id,
                );

              const hasApplied =
                appliedJobs.includes(
                  job.id,
                );

              return (
                <article
                  className={`job-card ${
                    job.featured
                      ? "job-featured"
                      : ""
                  }`}
                  key={job.id}
                >
                  {job.featured && (
                    <span className="featured-label">
                      <Sparkles
                        size={14}
                      />
                      Oportunidad destacada
                    </span>
                  )}

                  <div className="job-card-header">
                    <div className="job-company-logo">
                      <Building2
                        size={25}
                      />
                    </div>

                    <div className="job-card-title">
                      <h3>
                        {job.title}
                      </h3>

                      <span>
                        {job.company}
                      </span>

                      <small>
                        Fuente verificada:{" "}
                        {job.source} ·{" "}
                        {job.publishedAt}
                      </small>
                    </div>

                    <button
                      type="button"
                      className={`job-favorite ${
                        isFavorite
                          ? "job-favorite-active"
                          : ""
                      }`}
                      aria-label={
                        isFavorite
                          ? "Quitar de guardados"
                          : "Guardar vacante"
                      }
                      onClick={() =>
                        toggleFavorite(
                          job.id,
                        )
                      }
                    >
                      <Heart
                        size={20}
                        fill={
                          isFavorite
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  <p className="job-description">
                    {job.description}
                  </p>

                  <div className="job-details">
                    <span>
                      <MapPin size={16} />
                      {job.location}
                    </span>

                    <span>
                      <BriefcaseBusiness
                        size={16}
                      />
                      {job.mode}
                    </span>

                    <span>
                      <WalletCards
                        size={16}
                      />
                      {job.salary}
                    </span>
                  </div>

                  <div className="job-extra-details">
                    <span>
                      <strong>
                        Área:
                      </strong>{" "}
                      {job.category}
                    </span>

                    <span>
                      <strong>
                        Experiencia:
                      </strong>{" "}
                      {job.experience}
                    </span>
                  </div>

                  <div className="tag-list">
                    {job.tags.map(
                      (tag) => (
                        <span
                          key={`${job.id}-${tag}`}
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="job-card-actions">
                    <button
                      type="button"
                      className="button button-secondary"
                      onClick={() =>
                        setSelectedJobId(
                          job.id,
                        )
                      }
                    >
                      Ver detalles
                      <ArrowRight
                        size={18}
                      />
                    </button>

                    {hasApplied && (
                      <span className="job-applied-chip">
                        <CheckCircle2
                          size={16}
                        />
                        Postulación enviada
                      </span>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>

      {selectedJob && (
        <div
          className="job-detail-overlay"
          role="presentation"
          onClick={() =>
            setSelectedJobId(null)
          }
        >
          <section
            className="job-detail-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalles de ${selectedJob.title}`}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="job-detail-topbar">
              <span>
                VACANTE EN VISIONA
              </span>

              <button
                type="button"
                onClick={() =>
                  setSelectedJobId(
                    null,
                  )
                }
                aria-label="Cerrar detalles"
              >
                ×
              </button>
            </div>

            <div className="job-detail-company">
              <div className="job-company-logo job-detail-company-logo">
                <Building2
                  size={28}
                />
              </div>

              <div>
                <span>
                  {selectedJob.company}
                </span>

                <h2>
                  {selectedJob.title}
                </h2>

                <small>
                  Información verificada
                  desde{" "}
                  {selectedJob.source}
                </small>
              </div>
            </div>

            <div className="job-detail-main-data">
              <span>
                <MapPin size={17} />
                {selectedJob.location}
              </span>

              <span>
                <BriefcaseBusiness
                  size={17}
                />
                {selectedJob.mode}
              </span>

              <span>
                <WalletCards size={17} />
                {selectedJob.salary}
              </span>

              <span>
                <CircleUserRound
                  size={17}
                />
                {selectedJob.experience}
              </span>
            </div>

            <div className="job-detail-grid">
              <div className="job-detail-content">
                <section>
                  <span className="job-detail-section-label">
                    SOBRE LA VACANTE
                  </span>

                  <h3>
                    Descripción del puesto
                  </h3>

                  <p>
                    {selectedJob.description}
                  </p>
                </section>

                <section>
                  <span className="job-detail-section-label">
                    RESPONSABILIDADES
                  </span>

                  <h3>
                    ¿Qué harías?
                  </h3>

                  <div className="job-detail-check-list">
                    {buildJobResponsibilities(
                      selectedJob,
                    ).map((item) => (
                      <div
                        key={item}
                      >
                        <CheckCircle2
                          size={17}
                        />
                        <span>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <span className="job-detail-section-label">
                    PERFIL
                  </span>

                  <h3>
                    Requisitos principales
                  </h3>

                  <div className="job-detail-check-list">
                    {buildJobRequirements(
                      selectedJob,
                    ).map((item) => (
                      <div
                        key={item}
                      >
                        <CheckCircle2
                          size={17}
                        />
                        <span>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <span className="job-detail-section-label">
                    HABILIDADES
                  </span>

                  <h3>
                    Lo que buscan
                  </h3>

                  <div className="tag-list">
                    {selectedJob.tags.map(
                      (tag) => (
                        <span
                          key={`detail-${selectedJob.id}-${tag}`}
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </section>
              </div>

              <aside className="job-application-card">
                <div className="job-application-icon">
                  <Send size={23} />
                </div>

                <span>
                  POSTULACIÓN VISIONA
                </span>

                <h3>
                  Postúlate sin salir de
                  la plataforma
                </h3>

                <p>
                  En la versión final,
                  Visiona enviaría tu perfil,
                  CV y datos necesarios a la
                  empresa desde aquí.
                </p>

                <div className="job-application-steps">
                  <div>
                    <span>1</span>
                    <p>
                      Perfil Visiona
                      preparado
                    </p>
                  </div>

                  <div>
                    <span>2</span>
                    <p>
                      CV y habilidades
                      adjuntas
                    </p>
                  </div>

                  <div>
                    <span>3</span>
                    <p>
                      Seguimiento desde
                      Visiona
                    </p>
                  </div>
                </div>

                {appliedJobs.includes(
                  selectedJob.id,
                ) ? (
                  <div className="job-application-success">
                    <BadgeCheck
                      size={25}
                    />

                    <strong>
                      Postulación registrada
                    </strong>

                    <p>
                      Esta es una simulación.
                      En el sistema real aquí
                      comenzaría el seguimiento
                      de tu candidatura.
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="button button-primary job-apply-visiona-button"
                    onClick={() =>
                      applyToJob(
                        selectedJob.id,
                      )
                    }
                  >
                    Postularme en Visiona
                    <ArrowRight
                      size={18}
                    />
                  </button>
                )}

                <small className="job-demo-disclaimer">
                  Demostración del flujo de
                  postulación. No se envían
                  datos reales a la empresa.
                </small>
              </aside>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

/* =====================================================
   NEGOCIOS
===================================================== */

function BusinessModule() {
  const [interest, setInterest] =
    useState("");

  const [skill, setSkill] =
    useState("");

  const [resources, setResources] =
    useState("");

  const [generated, setGenerated] =
    useState(false);

  function generateBusiness(
    event: FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    if (
      !interest.trim() ||
      !skill.trim()
    ) {
      return;
    }

    setGenerated(true);
  }

  return (
    <div className="module-page">
      <ModuleHeading
        eyebrow="NEGOCIOS"
        title="Convierte tus habilidades en una idea"
        description="Combina tus intereses, capacidades y recursos para descubrir oportunidades de emprendimiento."
      />

      <div className="business-layout">
        <form
          className="business-generator"
          onSubmit={generateBusiness}
        >
          <div className="business-generator-heading">
            <div>
              <Sparkles size={25} />
            </div>

            <div>
              <span>
                GENERADOR DE IDEAS
              </span>

              <h3>
                Cuéntanos un poco sobre ti
              </h3>
            </div>
          </div>

          <label>
            ¿Qué te gusta hacer?

            <input
              placeholder="Ejemplo: videojuegos, diseño, cocinar..."
              value={interest}
              onChange={(event) =>
                setInterest(
                  event.target.value,
                )
              }
            />
          </label>

          <label>
            ¿Qué sabes hacer?

            <input
              placeholder="Ejemplo: programar, editar, vender..."
              value={skill}
              onChange={(event) =>
                setSkill(
                  event.target.value,
                )
              }
            />
          </label>

          <label>
            ¿Con qué recursos cuentas?

            <input
              placeholder="Ejemplo: computadora, teléfono, poco capital..."
              value={resources}
              onChange={(event) =>
                setResources(
                  event.target.value,
                )
              }
            />
          </label>

          <button
            className="button button-primary"
            type="submit"
          >
            <Sparkles size={18} />
            Generar mi idea
          </button>
        </form>

        <section className="business-result">
          {!generated ? (
            <div className="business-empty">
              <Lightbulb size={53} />

              <h3>
                Tu idea aparecerá aquí
              </h3>

              <p>
                Completa el formulario para
                generar una propuesta
                personalizada.
              </p>
            </div>
          ) : (
            <div className="generated-business">
              <span className="module-tag">
                IDEA GENERADA
              </span>

              <div className="generated-business-icon">
                <Rocket size={32} />
              </div>

              <h3>
                Estudio digital para
                creadores y pequeños negocios
              </h3>

              <p>
                Puedes combinar tu interés
                en{" "}
                <strong>
                  {interest}
                </strong>{" "}
                con tu habilidad para{" "}
                <strong>{skill}</strong> y
                ofrecer productos o servicios
                digitales a negocios que
                necesitan mejorar su presencia
                en internet.
              </p>

              <div className="business-data-grid">
                <div>
                  <span>
                    Inversión inicial
                  </span>

                  <strong>Baja</strong>
                </div>

                <div>
                  <span>Dificultad</span>
                  <strong>Intermedia</strong>
                </div>

                <div>
                  <span>
                    Potencial digital
                  </span>

                  <strong>Alto</strong>
                </div>
              </div>

              <div className="generated-steps">
                <strong>
                  Primeros pasos
                </strong>

                <span>
                  <small>1</small>
                  Define un servicio específico.
                </span>

                <span>
                  <small>2</small>
                  Crea tres ejemplos para tu
                  portafolio.
                </span>

                <span>
                  <small>3</small>
                  Contacta tus primeros cinco
                  clientes.
                </span>
              </div>

              <button
                type="button"
                className="button button-secondary"
              >
                Guardar en mis proyectos
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* =====================================================
   APRENDIZAJE
===================================================== */

function LearningModule() {
  const { user } = useAuth();

  const [
    courseProgress,
    setCourseProgress,
  ] = useState<number[]>(
    courses.map(() => 0),
  );

  const coursesStorageKey =
    createUserStorageKey(
      "visiona_courses",
      user?.id,
    );

  /*
    Gael recibe los cursos avanzados
    de demostración.

    Marlen y los usuarios nuevos
    empiezan con todos los cursos en cero.
  */
  useEffect(() => {
    if (!user) {
      return;
    }

    try {
      const storedProgress =
        localStorage.getItem(
          coursesStorageKey,
        );

      if (storedProgress) {
        const parsedProgress =
          JSON.parse(
            storedProgress,
          ) as number[];

        setCourseProgress(
          parsedProgress,
        );

        return;
      }

      const initialProgress =
        isGaelAccount(user.id)
          ? courses.map(
              (course) =>
                course.demoProgress,
            )
          : courses.map(() => 0);

      setCourseProgress(
        initialProgress,
      );

      localStorage.setItem(
        coursesStorageKey,
        JSON.stringify(
          initialProgress,
        ),
      );
    } catch {
      setCourseProgress(
        courses.map(() => 0),
      );
    }
  }, [
    coursesStorageKey,
    user,
  ]);

  function continueCourse(
    index: number,
  ): void {
    const updatedProgress =
      courseProgress.map(
        (
          progress,
          currentIndex,
        ) =>
          currentIndex === index
            ? Math.min(
                progress + 10,
                100,
              )
            : progress,
      );

    setCourseProgress(
      updatedProgress,
    );

    localStorage.setItem(
      coursesStorageKey,
      JSON.stringify(
        updatedProgress,
      ),
    );
  }

  return (
    <div className="module-page">
      <ModuleHeading
        eyebrow="APRENDIZAJE"
        title="Aprende habilidades para avanzar"
        description="Cursos breves y prácticos para tu vida, trabajo y proyectos."
      />

      <section className="learning-banner">
        <div>
          <span className="module-tag">
            RUTA RECOMENDADA
          </span>

          <h3>
            Prepárate para tu primer empleo
          </h3>

          <p>
            Construye tu perfil, aprende a
            presentar tus habilidades y
            prepárate para entrevistas.
          </p>

          <button
            type="button"
            className="button button-light"
          >
            Ver ruta completa
            <ArrowRight size={18} />
          </button>
        </div>

        <BookOpen size={85} />
      </section>

      <div className="courses-grid">
        {courses.map(
          (course, index) => {
            const Icon =
              course.icon;

            const progress =
              courseProgress[index] ?? 0;

            return (
              <article
                className="course-card"
                key={course.title}
              >
                <div className="course-cover">
                  <Icon size={36} />

                  <span>
                    {course.category}
                  </span>
                </div>

                <div className="course-content">
                  <h3>
                    {course.title}
                  </h3>

                  <div className="course-meta">
                    <span>
                      <Clock3 size={16} />
                      {course.duration}
                    </span>

                    <span>
                      <BookOpen size={16} />
                      {course.lessons}{" "}
                      lecciones
                    </span>
                  </div>

                  <div className="course-progress-header">
                    <span>Progreso</span>
                    <strong>
                      {progress}%
                    </strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-value"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() =>
                      continueCourse(index)
                    }
                  >
                    {progress === 0
                      ? "Comenzar curso"
                      : progress >= 100
                        ? "Curso completado"
                        : "Continuar aprendiendo"}

                    <ArrowRight size={18} />
                  </button>
                </div>
              </article>
            );
          },
        )}
      </div>
    </div>
  );
}

/* =====================================================
   SALUD Y BIENESTAR
===================================================== */

function HealthModule() {
  const { user } = useAuth();

  const moods = [
    "😞",
    "😕",
    "😐",
    "🙂",
    "😁",
  ];

  const [
    selectedMood,
    setSelectedMood,
  ] = useState("");

  const [breathing, setBreathing] =
    useState(false);

  const [seconds, setSeconds] =
    useState(30);

  const accountIsGael =
    isGaelAccount(user?.id);

  /*
    Los datos avanzados se muestran
    únicamente para Gael.

    Las cuentas nuevas aparecen en cero.
  */
  const waterProgress =
    accountIsGael ? 62 : 0;

  const stepsProgress =
    accountIsGael ? 53 : 0;

  const sleepProgress =
    accountIsGael ? 78 : 0;

  const waterText =
    accountIsGael
      ? "5 de 8 vasos"
      : "0 de 8 vasos";

  const stepsText =
    accountIsGael
      ? "4,250 pasos"
      : "0 pasos";

  const sleepText =
    accountIsGael
      ? "7 horas"
      : "Sin registro";

  useEffect(() => {
    if (!breathing) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setSeconds((current) => {
          if (current <= 1) {
            window.clearInterval(
              interval,
            );

            setBreathing(false);

            return 30;
          }

          return current - 1;
        });
      }, 1000);

    return () =>
      window.clearInterval(interval);
  }, [breathing]);

  return (
    <div className="module-page">
      <ModuleHeading
        eyebrow="BIENESTAR"
        title="Haz una pausa y revisa cómo te sientes"
        description="Un espacio sencillo para registrar tu estado de ánimo, hábitos y pequeños avances."
      />

      <div className="health-grid">
        <section className="health-mood-card">
          <div className="health-card-icon">
            <HeartPulse size={25} />
          </div>

          <span>REGISTRO DIARIO</span>

          <h3>
            ¿Cómo te sientes hoy?
          </h3>

          <div className="mood-list">
            {moods.map((mood) => (
              <button
                type="button"
                key={mood}
                className={
                  selectedMood === mood
                    ? "mood-selected"
                    : ""
                }
                onClick={() =>
                  setSelectedMood(mood)
                }
              >
                {mood}
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="mood-confirmation">
              <CheckCircle2 size={18} />
              Estado de ánimo registrado
            </div>
          )}
        </section>

        <section className="breathing-card">
          <div
            className={`breathing-circle ${
              breathing
                ? "breathing-circle-active"
                : ""
            }`}
          >
            <span>
              {breathing
                ? seconds
                : "30"}
            </span>

            <small>segundos</small>
          </div>

          <div>
            <span>
              PAUSA CONSCIENTE
            </span>

            <h3>
              Ejercicio de respiración
            </h3>

            <p>
              Tómate treinta segundos para
              respirar lentamente y regresar
              al momento presente.
            </p>

            <button
              type="button"
              className="button button-primary"
              onClick={() =>
                setBreathing(true)
              }
              disabled={breathing}
            >
              {breathing
                ? "Respira lentamente..."
                : "Comenzar ejercicio"}
            </button>
          </div>
        </section>
      </div>

      <section className="wellbeing-notice">
        <Heart size={25} />

        <div>
          <strong>
            Visiona es una herramienta de
            acompañamiento educativo
          </strong>

          <p>
            Esta sección no realiza
            diagnósticos ni sustituye la
            atención de profesionales de
            la salud mental.
          </p>
        </div>
      </section>

      <div className="habits-grid">
        <article>
          <span>💧</span>

          <h3>Hidratación</h3>

          <strong>
            {waterText}
          </strong>

          <div className="progress-track">
            <div
              className="progress-value"
              style={{
                width: `${waterProgress}%`,
              }}
            />
          </div>
        </article>

        <article>
          <span>🚶</span>

          <h3>Movimiento</h3>

          <strong>
            {stepsText}
          </strong>

          <div className="progress-track">
            <div
              className="progress-value"
              style={{
                width: `${stepsProgress}%`,
              }}
            />
          </div>
        </article>

        <article>
          <span>😴</span>

          <h3>Descanso</h3>

          <strong>
            {sleepText}
          </strong>

          <div className="progress-track">
            <div
              className="progress-value"
              style={{
                width: `${sleepProgress}%`,
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}

/* =====================================================
   MI FUTURO
===================================================== */

function FutureModule() {
  const { user } = useAuth();

  const [goal, setGoal] =
    useState("");

  const [years, setYears] =
    useState("5");

  const [
    generatedGoal,
    setGeneratedGoal,
  ] = useState("");

  const goalsStorageKey =
    createUserStorageKey(
      "visiona_goals",
      user?.id,
    );

  /*
    Cada usuario conserva su propia meta.
  */
  useEffect(() => {
    if (!user) {
      return;
    }

    try {
      const storedGoal =
        localStorage.getItem(
          goalsStorageKey,
        );

      if (!storedGoal) {
        setGeneratedGoal("");
        setGoal("");
        setYears("5");

        return;
      }

      const parsedGoal =
        JSON.parse(storedGoal) as {
          goal: string;
          years: string;
        };

      setGeneratedGoal(
        parsedGoal.goal,
      );

      setGoal(parsedGoal.goal);

      setYears(
        parsedGoal.years,
      );
    } catch {
      setGeneratedGoal("");
      setGoal("");
      setYears("5");
    }
  }, [
    goalsStorageKey,
    user,
  ]);

  function generateFuture(
    event: FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    if (!goal.trim()) {
      return;
    }

    const normalizedGoal =
      goal.trim();

    setGeneratedGoal(
      normalizedGoal,
    );

    localStorage.setItem(
      goalsStorageKey,
      JSON.stringify({
        goal: normalizedGoal,
        years,
      }),
    );
  }

  return (
    <div className="module-page">
      <ModuleHeading
        eyebrow="MI FUTURO"
        title="Imagina tu vida y construye una ruta"
        description="Transforma una meta grande en pasos más claros, alcanzables y medibles."
      />

      <section className="future-builder">
        <form onSubmit={generateFuture}>
          <span className="module-tag">
            SIMULADOR DE FUTURO
          </span>

          <h3>
            ¿Qué te gustaría lograr?
          </h3>

          <textarea
            placeholder="Ejemplo: quiero tener mi propia cafetería, conseguir un empleo como desarrollador..."
            value={goal}
            onChange={(event) =>
              setGoal(event.target.value)
            }
          />

          <label>
            Quiero lograrlo aproximadamente
            en

            <select
              value={years}
              onChange={(event) =>
                setYears(
                  event.target.value,
                )
              }
            >
              <option value="1">
                1 año
              </option>

              <option value="3">
                3 años
              </option>

              <option value="5">
                5 años
              </option>

              <option value="10">
                10 años
              </option>
            </select>
          </label>

          <button className="button button-primary">
            <Sparkles size={18} />
            Crear mi ruta
          </button>
        </form>

        <div className="future-builder-visual">
          <Target size={76} />

          <h3>
            Tu visión, convertida en
            acciones
          </h3>

          <p>
            Visiona divide tu objetivo en
            conocimientos, recursos y pasos
            progresivos.
          </p>
        </div>
      </section>

      {generatedGoal && (
        <section className="roadmap-section">
          <div className="dashboard-panel-heading">
            <div>
              <span>
                RUTA GENERADA PARA{" "}
                {years} AÑOS
              </span>

              <h3>
                {generatedGoal}
              </h3>
            </div>
          </div>

          <div className="roadmap-list">
            <article>
              <small>ETAPA 1</small>

              <div>
                <strong>
                  Explorar y definir
                </strong>

                <p>
                  Investiga el área,
                  identifica recursos y
                  establece un resultado
                  concreto.
                </p>
              </div>
            </article>

            <article>
              <small>ETAPA 2</small>

              <div>
                <strong>
                  Aprender y prepararte
                </strong>

                <p>
                  Desarrolla habilidades
                  esenciales mediante cursos,
                  práctica y proyectos.
                </p>
              </div>
            </article>

            <article>
              <small>ETAPA 3</small>

              <div>
                <strong>
                  Crear experiencia
                </strong>

                <p>
                  Construye evidencias de tu
                  trabajo, recibe
                  retroalimentación y mejora.
                </p>
              </div>
            </article>

            <article>
              <small>ETAPA 4</small>

              <div>
                <strong>
                  Ejecutar y medir
                </strong>

                <p>
                  Pon en marcha tu proyecto y
                  evalúa los resultados
                  obtenidos.
                </p>
              </div>
            </article>
          </div>
        </section>
      )}
    </div>
  );
}

/* =====================================================
   COMUNIDAD
===================================================== */

function CommunityModule() {
  const { user } = useAuth();

  const [likes, setLikes] =
    useState([
      24,
      17,
      31,
    ]);

  const [newPost, setNewPost] =
    useState("");

  /*
    Estas publicaciones son públicas
    de la comunidad, no son datos privados
    de la cuenta de Gael.
  */
  const [posts, setPosts] =
    useState([
      {
        author: "Mariana",
        role: "Estudiante de diseño",
        content:
          "Estoy creando un proyecto para ayudar a pequeños negocios a mejorar su identidad visual. ¿Alguien quiere colaborar?",
        time: "Hace 20 min",
      },
      {
        author: "Luis",
        role: "Desarrollador junior",
        content:
          "Terminé mi primer portafolio de desarrollo web. Visiona me ayudó a ordenar mis proyectos y habilidades.",
        time: "Hace 1 hora",
      },
      {
        author: "Andrea",
        role: "Emprendedora",
        content:
          "Busco una persona que sepa de redes sociales para colaborar en una idea de productos sustentables.",
        time: "Hace 3 horas",
      },
    ]);

  const currentUserName =
    user?.name?.trim() ||
    "Usuario Visiona";

  const currentFirstName =
    currentUserName.split(" ")[0];

  const currentInitial =
    currentFirstName
      .charAt(0)
      .toUpperCase() || "V";

  function publishPost(): void {
    if (!newPost.trim()) {
      return;
    }

    setPosts((current) => [
      {
        author: currentFirstName,
        role: "Explorador Visiona",
        content: newPost.trim(),
        time: "Ahora",
      },
      ...current,
    ]);

    setLikes((current) => [
      0,
      ...current,
    ]);

    setNewPost("");
  }

  function likePost(
    index: number,
  ): void {
    setLikes((current) =>
      current.map(
        (
          likesAmount,
          currentIndex,
        ) =>
          currentIndex === index
            ? likesAmount + 1
            : likesAmount,
      ),
    );
  }

  return (
    <div className="module-page">
      <ModuleHeading
        eyebrow="COMUNIDAD"
        title="Comparte, aprende y construye con otros"
        description="Encuentra personas, proyectos e ideas que pueden impulsar tu crecimiento."
      />

      <div className="community-layout">
        <section className="community-feed">
          <div className="create-post-card">
            <div className="community-avatar">
              {currentInitial}
            </div>

            <textarea
              placeholder="Comparte una idea, avance o proyecto..."
              value={newPost}
              onChange={(event) =>
                setNewPost(
                  event.target.value,
                )
              }
            />

            <button
              type="button"
              onClick={publishPost}
              aria-label="Publicar"
            >
              <Send size={19} />
            </button>
          </div>

          {posts.map(
            (post, index) => (
              <article
                className="community-post"
                key={`${post.author}-${post.time}-${index}`}
              >
                <div className="community-post-header">
                  <div className="community-avatar">
                    {post.author
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {post.author}
                    </strong>

                    <span>
                      {post.role}
                    </span>
                  </div>

                  <time>
                    {post.time}
                  </time>
                </div>

                <p>{post.content}</p>

                <div className="community-post-actions">
                  <button
                    type="button"
                    onClick={() =>
                      likePost(index)
                    }
                  >
                    <ThumbsUp size={18} />
                    {likes[index] ?? 0}
                  </button>

                  <button type="button">
                    <MessageCircle
                      size={18}
                    />
                    Comentar
                  </button>
                </div>
              </article>
            ),
          )}
        </section>

        <aside className="community-sidebar">
          <section>
            <div className="community-sidebar-heading">
              <Users size={20} />

              <strong>
                Personas sugeridas
              </strong>
            </div>

            {[
              "Diana",
              "Emilio",
              "Fernanda",
            ].map((person) => (
              <div
                className="suggested-person"
                key={person}
              >
                <div className="community-avatar">
                  {person.charAt(0)}
                </div>

                <div>
                  <strong>
                    {person}
                  </strong>

                  <span>
                    Intereses compatibles
                  </span>
                </div>

                <button type="button">
                  <Plus size={18} />
                </button>
              </div>
            ))}
          </section>

          <section className="community-project-card">
            <Rocket size={26} />

            <h3>
              ¿Tienes un proyecto?
            </h3>

            <p>
              Publícalo para encontrar
              colaboradores y recibir ideas.
            </p>

            <button
              type="button"
              className="button button-secondary"
            >
              Crear proyecto
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* =====================================================
   SOLICITUDES
===================================================== */

function RequestsModule() {
  const { user } = useAuth();

  const [
    requests,
    setRequests,
  ] = useState<VisionRequest[]>([]);

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    requestTitle,
    setRequestTitle,
  ] = useState("");

  const [
    requestType,
    setRequestType,
  ] = useState("Orientación");

  const [
    requestDescription,
    setRequestDescription,
  ] = useState("");

  /*
    Cada cuenta utiliza una clave diferente.

    Ejemplo:

    Gael:
    visiona_requests_gael-demo

    Marlen:
    visiona_requests_user-123456
  */
  const requestsStorageKey =
    createUserStorageKey(
      "visiona_requests",
      user?.id,
    );

  /*
    Gael recibe las solicitudes de demostración.

    Marlen y cualquier usuario nuevo
    reciben un arreglo vacío.
  */
  useEffect(() => {
    if (!user) {
      return;
    }

    try {
      const storedRequests =
        localStorage.getItem(
          requestsStorageKey,
        );

      if (storedRequests) {
        setRequests(
          JSON.parse(
            storedRequests,
          ) as VisionRequest[],
        );

        return;
      }

      const accountRequests =
        isGaelAccount(user.id)
          ? initialGaelRequests
          : [];

      setRequests(accountRequests);

      localStorage.setItem(
        requestsStorageKey,
        JSON.stringify(
          accountRequests,
        ),
      );
    } catch {
      setRequests([]);
    }
  }, [
    requestsStorageKey,
    user,
  ]);

  function saveRequests(
    updatedRequests: VisionRequest[],
  ): void {
    setRequests(updatedRequests);

    localStorage.setItem(
      requestsStorageKey,
      JSON.stringify(
        updatedRequests,
      ),
    );
  }

  function createRequest(
    event: FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    if (
      !requestTitle.trim() ||
      !requestDescription.trim()
    ) {
      return;
    }

    const today =
      new Date().toLocaleDateString(
        "es-MX",
      );

    const newRequest: VisionRequest = {
      id: `SOL-${Math.floor(
        2500 +
          Math.random() * 500,
      )}`,

      title:
        requestTitle.trim(),

      type: requestType,

      description:
        requestDescription.trim(),

      status: "RECIBIDA",

      responsible:
        "Pendiente de asignación",

      createdAt: today,
      updatedAt: today,
      progress: 10,
    };

    saveRequests([
      newRequest,
      ...requests,
    ]);

    setRequestTitle("");
    setRequestDescription("");
    setRequestType("Orientación");
    setShowForm(false);
  }

  function advanceRequest(
    requestId: string,
  ): void {
    const updatedRequests =
      requests.map((request) => {
        if (
          request.id !== requestId
        ) {
          return request;
        }

        const currentIndex =
          requestStatusOrder.indexOf(
            request.status,
          );

        if (
          currentIndex >=
          requestStatusOrder.length - 1
        ) {
          return request;
        }

        const nextStatus =
          requestStatusOrder[
            currentIndex + 1
          ];

        return {
          ...request,

          status: nextStatus,

          updatedAt:
            new Date().toLocaleDateString(
              "es-MX",
            ),

          progress: Math.round(
            ((currentIndex + 2) /
              requestStatusOrder.length) *
              100,
          ),

          responsible:
            request.responsible ===
            "Pendiente de asignación"
              ? "Mariana Torres"
              : request.responsible,
        };
      });

    saveRequests(updatedRequests);
  }

  return (
    <div className="module-page">
      <div className="module-heading-with-action">
        <ModuleHeading
          eyebrow="SEGUIMIENTO"
          title="Mis solicitudes"
          description="Consulta el estado de tus solicitudes de orientación, empleo, emprendimiento y colaboración."
        />

        <button
          type="button"
          className="button button-primary"
          onClick={() =>
            setShowForm(
              (current) => !current,
            )
          }
        >
          <Plus size={19} />
          Nueva solicitud
        </button>
      </div>

      {showForm && (
        <form
          className="request-form"
          onSubmit={createRequest}
        >
          <div className="request-form-heading">
            <div>
              <span>
                NUEVA SOLICITUD
              </span>

              <h3>
                ¿En qué necesitas apoyo?
              </h3>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowForm(false)
              }
            >
              Cerrar
            </button>
          </div>

          <div className="request-form-grid">
            <label>
              Título

              <input
                placeholder="Ejemplo: orientación para buscar empleo"
                value={requestTitle}
                onChange={(event) =>
                  setRequestTitle(
                    event.target.value,
                  )
                }
              />
            </label>

            <label>
              Tipo

              <select
                value={requestType}
                onChange={(event) =>
                  setRequestType(
                    event.target.value,
                  )
                }
              >
                <option>
                  Orientación
                </option>

                <option>
                  Empleo
                </option>

                <option>
                  Emprendimiento
                </option>

                <option>
                  Proyecto de vida
                </option>

                <option>
                  Colaboración
                </option>
              </select>
            </label>
          </div>

          <label>
            Descripción

            <textarea
              placeholder="Describe brevemente qué necesitas..."
              value={requestDescription}
              onChange={(event) =>
                setRequestDescription(
                  event.target.value,
                )
              }
            />
          </label>

          <button
            className="button button-primary"
            type="submit"
          >
            <Send size={18} />
            Enviar solicitud
          </button>
        </form>
      )}

      <section className="request-flow-banner">
        <div>
          <Sparkles size={23} />
        </div>

        <div>
          <strong>
            ¿Cómo funciona el seguimiento?
          </strong>

          <p>
            Cada solicitud se registra,
            clasifica, revisa, aprueba y
            ejecuta mediante un flujo de
            atención.
          </p>
        </div>
      </section>

      {requests.length === 0 ? (
        <section
          className="business-result"
          style={{
            minHeight: "330px",
          }}
        >
          <div className="business-empty">
            <ClipboardEmptyIcon />

            <h3>
              Todavía no tienes solicitudes
            </h3>

            <p>
              Tu cuenta comienza en cero.
              Cuando necesites orientación,
              empleo, apoyo para emprender
              o colaboración, crea tu primera
              solicitud.
            </p>

            <button
              type="button"
              className="button button-primary"
              onClick={() =>
                setShowForm(true)
              }
              style={{
                marginTop: "20px",
              }}
            >
              <Plus size={18} />
              Crear mi primera solicitud
            </button>
          </div>
        </section>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <article
              className="request-card"
              key={request.id}
            >
              <div className="request-card-header">
                <div>
                  <span>
                    {request.id}
                  </span>

                  <h3>
                    {request.title}
                  </h3>
                </div>

                <span
                  className={`request-status request-status-${request.status.toLowerCase()}`}
                >
                  {
                    requestStatusLabels[
                      request.status
                    ]
                  }
                </span>
              </div>

              <p>
                {request.description}
              </p>

              <div className="request-information">
                <div>
                  <span>Tipo</span>

                  <strong>
                    {request.type}
                  </strong>
                </div>

                <div>
                  <span>
                    Responsable
                  </span>

                  <strong>
                    {request.responsible}
                  </strong>
                </div>

                <div>
                  <span>Creada</span>

                  <strong>
                    {request.createdAt}
                  </strong>
                </div>

                <div>
                  <span>
                    Actualizada
                  </span>

                  <strong>
                    {request.updatedAt}
                  </strong>
                </div>
              </div>

              <div className="request-progress-header">
                <span>
                  Avance del proceso
                </span>

                <strong>
                  {request.progress}%
                </strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-value"
                  style={{
                    width: `${request.progress}%`,
                  }}
                />
              </div>

              <div className="request-actions">
                <button
                  type="button"
                  className="button button-secondary"
                >
                  Ver seguimiento
                </button>

                {request.status !==
                  "FINALIZADA" && (
                  <button
                    type="button"
                    className="request-demo-button"
                    onClick={() =>
                      advanceRequest(
                        request.id,
                      )
                    }
                  >
                    Simular siguiente estado
                    <ArrowRight size={17} />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

/*
  Icono simple para el estado vacío de solicitudes.
*/
function ClipboardEmptyIcon() {
  return (
    <div
      style={{
        display: "grid",
        width: "64px",
        height: "64px",
        margin: "0 auto",
        placeItems: "center",
        color: "#6b53d7",
        background: "#eeeaff",
        borderRadius: "18px",
      }}
    >
      <BookOpen size={31} />
    </div>
  );
}


/* =====================================================
   VISIONA PREMIUM
===================================================== */

function PremiumModule() {
  const { user } = useAuth();

  const [
    premiumActive,
    setPremiumActive,
  ] = useState(false);

  const [
    aiMessage,
    setAiMessage,
  ] = useState("");

  const [
    aiResponse,
    setAiResponse,
  ] = useState(
    "Cuéntame qué quieres lograr y construiré contigo un plan paso a paso.",
  );

  const premiumStorageKey =
    createUserStorageKey(
      "visiona_premium",
      user?.id,
    );

  const firstName =
    user?.name?.split(" ")[0] ??
    "Explorador";

  useEffect(() => {
    if (!user) {
      return;
    }

    try {
      const storedPremium =
        localStorage.getItem(
          premiumStorageKey,
        );

      setPremiumActive(
        storedPremium === "true",
      );
    } catch {
      setPremiumActive(false);
    }
  }, [
    premiumStorageKey,
    user,
  ]);

  function activatePremium(): void {
    if (!user) {
      return;
    }

    localStorage.setItem(
      premiumStorageKey,
      "true",
    );

    setPremiumActive(true);
  }

  function sendAiMessage(): void {
    if (
      !premiumActive ||
      !aiMessage.trim()
    ) {
      return;
    }

    setAiResponse(
      `${firstName}, tomando en cuenta tu perfil en Visiona, te recomiendo dividir ese objetivo en tres etapas: preparación, experiencia y ejecución. Podemos comenzar identificando las habilidades que necesitas desarrollar primero.`,
    );

    setAiMessage("");
  }

  const price = 199;

  const premiumCourses = [
    {
      icon: Bot,
      category:
        "INTELIGENCIA ARTIFICIAL",
      title:
        "IA aplicada a tu vida profesional",
      description:
        "Aprende a utilizar inteligencia artificial para estudiar, trabajar y desarrollar proyectos.",
      lessons: 12,
      duration: "4 h 20 min",
    },
    {
      icon: Rocket,
      category: "EMPRENDIMIENTO",
      title:
        "De una idea a un negocio real",
      description:
        "Convierte una idea en una propuesta clara, valida clientes y construye tus primeros pasos.",
      lessons: 16,
      duration: "5 h 10 min",
    },
    {
      icon: GraduationCap,
      category:
        "DESARROLLO PROFESIONAL",
      title:
        "Construye un perfil que destaque",
      description:
        "CV, portafolio, entrevistas, marca personal y estrategias para conseguir oportunidades.",
      lessons: 10,
      duration: "3 h 45 min",
    },
  ];

  return (
    <div className="module-page premium-page">
      <section className="premium-hero">
        <div className="premium-glow premium-glow-one" />
        <div className="premium-glow premium-glow-two" />

        <div className="premium-hero-content">
          <div className="premium-label">
            <Crown size={16} />
            VISIONA PREMIUM
          </div>

          <h2>
            Lleva tu futuro a otro nivel.
          </h2>

          <p>
            Herramientas avanzadas,
            inteligencia artificial,
            cursos exclusivos y rutas
            personalizadas para ayudarte
            a avanzar más rápido.
          </p>

          <div className="premium-hero-features">
            <span>
              <CheckCircle2 size={17} />
              Visiona IA
            </span>

            <span>
              <CheckCircle2 size={17} />
              Cursos Premium
            </span>

            <span>
              <CheckCircle2 size={17} />
              Rutas inteligentes
            </span>
          </div>

          {!premiumActive ? (
            <div className="premium-active-badge">
              <Sparkles size={20} />

              <div>
                <strong>
                  Una experiencia más completa
                </strong>

                <span>
                  IA, cursos, rutas y herramientas exclusivas
                  reunidas en un solo espacio.
                </span>
              </div>
            </div>
          ) : (
            <div className="premium-active-badge">
              <BadgeCheck size={20} />

              <div>
                <strong>
                  Visiona Premium activo
                </strong>

                <span>
                  Todas las herramientas
                  están desbloqueadas.
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="premium-membership-card">
          <div className="premium-membership-top">
            <div className="premium-membership-logo-wrapper">
              <Logo light />
            </div>
          </div>

          <div className="premium-membership-name">
            <span>MEMBRESÍA</span>
            <strong>PREMIUM</strong>
          </div>

          <div className="premium-membership-user">
            <span>MIEMBRO</span>

            <strong>
              {user?.name}
            </strong>
          </div>

          <div className="premium-membership-footer">
            <span>
              Acceso completo
            </span>

            <Sparkles size={19} />
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-section-heading">
          <div>
            <span>
              TU EXPERIENCIA PREMIUM
            </span>

            <h3>
              Más herramientas.
              Más posibilidades.
            </h3>

            <p>
              Una experiencia diseñada
              para acompañarte desde que
              descubres qué quieres hasta
              que comienzas a conseguirlo.
            </p>
          </div>
        </div>

        <div className="premium-features-grid">
          <article className="premium-feature-card premium-feature-main">
            <div className="premium-feature-icon">
              <Bot size={29} />
            </div>

            <span>VISIONA IA</span>

            <h3>
              Un asistente que conoce
              tu camino
            </h3>

            <p>
              Recibe orientación
              personalizada para estudios,
              empleos, proyectos, objetivos
              y decisiones profesionales.
            </p>

            <div className="premium-card-bottom">
              <Zap size={16} />
              Disponible 24/7
            </div>
          </article>

          <article className="premium-feature-card">
            <div className="premium-feature-icon">
              <GraduationCap size={29} />
            </div>

            <span>CURSOS</span>

            <h3>
              Contenido exclusivo
            </h3>

            <p>
              Cursos avanzados enfocados
              en habilidades profesionales,
              tecnología y emprendimiento.
            </p>
          </article>

          <article className="premium-feature-card">
            <div className="premium-feature-icon">
              <Target size={29} />
            </div>

            <span>RUTAS</span>

            <h3>
              Planes inteligentes
            </h3>

            <p>
              Convierte tus objetivos en
              pasos, prioridades y acciones
              concretas.
            </p>
          </article>

          <article className="premium-feature-card">
            <div className="premium-feature-icon">
              <Video size={29} />
            </div>

            <span>MENTORÍAS</span>

            <h3>
              Acompañamiento experto
            </h3>

            <p>
              Accede a sesiones y contenido
              especial de profesionales y
              mentores.
            </p>
          </article>

          <article className="premium-feature-card">
            <div className="premium-feature-icon">
              <BadgeCheck size={29} />
            </div>

            <span>CERTIFICADOS</span>

            <h3>
              Demuestra lo que sabes
            </h3>

            <p>
              Obtén reconocimientos al
              completar rutas y contenidos
              especializados.
            </p>
          </article>

          <article className="premium-feature-card">
            <div className="premium-feature-icon">
              <BarChart3 size={29} />
            </div>

            <span>ANALÍTICA</span>

            <h3>
              Entiende tu progreso
            </h3>

            <p>
              Visualiza avances,
              habilidades, constancia y
              crecimiento dentro de Visiona.
            </p>
          </article>
        </div>
      </section>

      <section className="premium-ai-section">
        <div className="premium-ai-info">
          <div className="premium-ai-icon">
            <Bot size={31} />
          </div>

          <span>VISIONA IA</span>

          <h3>
            Tu copiloto para construir
            el futuro que quieres.
          </h3>

          <p>
            Pregunta sobre carreras,
            empleos, emprendimiento,
            habilidades o tus próximos
            pasos.
          </p>

          <div className="premium-ai-capabilities">
            <span>
              <Check size={16} />
              Analiza tus objetivos
            </span>

            <span>
              <Check size={16} />
              Recomienda rutas
            </span>

            <span>
              <Check size={16} />
              Te ayuda a tomar decisiones
            </span>

            <span>
              <Check size={16} />
              Convierte ideas en acciones
            </span>
          </div>
        </div>

        <div className="premium-ai-chat">
          <div className="premium-ai-chat-header">
            <div className="premium-ai-avatar">
              <Sparkles size={20} />
            </div>

            <div>
              <strong>
                Visiona IA
              </strong>

              <span>
                <i />
                En línea
              </span>
            </div>

            <div className="premium-ai-model">
              PREMIUM
            </div>
          </div>

          <div className="premium-ai-messages">
            <div className="premium-ai-message">
              <div>
                <Sparkles size={16} />
              </div>

              <p>
                {aiResponse}
              </p>
            </div>

            {!premiumActive && (
              <div className="premium-ai-lock">
                <Crown size={24} />

                <strong>
                  Desbloquea Visiona IA
                </strong>

                <span>
                  Disponible con Premium
                </span>
              </div>
            )}
          </div>

          <div className="premium-ai-input">
            <input
              placeholder={
                premiumActive
                  ? "Pregúntale algo a Visiona IA..."
                  : "Activa Premium para utilizar la IA"
              }
              value={aiMessage}
              onChange={(event) =>
                setAiMessage(
                  event.target.value,
                )
              }
              disabled={!premiumActive}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter"
                ) {
                  sendAiMessage();
                }
              }}
            />

            <button
              type="button"
              onClick={sendAiMessage}
              disabled={
                !premiumActive ||
                !aiMessage.trim()
              }
              aria-label="Enviar mensaje"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="premium-section">
        <div className="premium-section-heading premium-heading-row">
          <div>
            <span>
              ACADEMIA PREMIUM
            </span>

            <h3>
              Aprende habilidades que
              sí puedes aplicar
            </h3>

            <p>
              Contenido diseñado para
              transformar conocimiento
              en resultados.
            </p>
          </div>

          <button
            type="button"
            className="premium-text-button"
          >
            Explorar todos
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="premium-courses-grid">
          {premiumCourses.map(
            (course, index) => {
              const Icon =
                course.icon;

              return (
                <article
                  className="premium-course-card"
                  key={course.title}
                >
                  <div
                    className={`premium-course-cover premium-course-cover-${index + 1}`}
                  >
                    <div>
                      <Icon size={34} />
                    </div>

                    <span>
                      PREMIUM
                    </span>
                  </div>

                  <div className="premium-course-content">
                    <span>
                      {course.category}
                    </span>

                    <h3>
                      {course.title}
                    </h3>

                    <p>
                      {
                        course.description
                      }
                    </p>

                    <div className="premium-course-meta">
                      <span>
                        <BookOpen
                          size={15}
                        />
                        {course.lessons}{" "}
                        lecciones
                      </span>

                      <span>
                        <Clock3
                          size={15}
                        />
                        {course.duration}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={
                        premiumActive
                          ? "button button-primary"
                          : "premium-locked-button"
                      }
                      disabled={
                        !premiumActive
                      }
                    >
                      {premiumActive ? (
                        <>
                          Comenzar curso
                          <ArrowRight
                            size={17}
                          />
                        </>
                      ) : (
                        <>
                          <Crown
                            size={16}
                          />
                          Contenido Premium
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </section>

      {!premiumActive && (
        <section className="premium-pricing-section">
          <div className="premium-pricing-copy">
            <span>
              HAZ MÁS CON VISIONA
            </span>

            <h3>
              Todo lo que necesitas,
              en un solo lugar.
            </h3>

            <p>
              Desbloquea la experiencia
              completa de Visiona.
            </p>

          </div>

          <div className="premium-price-card">
            <div className="premium-price-card-top">
              <div>
                <Crown size={26} />
              </div>

              <span>
                RECOMENDADO
              </span>
            </div>

            <h3>
              Visiona Premium
            </h3>

            <div className="premium-price">
              <span>$</span>

              <strong>
                {price}
              </strong>

              <div>
                <span>MXN</span>
                <small>/ mes</small>
              </div>
            </div>

            <div className="premium-price-features">
              <span>
                <CheckCircle2 size={17} />
                Visiona IA
              </span>

              <span>
                <CheckCircle2 size={17} />
                Cursos Premium
              </span>

              <span>
                <CheckCircle2 size={17} />
                Rutas inteligentes
              </span>

              <span>
                <CheckCircle2 size={17} />
                Certificados
              </span>

              <span>
                <CheckCircle2 size={17} />
                Analítica avanzada
              </span>
            </div>

            <button
              type="button"
              className="premium-subscribe-button"
              onClick={activatePremium}
            >
              <Crown size={18} />
              Obtener Premium
              <ArrowRight size={18} />
            </button>

            <small className="premium-demo-notice">
              Demostración del prototipo.
              No se realizará ningún cobro.
            </small>
          </div>
        </section>
      )}

      <section className="premium-footer-banner">
        <ShieldCheck size={28} />

        <div>
          <strong>
            Tu experiencia sigue siendo
            tuya
          </strong>

          <p>
            Tus objetivos y progreso se
            mantienen asociados únicamente
            a tu cuenta.
          </p>
        </div>

        <Crown size={28} />
      </section>
    </div>
  );
}

/* =====================================================
   PERFIL
===================================================== */

function ProfileModule() {
  const {
    user,
    updateUser,
  } = useAuth();

  const [name, setName] =
    useState(user?.name ?? "");

  const [headline, setHeadline] =
    useState(
      user?.headline ?? "",
    );

  const [saved, setSaved] =
    useState(false);

  /*
    Si cambia la sesión, actualizamos
    los campos para mostrar los datos
    del usuario correcto.
  */
  useEffect(() => {
    setName(
      user?.name ?? "",
    );

    setHeadline(
      user?.headline ?? "",
    );
  }, [user]);

  const accountIsGael =
    isGaelAccount(user?.id);

  const profileProgress =
    accountIsGael ? 68 : 0;

  const goalsAmount =
    accountIsGael ? 7 : 0;

  const coursesAmount =
    accountIsGael ? 3 : 0;

  const userInitial =
    user?.name
      ?.charAt(0)
      .toUpperCase() || "V";

  function saveProfile(
    event: FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();

    updateUser({
      name: name.trim(),
      headline: headline.trim(),
    });

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <div className="module-page">
      <ModuleHeading
        eyebrow="MI PERFIL"
        title="Personaliza tu espacio"
        description="Mantén actualizada la información que Visiona utiliza para mostrarte recomendaciones."
      />

      <div className="profile-module-grid">
        <aside className="profile-summary-card">
          <div className="profile-large-avatar">
            {userInitial}
          </div>

          <h3>
            {user?.name}
          </h3>

          <span>
            {user?.headline}
          </span>

          <div className="profile-level-badge">
            <Sparkles size={17} />

            Nivel {user?.level ?? 1} ·{" "}
            {user?.points ?? 0} puntos
          </div>

          <div className="profile-summary-statistics">
            <div>
              <strong>
                {profileProgress}%
              </strong>

              <span>Perfil</span>
            </div>

            <div>
              <strong>
                {goalsAmount}
              </strong>

              <span>Metas</span>
            </div>

            <div>
              <strong>
                {coursesAmount}
              </strong>

              <span>Cursos</span>
            </div>
          </div>
        </aside>

        <form
          className="profile-form"
          onSubmit={saveProfile}
        >
          <div className="profile-form-heading">
            <CircleUserRound
              size={23}
            />

            <div>
              <span>
                INFORMACIÓN PERSONAL
              </span>

              <h3>
                Datos del perfil
              </h3>
            </div>
          </div>

          <label>
            Nombre

            <input
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value,
                )
              }
            />
          </label>

          <label>
            Correo electrónico

            <input
              value={user?.email ?? ""}
              disabled
            />
          </label>

          <label>
            Etapa actual

            <input
              value={
                user?.stage ??
                "Sin información"
              }
              disabled
            />
          </label>

          <label>
            Objetivo principal

            <input
              value={
                user?.mainGoal ??
                "Sin información"
              }
              disabled
            />
          </label>

          <label>
            Descripción profesional

            <input
              value={headline}
              onChange={(event) =>
                setHeadline(
                  event.target.value,
                )
              }
              placeholder="Ejemplo: estudiante de ingeniería..."
            />
          </label>

          <label>
            Acerca de mí

            <textarea placeholder="Cuéntanos sobre tus intereses, habilidades y objetivos..." />
          </label>

          <button
            className="button button-primary"
            type="submit"
          >
            {saved ? (
              <>
                <Check size={18} />
                Cambios guardados
              </>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}