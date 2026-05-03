/**
 * Authentication Service
 * Handles user registration, login, logout, and session management
 * Supports dev mode with localStorage mocking
 */

import { account } from "@/lib/appwrite";
import { User } from "@/types";
import {
  mockRegisterUser,
  mockLoginUser,
  mockGetCurrentUser,
  mockLogoutUser,
} from "@/services/auth.mock";

/**
 * Check if dev mode is enabled (uses mock auth)
 */
const isDevMode =
  process.env.NEXT_PUBLIC_AUTH_MODE === "mock" ||
  (typeof window !== "undefined" &&
    localStorage.getItem("USE_MOCK_AUTH") === "true");

/**
 * Register a new user
 * @param email - User email address
 * @param password - User password (min 8 characters)
 * @param fullName - User's full name
 * @returns Promise with created user data
 */
export async function registerUser(
  email: string,
  password: string,
  fullName: string,
): Promise<User> {
  try {
    if (isDevMode) {
      return await mockRegisterUser(email, password, fullName);
    }
    console.log(account);
    
    // Create user account in Appwrite
    const response = await account.create({
      userId: "unique()",
      email,
      password,
      name: fullName,
    });

    // Auto login after registration
    await loginUser(email, password);

    // Return user data
    return {
      $id: response.$id,
      user_id: response.$id,
      email: response.email,
      full_name: response.name,
      preferred_currency: "USD",
      created_at: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(
      `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Login user with email and password
 * @param email - User email address
 * @param password - User password
 * @returns Promise with session created
 */
export async function loginUser(
  email: string,
  password: string,
): Promise<User | null> {
  try {
    if (isDevMode) {
      return await mockLoginUser(email, password);
    }

    const response = await account.createEmailPasswordSession({
      email,
      password,
    });
    console.log({ response });

    return await getCurrentUser();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * Get current authenticated user
 * @returns Promise with current user data or null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    if (isDevMode) {
      return await mockGetCurrentUser();
    }

    const response = await account.get();
    return {
      $id: response.$id,
      user_id: response.$id,
      email: response.email,
      full_name: response.name,
      preferred_currency: "USD",
      created_at: response.$createdAt,
      $createdAt: response.$createdAt,
      $updatedAt: response.$updatedAt,
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
}

/**
 * Logout current user
 * @returns Promise that resolves when logout is complete
 */
export async function logoutUser(): Promise<void> {
  try {
    if (isDevMode) {
      await mockLogoutUser();
      return;
    }

    await account.deleteSessions();
  } catch (error) {
    throw new Error(
      `Logout failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Check if user session is valid
 * @returns Promise with boolean indicating if user is authenticated
 */
export async function isUserAuthenticated(): Promise<boolean> {
  try {
    if (isDevMode) {
      const user = await mockGetCurrentUser();
      return user !== null;
    }

    await account.get();
    return true;
  } catch {
    return false;
  }
}
