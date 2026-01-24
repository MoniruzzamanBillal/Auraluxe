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
import { getChangedFields } from "../../../../../utils/getChangedFields";
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
    },
  });

  const {
    mutateAsync: createKeyBrand,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["key-brand"]]);

  const {
    mutateAsync: updateKeyBrand,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["key-brand"]]);

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        description: initialValues.description,
        logo: initialValues?.logo,
      });
    } else {
      methods.reset();
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
        description: "",
        logo: "",
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, postReset, patchReset]);

  const onSubmit = async (data: TKeyBrandForm) => {
    console.log("Submitted:", data);

    try {
      // UPDATE
      if (initialValues) {
        const changedData = getChangedFields(data, initialValues);
        const formData = new FormData();

        if (changedData?.name) formData.append("name", changedData.name);
        if (changedData?.description)
          formData.append("description", changedData.description);
        if (changedData?.logo && changedData.logo instanceof File) {
          formData.append("file", changedData.logo);
        }

        const result = await updateKeyBrand({
          url: `/key-brand/${initialValues.id}`,
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
      formData.append("name", data.name);
      formData.append("description", data.description);
      if (data.logo) {
        formData.append("file", data.logo);
      }

      const result = await createKeyBrand({
        url: "/key-brand",
        payload: formData,
      });

      if (result?.success) {
        toast.success(result.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save key brand");
    }
  };

  const isLoading = isPostPending || isPatchPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Brand" : "Add Key Brand"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <KeyBrandForm
            onSubmit={onSubmit}
            isEdit={!!initialValues}
            isLoading={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
