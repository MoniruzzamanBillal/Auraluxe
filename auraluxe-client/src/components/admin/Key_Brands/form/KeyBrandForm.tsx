"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import ControlledTextArea from "@/components/share/input/ControlledTextArea";
import { FileUploadController } from "@/components/share/input/FileUploadController";
import SubmitButton from "@/components/share/SubmitButton";
import { useFormContext } from "react-hook-form";
import { TKeyBrandForm } from "../schema/keyBrand.schema";

interface Props {
  onSubmit: (data: TKeyBrandForm) => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function KeyBrandForm({
  onSubmit,
  isEdit = false,
  isLoading = false,
}: Props) {
  const methods = useFormContext<TKeyBrandForm>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4"
    >
      <ControlledInput
        name="name"
        label="Brand Name"
        placeholder="Enter brand name"
        isRequired
      />

      <ControlledTextArea
        name="description"
        label="Description"
        placeholder="Enter description"
        isRequired
      />

      <FileUploadController
        name="logo"
        label="Brand Logo"
        className="h-[200px] w-[300px]"
      />

      <SubmitButton
        label={isEdit ? "Update Brand" : "Create Brand"}
        isLoading={isLoading}
      />
    </form>
  );
}
