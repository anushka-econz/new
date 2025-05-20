
import { useState, useEffect } from 'react';
import { Comment } from '@/types';
import { getComments } from '@/services/commentService';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import CommentItem from './CommentItem';

export function CommentsList() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments();
        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, []);
  
  const handleCommentDeleted = (id: string) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== id));
  };
  
  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [newComment, ...prevComments]);
  };
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>Loading comments...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full fade-in">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>
          {comments.length === 0 
            ? 'No comments yet. Be the first to comment!' 
            : `Showing ${comments.length} comment${comments.length === 1 ? '' : 's'}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No comments to display</p>
        ) : (
          comments.map(comment => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              onDelete={handleCommentDeleted} 
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
