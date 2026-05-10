/**
 * Mock Authentication Service for Development
 * Uses localStorage instead of calling Appwrite API
 */

import { User } from '@/types';

const MOCK_STORAGE_KEY = 'fintrack_mock_auth';
const MOCK_USERS_KEY = 'fintrack_mock_users';

/**
 * Mock user for dev testing
 */
const MOCK_DEV_USER: User = {
  $id: 'dev-user-123',
  user_id: 'dev-user-123',
  email: 'dev@example.com',
  full_name: 'Dev User',
  preferred_currency: 'INR',
  created_at: new Date().toISOString(),
};

/**
 * Get mock users from localStorage or return defaults
 */
function getMockUsers(): Record<string, User & { password: string }> {
  try {
    const stored = localStorage.getItem(MOCK_USERS_KEY);
    
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to parse mock users from localStorage');
  }

  // Return default test users
  return {
    'dev@example.com': {
      ...MOCK_DEV_USER,
      password: 'password123',
    },
    'test@example.com': {
      $id: 'test-user-456',
      user_id: 'test-user-456',
      email: 'test@example.com',
      full_name: 'Test User',
      preferred_currency: 'INR',
      created_at: new Date().toISOString(),
      password: 'test123',
    },
  };
}

/**
 * Save mock users to localStorage
 */
function saveMockUsers(
  users: Record<string, User & { password: string }>
): void {
  try {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.warn('Failed to save mock users to localStorage');
  }
}

/**
 * Mock login - checks localStorage for user
 */
export async function mockLoginUser(
  email: string,
  password: string
): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getMockUsers();
  const user = users[email];

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  // Store session in localStorage
  const session = {
    user: {
      $id: user.$id,
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      preferred_currency: user.preferred_currency,
      created_at: user.created_at,
    },
    timestamp: Date.now(),
  };

  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(session));

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Mock register - creates new user in localStorage
 */
export async function mockRegisterUser(
  email: string,
  password: string,
  fullName: string
): Promise<User> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const users = getMockUsers();

  if (users[email]) {
    throw new Error('Email already registered');
  }

  const newUserId = `user-${Date.now()}`;
  const newUser: User & { password: string } = {
    $id: newUserId,
    user_id: newUserId,
    email,
    full_name: fullName,
    preferred_currency: 'INR',
    created_at: new Date().toISOString(),
    password,
  };

  users[email] = newUser;
  saveMockUsers(users);

  // Auto-login after registration
  return mockLoginUser(email, password);
}

/**
 * Mock get current user - checks localStorage session
 */
export async function mockGetCurrentUser(): Promise<User | null> {
  try {
    const stored = localStorage.getItem(MOCK_STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const session = JSON.parse(stored);
    const sessionAge = Date.now() - session.timestamp;

    // Session valid for 24 hours in dev mode
    if (sessionAge > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(MOCK_STORAGE_KEY);
      return null;
    }

    return session.user as User;
  } catch (error) {
    console.warn('Failed to get current user from localStorage');
    return null;
  }
}

/**
 * Mock logout - removes session from localStorage
 */
export async function mockLogoutUser(): Promise<void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  localStorage.removeItem(MOCK_STORAGE_KEY);
}
