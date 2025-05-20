
import { SignupFormData, LoginFormData, User, Permission, AuthTokens } from '@/types';
import { 
  createUser, 
  findUserByEmail, 
  createSession, 
  refreshSession,
  removeSession,
  createPasswordResetToken,
  findPasswordResetToken,
  removePasswordResetToken,
  updateUserPassword,
  findUserById
} from '@/lib/mock-data';
import { toast } from 'sonner';

// Simple function to simulate password hashing
// In a real app, use bcrypt or similar library
const hashPassword = (password: string): string => {
  // This is just a mock hash function
  return `hashed_${password}`;
};

// Verify password (mock implementation)
const verifyPassword = (plainPassword: string, hashedPassword: string): boolean => {
  return hashedPassword === `hashed_${plainPassword}`;
};

export const signup = async (data: SignupFormData): Promise<User | null> => {
  try {
    // Check if user already exists
    const existingUser = findUserByEmail(data.email);
    if (existingUser) {
      toast.error('User with this email already exists');
      return null;
    }

    // Create new user (with default read permission)
    const newUser = createUser({
      email: data.email,
      name: data.name,
      password: hashPassword(data.password),
      permissions: ['read']
    });

    return newUser;
  } catch (error) {
    console.error('Signup error:', error);
    toast.error('Failed to create account');
    return null;
  }
};

export const login = async (data: LoginFormData): Promise<{ user: User; tokens: AuthTokens } | null> => {
  try {
    // Find user by email
    const user = findUserByEmail(data.email);
    if (!user) {
      toast.error('Invalid email or password');
      return null;
    }

    // In a real app, verify the hashed password
    // For this mock, we're just comparing directly
    if (user.password !== data.password) {
      toast.error('Invalid email or password');
      return null;
    }

    // Create session and tokens
    const session = createSession(user.id);
    
    return { 
      user,
      tokens: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    toast.error('Login failed');
    return null;
  }
};

export const logout = async (accessToken: string): Promise<boolean> => {
  try {
    return removeSession(accessToken);
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};

export const refreshToken = async (refreshToken: string): Promise<AuthTokens | null> => {
  try {
    const newSession = refreshSession(refreshToken);
    if (!newSession) return null;
    
    return {
      accessToken: newSession.accessToken,
      refreshToken: newSession.refreshToken
    };
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
};

export const requestPasswordReset = async (email: string): Promise<string | null> => {
  try {
    const user = findUserByEmail(email);
    if (!user) {
      // Don't reveal that the user doesn't exist
      return null;
    }

    const resetToken = createPasswordResetToken(user.id);
    return resetToken.token;
  } catch (error) {
    console.error('Password reset request error:', error);
    return null;
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
  try {
    const resetToken = findPasswordResetToken(token);
    if (!resetToken) return false;
    
    // Check if token is expired
    if (new Date(resetToken.expiresAt) < new Date()) {
      removePasswordResetToken(token);
      return false;
    }
    
    // Update user's password
    const success = updateUserPassword(resetToken.userId, hashPassword(newPassword));
    
    // Remove used token
    removePasswordResetToken(token);
    
    return success;
  } catch (error) {
    console.error('Password reset error:', error);
    return false;
  }
};

export const getUserPermissions = (userId: string): Permission[] => {
  const user = findUserById(userId);
  return user?.permissions || [];
};

export const hasPermission = (userId: string, permission: Permission): boolean => {
  const permissions = getUserPermissions(userId);
  return permissions.includes(permission);
};
