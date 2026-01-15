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
import OurFeaturedProductForm from "./OurFeaturedProductForm";

import {
  OurFeaturedProductSchema,
  TOurFeaturedProduct,
  TOurFeaturedProductFormData,
} from "../schema/OurFeaturedProduct";

export default function CreateUpdateOurFeaturedProduct({
  isOpen,
  onClose,
  initialValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TOurFeaturedProduct | null;
}) {
  const methods = useForm<TOurFeaturedProductFormData>({
    resolver: zodResolver(OurFeaturedProductSchema),
    defaultValues: { imageUrl: "" },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({ imageUrl: initialValues.imageUrl });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) methods.reset();
  }, [isOpen, methods]);

  const onSubmit = (data: TOurFeaturedProductFormData) => {
    console.log("Submitted Featured Product:", data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white   max-w-4xl overflow-y-auto max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <OurFeaturedProductForm
            onSubmit={onSubmit}
            isEditMode={!!initialValues}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
