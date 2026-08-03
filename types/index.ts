export type UserRole = "USUARIO" | "MENTOR" | "ADMINISTRADOR";

export interface VisionaUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  headline: string;
  level: number;
  points: number;
  onboardingCompleted: boolean;
}

export type RequestStatus =
  | "RECIBIDA"
  | "REGISTRADA"
  | "CLASIFICADA"
  | "DATOS_INCOMPLETOS"
  | "EN_PROCESO"
  | "PENDIENTE_APROBACION"
  | "EN_CORRECCION"
  | "APROBADA"
  | "EN_EJECUCION"
  | "FINALIZADA";

export interface VisionRequest {
  id: string;
  title: string;
  type: string;
  description: string;
  status: RequestStatus;
  responsible: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
}