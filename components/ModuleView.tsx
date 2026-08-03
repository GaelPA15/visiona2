"use client";

import {
  ArrowRight,
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
  useMemo,
  useState,
  type FormEvent,
} from "react";

import { useAuth } from "@/components/AuthProvider";

import type {
  RequestStatus,
  VisionRequest,
} from "@/types";

const requestStatusLabels: Record<RequestStatus, string> = {
  RECIBIDA: "Recibida",
  REGISTRADA: "Registrada",
  CLASIFICADA: "Clasificada",
  DATOS_INCOMPLETOS: "Datos incompletos",
  EN_PROCESO: "En proceso",
  PENDIENTE_APROBACION: "Pendiente de aprobación",
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

const initialRequests: VisionRequest[] = [
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

const jobs = [
  {
    id: 1,
    title: "Desarrollador Frontend Jr.",
    company: "Nova Studio",
    location: "México",
    mode: "Remoto",
    salary: "$15,000 - $20,000 MXN",
    tags: ["React", "TypeScript", "Primer empleo"],
    featured: true,
  },
  {
    id: 2,
    title: "Practicante de Marketing Digital",
    company: "Impulso Creativo",
    location: "Ciudad de México",
    mode: "Híbrido",
    salary: "$8,000 MXN",
    tags: ["Marketing", "Redes sociales"],
    featured: false,
  },
  {
    id: 3,
    title: "Analista de Datos Trainee",
    company: "Data Norte",
    location: "Monterrey",
    mode: "Remoto",
    salary: "$14,000 - $18,000 MXN",
    tags: ["Excel", "SQL", "Power BI"],
    featured: false,
  },
  {
    id: 4,
    title: "Diseñador UX/UI Jr.",
    company: "Pixel Lab",
    location: "Guadalajara",
    mode: "Híbrido",
    salary: "$16,000 MXN",
    tags: ["Figma", "UX", "Diseño"],
    featured: false,
  },
];

const courses = [
  {
    title: "Finanzas personales desde cero",
    category: "Finanzas",
    duration: "2 h 30 min",
    lessons: 8,
    progress: 65,
    icon: WalletCards,
  },
  {
    title: "Cómo validar una idea de negocio",
    category: "Emprendimiento",
    duration: "3 horas",
    lessons: 10,
    progress: 30,
    icon: Rocket,
  },
  {
    title: "Marca personal para tu primer empleo",
    category: "Empleo",
    duration: "1 h 45 min",
    lessons: 6,
    progress: 0,
    icon: BriefcaseBusiness,
  },
];

export default function ModuleView() {
  const params = useParams();
  const moduleName = String(params.modulo ?? "");

  switch (moduleName) {
    case "descubre":
      return <DiscoverModule />;

    case "empleos":
      return <JobsModule />;

    case "negocios":
      return <BusinessModule />;

    case "aprendizaje":
      return <LearningModule />;

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
          <p>La sección que buscas todavía no está disponible.</p>
        </div>
      );
  }
}

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

function DiscoverModule() {
  const [testStarted, setTestStarted] = useState(false);
  const [question, setQuestion] = useState(0);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      title: "¿Qué actividad disfrutas más?",
      options: [
        "Crear o programar cosas",
        "Organizar equipos",
        "Ayudar y escuchar personas",
        "Diseñar y comunicar ideas",
      ],
    },
    {
      title: "¿Qué problema preferirías resolver?",
      options: [
        "Un problema tecnológico",
        "Una necesidad de un negocio",
        "Una situación personal",
        "Una experiencia visual",
      ],
    },
    {
      title: "¿Qué entorno te llama más la atención?",
      options: [
        "Una empresa tecnológica",
        "Mi propio emprendimiento",
        "Una organización social",
        "Un estudio creativo",
      ],
    },
  ];

  function selectAnswer(): void {
    if (question < questions.length - 1) {
      setQuestion((current) => current + 1);
      return;
    }

    setCompleted(true);
  }

  if (testStarted && !completed) {
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
              Pregunta {question + 1} de {questions.length}
            </span>

            <strong>
              {Math.round(((question + 1) / questions.length) * 100)}%
            </strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-value"
              style={{
                width: `${((question + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h3>{questions[question].title}</h3>

          <div className="test-options">
            {questions[question].options.map((option) => (
              <button key={option} onClick={selectAnswer}>
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
          description="Estas recomendaciones se generan con base en tus respuestas de demostración."
        />

        <section className="results-hero">
          <div className="results-score">
            <strong>92%</strong>
            <span>compatibilidad principal</span>
          </div>

          <div>
            <span className="module-tag">MEJOR COINCIDENCIA</span>
            <h3>Tecnología y desarrollo digital</h3>

            <p>
              Tu perfil refleja pensamiento lógico, creatividad, curiosidad y
              gusto por resolver problemas mediante herramientas digitales.
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
            <h3>Emprendimiento digital</h3>
            <p>Crea productos, servicios y soluciones mediante tecnología.</p>
          </article>

          <article>
            <span>79%</span>
            <Brain size={27} />
            <h3>Experiencia de usuario</h3>
            <p>Investiga necesidades y diseña experiencias útiles.</p>
          </article>

          <article>
            <span>74%</span>
            <TrendingUp size={27} />
            <h3>Analítica de negocios</h3>
            <p>Utiliza datos para tomar decisiones y mejorar resultados.</p>
          </article>
        </div>

        <button
          className="button button-secondary"
          onClick={() => {
            setCompleted(false);
            setQuestion(0);
          }}
        >
          Repetir demostración
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
          <span className="module-tag">TEST PRINCIPAL</span>
          <h3>¿Qué camino puede encajar mejor contigo?</h3>

          <p>
            Completa una evaluación interactiva para recibir recomendaciones de
            carreras, empleos y áreas de desarrollo.
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
            className="button button-primary"
            onClick={() => setTestStarted(true)}
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
          <p>Conoce cómo piensas, decides y colaboras con otras personas.</p>
          <span>0 de 12 preguntas</span>
        </article>

        <article className="module-card">
          <Sparkles size={26} />
          <h3>Habilidades</h3>
          <p>Identifica capacidades que ya tienes y otras que puedes desarrollar.</p>
          <span>0 de 10 preguntas</span>
        </article>

        <article className="module-card">
          <BookOpen size={26} />
          <h3>Estilo de aprendizaje</h3>
          <p>Descubre de qué manera aprendes con mayor facilidad.</p>
          <span>0 de 8 preguntas</span>
        </article>
      </div>
    </div>
  );
}

function JobsModule() {
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const visibleJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.tags.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  function applyToJob(jobId: number): void {
    setAppliedJobs((current) =>
      current.includes(jobId) ? current : [...current, jobId],
    );
  }

  return (
    <div className="module-page">
      <ModuleHeading
        eyebrow="EMPLEOS"
        title="Encuentra tu siguiente oportunidad"
        description="Vacantes, prácticas y primeros empleos pensados para jóvenes y recién egresados."
      />

      <section className="module-search-bar">
        <Search size={20} />

        <input
          placeholder="Buscar puesto, empresa o habilidad..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <button className="button button-primary">Buscar</button>
      </section>

      <div className="jobs-layout">
        <aside className="jobs-filters">
          <strong>Filtros</strong>

          <label>
            <input type="checkbox" />
            Remoto
          </label>

          <label>
            <input type="checkbox" />
            Primer empleo
          </label>

          <label>
            <input type="checkbox" />
            Prácticas
          </label>

          <label>
            <input type="checkbox" />
            Sin experiencia
          </label>

          <div className="jobs-profile-tip">
            <Sparkles size={21} />
            <strong>Mejora tus coincidencias</strong>
            <p>Completa tu perfil para encontrar vacantes más compatibles.</p>
          </div>
        </aside>

        <section className="jobs-list">
          <div className="jobs-list-heading">
            <span>{visibleJobs.length} oportunidades encontradas</span>
            <button>Más recientes</button>
          </div>

          {visibleJobs.map((job) => {
            const hasApplied = appliedJobs.includes(job.id);

            return (
              <article
                className={`job-card ${job.featured ? "job-featured" : ""}`}
                key={job.id}
              >
                {job.featured && (
                  <span className="featured-label">
                    <Sparkles size={14} />
                    Recomendada para ti
                  </span>
                )}

                <div className="job-card-header">
                  <div className="job-company-logo">
                    <Building2 size={25} />
                  </div>

                  <div>
                    <h3>{job.title}</h3>
                    <span>{job.company}</span>
                  </div>

                  <button className="job-favorite" aria-label="Guardar vacante">
                    <Heart size={20} />
                  </button>
                </div>

                <div className="job-details">
                  <span>
                    <MapPin size={16} />
                    {job.location}
                  </span>

                  <span>
                    <BriefcaseBusiness size={16} />
                    {job.mode}
                  </span>

                  <span>
                    <WalletCards size={16} />
                    {job.salary}
                  </span>
                </div>

                <div className="tag-list">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <button
                  className={`button ${
                    hasApplied ? "button-success" : "button-secondary"
                  }`}
                  onClick={() => applyToJob(job.id)}
                  disabled={hasApplied}
                >
                  {hasApplied ? (
                    <>
                      <Check size={18} />
                      Postulación enviada
                    </>
                  ) : (
                    <>
                      Ver y postularme
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}

function BusinessModule() {
  const [interest, setInterest] = useState("");
  const [skill, setSkill] = useState("");
  const [resources, setResources] = useState("");
  const [generated, setGenerated] = useState(false);

  function generateBusiness(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!interest.trim() || !skill.trim()) {
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
        <form className="business-generator" onSubmit={generateBusiness}>
          <div className="business-generator-heading">
            <div>
              <Sparkles size={25} />
            </div>

            <div>
              <span>GENERADOR DE IDEAS</span>
              <h3>Cuéntanos un poco sobre ti</h3>
            </div>
          </div>

          <label>
            ¿Qué te gusta hacer?
            <input
              placeholder="Ejemplo: videojuegos, diseño, cocinar..."
              value={interest}
              onChange={(event) => setInterest(event.target.value)}
            />
          </label>

          <label>
            ¿Qué sabes hacer?
            <input
              placeholder="Ejemplo: programar, editar, vender..."
              value={skill}
              onChange={(event) => setSkill(event.target.value)}
            />
          </label>

          <label>
            ¿Con qué recursos cuentas?
            <input
              placeholder="Ejemplo: computadora, teléfono, poco capital..."
              value={resources}
              onChange={(event) => setResources(event.target.value)}
            />
          </label>

          <button className="button button-primary" type="submit">
            <Sparkles size={18} />
            Generar mi idea
          </button>
        </form>

        <section className="business-result">
          {!generated ? (
            <div className="business-empty">
              <Lightbulb size={53} />
              <h3>Tu idea aparecerá aquí</h3>
              <p>
                Completa el formulario para generar una propuesta personalizada.
              </p>
            </div>
          ) : (
            <div className="generated-business">
              <span className="module-tag">IDEA GENERADA</span>

              <div className="generated-business-icon">
                <Rocket size={32} />
              </div>

              <h3>Estudio digital para creadores y pequeños negocios</h3>

              <p>
                Puedes combinar tu interés en <strong>{interest}</strong> con tu
                habilidad para <strong>{skill}</strong> y ofrecer productos o
                servicios digitales a negocios que necesitan mejorar su
                presencia en internet.
              </p>

              <div className="business-data-grid">
                <div>
                  <span>Inversión inicial</span>
                  <strong>Baja</strong>
                </div>

                <div>
                  <span>Dificultad</span>
                  <strong>Intermedia</strong>
                </div>

                <div>
                  <span>Potencial digital</span>
                  <strong>Alto</strong>
                </div>
              </div>

              <div className="generated-steps">
                <strong>Primeros pasos</strong>

                <span>
                  <small>1</small>
                  Define un servicio específico.
                </span>

                <span>
                  <small>2</small>
                  Crea tres ejemplos para tu portafolio.
                </span>

                <span>
                  <small>3</small>
                  Contacta tus primeros cinco clientes.
                </span>
              </div>

              <button className="button button-secondary">
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

function LearningModule() {
  const [courseProgress, setCourseProgress] = useState(
    courses.map((course) => course.progress),
  );

  function continueCourse(index: number): void {
    setCourseProgress((current) =>
      current.map((progress, currentIndex) =>
        currentIndex === index ? Math.min(progress + 10, 100) : progress,
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
          <span className="module-tag">RUTA RECOMENDADA</span>
          <h3>Prepárate para tu primer empleo</h3>

          <p>
            Construye tu perfil, aprende a presentar tus habilidades y
            prepárate para entrevistas.
          </p>

          <button className="button button-light">
            Ver ruta completa
            <ArrowRight size={18} />
          </button>
        </div>

        <BookOpen size={85} />
      </section>

      <div className="courses-grid">
        {courses.map((course, index) => {
          const Icon = course.icon;
          const progress = courseProgress[index];

          return (
            <article className="course-card" key={course.title}>
              <div className="course-cover">
                <Icon size={36} />
                <span>{course.category}</span>
              </div>

              <div className="course-content">
                <h3>{course.title}</h3>

                <div className="course-meta">
                  <span>
                    <Clock3 size={16} />
                    {course.duration}
                  </span>

                  <span>
                    <BookOpen size={16} />
                    {course.lessons} lecciones
                  </span>
                </div>

                <div className="course-progress-header">
                  <span>Progreso</span>
                  <strong>{progress}%</strong>
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
                  className="button button-secondary"
                  onClick={() => continueCourse(index)}
                >
                  {progress === 0 ? "Comenzar curso" : "Continuar aprendiendo"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function HealthModule() {
  const moods = ["😞", "😕", "😐", "🙂", "😁"];

  const [selectedMood, setSelectedMood] = useState("");
  const [breathing, setBreathing] = useState(false);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (!breathing) {
      return;
    }

    const interval = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          setBreathing(false);
          return 30;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
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
          <h3>¿Cómo te sientes hoy?</h3>

          <div className="mood-list">
            {moods.map((mood) => (
              <button
                key={mood}
                className={selectedMood === mood ? "mood-selected" : ""}
                onClick={() => setSelectedMood(mood)}
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
              breathing ? "breathing-circle-active" : ""
            }`}
          >
            <span>{breathing ? seconds : "30"}</span>
            <small>segundos</small>
          </div>

          <div>
            <span>PAUSA CONSCIENTE</span>
            <h3>Ejercicio de respiración</h3>

            <p>
              Tómate treinta segundos para respirar lentamente y regresar al
              momento presente.
            </p>

            <button
              className="button button-primary"
              onClick={() => setBreathing(true)}
              disabled={breathing}
            >
              {breathing ? "Respira lentamente..." : "Comenzar ejercicio"}
            </button>
          </div>
        </section>
      </div>

      <section className="wellbeing-notice">
        <Heart size={25} />

        <div>
          <strong>Visiona es una herramienta de acompañamiento educativo</strong>

          <p>
            Esta sección no realiza diagnósticos ni sustituye la atención de
            profesionales de la salud mental.
          </p>
        </div>
      </section>

      <div className="habits-grid">
        <article>
          <span>💧</span>
          <h3>Hidratación</h3>
          <strong>5 de 8 vasos</strong>
          <div className="progress-track">
            <div className="progress-value progress-value-62" />
          </div>
        </article>

        <article>
          <span>🚶</span>
          <h3>Movimiento</h3>
          <strong>4,250 pasos</strong>
          <div className="progress-track">
            <div className="progress-value progress-value-53" />
          </div>
        </article>

        <article>
          <span>😴</span>
          <h3>Descanso</h3>
          <strong>7 horas</strong>
          <div className="progress-track">
            <div className="progress-value progress-value-78" />
          </div>
        </article>
      </div>
    </div>
  );
}

function FutureModule() {
  const [goal, setGoal] = useState("");
  const [years, setYears] = useState("5");
  const [generatedGoal, setGeneratedGoal] = useState("");

  function generateFuture(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!goal.trim()) {
      return;
    }

    setGeneratedGoal(goal);
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
          <span className="module-tag">SIMULADOR DE FUTURO</span>
          <h3>¿Qué te gustaría lograr?</h3>

          <textarea
            placeholder="Ejemplo: quiero tener mi propia cafetería, conseguir un empleo como desarrollador..."
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
          />

          <label>
            Quiero lograrlo aproximadamente en

            <select
              value={years}
              onChange={(event) => setYears(event.target.value)}
            >
              <option value="1">1 año</option>
              <option value="3">3 años</option>
              <option value="5">5 años</option>
              <option value="10">10 años</option>
            </select>
          </label>

          <button className="button button-primary">
            <Sparkles size={18} />
            Crear mi ruta
          </button>
        </form>

        <div className="future-builder-visual">
          <Target size={76} />
          <h3>Tu visión, convertida en acciones</h3>
          <p>
            Visiona divide tu objetivo en conocimientos, recursos y pasos
            progresivos.
          </p>
        </div>
      </section>

      {generatedGoal && (
        <section className="roadmap-section">
          <div className="dashboard-panel-heading">
            <div>
              <span>RUTA GENERADA PARA {years} AÑOS</span>
              <h3>{generatedGoal}</h3>
            </div>
          </div>

          <div className="roadmap-list">
            <article>
              <small>ETAPA 1</small>
              <div>
                <strong>Explorar y definir</strong>
                <p>
                  Investiga el área, identifica recursos y establece un
                  resultado concreto.
                </p>
              </div>
            </article>

            <article>
              <small>ETAPA 2</small>
              <div>
                <strong>Aprender y prepararte</strong>
                <p>
                  Desarrolla habilidades esenciales mediante cursos, práctica y
                  proyectos.
                </p>
              </div>
            </article>

            <article>
              <small>ETAPA 3</small>
              <div>
                <strong>Crear experiencia</strong>
                <p>
                  Construye evidencias de tu trabajo, recibe retroalimentación y
                  mejora.
                </p>
              </div>
            </article>

            <article>
              <small>ETAPA 4</small>
              <div>
                <strong>Ejecutar y medir</strong>
                <p>
                  Pon en marcha tu proyecto y evalúa los resultados obtenidos.
                </p>
              </div>
            </article>
          </div>
        </section>
      )}
    </div>
  );
}

function CommunityModule() {
  const [likes, setLikes] = useState([24, 17, 31]);
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
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

  function publishPost(): void {
    if (!newPost.trim()) {
      return;
    }

    setPosts((current) => [
      {
        author: "Gael",
        role: "Explorador Visiona",
        content: newPost,
        time: "Ahora",
      },
      ...current,
    ]);

    setLikes((current) => [0, ...current]);
    setNewPost("");
  }

  function likePost(index: number): void {
    setLikes((current) =>
      current.map((likesAmount, currentIndex) =>
        currentIndex === index ? likesAmount + 1 : likesAmount,
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
            <div className="community-avatar">G</div>

            <textarea
              placeholder="Comparte una idea, avance o proyecto..."
              value={newPost}
              onChange={(event) => setNewPost(event.target.value)}
            />

            <button onClick={publishPost} aria-label="Publicar">
              <Send size={19} />
            </button>
          </div>

          {posts.map((post, index) => (
            <article
              className="community-post"
              key={`${post.author}-${post.time}-${index}`}
            >
              <div className="community-post-header">
                <div className="community-avatar">
                  {post.author.charAt(0)}
                </div>

                <div>
                  <strong>{post.author}</strong>
                  <span>{post.role}</span>
                </div>

                <time>{post.time}</time>
              </div>

              <p>{post.content}</p>

              <div className="community-post-actions">
                <button onClick={() => likePost(index)}>
                  <ThumbsUp size={18} />
                  {likes[index] ?? 0}
                </button>

                <button>
                  <MessageCircle size={18} />
                  Comentar
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="community-sidebar">
          <section>
            <div className="community-sidebar-heading">
              <Users size={20} />
              <strong>Personas sugeridas</strong>
            </div>

            {["Diana", "Emilio", "Fernanda"].map((person) => (
              <div className="suggested-person" key={person}>
                <div className="community-avatar">{person.charAt(0)}</div>

                <div>
                  <strong>{person}</strong>
                  <span>Intereses compatibles</span>
                </div>

                <button>
                  <Plus size={18} />
                </button>
              </div>
            ))}
          </section>

          <section className="community-project-card">
            <Rocket size={26} />
            <h3>¿Tienes un proyecto?</h3>
            <p>Publícalo para encontrar colaboradores y recibir ideas.</p>
            <button className="button button-secondary">Crear proyecto</button>
          </section>
        </aside>
      </div>
    </div>
  );
}

function RequestsModule() {
  const [requests, setRequests] = useState<VisionRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestType, setRequestType] = useState("Orientación");
  const [requestDescription, setRequestDescription] = useState("");

  useEffect(() => {
    try {
      const storedRequests = localStorage.getItem("visiona_requests");

      if (storedRequests) {
        setRequests(JSON.parse(storedRequests) as VisionRequest[]);
      } else {
        setRequests(initialRequests);
        localStorage.setItem(
          "visiona_requests",
          JSON.stringify(initialRequests),
        );
      }
    } catch {
      setRequests(initialRequests);
    }
  }, []);

  function saveRequests(updatedRequests: VisionRequest[]): void {
    setRequests(updatedRequests);
    localStorage.setItem(
      "visiona_requests",
      JSON.stringify(updatedRequests),
    );
  }

  function createRequest(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!requestTitle.trim() || !requestDescription.trim()) {
      return;
    }

    const today = new Date().toLocaleDateString("es-MX");

    const newRequest: VisionRequest = {
      id: `SOL-${Math.floor(2500 + Math.random() * 500)}`,
      title: requestTitle,
      type: requestType,
      description: requestDescription,
      status: "RECIBIDA",
      responsible: "Pendiente de asignación",
      createdAt: today,
      updatedAt: today,
      progress: 10,
    };

    saveRequests([newRequest, ...requests]);

    setRequestTitle("");
    setRequestDescription("");
    setRequestType("Orientación");
    setShowForm(false);
  }

  function advanceRequest(requestId: string): void {
    const updatedRequests = requests.map((request) => {
      if (request.id !== requestId) {
        return request;
      }

      const currentIndex = requestStatusOrder.indexOf(request.status);

      if (currentIndex >= requestStatusOrder.length - 1) {
        return request;
      }

      const nextStatus = requestStatusOrder[currentIndex + 1];

      return {
        ...request,
        status: nextStatus,
        updatedAt: new Date().toLocaleDateString("es-MX"),
        progress: Math.round(
          ((currentIndex + 2) / requestStatusOrder.length) * 100,
        ),
        responsible:
          request.responsible === "Pendiente de asignación"
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
          className="button button-primary"
          onClick={() => setShowForm((current) => !current)}
        >
          <Plus size={19} />
          Nueva solicitud
        </button>
      </div>

      {showForm && (
        <form className="request-form" onSubmit={createRequest}>
          <div className="request-form-heading">
            <div>
              <span>NUEVA SOLICITUD</span>
              <h3>¿En qué necesitas apoyo?</h3>
            </div>

            <button type="button" onClick={() => setShowForm(false)}>
              Cerrar
            </button>
          </div>

          <div className="request-form-grid">
            <label>
              Título
              <input
                placeholder="Ejemplo: orientación para buscar empleo"
                value={requestTitle}
                onChange={(event) => setRequestTitle(event.target.value)}
              />
            </label>

            <label>
              Tipo
              <select
                value={requestType}
                onChange={(event) => setRequestType(event.target.value)}
              >
                <option>Orientación</option>
                <option>Empleo</option>
                <option>Emprendimiento</option>
                <option>Proyecto de vida</option>
                <option>Colaboración</option>
              </select>
            </label>
          </div>

          <label>
            Descripción
            <textarea
              placeholder="Describe brevemente qué necesitas..."
              value={requestDescription}
              onChange={(event) => setRequestDescription(event.target.value)}
            />
          </label>

          <button className="button button-primary" type="submit">
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
          <strong>¿Cómo funciona el seguimiento?</strong>
          <p>
            Cada solicitud se registra, clasifica, revisa, aprueba y ejecuta
            mediante un flujo de atención.
          </p>
        </div>
      </section>

      <div className="requests-list">
        {requests.map((request) => (
          <article className="request-card" key={request.id}>
            <div className="request-card-header">
              <div>
                <span>{request.id}</span>
                <h3>{request.title}</h3>
              </div>

              <span
                className={`request-status request-status-${request.status.toLowerCase()}`}
              >
                {requestStatusLabels[request.status]}
              </span>
            </div>

            <p>{request.description}</p>

            <div className="request-information">
              <div>
                <span>Tipo</span>
                <strong>{request.type}</strong>
              </div>

              <div>
                <span>Responsable</span>
                <strong>{request.responsible}</strong>
              </div>

              <div>
                <span>Creada</span>
                <strong>{request.createdAt}</strong>
              </div>

              <div>
                <span>Actualizada</span>
                <strong>{request.updatedAt}</strong>
              </div>
            </div>

            <div className="request-progress-header">
              <span>Avance del proceso</span>
              <strong>{request.progress}%</strong>
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
              <button className="button button-secondary">
                Ver seguimiento
              </button>

              {request.status !== "FINALIZADA" && (
                <button
                  className="request-demo-button"
                  onClick={() => advanceRequest(request.id)}
                >
                  Simular siguiente estado
                  <ArrowRight size={17} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProfileModule() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [headline, setHeadline] = useState(user?.headline ?? "");
  const [saved, setSaved] = useState(false);

  function saveProfile(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    updateUser({
      name,
      headline,
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
            {user?.name.charAt(0).toUpperCase()}
          </div>

          <h3>{user?.name}</h3>
          <span>{user?.headline}</span>

          <div className="profile-level-badge">
            <Sparkles size={17} />
            Nivel {user?.level} · {user?.points} puntos
          </div>

          <div className="profile-summary-statistics">
            <div>
              <strong>68%</strong>
              <span>Perfil</span>
            </div>

            <div>
              <strong>7</strong>
              <span>Metas</span>
            </div>

            <div>
              <strong>3</strong>
              <span>Cursos</span>
            </div>
          </div>
        </aside>

        <form className="profile-form" onSubmit={saveProfile}>
          <div className="profile-form-heading">
            <CircleUserRound size={23} />

            <div>
              <span>INFORMACIÓN PERSONAL</span>
              <h3>Datos del perfil</h3>
            </div>
          </div>

          <label>
            Nombre
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label>
            Correo electrónico
            <input value={user?.email ?? ""} disabled />
          </label>

          <label>
            Descripción profesional
            <input
              value={headline}
              onChange={(event) => setHeadline(event.target.value)}
              placeholder="Ejemplo: estudiante de ingeniería..."
            />
          </label>

          <label>
            Acerca de mí
            <textarea placeholder="Cuéntanos sobre tus intereses, habilidades y objetivos..." />
          </label>

          <button className="button button-primary" type="submit">
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