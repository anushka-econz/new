
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from '@/types';
import { users } from '@/lib/mock-data';
import { PermissionForm } from './PermissionForm';

export function UsersList() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchUsers = async () => {
      try {
        setAllUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const handleUserSelect = (userId: string) => {
    const user = allUsers.find(u => u.id === userId) || null;
    setSelectedUser(user);
  };
  
  const handleUserUpdate = () => {
    // Refresh the user list
    setAllUsers([...users]);
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <Card className="fade-in">
        <CardHeader>
          <CardTitle>Select User</CardTitle>
          <CardDescription>Select a user to manage their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup onValueChange={handleUserSelect}>
            {allUsers.map(user => (
              <div key={user.id} className="flex items-center space-x-2 py-2">
                <RadioGroupItem value={user.id} id={`user-${user.id}`} />
                <Label htmlFor={`user-${user.id}`} className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
                    <span>{user.name}</span>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map(permission => (
                        <Badge key={permission} variant="outline">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      
      {selectedUser && (
        <div className="slide-up">
          <PermissionForm 
            user={selectedUser} 
            onPermissionsUpdated={handleUserUpdate} 
          />
        </div>
      )}
    </div>
  );
}
