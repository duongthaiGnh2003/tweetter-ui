import { useMutation, useQuery } from "@tanstack/react-query";

import { SignupInput } from "~/app/(auth)/_components/FormRegister";
import { SigninInput } from "~/app/(auth)/_components/Login";
import { getCurrentLogin, register, sigin } from "~/service/AuthServices";

const useSignin = () => {
  return useMutation({
    mutationFn: (data: SigninInput) => sigin(data),
    networkMode: "always",
    retryDelay: 3000,
    onSuccess: () => {},
    onError: () => {},
  });
};
const useSigup = () => {
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

export { useGetCurrentUser, useSigup, useSignin };
