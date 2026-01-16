"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import SubmitButton from "@/components/share/SubmitButton";
import { useFormContext } from "react-hook-form";
import { TCategoryForm } from "../schema/category.schema";

interface Props {
  onSubmit: (data: TCategoryForm) => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function CategoryForm({
  onSubmit,
  isEdit = false,
  isLoading = false,
}: Props) {
  const methods = useFormContext<TCategoryForm>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4 bg-white "
    >
      <ControlledInput
        name="name"
        label="Category Name"
        placeholder="Enter category name"
        isRequired
      />

      <SubmitButton
        label={isEdit ? "Update Category" : "Create Category"}
        isLoading={isLoading}
      />
    </form>
  );
}
