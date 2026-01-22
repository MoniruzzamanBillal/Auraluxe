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
  const {
    mutateAsync: createAsync,
    reset: postReset,
    isPending: isCreatePending,
  } = usePost([["brand-type"]]);

  const {
    mutateAsync: updateAsync,
    reset: patchReset,
    isPending: isUpdatePending,
  } = usePatch([["brand-type"]]);

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

  useEffect(() => {
    if (!isOpen) {
      methods.reset();
    }
    postReset();
    patchReset();
  }, [isOpen, postReset, patchReset, methods]);

  const onSubmit = async (data: TBrandTypeForm) => {
    try {
      // UPDATE
      if (initialValues) {
        const changedData = getChangedFields(data, initialValues);

        const res = await updateAsync({
          url: `/brand-type/${initialValues.id}`,
          payload: changedData,
        });

        if (res?.success) {
          toast.success(res.message);
          onClose();
        }
        return;
      }

      // CREATE
      const res = await createAsync({
        url: "/brand-type",
        payload: data,
      });

      if (res?.success) {
        toast.success(res.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed");
    }
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
