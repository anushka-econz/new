
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { addComment } from '@/services/commentService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Comment } from '@/types';

interface AddCommentFormProps {
  onCommentAdded: (comment: Comment) => void;
}

const commentSchema = z.object({
  content: z.string()
    .min(1, { message: 'Comment cannot be empty' })
    .max(500, { message: 'Comment cannot exceed 500 characters' }),
});

type CommentValues = z.infer<typeof commentSchema>;

export function AddCommentForm({ onCommentAdded }: AddCommentFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const canAddComments = user?.permissions.includes('write');
  
  const form = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  });
  
  const onSubmit = async (values: CommentValues) => {
    if (!user) {
      toast.error('You must be logged in to add a comment');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newComment = await addComment(values.content, user);
      
      if (newComment) {
        toast.success('Comment added successfully');
        onCommentAdded(newComment);
        form.reset();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!canAddComments) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Add Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-center py-4">
            You don't have permission to add comments.
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="slide-up">
      <CardHeader>
        <CardTitle>Add Comment</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your comment here..." 
                      className="min-h-[100px] resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
