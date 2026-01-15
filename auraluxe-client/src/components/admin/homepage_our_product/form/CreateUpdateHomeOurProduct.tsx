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
  HomeOurProductSchema,
  THomeOurProduct,
  THomeOurProductFormData,
} from "../schema/HomeOurProduct";
import HomeOurProductForm from "./HomeOurProductForm";

export default function CreateUpdateHomeOurProduct({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: THomeOurProduct | null;
}) {
  const methods = useForm<THomeOurProductFormData>({
    resolver: zodResolver(HomeOurProductSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        title: initialValues.title,
        description: initialValues.description,
        imageUrl: initialValues.imageUrl,
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) methods.reset();
  }, [isOpen, methods]);

  const onSubmit = (data: THomeOurProductFormData) => {
    console.log("Home Our Product:", data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white   max-w-4xl overflow-y-auto max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <HomeOurProductForm
            onSubmit={onSubmit}
            isEditMode={!!initialValues}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
