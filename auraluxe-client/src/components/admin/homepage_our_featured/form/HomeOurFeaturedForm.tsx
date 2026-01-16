"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import { FileUploadController } from "@/components/share/input/FileUploadController";
import SubmitButton from "@/components/share/SubmitButton";
import { useFormContext } from "react-hook-form";
import { THomeOurFeaturedForm } from "../schema/homeOurFeatured.schema";

interface Props {
  onSubmit: (data: THomeOurFeaturedForm) => void;
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function HomeOurFeaturedForm({
  onSubmit,
  isEdit = false,
  isLoading = false,
}: Props) {
  const methods = useFormContext<THomeOurFeaturedForm>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4 max-h-[80vh]"
    >
      <ControlledInput
        name="title"
        label="Title"
        placeholder="Enter title"
        isRequired
      />

      <ControlledInput
        name="description"
        label="Description"
        placeholder="Enter description"
        isRequired
      />

      <FileUploadController
        name="imageUrl"
        label="Featured Image"
        className="h-[200px] w-[300px]"
      />

      <SubmitButton
        label={isEdit ? "Update Featured" : "Create Featured"}
        isLoading={isLoading}
      />
    </form>
  );
}
