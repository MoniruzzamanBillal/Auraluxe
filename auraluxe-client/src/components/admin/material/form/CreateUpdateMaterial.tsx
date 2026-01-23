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

import { usePatch, usePost } from "@/hooks/useApi";
import { toast } from "sonner";
import { getChangedFields } from "../../../../../utils/getChangedFields";
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

  const {
    mutateAsync: createProduct,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["material"]]);

  const {
    mutateAsync: updateProduct,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["material"]]);

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

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        name: "",
        description: "",
      });
      postReset();
      patchReset();
    }
  }, [isOpen, methods, postReset, patchReset]);

  const onSubmit = async (data: TMaterialForm) => {
    try {
      // ✅ UPDATE
      if (initialValues) {
        const changedData = getChangedFields(data, initialValues);

        const result = await updateProduct({
          url: `/material/${initialValues.id}`,
          payload: changedData,
        });

        if (result?.success) {
          toast.success(result.message);
          onClose();
        }
        return;
      }

      const result = await createProduct({
        url: "/material",
        payload: data,
      });

      if (result?.success) {
        toast.success(result.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save material");
    }
  };

  const isLoading = isPostPending || isPatchPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Material" : "Add Material"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <MaterialForm
            onSubmit={onSubmit}
            isEdit={!!initialValues}
            isLoading={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
