"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import HomeBannerForm from "./HomeBannerForm";
import {
  HomePageBannerSchema,
  THomePageBannerFormData,
} from "./schema/HomeBanner";

type TPageProps = {
  isOpen: boolean;
  onClose: () => void;
  // initialValues?: THomePageBanner;
  initialValues?: any;
};

export default function CreateUpdateHomeBanner({
  isOpen,
  onClose,
  initialValues,
}: TPageProps) {
  const methods = useForm<THomePageBannerFormData>({
    resolver: zodResolver(HomePageBannerSchema),
  });

  useEffect(() => {
    if (!isOpen) {
      methods.reset({
        title: "",
        description: "",
      });
    }
  }, [isOpen, methods]);

  const onSubmit = (data: THomePageBannerFormData) => {
    console.log("clicked!!!!");
    console.log("data = ", data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white   max-w-4xl overflow-y-auto max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Banner" : "Add New Banner"}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <HomeBannerForm
            onSubmit={onSubmit}
            isPending={false}
            isEditMode={initialValues}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
