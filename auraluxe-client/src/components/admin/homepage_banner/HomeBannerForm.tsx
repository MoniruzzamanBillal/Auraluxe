"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import ControlledTextArea from "@/components/share/input/ControlledTextArea";
import { FileUploadController } from "@/components/share/input/FileUploadController";
import SubmitButton from "@/components/share/SubmitButton";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { THomePageBannerFormData } from "./schema/HomeBanner";

export default function HomeBannerForm({
  isEditMode = false,
  onSubmit,
  isPending = false,
}: {
  isEditMode?: boolean;
  onSubmit: (data: THomePageBannerFormData) => void;

  isPending?: boolean;
}) {
  const methods = useFormContext<THomePageBannerFormData>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4 max-h-[80vh]"
    >
      {/* ===== Title ===== */}
      <ControlledInput
        name="title"
        placeholder="Enter banner title..."
        label="Title"
        isRequired
      />

      {/* ===== Description ===== */}
      <ControlledTextArea
        name="description"
        placeholder="Enter short description..."
        label="Description"
        isRequired
      />

      {/* ===== Banner Image ===== */}
      <div className="flex flex-col gap-y-2">
        <Label htmlFor="bannerImage">Banner Image</Label>
        <FileUploadController
          name="bannerImage"
          label="Upload banner image (JPEG, JPG, PNG)"
          className="h-[200px] w-[300px]"
        />
      </div>

      {/* ===== Submit Button ===== */}

      <SubmitButton
        isLoading={isPending}
        label={isEditMode ? "Update Banner" : "Add Banner"}
      />
    </form>
  );
}
