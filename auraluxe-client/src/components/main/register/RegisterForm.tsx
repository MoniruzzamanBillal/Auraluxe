"use client";
import ControlledInput from "@/components/share/input/ControlledInput";
import { FileUploadController } from "@/components/share/input/FileUploadController";
import { Button } from "@/components/ui/button";
import { usePost } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { RegisterFormData, registerSchema } from "./schema/register.schema";

export default function RegisterForm() {
  const router = useRouter();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",

      profileImage: undefined,
    },
  });

  const addMutation = usePost([["user-registration"]]);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    console.log(data);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      //   formData.append("profileImage", data.profileImage);

      const result = await addMutation.mutateAsync({
        url: "/user",
        payload: formData,
      });

      if (result?.success) {
        toast.success(result?.message || "Registration successful!");

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred.");
    }
  };

  const isPending = methods.formState.isSubmitting;

  return (
    <div className="flex min-h-screen flex-1 flex-col items-center justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          href="/"
          className="text-muted-foreground hover:text-lightAltBlue mb-8 inline-flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-blackAltPrimary text-center text-4xl font-bold">
            Welcome Back
          </h1>
          <p className="text-greyAltPrimary text-center text-base">
            Please Enter Your Details
          </p>
        </div>

        {/*========= login form ============*/}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex w-[370px] flex-col justify-center gap-6"
          >
            <ControlledInput
              placeholder="User Name"
              name="name"
              className="  "
              label="User Name"
            />
            <ControlledInput
              placeholder="Email Address"
              type="email"
              name="email"
              className="  "
              label="User Email"
            />
            <FileUploadController
              name="profileImage"
              label="Profile Image"
              className="h-[200px] w-[300px]"
            />
            <ControlledInput
              placeholder="Enter Password"
              name="password"
              type="password"
              className="  "
              label="User Password"
            />
            <div className="mt-1.5 disabled:cursor-not-allowed">
              <Button
                disabled={isPending}
                type="submit"
                className=" bg-brandColor   cursor-pointer rounded-md px-6 py-2.5 text-base font-medium text-white disabled:cursor-not-allowed"
              >
                {isPending ? "Loading..." : "Sign in"}
              </Button>
            </div>
          </form>
        </FormProvider>

        <div className="text-center mt-6   ">
          <a className="right-0 inline-block text-sm font-semibold align-baseline text-gray-900 hover:text-gray-950 dark:text-gray-200  ">
            Already have account ?{" "}
            <span className=" text-blue-700 font-bold cursor-pointer ">
              <Link href={`/login`}>Sign in </Link>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
