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
  brandTypeSchema,
  TBrandType,
  TBrandTypeForm,
} from "../schema/brandType.schema";
import BrandTypeForm from "./BrandTypeForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TBrandType | null;
}

export default function CreateUpdateBrandType({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<TBrandTypeForm>({
    resolver: zodResolver(brandTypeSchema),
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

  const onSubmit = (data: TBrandTypeForm) => {
    console.log("Brand type submit:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Brand Type" : "Add Brand Type"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <BrandTypeForm onSubmit={onSubmit} isEdit={!!initialValues} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
