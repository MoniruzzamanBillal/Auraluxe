"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import ControlledTextArea from "@/components/share/input/ControlledTextArea";
import SubmitButton from "@/components/share/SubmitButton";
import { useFormContext } from "react-hook-form";
import { TProjectTypeForm } from "../schema/projectType.schema";

interface Props {
  onSubmit: (data: TProjectTypeForm) => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function ProjectTypeForm({
  onSubmit,
  isEdit = false,
  isLoading = false,
}: Props) {
  const methods = useFormContext<TProjectTypeForm>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4"
    >
      <ControlledInput
        name="name"
        label="Project Type Name"
        placeholder="Enter project type name"
        isRequired
      />

      <ControlledTextArea
        name="description"
        label="Description"
        placeholder="Enter description"
        isRequired
      />

      <SubmitButton
        label={isEdit ? "Update Project Type" : "Create Project Type"}
        isLoading={isLoading}
      />
    </form>
  );
}
