"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import {
  TRegisteredUser,
  UpdateProfileFormData,
  updateProfileSchema,
} from "@/components/main/register/schema/register.schema";
import { Button } from "@/components/ui/button";
import { usePatch } from "@/hooks/useApi";
import { toast } from "sonner";
import { getChangedFields } from "../../../../utils/getChangedFields";
import ControlledInput from "../input/ControlledInput";
import { FileUploadController } from "../input/FileUploadController";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValue?: TRegisteredUser | null;
}

export default function UpdateUserProfile({
  isOpen,
  onClose,
  initialValue,
}: Props) {
  const methods = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",

      profileImage: undefined,
    },
  });

  const addMutation = usePatch([
    ["user-registration"],
    [`user-${initialValue?.id}`],
  ]);

  // Reset form on open/close
  useEffect(() => {
    if (initialValue) {
      methods.reset({
        name: initialValue?.name,

        email: initialValue?.email,
        profileImage: initialValue?.profileImage,
      });
    }
  }, [initialValue, methods]);

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    try {
      const formData = new FormData();

      if (initialValue) {
        const changedData = getChangedFields(data, initialValue);

        if (changedData?.name) {
          formData.append("name", changedData.name);
        }

        if (changedData?.email) {
          formData.append("email", changedData.email);
        }

        if (changedData?.profileImage) {
          //   formData.append("profileImage", changedData.profileImage);
        }
      }

      const result = await addMutation.mutateAsync({
        url: "/user/profile-update",
        payload: formData,
      });

      if (result?.success) {
        toast.success(result?.message || "User Updated successful!");

        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred.");
      onClose();
    }
  };

  const isPending = methods.formState.isSubmitting || addMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex w-[370px] flex-col justify-center gap-6"
          >
            <ControlledInput
              placeholder="User Name"
              name="name"
              className="  "
              label="User Name"
            />
            <ControlledInput
              placeholder="Email Address"
              type="email"
              name="email"
              className="  "
              label="User Email"
            />
            <FileUploadController
              name="profileImage"
              label="Profile Image"
              className="h-[200px] w-[300px]"
            />

            <div className="mt-1.5 disabled:cursor-not-allowed">
              <Button
                disabled={isPending}
                type="submit"
                className=" bg-brandColor   cursor-pointer rounded-md px-6 py-2.5 text-base font-medium text-white disabled:cursor-not-allowed"
              >
                {isPending ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
