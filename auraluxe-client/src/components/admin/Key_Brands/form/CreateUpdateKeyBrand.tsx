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
  keyBrandSchema,
  TKeyBrand,
  TKeyBrandForm,
} from "../schema/keyBrand.schema";
import KeyBrandForm from "./KeyBrandForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TKeyBrand | null;
}

export default function CreateUpdateKeyBrand({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<TKeyBrandForm>({
    resolver: zodResolver(keyBrandSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        description: initialValues.description,
        logo: initialValues.logo,
      });
    }
  }, [initialValues, methods]);

  const onSubmit = (data: TKeyBrandForm) => {
    console.log("Submitted:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Brand" : "Add Key Brand"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <KeyBrandForm onSubmit={onSubmit} isEdit={!!initialValues} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
