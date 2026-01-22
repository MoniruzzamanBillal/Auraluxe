"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchData, usePatch, usePost } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { getChangedFields } from "../../../../../utils/getChangedFields";
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
  const methods = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      // brandId: "",
      categoryId: "",
      price: 0,
      quantity: 0,
      keyFeatures: "",
      specifications: "",
      productDes: "",
      shippingDelivery: "",
    },
  });

  /* ----------------------------------
   Fetch Brands & Categories
  ---------------------------------- */
  // const { data: brandData } = useFetchData(["brand"], "/brand");
  const { data: categoryData } = useFetchData(["category"], "/category");

  // const brandOptions =
  //   brandData?.data?.map((item: any) => ({
  //     label: item.name,
  //     value: item.id,
  //   })) || [];

  const categoryOptions =
    categoryData?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const {
    mutateAsync: createProduct,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["product"]]);

  const {
    mutateAsync: updateProduct,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["product"]]);

  useEffect(() => {
    if (initialValues) {
      methods.reset({ ...initialValues });
    } else {
      methods.reset();
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset();
    }
    postReset();
    patchReset();
  }, [isOpen, postReset, patchReset, methods]);

  const onSubmit = async (data: TProductForm) => {
    console.log("submitted data = ", data);

    try {
      /* ---------- UPDATE ---------- */
      if (initialValues) {
        const changedData = getChangedFields(data, initialValues);
        const formData = new FormData();

        if (changedData?.name) formData.append("name", changedData.name);

        // if (changedData?.brandId)
        //   formData.append("brandId", changedData.brandId);

        if (changedData?.categoryId)
          formData.append("categoryId", changedData.categoryId);

        if (changedData?.price !== undefined)
          formData.append("price", String(changedData.price));

        if (changedData?.quantity !== undefined)
          formData.append("quantity", String(changedData.quantity));

        if (changedData?.keyFeatures)
          formData.append("keyFeatures", changedData.keyFeatures);

        if (changedData?.specifications)
          formData.append("specifications", changedData.specifications);

        if (changedData?.productDes)
          formData.append("productDes", changedData.productDes);

        if (changedData?.shippingDelivery)
          formData.append("shippingDelivery", changedData.shippingDelivery);

        if (
          changedData?.productImage &&
          changedData.productImage instanceof File
        ) {
          formData.append("file", changedData.productImage);
        }

        const result = await updateProduct({
          url: `/product/${initialValues.id}`,
          payload: formData,
        });

        if (result?.success) {
          toast.success(result.message);
          onClose();
        }

        return;
      }

      /* ---------- CREATE ---------- */
      const formData = new FormData();

      formData.append("name", data.name);

      // formData.append("brandId", data.brandId);
      formData.append("categoryId", data.categoryId);
      formData.append("price", String(data.price));
      formData.append("quantity", String(data.quantity));

      formData.append("keyFeatures", data.keyFeatures);
      formData.append("specifications", data.specifications);
      formData.append("productDes", data.productDes);
      if (data.shippingDelivery) {
        formData.append("shippingDelivery", data.shippingDelivery);
      }

      if (data?.productImage) {
        formData.append("file", data.productImage);
      }

      const response = await createProduct({
        url: "/product",
        payload: formData,
      });

      if (response?.success) {
        toast.success(response.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save product");
    }
  };

  const isLoading = isPostPending || isPatchPending;

  console.log("initialValues = ", initialValues);

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
            // brandOptions={brandOptions}
            categoryOptions={categoryOptions}
            isEdit={!!initialValues}
            isLoading={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
