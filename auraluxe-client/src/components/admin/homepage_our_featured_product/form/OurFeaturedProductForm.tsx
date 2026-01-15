"use client";

import { FileUploadController } from "@/components/share/input/FileUploadController";
import SubmitButton from "@/components/share/SubmitButton";
import { useFormContext } from "react-hook-form";
import { TOurFeaturedProductFormData } from "../schema/OurFeaturedProduct";

export default function OurFeaturedProductForm({
  onSubmit,
  isEditMode = false,
  isPending = false,
}: {
  onSubmit: (data: TOurFeaturedProductFormData) => void;
  isEditMode?: boolean;
  isPending?: boolean;
}) {
  const methods = useFormContext<TOurFeaturedProductFormData>();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-y-2">
        <FileUploadController
          name="imageUrl"
          label="Upload Featured Product Image (JPEG, PNG, SVG)"
          className="h-[200px] w-[300px]"
        />
      </div>

      <SubmitButton
        isLoading={isPending}
        label={isEditMode ? "Update Product" : "Add Product"}
      />
    </form>
  );
}
