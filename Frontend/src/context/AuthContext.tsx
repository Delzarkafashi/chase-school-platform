import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { AuthUser } from "../types/AuthUser";
import {
  login as loginApi,
  getAuthUserById,
} from "../api/authApi";

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;

  hasPermission: (
    permissionKey: string
  ) => boolean;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function restoreSession() {
      const userId =
        localStorage.getItem("chaseUserId");

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const authenticatedUser =
          await getAuthUserById(userId);

        setUser(authenticatedUser);
      } catch {
        localStorage.removeItem(
          "chaseUserId"
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(
    email: string,
    password: string
  ) {
    const authenticatedUser =
      await loginApi(email, password);

    setUser(authenticatedUser);

    localStorage.setItem(
      "chaseUserId",
      authenticatedUser.id
    );

    localStorage.removeItem("chaseUser");
  }

  function logout() {
    setUser(null);

    localStorage.removeItem(
      "chaseUserId"
    );

    localStorage.removeItem(
      "chaseUser"
    );
  }

  function hasPermission(
    permissionKey: string
  ) {
    if (!user) {
      return false;
    }

    return user.permissions.some(
      (permission) =>
        permission.key === permissionKey
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        loading,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth måste användas inom AuthProvider."
    );
  }

  return context;
}