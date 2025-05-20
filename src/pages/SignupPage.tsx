
import { Layout } from '@/components/layout/Layout';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const SignupPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Redirect if already authenticated
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/comments" replace />;
  }
  
  return (
    <Layout>
      <div className="max-w-md mx-auto py-12">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default SignupPage;
