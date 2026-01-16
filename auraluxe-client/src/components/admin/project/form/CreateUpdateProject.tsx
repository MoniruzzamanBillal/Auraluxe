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
  projectSchema,
  TProject,
  TProjectForm,
} from "../schema/project.schema";
import ProjectForm from "./ProjectForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TProject | null;
}

export default function CreateUpdateProject({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<TProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      projectImg: "",
      location: "",
      client: "",
      architects: "",
      website: "",
      facebookLink: "",
      instagramLink: "",
      linkedinLink: "",
      xLink: "",
      description: "",
      projectTypeId: "",
      materialId: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...initialValues,
      });
    }
  }, [initialValues, methods]);

  const projectTypeOptions = [
    { label: "Residential", value: "1" },
    { label: "Commercial", value: "2" },
  ];

  const materialOptions = [
    { label: "Marble", value: "1" },
    { label: "Wood", value: "2" },
  ];

  const onSubmit = (data: TProjectForm) => {
    console.log("Submitted:", data);
    // onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white  w-full ">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <ProjectForm
            onSubmit={onSubmit}
            projectTypeOptions={projectTypeOptions}
            materialOptions={materialOptions}
            isEdit={!!initialValues}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
