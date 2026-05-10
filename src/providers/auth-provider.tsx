'use client';

/**
 * Auth Context Provider
 * Manages global authentication state and provides useAuth hook
 */

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '@/services/auth.service';
import { AuthState } from '@/types';

/**
 * Auth Context Type
 */
interface AuthContextType extends AuthState {
  loginAsync: (email: string, password: string) => Promise<void>;
  registerAsync: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<void>;
  logoutAsync: () => Promise<void>;
}

/**
 * Create Auth Context with undefined default
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 * Wraps the application and provides authentication context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  /**
   * Initialize auth state on mount
   * Check if user is already logged in (Appwrite session)
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setAuthState({
            user: currentUser,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      } catch (_error) {
        // No active session or session expired - this is normal
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
      }
    };

    initializeAuth();
  }, []);

  /**
   * Handle user login
   */
  const handleLogin = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const user = await loginUser(email, password);
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';

      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: {
          message: errorMessage,
          code: 'LOGIN_ERROR',
        },
      });

      throw error;
    }
  };

  /**
   * Handle user registration
   */
  const handleRegister = async (
    email: string,
    password: string,
    fullName: string,
  ) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const user = await registerUser(email, password, fullName);

      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed';

      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: {
          message: errorMessage,
          code: 'REGISTRATION_ERROR',
        },
      });

      throw error;
    }
  };

  /**
   * Handle user logout
   */
  const handleLogout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      await logoutUser();

      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Logout failed';

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: {
          message: errorMessage,
          code: 'LOGOUT_ERROR',
        },
      }));

      throw error;
    }
  };

  const value: AuthContextType = {
    ...authState,
    loginAsync: handleLogin,
    registerAsync: handleRegister,
    logoutAsync: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use Auth Context
 * Must be used within AuthProvider
 * @returns AuthContextType with user, isLoading, isAuthenticated, error, and async methods
 * @throws Error if used outside AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
        'Make sure your component is wrapped with <AuthProvider>',
    );
  }

  return context;
}
