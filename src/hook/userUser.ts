import { useMutation, useQuery } from "@tanstack/react-query";

import { SignupInput } from "~/app/(auth)/_components/FormRegister";
import { getCurrentLogin, register } from "~/service/AuthServices";

// const useSignin = () => {
//   return useMutation({
//     mutationFn: () => {
//       return "";
//     },
//     networkMode: "always",
//     retryDelay: 3000,
//     onSuccess: () => {},
//     onError: () => {},
//   });
// };
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

export { useGetCurrentUser, useSigup };
