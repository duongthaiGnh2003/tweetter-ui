import { SignupInput } from "~/app/(auth)/_components/FormRegister";
import { AuthTypes } from "~/components/type";
import HttpService from "~/config/http-service";
import { AUTH_REGISTER, CURRENT_USER_LOGIN } from "~/lib/endpoints";

const API = HttpService.getInstance();

export async function getCurrentLogin() {
  const response = await API.get(CURRENT_USER_LOGIN);
  return response;
}
export async function register(data: SignupInput): Promise<AuthTypes> {
  const res = await API.post<AuthTypes>(AUTH_REGISTER, data);
  return res;
}
