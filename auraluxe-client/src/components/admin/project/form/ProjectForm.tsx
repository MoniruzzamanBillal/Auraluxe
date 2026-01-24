"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import { FileUploadController } from "@/components/share/input/FileUploadController";

import ControlledSelectField from "@/components/share/input/ControlledSelectField";
import ControlledTextEditor from "@/components/share/input/ControlledTextEditor";
import SubmitButton from "@/components/share/SubmitButton";
import { useFormContext } from "react-hook-form";
import { TProjectForm } from "../schema/project.schema";

interface Props {
  onSubmit: (data: TProjectForm) => void;
  projectTypeOptions: { label: string; value: string }[];
  materialTypeOptions: { label: string; value: string }[];

  isEdit?: boolean;
  isLoading?: boolean;
}

export default function ProjectForm({
  onSubmit,
  projectTypeOptions,
  materialTypeOptions,
  isEdit = false,
  isLoading = false,
}: Props) {
  const methods = useFormContext<TProjectForm>();

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className="w-full space-y-4 max-h-[85vh] overflow-y-auto"
    >
      <ControlledInput
        name="projectName"
        label="Project Name"
        placeholder="Enter project name"
        isRequired
      />

      <FileUploadController
        name="projectImg"
        label="Project Image"
        className="h-[200px] w-[300px]"
      />

      <ControlledInput
        name="location"
        label="Location"
        placeholder="Enter location"
        isRequired
      />
      <ControlledInput
        name="client"
        label="Client"
        placeholder="Enter client name"
        isRequired
      />
      <ControlledInput
        name="architects"
        label="Architects"
        placeholder="Enter architects"
        isRequired
      />
      <ControlledInput
        name="website"
        label="Website"
        placeholder="Enter website URL"
        isRequired
      />

      <ControlledInput
        name="facebookLink"
        label="Facebook Link"
        placeholder="Optional"
      />
      <ControlledInput
        name="instagramLink"
        label="Instagram Link"
        placeholder="Optional"
      />
      <ControlledInput
        name="linkedinLink"
        label="LinkedIn Link"
        placeholder="Optional"
      />
      <ControlledInput name="xLink" label="X Link" placeholder="Optional" />

      <ControlledSelectField
        name="projectTypeId"
        label="Project Type"
        options={projectTypeOptions}
        placeholder="Select project type"
        isRequired
      />

      <ControlledSelectField
        name="materialId"
        label="Material Type"
        options={materialTypeOptions}
        placeholder="Select material type"
        isRequired
      />

      {/* <ControlledTextArea
        name="description"
        label="Description"
        placeholder="Optional description"
      /> */}

      <ControlledTextEditor
        name="description"
        label="Description"
        placeholder="Enter project description"
        isRequired
      />

      <SubmitButton
        label={isEdit ? "Update Project" : "Create Project"}
        isLoading={isLoading}
      />
    </form>
  );
}
