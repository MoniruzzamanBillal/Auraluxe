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
  categorySchema,
  TCategory,
  TCategoryForm,
} from "../schema/category.schema";
import CategoryForm from "./CategoryForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TCategory | null;
}

export default function CreateUpdateCategory({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<TCategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({ name: initialValues.name });
    } else {
      methods.reset({ name: "" });
    }
  }, [initialValues, methods]);

  const onSubmit = (data: TCategoryForm) => {
    console.log("Category submit:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <CategoryForm onSubmit={onSubmit} isEdit={!!initialValues} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
