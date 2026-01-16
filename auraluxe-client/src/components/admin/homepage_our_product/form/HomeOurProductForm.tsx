"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import ControlledTextArea from "@/components/share/input/ControlledTextArea";
import { FileUploadController } from "@/components/share/input/FileUploadController";
import SubmitButton from "@/components/share/SubmitButton";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { THomeOurProductFormData } from "../schema/HomeOurProduct";

export default function HomeOurProductForm({
  isEditMode = false,
  onSubmit,
  isPending = false,
}: {
  isEditMode?: boolean;
  onSubmit: (data: THomeOurProductFormData) => void;
  isPending?: boolean;
}) {
  const methods = useFormContext<THomeOurProductFormData>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4 max-h-[80vh]"
    >
      {/* Title */}
      <ControlledInput
        name="title"
        label="Product Title"
        placeholder="Enter product title"
        isRequired
      />

      {/* Description */}
      <ControlledTextArea
        name="description"
        label="Description"
        placeholder="Enter short description"
        isRequired
      />

      {/* Image */}
      <div className="flex flex-col gap-y-2">
        <Label>Product Image</Label>
        <FileUploadController
          name="imageUrl"
          label="Upload product image"
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
