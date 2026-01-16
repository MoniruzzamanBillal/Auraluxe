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

  const onSubmit = (data: TProjectTypeForm) => {
    console.log("Project type submit:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Project Type" : "Add Project Type"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <ProjectTypeForm onSubmit={onSubmit} isEdit={!!initialValues} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
