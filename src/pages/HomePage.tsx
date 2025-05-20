
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MessageSquare, UserCheck, Key } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 my-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Authentication & Authorization Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A demonstration of user authentication, authorization, and role-based permissions for a comments system.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="lg" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="border rounded-lg p-6 slide-up">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Authentication</h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• User registration with name, email and password</li>
              <li>• Secure login system with password verification</li>
              <li>• Password reset flow</li>
              <li>• JWT-based token authentication</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Key className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Authorization</h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Role-based access control</li>
              <li>• Permission management</li>
              <li>• Read, write, and delete permissions</li>
              <li>• Admin controls for managing permissions</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Comments System</h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Public-facing comments list</li>
              <li>• Permission-based actions</li>
              <li>• Add comments with write permission</li>
              <li>• Delete comments with delete permission</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Security Features</h2>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Short-lived access tokens</li>
              <li>• Refresh token mechanism</li>
              <li>• Secure password handling</li>
              <li>• Session invalidation on logout</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Test Accounts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Password</th>
                  <th className="py-2 px-4 border-b">Permissions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Admin User</td>
                  <td className="py-2 px-4 border-b">admin@example.com</td>
                  <td className="py-2 px-4 border-b">password123</td>
                  <td className="py-2 px-4 border-b">read, write, delete</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Writer User</td>
                  <td className="py-2 px-4 border-b">writer@example.com</td>
                  <td className="py-2 px-4 border-b">password123</td>
                  <td className="py-2 px-4 border-b">read, write</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Reader User</td>
                  <td className="py-2 px-4 border-b">reader@example.com</td>
                  <td className="py-2 px-4 border-b">password123</td>
                  <td className="py-2 px-4 border-b">read</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
