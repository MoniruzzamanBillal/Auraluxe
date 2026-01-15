"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TPageProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: any;
};

export default function CreateUpdateHomeBanner({
  isOpen,
  onClose,
  initialValues,
}: TPageProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white  w-[90vw] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? "Update Banner" : "Add New Banner"}
          </DialogTitle>
        </DialogHeader>

        {/* <FormProvider {...methods}>
          <FacultyForm
            isEditMode={!!initialValues}
            onSubmit={onSubmit}
            error={error || patchError}
            isPending={isPending}
          />
        </FormProvider> */}

        <div>
          <h1>home banner form </h1>
          <h1>home banner form </h1>
          <h1>home banner form </h1>
          <h1>home banner form </h1>
        </div>
      </DialogContent>
    </Dialog>
  );
}
