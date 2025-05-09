
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User } from "@/services/mockUserService";
import { Form } from "@/components/ui/form";
import FormWrapper from "@/components/crud/FormWrapper";
import CustomFormField from "@/components/crud/FormField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const userFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["Active", "Inactive", "Suspended"]),
  phone: z.string().optional(),
  department: z.string().optional(),
});

type UserFormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
  user?: User;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  title: string;
  description?: string;
}

const UserForm = ({
  user,
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
  title,
  description,
}: UserFormProps) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          phone: user.phone || "",
          department: user.department || "",
        }
      : {
          name: "",
          email: "",
          role: "USER",
          status: "Active",
          phone: "",
          department: "",
        },
  });

  const handleSubmit = (data: UserFormData) => {
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
              label="Name"
            >
              <Input placeholder="Enter name" />
            </CustomFormField>

            <CustomFormField
              form={form}
              name="email"
              label="Email"
            >
              <Input placeholder="Enter email" type="email" />
            </CustomFormField>

            <CustomFormField
              form={form}
              name="role"
              label="Role"
            >
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="MANAGER">Manager</SelectItem>
                  <SelectItem value="USER">User</SelectItem>
                </SelectContent>
              </Select>
            </CustomFormField>

            <CustomFormField
              form={form}
              name="status"
              label="Status"
            >
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </CustomFormField>

            <CustomFormField
              form={form}
              name="phone"
              label="Phone"
              description="Optional"
            >
              <Input placeholder="Enter phone number" />
            </CustomFormField>

            <CustomFormField
              form={form}
              name="department"
              label="Department"
              description="Optional"
            >
              <Input placeholder="Enter department" />
            </CustomFormField>

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

export default UserForm;
