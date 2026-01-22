"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { useEffect } from "react";
import HomeOurFeaturedForm from "./HomeOurFeaturedForm";

import { usePatch, usePost } from "@/hooks/useApi";
import { toast } from "sonner";
import { getChangedFields } from "../../../../../utils/getChangedFields";
import {
  homeOurFeaturedSchema,
  THomeOurFeatured,
  THomeOurFeaturedForm,
} from "../schema/homeOurFeatured.schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: THomeOurFeatured | null;
}

export default function CreateUpdateHomeOurFeatured({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<THomeOurFeaturedForm>({
    resolver: zodResolver(homeOurFeaturedSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const {
    mutateAsync: createFeatured,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["home-our-featured"]]);

  const {
    mutateAsync: updateFeatured,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["home-our-featured"]]);

  // 🔁 Reset form on initial values change
  useEffect(() => {
    if (initialValues) {
      methods.reset(initialValues);
    } else {
      methods.reset();
    }
  }, [initialValues, methods]);

  // 🔁 Cleanup on modal close
  useEffect(() => {
    if (!isOpen) {
      methods.reset();
      postReset();
      patchReset();
    }
  }, [isOpen, methods, postReset, patchReset]);

  const onSubmit = async (data: THomeOurFeaturedForm) => {
    try {
      // ! UPDATE
      if (initialValues) {
        const changedData = getChangedFields(data, initialValues);
        const formData = new FormData();

        if (changedData.title) formData.append("title", changedData.title);

        if (changedData.description)
          formData.append("description", changedData.description);

        if (changedData.imageUrl instanceof File)
          formData.append("file", changedData.imageUrl);

        const result = await updateFeatured({
          url: `/home-our-featured/${initialValues.id}`,
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
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.imageUrl) formData.append("file", data.imageUrl);

      const result = await createFeatured({
        url: "/home-our-featured",
        payload: formData,
      });

      if (result?.success) {
        toast.success(result.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save home featured item");
    }
  };

  const isLoading = isPostPending || isPatchPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white  max-w-4xl overflow-y-auto max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Home Featured" : "Add Home Featured"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <HomeOurFeaturedForm
            onSubmit={onSubmit}
            isEdit={!!initialValues}
            isLoading={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
