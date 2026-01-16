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
import {
  TProduct,
  TProductForm,
  productSchema,
} from "../schema/product.schema";
import ProductForm from "./ProductForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TProduct | null;
}

export default function CreateUpdateProduct({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<TProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",

      brandId: "",
      categoryId: "",

      keyFeatures: "",
      specifications: "",
      productDes: "",
      shippingDelivery: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...initialValues,
      });
    }
  }, [initialValues, methods]);

  const brandOptions = [
    { label: "Brand A", value: "1" },
    { label: "Brand B", value: "2" },
  ];

  const categoryOptions = [
    { label: "Furniture", value: "1" },
    { label: "Electronics", value: "2" },
  ];

  const onSubmit = (data: TProductForm) => {
    console.log("Submitted:", data);
    // onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <ProductForm
            onSubmit={onSubmit}
            brandOptions={brandOptions}
            categoryOptions={categoryOptions}
            isEdit={!!initialValues}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
