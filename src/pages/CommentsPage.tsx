
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { CommentsList } from '@/components/comments/CommentsList';
import { AddCommentForm } from '@/components/comments/AddCommentForm';
import { useAuth } from '@/contexts/AuthContext';
import { Comment } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const CommentsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  
  // Redirect if not authenticated
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }
  
  const handleCommentAdded = (newComment: Comment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Comments</h1>
          <p className="text-muted-foreground">
            View and interact with comments based on your permissions
          </p>
        </div>
        
        {user && !user.permissions.includes('read') && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have read permission to view comments
            </AlertDescription>
          </Alert>
        )}
        
        {(!user || user.permissions.includes('read')) && (
          <>
            {user && user.permissions.includes('write') && (
              <AddCommentForm onCommentAdded={handleCommentAdded} />
            )}
            <CommentsList />
          </>
        )}
      </div>
    </Layout>
  );
};

export default CommentsPage;
