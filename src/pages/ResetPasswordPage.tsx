
import { Layout } from '@/components/layout/Layout';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { token } = useParams<{ token: string }>();
  
  // Redirect if already authenticated
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/comments" replace />;
  }
  
  // Redirect if no token
  if (!token) {
    return <Navigate to="/forgot-password" replace />;
  }
  
  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <ResetPasswordForm />
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
