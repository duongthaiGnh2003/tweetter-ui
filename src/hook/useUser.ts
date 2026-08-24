import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { SignupInput } from "~/app/(auth)/_components/FormRegister";
import { SigninInput } from "~/app/(auth)/_components/Login";
import { clearCookie } from "~/config/base-service";
import {
  getCurrentLogin,
  logout,
  register,
  signin,
} from "~/service/AuthServices";

const useSignin = () => {
  return useMutation({
    mutationFn: (data: SigninInput) => signin(data),
    networkMode: "always",
    retryDelay: 3000,
    onSuccess: () => {},
    onError: () => {},
  });
};
const useSignup = () => {
  return useMutation({
    mutationFn: (input: SignupInput) => register(input),
    networkMode: "always",
    retryDelay: 3000,
  });
};
const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["CurrentUser"],
    queryFn: () => getCurrentLogin(),
    networkMode: "always",
    retry: 1,
    retryDelay: 3000,
  });
};

const clearAuthSession = () => {
  clearCookie("token");
  clearCookie("refreshToken");
};

const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),
    networkMode: "always",
    retryDelay: 3000,
    onSettled: () => {
      clearAuthSession();
      queryClient.clear();
      router.replace("/flow/signin");
    },
  });
};

export { useGetCurrentUser, useLogout, useSignup, useSignin };
