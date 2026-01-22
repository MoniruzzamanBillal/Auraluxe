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
  const {
    mutateAsync,
    error,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["category"]]);

  const {
    mutateAsync: patchAsync,
    error: patchError,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["category"]]);

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

  useEffect(() => {
    if (!isOpen) {
      methods.reset({ name: "" });
    }
    postReset();
    patchReset();
  }, [isOpen, postReset, patchReset, methods]);

  // ! category submit handler
  const onSubmit = async (data: TCategoryForm) => {
    try {
      if (initialValues) {
        const newChangedData = getChangedFields(data, initialValues);

        const updatedResult = await patchAsync({
          url: `/category/${initialValues?.id}`,
          payload: newChangedData,
        });

        if (updatedResult?.success) {
          toast.success(updatedResult?.message);

          onClose();
          methods.reset();
        }

        return;
      }

      const payload: TCategoryForm = {
        name: data?.name,
      };

      const response = await mutateAsync({ url: "/category", payload });

      if (response?.success) {
        toast.success(response?.message);

        onClose();
        methods.reset();
      }
    } catch (error: any) {
      // console.log("error in add update response  = ", error);
      toast.error(error?.message || error?.errorMessages || "Failed");
    }
  };

  const isLoading = isPostPending || isPatchPending;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <CategoryForm
            onSubmit={onSubmit}
            isEdit={!!initialValues}
            isLoading={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
