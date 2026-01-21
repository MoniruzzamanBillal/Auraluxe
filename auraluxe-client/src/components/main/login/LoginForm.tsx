"use client";

import ControlledInput from "@/components/share/input/ControlledInput";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoginFormData, loginSchema } from "./schema/loginSchema";

export default function LoginForm() {
  const router = useRouter();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: login, isPending } = useAuth();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login(data)
      .then((res) => {
        console.log("login result = ", res);

        toast.success(res?.message);

        if (res?.success) {
          router.push("/");
        }
      })
      .catch((error) => {
        console.log("login error = ", error);
        toast.error(error?.message);
      });
  };

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

      <div className="flex flex-col gap-8">
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
              placeholder="Email Address"
              type="email"
              name="email"
              className="  "
            />
            <ControlledInput
              placeholder="Enter Password"
              name="password"
              type="password"
              className="  "
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
      </div>
    </div>
  );
}
