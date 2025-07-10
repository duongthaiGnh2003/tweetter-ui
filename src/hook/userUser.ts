import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentLogin } from "~/service/AuthServices";

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
const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["CurrentUser"],
    queryFn: () => getCurrentLogin(),
    networkMode: "always",
    retry: 1,
    retryDelay: 3000,
  });
};

export { useGetCurrentUser };
