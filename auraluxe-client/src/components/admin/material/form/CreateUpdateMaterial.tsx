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
  materialSchema,
  TMaterial,
  TMaterialForm,
} from "../schema/material.schema";
import MaterialForm from "./MaterialForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TMaterial | null;
}

export default function CreateUpdateMaterial({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<TMaterialForm>({
    resolver: zodResolver(materialSchema),
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
    }
  }, [initialValues, methods]);

  const onSubmit = (data: TMaterialForm) => {
    console.log("Submitted:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Material" : "Add Material"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <MaterialForm onSubmit={onSubmit} isEdit={!!initialValues} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
