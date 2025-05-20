
import { Layout } from '@/components/layout/Layout';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/comments" replace />;
  }
  
  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default LoginPage;
