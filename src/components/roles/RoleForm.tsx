
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/crud/FormField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Modules } from "@/types/auth";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

const roleFormSchema = z.object({
  name: z.string().min(2, "Role name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  permissions: z.array(z.string()).min(1, "At least one permission is required"),
});

type RoleFormData = z.infer<typeof roleFormSchema>;

export interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

interface RoleFormProps {
  role?: Role;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: RoleFormData) => void;
  title: string;
  description?: string;
}

const RoleForm = ({
  role,
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
  title,
  description,
}: RoleFormProps) => {
  const allModules = Object.values(Modules);
  
  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: role
      ? {
          name: role.name,
          description: role.description,
          permissions: role.permissions,
        }
      : {
          name: "",
          description: "",
          permissions: [],
        },
  });

  const handleSubmit = (data: RoleFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <CustomFormField
              form={form}
              name="name"
              label="Role Name"
            >
              <Input placeholder="Enter role name" />
            </CustomFormField>

            <CustomFormField
              form={form}
              name="description"
              label="Description"
            >
              <Textarea placeholder="Enter role description" />
            </CustomFormField>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Module Permissions</h3>
              <Separator />
              
              <div className="space-y-4 py-2">
                {allModules.map((module) => (
                  <div key={module} className="flex items-start space-x-2">
                    <Checkbox
                      id={`permission-${module}`}
                      checked={form.watch("permissions").includes(module)}
                      onCheckedChange={(checked) => {
                        const currentPerms = form.getValues("permissions");
                        if (checked) {
                          form.setValue("permissions", [...currentPerms, module]);
                        } else {
                          form.setValue(
                            "permissions",
                            currentPerms.filter((p) => p !== module)
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={`permission-${module}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {module}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RoleForm;
