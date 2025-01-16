import queryString from "query-string";

type ApiResponse = Promise<any>;
type RequestParams = {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  hasToken?: string;
  body?: any;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
};

export const API_BASE_URL = import.meta.env.VITE_URL_API;

export const sendRequest = async ({
  url,
  method,
  hasToken,
  body,
  headers = {},
  queryParams = {},
}: RequestParams): ApiResponse => {
  const bearerToken = hasToken ? `Bearer ${hasToken}` : "";
  const options: RequestInit = {
    method: method,
    headers: new Headers({
      Authorization: bearerToken,
      ...headers,
    }),
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
  };

  if (Object.keys(queryParams).length > 0) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  const baseURL = API_BASE_URL + url;

  return fetch(baseURL, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((json) => {
        return Promise.reject({
          status: res.status,
          ok: false,
          message: json.message,
          body: json,
        });
      });
    }
  });
};
