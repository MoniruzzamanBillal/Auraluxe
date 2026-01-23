"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePatch, usePost } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { getChangedFields } from "../../../../utils/getChangedFields";
import HomeBannerForm from "./HomeBannerForm";
import {
  HomePageBannerSchema,
  THomePageBanner,
  THomePageBannerFormData,
} from "./schema/HomeBanner";

type TPageProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: THomePageBanner | null;
};

export default function CreateUpdateHomeBanner({
  isOpen,
  onClose,
  initialValues,
}: TPageProps) {
  const methods = useForm<THomePageBannerFormData>({
    resolver: zodResolver(HomePageBannerSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    mutateAsync: createBanner,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["home-banner"]]);

  const {
    mutateAsync: updateBanner,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["home-banner"]]);

  useEffect(() => {
    if (initialValues) {
      methods.reset(initialValues);
    } else {
      methods.reset();
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({ title: "", description: "" });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, postReset, patchReset]);

  const onSubmit = async (data: THomePageBannerFormData) => {
    try {
      // UPDATE
      if (initialValues) {
        const changedData = getChangedFields(data, initialValues);
        const formData = new FormData();

        if (changedData.title) formData.append("title", changedData.title);
        if (changedData.description)
          formData.append("description", changedData.description);
        if (changedData.imageUrl instanceof File)
          formData.append("file", changedData.imageUrl);

        const result = await updateBanner({
          url: `/home-banner/${initialValues.id}`,
          payload: formData,
        });

        if (result?.success) {
          toast.success(result.message);
          onClose();
        }
        return;
      }

      // CREATE
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.imageUrl) formData.append("file", data.imageUrl);

      const result = await createBanner({
        url: "/home-banner",
        payload: formData,
      });

      if (result?.success) {
        toast.success(result.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save banner");
    }
  };

  const isLoading = isPostPending || isPatchPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Banner" : "Add New Banner"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <HomeBannerForm
            onSubmit={onSubmit}
            isEditMode={!!initialValues}
            isPending={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
