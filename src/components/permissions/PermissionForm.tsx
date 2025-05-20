import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  updatePermissions,
  getUserPermissionsById,
} from "@/services/permissionService";
import { User, Permission } from "@/types";
import { toast } from "sonner";

interface PermissionFormProps {
  user: User;
  onPermissionsUpdated: () => void;
}

const permissions: { value: Permission; label: string }[] = [
  { value: "read", label: "Read Comments" },
  { value: "write", label: "Write Comments" },
  { value: "delete", label: "Delete Comments" },
];

export function PermissionForm({
  user,
  onPermissionsUpdated,
}: PermissionFormProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    user.permissions || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePermissionChange = (checked: boolean, permission: Permission) => {
    if (checked) {
      setSelectedPermissions((prev) => [...prev, permission]);
    } else {
      setSelectedPermissions((prev) => prev.filter((p) => p !== permission));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const updatedUser = await updatePermissions(user.id, selectedPermissions);

      if (updatedUser) {
        toast.success(`Permissions updated for ${user.name}`);
        onPermissionsUpdated();
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      toast.error("Failed to update permissions");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Permissions</CardTitle>
        <CardDescription>
          Update permissions for {user.name} ({user.email})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {permissions.map((permission) => (
          <div key={permission.value} className="flex items-center space-x-2">
            <Checkbox
              id={`permission-${permission.value}`}
              checked={selectedPermissions.includes(permission.value)}
              onCheckedChange={(checked) =>
                handlePermissionChange(checked === true, permission.value)
              }
            />
            <Label htmlFor={`permission-${permission.value}`}>
              {permission.label}
            </Label>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Permissions"}
        </Button>
      </CardFooter>
    </Card>
  );
}
