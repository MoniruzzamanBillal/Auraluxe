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

import { usePatch, usePost } from "@/hooks/useApi";
import { toast } from "sonner";
import { getChangedFields } from "../../../../../utils/getChangedFields";
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

  const {
    mutateAsync: createProduct,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["our-featured-product"]]);

  const {
    mutateAsync: updateProduct,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["our-featured-product"]]);

  /* -------------------- Reset Logic -------------------- */
  useEffect(() => {
    if (initialValues) {
      methods.reset({ imageUrl: initialValues.imageUrl });
    } else {
      methods.reset();
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset();
      postReset();
      patchReset();
    }
  }, [isOpen, methods, postReset, patchReset]);

  /* -------------------- Submit -------------------- */
  const onSubmit = async (data: TOurFeaturedProductFormData) => {
    try {
      // ✅ UPDATE
      if (initialValues) {
        const changedData = getChangedFields(data, initialValues);
        const formData = new FormData();

        if (changedData.imageUrl instanceof File) {
          formData.append("file", changedData.imageUrl);
        }

        const result = await updateProduct({
          url: `/our-featured-product/${initialValues.id}`,
          payload: formData,
        });

        if (result?.success) {
          toast.success(result.message);
          onClose();
        }
        return;
      }

      // ✅ CREATE
      const formData = new FormData();
      if (data.imageUrl) formData.append("file", data.imageUrl);

      const result = await createProduct({
        url: "/our-featured-product",
        payload: formData,
      });

      if (result?.success) {
        toast.success(result.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save featured product");
    }
  };

  const isLoading = isPostPending || isPatchPending;

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
            isPending={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
