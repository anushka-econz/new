
import { Layout } from '@/components/layout/Layout';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/comments" replace />;
  }
  
  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <ForgotPasswordForm />
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
