
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserCircle, LogOut, ShieldCheck, MessageSquare, Home } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-primary flex items-center space-x-2">
              <ShieldCheck />
              <span>AuthComments</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-primary flex items-center gap-1"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              {user && (
                <>
                  <Link 
                    to="/comments" 
                    className="text-gray-600 hover:text-primary flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Comments</span>
                  </Link>
                  
                  {user.permissions.includes('delete') && (
                    <Link 
                      to="/admin" 
                      className="text-gray-600 hover:text-primary flex items-center gap-1"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button size="sm" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
