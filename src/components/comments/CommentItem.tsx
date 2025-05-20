
import { Comment } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { removeComment } from '@/services/commentService';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useState } from 'react';

interface CommentItemProps {
  comment: Comment;
  onDelete: (id: string) => void;
}

const CommentItem = ({ comment, onDelete }: CommentItemProps) => {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const canDelete = user?.permissions.includes('delete');
  
  const handleDelete = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    try {
      const success = await removeComment(comment.id, user.id);
      if (success) {
        toast.success('Comment deleted successfully');
        onDelete(comment.id);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <Card className="slide-up">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="font-semibold">{comment.userName}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(comment.createdAt), 'MMM dd, yyyy • h:mm a')}
            </p>
          </div>
          {canDelete && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="mt-4">
          <p>{comment.content}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentItem;
