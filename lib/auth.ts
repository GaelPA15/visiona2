import type { VisionaUser } from "@/types";

export const SESSION_KEY = "visiona_session";
export const USERS_KEY = "visiona_users";

export const DEMO_USER: VisionaUser = {
  id: "gael-demo",
  name: "Gael",
  email: "gael@visiona.com",
  password: "Visiona123",
  role: "USUARIO",
  headline: "Construyendo mi futuro con Visiona",
  level: 4,
  points: 1280,
  onboardingCompleted: true,
};

export function getStoredUsers(): VisionaUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedUsers = localStorage.getItem(USERS_KEY);

    if (!storedUsers) {
      return [];
    }

    return JSON.parse(storedUsers) as VisionaUser[];
  } catch {
    return [];
  }
}

export function saveStoredUsers(users: VisionaUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}