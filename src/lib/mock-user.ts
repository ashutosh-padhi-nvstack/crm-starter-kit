/**
 * Mock User Store
 * Provides mock user data to replace Clerk authentication
 */

export interface MockUser {
  id: string;
  fullName: string | null;
  firstName: string;
  lastName: string;
  emailAddresses: Array<{ emailAddress: string }>;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Default mock user
const defaultUser: MockUser = {
  id: 'user_123',
  fullName: 'John Doe',
  firstName: 'John',
  lastName: 'Doe',
  emailAddresses: [{ emailAddress: 'john.doe@example.com' }],
  imageUrl: 'https://api.slingacademy.com/public/sample-users/1.png',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Store current user in memory (in a real app, this would be in localStorage or state)
let currentUser: MockUser | null = defaultUser;

export const mockUserStore = {
  // Get current user
  getCurrentUser(): MockUser | null {
    return currentUser;
  },

  // Set current user
  setCurrentUser(user: MockUser | null) {
    currentUser = user;
  },

  // Sign in (mock)
  signIn(email: string, password?: string): Promise<MockUser> {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = {
          ...defaultUser,
          emailAddresses: [{ emailAddress: email }],
          fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
        };
        resolve(currentUser);
      }, 500);
    });
  },

  // Sign out (mock)
  signOut(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = null;
        resolve();
      }, 300);
    });
  },

  // Sign up (mock)
  signUp(email: string, password: string, firstName?: string, lastName?: string): Promise<MockUser> {
    return new Promise((resolve) => {
      setTimeout(() => {
        currentUser = {
          id: `user_${Date.now()}`,
          fullName: firstName && lastName ? `${firstName} ${lastName}` : email.split('@')[0].replace(/[._]/g, ' '),
          firstName: firstName || email.split('@')[0],
          lastName: lastName || '',
          emailAddresses: [{ emailAddress: email }],
          imageUrl: `https://api.slingacademy.com/public/sample-users/${Math.floor(Math.random() * 10) + 1}.png`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        resolve(currentUser);
      }, 500);
    });
  },

  // Update user profile
  updateProfile(updates: Partial<MockUser>): Promise<MockUser> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (currentUser) {
          currentUser = {
            ...currentUser,
            ...updates,
            updatedAt: new Date().toISOString()
          };
          resolve(currentUser);
        } else {
          throw new Error('No user logged in');
        }
      }, 300);
    });
  }
};

// Note: The useMockUser hook has been moved to src/hooks/use-mock-user.ts
// to properly handle client-side React hooks

