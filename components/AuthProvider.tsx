"use client";

import {
  createContext,
  useContext,
  useEffect,
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
  stage: string;
  mainGoal: string;
  interests: string[];
}

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: VisionaUser | null;
  loading: boolean;

  login: (
    email: string,
    password: string,
  ) => AuthResult;

  register: (
    information: RegisterInformation,
  ) => AuthResult;

  logout: () => void;

  updateUser: (
    information: Partial<VisionaUser>,
  ) => void;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<VisionaUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  /*
    Recupera la sesión guardada cuando
    se vuelve a cargar la página.
  */
  useEffect(() => {
    try {
      const storedSession =
        localStorage.getItem(SESSION_KEY);

      if (storedSession) {
        const parsedUser =
          JSON.parse(
            storedSession,
          ) as VisionaUser;

        setUser(parsedUser);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /*
    Guarda la sesión sin almacenar
    la contraseña dentro de la sesión activa.
  */
  function saveSession(
    userInformation: VisionaUser,
  ): void {
    const safeUser = {
      ...userInformation,
    };

    delete safeUser.password;

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(safeUser),
    );

    setUser(safeUser);
  }

  /*
    Inicio de sesión.

    Primero revisa la cuenta de Gael.
    Después revisa las cuentas creadas
    desde la página de registro.
  */
  function login(
    email: string,
    password: string,
  ): AuthResult {
    const normalizedEmail =
      email.trim().toLowerCase();

    const isGaelAccount =
      normalizedEmail ===
        DEMO_USER.email.toLowerCase() &&
      password === DEMO_USER.password;

    if (isGaelAccount) {
      saveSession(DEMO_USER);

      return {
        success: true,
      };
    }

    const registeredUsers =
      getStoredUsers();

    const matchingUser =
      registeredUsers.find(
        (registeredUser) =>
          registeredUser.email
            .trim()
            .toLowerCase() ===
            normalizedEmail &&
          registeredUser.password === password,
      );

    if (!matchingUser) {
      return {
        success: false,
        message:
          "El correo o la contraseña no son correctos.",
      };
    }

    saveSession(matchingUser);

    return {
      success: true,
    };
  }

  /*
    Registro de usuarios.

    Si el correo nunca se había registrado,
    crea una cuenta nueva.

    Si el correo ya estaba registrado,
    actualiza esa misma cuenta y permite
    volver a presentar el proceso completo.
  */
  function register(
    information: RegisterInformation,
  ): AuthResult {
    const registeredUsers =
      getStoredUsers();

    const normalizedEmail =
      information.email
        .trim()
        .toLowerCase();

    /*
      La cuenta de Gael permanece reservada
      para evitar que se sobrescriba.
    */
    if (
      normalizedEmail ===
      DEMO_USER.email.toLowerCase()
    ) {
      return {
        success: false,
        message:
          "Este correo pertenece a una cuenta interna de Visiona.",
      };
    }

    /*
      Busca si el correo ya fue registrado.
    */
    const existingUserIndex =
      registeredUsers.findIndex(
        (registeredUser) =>
          registeredUser.email
            .trim()
            .toLowerCase() ===
          normalizedEmail,
      );

    const existingUser =
      existingUserIndex >= 0
        ? registeredUsers[
            existingUserIndex
          ]
        : undefined;

    /*
      Conservamos el mismo identificador
      cuando el correo ya existía.

      Por eso siempre seguirá siendo
      la misma cuenta al iniciar sesión.
    */
    const accountId =
      existingUser?.id ??
      `user-${Date.now()}`;

    const registeredUser: VisionaUser = {
      id: accountId,

      name: information.name.trim(),
      email: normalizedEmail,
      password: information.password,

      role:
        existingUser?.role ??
        "USUARIO",

      headline:
        "Comenzando un nuevo camino en Visiona",

      /*
        Cada vez que se vuelva a registrar,
        la cuenta regresará a su estado inicial.
      */
      level: 1,
      points: 0,
      onboardingCompleted: false,

      stage: information.stage,
      mainGoal: information.mainGoal,
      interests: information.interests,

      createdAt:
        existingUser?.createdAt ??
        new Date().toISOString(),
    };

    let updatedUsers: VisionaUser[];

    if (existingUserIndex >= 0) {
      /*
        Reemplaza los datos de la cuenta
        que ya tenía ese correo.
      */
      updatedUsers =
        registeredUsers.map(
          (
            registeredUserItem,
            index,
          ) =>
            index === existingUserIndex
              ? registeredUser
              : registeredUserItem,
        );
    } else {
      /*
        Agrega una cuenta completamente nueva.
      */
      updatedUsers = [
        ...registeredUsers,
        registeredUser,
      ];
    }

    saveStoredUsers(updatedUsers);

    /*
      Cierra cualquier sesión anterior.

      Después de registrarse, la persona
      deberá iniciar sesión manualmente.
    */
    localStorage.removeItem(SESSION_KEY);
    setUser(null);

    /*
      Reinicia la información simulada
      de esa cuenta para que vuelva a verse
      como una cuenta recién creada.
    */
    const accountKeysToReset = [
      `visiona_requests_${accountId}`,
      `visiona_goals_${accountId}`,
      `visiona_courses_${accountId}`,
      `visiona_connections_${accountId}`,
      `visiona_progress_${accountId}`,
    ];

    accountKeysToReset.forEach(
      (storageKey) => {
        localStorage.removeItem(storageKey);
      },
    );

    /*
      Guarda el correo para rellenarlo
      automáticamente en iniciar sesión.
    */
    localStorage.setItem(
      "visiona_last_registered_email",
      normalizedEmail,
    );

    return {
      success: true,
    };
  }

  /*
    Cerrar sesión.
  */
  function logout(): void {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  /*
    Actualiza la información del perfil
    tanto en la sesión como en la lista
    de usuarios registrados.
  */
  function updateUser(
    information: Partial<VisionaUser>,
  ): void {
    if (!user) {
      return;
    }

    const updatedUser: VisionaUser = {
      ...user,
      ...information,
    };

    setUser(updatedUser);

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(updatedUser),
    );

    /*
      La cuenta interna de Gael no está
      guardada en visiona_users.
    */
    if (updatedUser.id === DEMO_USER.id) {
      return;
    }

    const registeredUsers =
      getStoredUsers();

    const updatedRegisteredUsers =
      registeredUsers.map(
        (registeredUser) =>
          registeredUser.id ===
          updatedUser.id
            ? {
                ...registeredUser,
                ...information,

                /*
                  Conserva la contraseña
                  almacenada del usuario.
                */
                password:
                  registeredUser.password,
              }
            : registeredUser,
      );

    saveStoredUsers(
      updatedRegisteredUsers,
    );
  }

  const contextValue: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider.",
    );
  }

  return context;
}