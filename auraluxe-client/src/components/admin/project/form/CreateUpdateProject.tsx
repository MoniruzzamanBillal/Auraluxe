"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchData, usePatch, usePost } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { getChangedFields } from "../../../../../utils/getChangedFields";
import {
  projectSchema,
  TProject,
  TProjectForm,
} from "../schema/project.schema";
import ProjectForm from "./ProjectForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: TProject | null;
}

export default function CreateUpdateProject({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<TProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      projectImg: "",
      location: "",
      client: "",
      architects: "",
      website: "",
      facebookLink: "",
      instagramLink: "",
      linkedinLink: "",
      xLink: "",
      description: "",
      projectTypeId: "",
      materialId: "",
    },
  });

  // ✅ Fetch project types for select
  const { data: projectTypeData } = useFetchData(
    ["project-type"],
    "/project-type",
  );

  // ✅ Fetch project types for material type

  const { data: materialTypeData } = useFetchData(["material"], "/material");

  const projectTypeOptions =
    projectTypeData?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const materialTypeOptions =
    materialTypeData?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const {
    mutateAsync,
    reset: postReset,
    isPending: isPostPending,
  } = usePost([["project"]]);

  const {
    mutateAsync: patchAsync,
    reset: patchReset,
    isPending: isPatchPending,
  } = usePatch([["project"]]);

  useEffect(() => {
    if (initialValues) {
      methods.reset({ ...initialValues });
    } else {
      methods.reset({
        projectName: "",
        projectImg: "",
        location: "",
        client: "",
        architects: "",
        website: "",
        facebookLink: "",
        instagramLink: "",
        linkedinLink: "",
        xLink: "",
        description: "",
        projectTypeId: "",
        materialId: "",
      });
    }
  }, [initialValues, methods]);

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        projectName: "",
        projectImg: "",
        location: "",
        client: "",
        architects: "",
        website: "",
        facebookLink: "",
        instagramLink: "",
        linkedinLink: "",
        xLink: "",
        description: "",
        projectTypeId: "",
        materialId: "",
      });
    }
    postReset();
    patchReset();
  }, [isOpen, postReset, patchReset, methods]);

  const onSubmit = async (data: TProjectForm) => {
    console.log("submitted data = ", data);

    try {
      if (initialValues) {
        const changedData = getChangedFields(data, initialValues);

        const formData = new FormData();

        if (changedData?.projectName) {
          formData.append("projectName", changedData?.projectName);
        }

        if (
          changedData?.projectImg &&
          changedData?.projectImg instanceof File
        ) {
          formData.append("file", changedData?.projectImg);
        }

        if (changedData?.location) {
          formData.append("location", changedData?.location);
        }

        if (changedData?.client) {
          formData.append("client", changedData?.client);
        }

        if (changedData?.architects) {
          formData.append("architects", changedData?.architects);
        }

        if (changedData?.website) {
          formData.append("website", changedData?.website);
        }

        if (changedData?.facebookLink) {
          formData.append("facebookLink", changedData?.facebookLink);
        }

        if (changedData?.instagramLink) {
          formData.append("instagramLink", changedData?.instagramLink);
        }

        if (changedData?.linkedinLink) {
          formData.append("linkedinLink", changedData?.linkedinLink);
        }

        if (changedData?.xLink) {
          formData.append("xLink", changedData?.xLink);
        }

        if (changedData?.description) {
          formData.append("description", changedData?.description);
        }
        if (changedData?.materialId) {
          formData.append("materialId", changedData?.materialId);
        }
        if (changedData?.projectTypeId) {
          formData.append("projectTypeId", changedData?.projectTypeId);
        }

        const result = await patchAsync({
          url: `/project/${initialValues.id}`,
          payload: formData,
        });

        if (result?.success) {
          toast.success(result?.message);
          onClose();
        }
        return;
      }

      const formData = new FormData();

      formData.append("projectName", data?.projectName);

      formData.append("file", data?.projectImg);

      formData.append("location", data?.location);

      formData.append("client", data?.client);

      formData.append("architects", data?.architects);

      formData.append("website", data?.website);

      if (data?.facebookLink) {
        formData.append("facebookLink", data?.facebookLink);
      }

      if (data?.instagramLink) {
        formData.append("instagramLink", data?.instagramLink);
      }

      if (data?.linkedinLink) {
        formData.append("linkedinLink", data?.linkedinLink);
      }

      if (data?.xLink) {
        formData.append("xLink", data?.xLink);
      }

      if (data?.description) {
        formData.append("description", data?.description);
      }

      formData.append("projectTypeId", data?.projectTypeId);
      formData.append("materialId", data?.materialId);

      const response = await mutateAsync({
        url: "/project",
        payload: formData,
      });

      if (response?.success) {
        toast.success(response?.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed");
    }
  };

  const isLoading = isPostPending || isPatchPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white  w-full ">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <ProjectForm
            onSubmit={onSubmit}
            projectTypeOptions={projectTypeOptions}
            materialTypeOptions={materialTypeOptions}
            isEdit={!!initialValues}
            isLoading={isLoading}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
