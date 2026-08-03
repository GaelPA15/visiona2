"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEMO_USER,
  getStoredUsers,
  saveStoredUsers,
  SESSION_KEY,
} from "@/lib/auth";

import type { VisionaUser } from "@/types";

interface RegisterInformation {
  name: string;
  email: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: VisionaUser | null;
  loading: boolean;
  login: (email: string, password: string) => AuthResult;
  register: (information: RegisterInformation) => AuthResult;
  logout: () => void;
  updateUser: (information: Partial<VisionaUser>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<VisionaUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedSession = localStorage.getItem(SESSION_KEY);

      if (storedSession) {
        setUser(JSON.parse(storedSession) as VisionaUser);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  function saveSession(userInformation: VisionaUser): void {
    const safeUser = { ...userInformation };

    delete safeUser.password;

    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
  }

  function login(email: string, password: string): AuthResult {
    const normalizedEmail = email.trim().toLowerCase();

    const isDemoUser =
      normalizedEmail === DEMO_USER.email.toLowerCase() &&
      password === DEMO_USER.password;

    if (isDemoUser) {
      saveSession(DEMO_USER);

      return {
        success: true,
      };
    }

    const registeredUsers = getStoredUsers();

    const matchingUser = registeredUsers.find(
      (registeredUser) =>
        registeredUser.email.toLowerCase() === normalizedEmail &&
        registeredUser.password === password,
    );

    if (!matchingUser) {
      return {
        success: false,
        message: "El correo o la contraseña no son correctos.",
      };
    }

    saveSession(matchingUser);

    return {
      success: true,
    };
  }

  function register(information: RegisterInformation): AuthResult {
    const registeredUsers = getStoredUsers();
    const normalizedEmail = information.email.trim().toLowerCase();

    const emailExists =
      normalizedEmail === DEMO_USER.email.toLowerCase() ||
      registeredUsers.some(
        (registeredUser) =>
          registeredUser.email.toLowerCase() === normalizedEmail,
      );

    if (emailExists) {
      return {
        success: false,
        message: "Ya existe una cuenta registrada con ese correo.",
      };
    }

    const newUser: VisionaUser = {
      id: `user-${Date.now()}`,
      name: information.name.trim(),
      email: normalizedEmail,
      password: information.password,
      role: "USUARIO",
      headline: "Comenzando mi camino en Visiona",
      level: 1,
      points: 100,
      onboardingCompleted: false,
    };

    saveStoredUsers([...registeredUsers, newUser]);
    saveSession(newUser);

    return {
      success: true,
    };
  }

  function logout(): void {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  function updateUser(information: Partial<VisionaUser>): void {
    if (!user) {
      return;
    }

    const updatedUser = {
      ...user,
      ...information,
    };

    setUser(updatedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));

    const registeredUsers = getStoredUsers();

    const updatedRegisteredUsers = registeredUsers.map((registeredUser) =>
      registeredUser.id === updatedUser.id
        ? { ...registeredUser, ...information }
        : registeredUser,
    );

    saveStoredUsers(updatedRegisteredUsers);
  }

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  }

  return context;
}