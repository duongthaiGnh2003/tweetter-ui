import { cs } from "date-fns/locale";
import { SignupInput } from "~/app/(auth)/_components/FormRegister";
import { SigninInput } from "~/app/(auth)/_components/Login";
import { AuthTypes, UserType } from "~/components/type";
import HttpService from "~/config/http-service";
import { AUTH_LOGIN, AUTH_REGISTER, CURRENT_USER_LOGIN } from "~/lib/endpoints";

const API = HttpService.getInstance();

export async function getCurrentLogin(): Promise<UserType> {
  const response = await API.get(CURRENT_USER_LOGIN);
  return response;
}
export async function register(data: SignupInput): Promise<AuthTypes> {
  const res = await API.post<AuthTypes>(AUTH_REGISTER, data);
  return res;
}
export async function sigin(data: SigninInput) {
  const res = await API.post<AuthTypes>(AUTH_LOGIN, data);
  return res;
}
