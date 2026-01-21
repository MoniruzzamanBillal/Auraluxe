import { authService } from "@/services/auth";

import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useAuth = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      console.log("data in useauth = ", data?.data);
      // const encryptedId = encryptData(String(data?.user?._id), "ABC123!@#");
      // const encryptedRoleId = encryptData(String(data.roleId), "ABC123!@#");

      // 🔑 If parentRoleId exists, set adminPermission = true
      // const encryptedAdminPermission = encryptData(
      //   data?.parentRoleId ? "true" : "false",
      //   "ABC123!@#"
      // );

      Cookies.set("accessToken", data?.data?.accessToken, { expires: 1 });
      Cookies.set("refreshToken", data?.data?.refreshToken, { expires: 2 });
      // Cookies.set("userId", encryptedId, { expires: 1 });
      // Cookies.set("roleId", encryptedRoleId, { expires: 1 });
      // Cookies.set("adminPermission", encryptedAdminPermission, { expires: 1 });

      // Set admin cookie if the user is a developer
      // if (data.role === "DEVELOPER") Cookies.set("isAdmin", "true");

      // toast.success(data.message);

      if (data?.user) {
        toast.success("Logged in successfully");
      }

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast.error(error.message);
      throw error;
    },
  });
};

// export const useRegister = (onSuccess?: () => void) => {
//   return useMutation({
//     mutationFn: authService.registration,
//     onSuccess: (data) => {
//       toast.success("Registered successfully!");

//       if (onSuccess) {
//         onSuccess();
//       }
//     },
//     onError: (error: IGenericErrorResponse) => {
//       toast.error(error.message);
//       throw error;
//     },
//   });
// };
