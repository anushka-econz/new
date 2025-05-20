
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { requestPasswordReset } from '@/services/authService';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  
  const onSubmit = async (values: ForgotPasswordValues) => {
    setIsLoading(true);
    
    try {
      const token = await requestPasswordReset(values.email);
      
      if (token) {
        setResetToken(token);
        toast.success('Password reset link sent! In a real application, this would be emailed to you.');
      } else {
        // Don't reveal that email doesn't exist
        toast.success('If an account exists with this email, a reset link has been sent.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Failed to request password reset');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleContinueToReset = () => {
    if (resetToken) {
      navigate(`/reset-password/${resetToken}`);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto slide-up">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>Enter your email to receive a password reset link</CardDescription>
      </CardHeader>
      <CardContent>
        {resetToken ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              In a real application, we would send an email with a reset link.
            </p>
            <p className="font-semibold">
              For demo purposes, we've generated a reset token:
            </p>
            <div className="p-2 bg-muted rounded text-sm break-all">
              {resetToken}
            </div>
            <Button onClick={handleContinueToReset} className="w-full mt-4">
              Continue to Reset Password
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Remember your password?{' '}
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/login')}>
            Back to Login
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
