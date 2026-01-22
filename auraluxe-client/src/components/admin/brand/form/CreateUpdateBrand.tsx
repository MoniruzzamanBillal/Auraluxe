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

import { useFetchData, usePatch, usePost } from "@/hooks/useApi";
import { toast } from "sonner";
import { getChangedFields } from "../../../../../utils/getChangedFields";
import { brandSchema, TBrand, TBrandForm } from "../schema/brand.schema";
import BrandForm from "./BrandForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TBrand | null;
}

export default function CreateUpdateBrand({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<TBrandForm>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",

      brandTypeId: "",
    },
  });

  const { data: brandTypeData, isLoading: isBrandTypeLoading } = useFetchData(
    ["brand-type"],
    "/brand-type",
  );

  const brandTypeOptions =
    brandTypeData?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const {
    mutateAsync: createBrand,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["brand"]]);
  const {
    mutateAsync: updateBrand,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["brand"]]);

  // Reset form on open/close
  useEffect(() => {
    if (initialValues) {
      methods.reset(initialValues);
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

  const onSubmit = async (data: TBrandForm) => {
    try {
      if (initialValues) {
        // ✅ UPDATE
        const changedData = getChangedFields(data, initialValues);
        const formData = new FormData();

        if (changedData.name) formData.append("name", changedData.name);
        if (changedData.brandTypeId)
          formData.append("brandTypeId", changedData.brandTypeId);
        if (changedData.logo instanceof File)
          formData.append("file", changedData.logo);

        const result = await updateBrand({
          url: `/brand/${initialValues.id}`,
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
      formData.append("name", data.name);
      formData.append("brandTypeId", data.brandTypeId);
      if (data.logo) formData.append("file", data.logo);

      const result = await createBrand({
        url: "/brand",
        payload: formData,
      });

      if (result?.success) {
        toast.success(result.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save brand");
    }
  };

  const isLoading = isPostPending || isPatchPending || isBrandTypeLoading;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Brand" : "Add Brand"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <BrandForm
            onSubmit={onSubmit}
            brandTypeOptions={brandTypeOptions}
            isEdit={!!initialValues}
            isLoading={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
