
import { Layout } from '@/components/layout/Layout';
import { UsersList } from '@/components/permissions/UsersList';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }
  
  // Check for admin privileges (delete permission)
  const isAdmin = user?.permissions.includes('delete');
  
  if (!isAdmin) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to access the admin area
            </AlertDescription>
          </Alert>
          
          <Button onClick={() => navigate('/comments')}>
            Return to Comments
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">User Management</h1>
          <p className="text-muted-foreground">
            Manage user permissions for the comments system
          </p>
        </div>
        
        <UsersList />
      </div>
    </Layout>
  );
};

export default AdminPage;
