"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import ControlledTextArea from "@/components/share/input/ControlledTextArea";
import SubmitButton from "@/components/share/SubmitButton";
import { useFormContext } from "react-hook-form";
import { TBrandTypeForm } from "../schema/brandType.schema";

interface Props {
  onSubmit: (data: TBrandTypeForm) => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function BrandTypeForm({
  onSubmit,
  isEdit = false,
  isLoading = false,
}: Props) {
  const methods = useFormContext<TBrandTypeForm>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4"
    >
      <ControlledInput
        name="name"
        label="Brand Type Name"
        placeholder="Enter brand type name"
        isRequired
      />

      <ControlledTextArea
        name="description"
        label="Description"
        placeholder="Enter description"
        isRequired
      />

      <SubmitButton
        label={isEdit ? "Update Brand Type" : "Create Brand Type"}
        isLoading={isLoading}
      />
    </form>
  );
}
