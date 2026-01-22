"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { usePatch, usePost } from "@/hooks/useApi";
import { toast } from "sonner";
import { getChangedFields } from "../../../../../utils/getChangedFields";
import {
  projectTypeSchema,
  TProjectType,
  TProjectTypeForm,
} from "../schema/projectType.schema";
import ProjectTypeForm from "./ProjectTypeForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TProjectType | null;
}

export default function CreateUpdateProjectType({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const {
    mutateAsync,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["project-type"]]);

  const {
    mutateAsync: patchAsync,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["project-type"]]);

  const methods = useForm<TProjectTypeForm>({
    resolver: zodResolver(projectTypeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        description: initialValues.description,
      });
    } else {
      methods.reset({
        name: "",
        description: "",
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset();
    }
    postReset();
    patchReset();
  }, [isOpen, postReset, patchReset, methods]);

  // ! submit handler
  const onSubmit = async (data: TProjectTypeForm) => {
    try {
      if (initialValues) {
        const changedData = getChangedFields(data, initialValues);

        const result = await patchAsync({
          url: `/project-type/${initialValues.id}`,
          payload: changedData,
        });

        if (result?.success) {
          toast.success(result?.message);
          onClose();
          methods.reset();
        }
        return;
      }

      const response = await mutateAsync({
        url: "/project-type",
        payload: data,
      });

      if (response?.success) {
        toast.success(response?.message);
        onClose();
        methods.reset();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed");
    }
  };

  const isLoading = isPostPending || isPatchPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Project Type" : "Add Project Type"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <ProjectTypeForm
            onSubmit={onSubmit}
            isEdit={!!initialValues}
            isLoading={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
