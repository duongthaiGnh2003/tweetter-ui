import HttpService from "~/config/http-service";
import { CURRENT_USER_LOGIN } from "~/lib/endpoints";

const API = HttpService.getInstance();

export async function getCurrentLogin() {
  const response = await API.get(CURRENT_USER_LOGIN);
  return response;
}
