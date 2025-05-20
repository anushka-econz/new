
// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Will be hashed in real implementation
  permissions: Permission[];
  createdAt: string;
}

export type Permission = 'read' | 'write' | 'delete';

export interface Session {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface PasswordResetToken {
  userId: string;
  token: string;
  expiresAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Comment Types
export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
}

// Form Types
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  password: string;
}

export interface CommentFormData {
  content: string;
}

export interface UserPermissionFormData {
  userId: string;
  permissions: Permission[];
}
