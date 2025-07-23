export interface ResponseErrorType<T = any> extends Error {
  response: T;
  statusCode: number;
  api: string;
}

class ResponseError<T = any> extends Error implements ResponseErrorType<T> {
  response: T;
  statusCode: number;
  api: string;

  constructor(message: string, res: T, statusCode: number, api: string) {
    super(message);
    this.response = res;
    this.statusCode = statusCode;
    this.api = api;
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

export type DefaultApiConfig = {
  baseUrl: string;
  headers?: HeadersInit;
};
interface NextFetchRequestConfig {
  next?:
    | {
        revalidate?: number | false;
        tags?: string[];
      }
    | undefined;
}

export type RequestOptionsWithUrl = RequestInit & {
  url?: string;
} & NextFetchRequestConfig & { baseURL?: string };

type RequestInterceptor = (options: RequestOptionsWithUrl) => Promise<void>;
type ResponseInterceptor = (data: any) => Promise<any>;

//Omit<RequestInit, 'body'> :: lấy toàn bô type và bỏ cai body
export type RequestOptions = Omit<RequestInit, "body"> &
  NextFetchRequestConfig & {
    baseURL?: string;
  };

export const setCookie = ({ name, value }: { name: string; value: string }) => {
  document.cookie = `${name}=${value}; path=/; HttpOnly Secure`;
};

export const getCookie = (name: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};

export function clearCookie(name: string = "token") {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export default class FetchApi {
  // instance:FetchApi
  protected baseUrl: string;
  private headers: HeadersInit;
  private requestInterceptors: RequestInterceptor[];
  responseInterceptors: ResponseInterceptor[];

  constructor(config: DefaultApiConfig, initialToken?: string) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers || [];
    this.requestInterceptors = [];
    this.responseInterceptors = [];

    this.setAuthorizationToken(initialToken || this.getCookieToken);
  }
  get isClient() {
    return typeof Window !== "undefined";
  }
  get getCookieToken() {
    if (this.isClient) {
      const token = getCookie("token");

      if (token) return token;
    }
    return "";
  }
  setAuthorizationToken(token: string) {
    if (!token) return;
    if (this.isClient) {
      setCookie({ name: "token", value: token }); // Set token to cookie if in client-side environment
    }
  }

  delAuthorizationToken() {
    if (this.isClient) clearCookie("token");
  }

  async setBaseUrl(newBaseUrl: string, _endpoint?: string): Promise<void> {
    this.baseUrl = newBaseUrl;
  }

  async fetchData(endpoint: string, options: RequestOptionsWithUrl = {}) {
    try {
      const isFormData = options.body instanceof FormData;

      const requestOptions: RequestOptionsWithUrl = {
        ...options,
        headers: {
          ...this.headers,
          ...(options?.headers || {}),
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          Accept: "application/json",
          // Authorization: this.getCookieToken
          //   ? `Bearer ${this.getCookieToken}`
          //   : "",
        },
        body: isFormData
          ? options.body
          : options?.body
          ? JSON.stringify(options.body)
          : undefined,
        next: {
          revalidate: false,
          ...options?.next,
        },
        credentials: "include",
        cache: "no-cache",
      };

      if (options.baseURL) await this.setBaseUrl(options.baseURL, endpoint);

      const api = isUrl(endpoint)
        ? endpoint
        : `${
            this.baseUrl.replace(/\/$/, "") + "/" + endpoint.replace(/^\//, "")
          }`;

      requestOptions.url = api;

      for (const interceptor of this.requestInterceptors) {
        await interceptor(requestOptions);
      }

      const response = await fetch(
        requestOptions.url as string,
        requestOptions
      );

      await this.handleErrors(response, options);

      if (response.status === 204) {
        return null;
      }

      const contentType = response.headers.get("Content-Type");

      if (!contentType || !contentType.includes("application/json")) {
        throw new ResponseError(
          `Invalid response format: Expected JSON but received ${
            contentType || "unknown format"
          }`,
          null,
          response.status,
          requestOptions.url
        );
      }

      let responseData = await response.json();

      for (const interceptor of this.responseInterceptors) {
        responseData = await interceptor(responseData);
      }

      return responseData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async handleErrors(response: Response, _options: RequestOptionsWithUrl = {}) {
    if (!response.ok) {
      if (response.status === 401) {
        await this.delAuthorizationToken();
        if (this.isClient && window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }

      const contentType = response.headers.get("Content-Type");

      // If not JSON response, throw error server error
      if (!contentType || !contentType.includes("application/json")) {
        throw new ResponseError(
          `Invalid response format: Expected JSON but received ${
            contentType || "unknown format"
          }`,
          null,
          response.status,
          response.url
        );
      }

      // If JSON response, parse and throw error
      const errorData = await response.json();
      const api = response.url;
      const status =
        errorData.status || errorData.statusCode || response.status;
      const errorCode =
        errorData?.error?.code || errorData?.errorCode || "Response Error";
      const errorMessage =
        errorData?.error?.message ||
        errorData?.message ||
        response?.statusText ||
        "Unknown error";

      const message = `Status: ${status}\nCode: ${errorCode}\nMessage: ${errorMessage}\nAPI: ${api}`;

      throw new ResponseError(message, errorData, status, api);
    }
  }

  async get(
    endpoint: string,
    params:
      | { [key: string]: string | string[] | number | undefined }
      | string
      | null = null,
    options: RequestOptions = {}
  ) {
    if (params) {
      endpoint +=
        typeof params === "string"
          ? `?${params}`
          : `?${encodeQueryUrl(params)}`;
    }
    return this.fetchData(endpoint, { ...options, method: "GET" });
  }
  async post<T>(
    endpoint: string,
    data: any = {},
    options: RequestOptions = {}
  ): Promise<T> {
    return this.fetchData(endpoint, {
      ...options,
      method: "POST",
      body: data,
    });
  }
  async patch<T>(
    endpoint: string,
    data: any = {},
    options: RequestOptions = {}
  ): Promise<T> {
    return this.fetchData(endpoint, {
      ...options,
      method: "PATCH",
      body: data,
    });
  }

  async put<T>(
    endpoint: string,
    data: any = {},
    options: RequestOptions = {}
  ): Promise<T> {
    return this.fetchData(endpoint, {
      ...options,
      method: "PUT",
      body: data,
    });
  }

  async delete<T>(
    endpoint: string,
    data: any = {},
    options: RequestOptions = {}
  ): Promise<T> {
    return this.fetchData(endpoint, {
      ...options,
      method: "DELETE",
      body: data,
    });
  }

  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }
}

export function isUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
}
export function encodeQueryUrl(params: {
  [key: string]: string | number | string[] | undefined;
}): string {
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (value === undefined) return "";
      if (Array.isArray(value)) {
        return value
          .map((val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter((param) => param.length > 0)
    .join("&");
  return queryString;
}
