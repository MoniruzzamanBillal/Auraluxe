"use client";

import { FileUploadController } from "@/components/share/input/FileUploadController";
import SubmitButton from "@/components/share/SubmitButton";

import ControlledInput from "@/components/share/input/ControlledInput";
import ControlledSelectField from "@/components/share/input/ControlledSelectField";
import { useFormContext } from "react-hook-form";
import { TBrandForm } from "../schema/brand.schema";

interface Props {
  onSubmit: (data: TBrandForm) => void;
  brandTypeOptions: { label: string; value: string }[];
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function BrandForm({
  onSubmit,
  brandTypeOptions,
  isEdit = false,
  isLoading = false,
}: Props) {
  const methods = useFormContext<TBrandForm>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4 max-h-[90vh] "
    >
      <ControlledInput
        name="name"
        label="Brand Name"
        placeholder="Enter brand name"
        isRequired
      />

      <ControlledSelectField
        name="brandTypeId"
        label="Brand Type"
        placeholder="Select brand type"
        options={brandTypeOptions}
        isRequired
      />
      <FileUploadController
        name="logo"
        label="Logo"
        className="h-[200px] w-[300px]"
      />

      <SubmitButton
        label={isEdit ? "Update Brand" : "Create Brand"}
        isLoading={isLoading}
      />
    </form>
  );
}
