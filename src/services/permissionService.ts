
import { User, Permission } from '@/types';
import { updateUserPermissions, findUserById, users } from '@/lib/mock-data';
import { toast } from 'sonner';

export const getAllUsers = (): User[] => {
  // In a real app, this would be a database call
  return users;
};

export const updatePermissions = async (userId: string, permissions: Permission[]): Promise<User | null> => {
  try {
    const user = findUserById(userId);
    if (!user) {
      toast.error('User not found');
      return null;
    }
    
    const updatedUser = updateUserPermissions(userId, permissions);
    if (updatedUser) {
      toast.success('User permissions updated successfully');
    }
    
    return updatedUser;
  } catch (error) {
    console.error('Update permissions error:', error);
    toast.error('Failed to update user permissions');
    return null;
  }
};

export const getUserPermissionsById = (userId: string): Permission[] => {
  const user = findUserById(userId);
  return user?.permissions || [];
};
