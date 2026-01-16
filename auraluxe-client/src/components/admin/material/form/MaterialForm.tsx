"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import ControlledTextArea from "@/components/share/input/ControlledTextArea";
import SubmitButton from "@/components/share/SubmitButton";
import { useFormContext } from "react-hook-form";
import { TMaterialForm } from "../schema/material.schema";

interface Props {
  onSubmit: (data: TMaterialForm) => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function MaterialForm({
  onSubmit,
  isEdit = false,
  isLoading = false,
}: Props) {
  const methods = useFormContext<TMaterialForm>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4"
    >
      <ControlledInput
        name="name"
        label="Material Name"
        placeholder="Enter material name"
        isRequired
      />

      <ControlledTextArea
        name="description"
        label="Description"
        placeholder="Enter description"
        isRequired
      />

      <SubmitButton
        label={isEdit ? "Update Material" : "Create Material"}
        isLoading={isLoading}
      />
    </form>
  );
}
