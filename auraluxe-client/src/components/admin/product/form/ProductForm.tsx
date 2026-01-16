"use client";

import ControlledInput from "@/components/share/input/ControlledInput";

import ControlledSelectField from "@/components/share/input/ControlledSelectField";
import ControlledTextArea from "@/components/share/input/ControlledTextArea";
import { FileUploadController } from "@/components/share/input/FileUploadController";
import SubmitButton from "@/components/share/SubmitButton";
import { useFormContext } from "react-hook-form";
import { TProductForm } from "../schema/product.schema";

interface Props {
  onSubmit: (data: TProductForm) => void;
  brandOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function ProductForm({
  onSubmit,
  brandOptions,
  categoryOptions,
  isEdit = false,
  isLoading = false,
}: Props) {
  const methods = useFormContext<TProductForm>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4 max-h-[80vh] overflow-y-auto"
    >
      <ControlledInput
        name="name"
        label="Product Name"
        placeholder="Enter product name"
        isRequired
      />

      <ControlledSelectField
        name="brandId"
        label="Brand"
        options={brandOptions}
        placeholder="Select brand"
        isRequired
      />

      <ControlledSelectField
        name="categoryId"
        label="Category"
        options={categoryOptions}
        placeholder="Select category"
        isRequired
      />

      <ControlledInput
        name="price"
        label="Price"
        placeholder="Enter price"
        // type="number"
        isRequired
      />
      <ControlledTextArea
        name="keyFeatures"
        label="Key Features"
        placeholder="Enter key features"
        isRequired
      />
      <ControlledTextArea
        name="specifications"
        label="Specifications"
        placeholder="Enter specifications"
        isRequired
      />
      <ControlledTextArea
        name="productDes"
        label="Product Description"
        placeholder="Enter product description"
        isRequired
      />
      <ControlledInput
        name="shippingDelivery"
        label="Shipping/Delivery"
        placeholder="Optional"
      />

      <FileUploadController
        name="productImage"
        label="Product Images"
        className="h-[200px] w-[300px]"
      />

      <SubmitButton
        label={isEdit ? "Update Product" : "Create Product"}
        isLoading={isLoading}
      />
    </form>
  );
}
