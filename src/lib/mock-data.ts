
import { User, Permission, Comment, PasswordResetToken, Session } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock users
export let users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    // In a real app, this would be hashed
    password: 'password123',
    permissions: ['read', 'write', 'delete'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Read-Only User',
    email: 'reader@example.com',
    password: 'password123',
    permissions: ['read'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Writer User',
    email: 'writer@example.com',
    password: 'password123',
    permissions: ['read', 'write'],
    createdAt: new Date().toISOString(),
  },
];

// Mock comments
export let comments: Comment[] = [
  {
    id: '1',
    content: 'This is a test comment from the admin',
    userId: '1',
    userName: 'Admin User',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    content: 'This is a comment from the read-only user',
    userId: '2',
    userName: 'Read-Only User',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    content: 'This is a comment from the writer user',
    userId: '3',
    userName: 'Writer User',
    createdAt: new Date().toISOString(),
  },
];

// Mock sessions (in-memory storage)
export let sessions: Session[] = [];

// Mock password reset tokens
export let passwordResetTokens: PasswordResetToken[] = [];

// Helper functions to manipulate the mock data

// User operations
export const createUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    ...user,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const updateUserPermissions = (userId: string, permissions: Permission[]): User | null => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) return null;
  
  const updatedUser = {
    ...users[userIndex],
    permissions
  };
  
  users[userIndex] = updatedUser;
  return updatedUser;
};

export const updateUserPassword = (userId: string, newPassword: string): boolean => {
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) return false;
  
  users[userIndex] = {
    ...users[userIndex],
    password: newPassword
  };
  
  return true;
};

// Session operations
export const createSession = (userId: string): Session => {
  const accessToken = `access_${uuidv4()}`;
  const refreshToken = `refresh_${uuidv4()}`;
  
  // Create expiry dates (15 minutes for access, 7 days for refresh)
  const accessExpiry = new Date();
  accessExpiry.setMinutes(accessExpiry.getMinutes() + 15);
  
  const session: Session = {
    id: uuidv4(),
    userId,
    accessToken,
    refreshToken,
    expiresAt: accessExpiry.toISOString(),
  };
  
  sessions.push(session);
  return session;
};

export const findSessionByToken = (token: string): Session | undefined => {
  return sessions.find(session => session.accessToken === token || session.refreshToken === token);
};

export const removeSession = (token: string): boolean => {
  const initialLength = sessions.length;
  sessions = sessions.filter(session => session.accessToken !== token && session.refreshToken !== token);
  return sessions.length !== initialLength;
};

export const refreshSession = (refreshToken: string): Session | null => {
  const sessionIndex = sessions.findIndex(session => session.refreshToken === refreshToken);
  if (sessionIndex === -1) return null;
  
  // Remove old session
  const oldSession = sessions[sessionIndex];
  sessions.splice(sessionIndex, 1);
  
  // Create new session
  return createSession(oldSession.userId);
};

// Password reset operations
export const createPasswordResetToken = (userId: string): PasswordResetToken => {
  // Remove any existing tokens for this user
  passwordResetTokens = passwordResetTokens.filter(token => token.userId !== userId);
  
  // Create expiry date (1 hour)
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1);
  
  const resetToken: PasswordResetToken = {
    userId,
    token: uuidv4(),
    expiresAt: expiryDate.toISOString(),
  };
  
  passwordResetTokens.push(resetToken);
  return resetToken;
};

export const findPasswordResetToken = (token: string): PasswordResetToken | undefined => {
  return passwordResetTokens.find(resetToken => resetToken.token === token);
};

export const removePasswordResetToken = (token: string): boolean => {
  const initialLength = passwordResetTokens.length;
  passwordResetTokens = passwordResetTokens.filter(resetToken => resetToken.token !== token);
  return passwordResetTokens.length !== initialLength;
};

// Comment operations
export const createComment = (content: string, user: User): Comment => {
  const newComment: Comment = {
    id: uuidv4(),
    content,
    userId: user.id,
    userName: user.name,
    createdAt: new Date().toISOString(),
  };
  
  comments.push(newComment);
  return newComment;
};

export const deleteComment = (commentId: string): boolean => {
  const initialLength = comments.length;
  comments = comments.filter(comment => comment.id !== commentId);
  return comments.length !== initialLength;
};
