"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { useEffect } from "react";
import HomeOurFeaturedForm from "./HomeOurFeaturedForm";

import {
  homeOurFeaturedSchema,
  THomeOurFeatured,
  THomeOurFeaturedForm,
} from "../schema/homeOurFeatured.schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: THomeOurFeatured | null;
}

export default function CreateUpdateHomeOurFeatured({
  isOpen,
  onClose,
  initialValues,
}: Props) {
  const methods = useForm<THomeOurFeaturedForm>({
    resolver: zodResolver(homeOurFeaturedSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        title: initialValues.title,
        description: initialValues.description,
        imageUrl: initialValues.imageUrl,
      });
    }
  }, [initialValues, methods]);

  const onSubmit = (data: THomeOurFeaturedForm) => {
    console.log("Submitted:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white  max-w-4xl overflow-y-auto max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Home Featured" : "Add Home Featured"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <HomeOurFeaturedForm onSubmit={onSubmit} isEdit={!!initialValues} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
