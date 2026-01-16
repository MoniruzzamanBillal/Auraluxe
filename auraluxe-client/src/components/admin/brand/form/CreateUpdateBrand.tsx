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
  /* ---------------- BrandType Options ---------------- */
  const brandTypeOptions = [
    { label: "Technology", value: "1" },
    { label: "Sports", value: "2" },
  ];

  const methods = useForm<TBrandForm>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      logo: "",
      brandTypeId: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        name: initialValues.name,
        logo: initialValues.logo,
        brandTypeId: initialValues.brandTypeId,
      });
    }
  }, [initialValues, methods]);

  const onSubmit = (data: TBrandForm) => {
    console.log("Submitted:", data);
    onClose();
  };

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
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
