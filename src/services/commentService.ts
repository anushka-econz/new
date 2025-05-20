
import { Comment, User } from '@/types';
import { comments, createComment, deleteComment } from '@/lib/mock-data';
import { hasPermission } from './authService';
import { toast } from 'sonner';

export const getComments = async (): Promise<Comment[]> => {
  // In a real app, this would be a database call
  return comments;
};

export const addComment = async (content: string, user: User): Promise<Comment | null> => {
  try {
    // Check if user has write permission
    if (!hasPermission(user.id, 'write')) {
      toast.error('You do not have permission to add comments');
      return null;
    }
    
    return createComment(content, user);
  } catch (error) {
    console.error('Add comment error:', error);
    toast.error('Failed to add comment');
    return null;
  }
};

export const removeComment = async (commentId: string, userId: string): Promise<boolean> => {
  try {
    // Check if user has delete permission
    if (!hasPermission(userId, 'delete')) {
      toast.error('You do not have permission to delete comments');
      return false;
    }
    
    return deleteComment(commentId);
  } catch (error) {
    console.error('Delete comment error:', error);
    toast.error('Failed to delete comment');
    return false;
  }
};
