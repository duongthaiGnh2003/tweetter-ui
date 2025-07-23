import FetchApi, {
  DefaultApiConfig,
  isUrl,
  RequestOptionsWithUrl,
} from "./base-service";

type ConfigType = Omit<DefaultApiConfig, "baseUrl"> & {
  baseUrl: string;
};
export default class HttpService extends FetchApi {
  constructor(config: ConfigType, initialToken?: string) {
    super({ ...config, headers: { ...config.headers } }, initialToken);

    this.baseUrl = "http://localhost:4000";
    this.addCustomRouteHandler();
  }
  static getInstance(config?: ConfigType, initialToken?: string): HttpService {
    config = config ?? ({ baseUrl: "http://localhost:4000" } as ConfigType);

    return new HttpService(config, initialToken);
  }

  addCustomRouteHandler() {
    this.addRequestInterceptor(async (options: RequestOptionsWithUrl) => {
      const originalUrl = options.url ?? "";
      // let urlObj: URL;

      // if (isUrl(originalUrl)) {
      //   urlObj = new URL(originalUrl);
      // } else {
      //   urlObj = new URL(originalUrl, this.baseUrl);
      // }

      //   const urlPathname = urlObj.pathname
      //   const normalizedPathname = urlPathname.replace(/^\/api\/v1/, '')

      //   // Check if the normalized pathname is in ROUTE_DICT
      //   if ([...ROUTE_DICT].some((route) => normalizedPathname.startsWith(route))) {
      //       const newPathname =
      //           process.env.NODE_ENV === 'production' ? `/backend${normalizedPathname}` : `${normalizedPathname}`
      //       urlObj.pathname = newPathname
      //       options.url = urlObj.href
      //   } else {
      //       const newPathname =
      //           process.env.NODE_ENV === 'production'
      //               ? `/backend${PREFIX_ENDPOINT}${normalizedPathname}`
      //               : `${PREFIX_ENDPOINT}${normalizedPathname}`
      //       urlObj.pathname = newPathname
      //       options.url = urlObj.href
      //   }

      if (options.url!.includes("/file") && options.body instanceof FormData) {
        // Remove manual setting of Content-Type to allow automatic boundary calculation
        if (options.headers) {
          const headers = options.headers as Record<string, string>;
          delete headers["Content-Type"];
        }
      }
    });
  }
}
