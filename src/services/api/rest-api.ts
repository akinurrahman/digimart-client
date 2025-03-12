import apiClient from "./api-client";

const generateApis = (resourcePath: string, version?: string) => {
  const baseURL = `${
    version || process.env.NEXT_PUBLIC_API_VERSION
  }${resourcePath}`;

  const request = async (
    method: "get" | "post" | "patch" | "delete",
    url: string = "",
    data?: object
  ) => {
    const response = await apiClient({ method, url: `${baseURL}${url}`, data });
    return response.data.data;
  };

  return {
    getOne: (id?: string) => request("get", id ? `/${id}` : ""),
    getAll: (query = "") => request("get", query),
    create: (data: object) => request("post", "", data),
    updateOne: (id: string, data: object) => request("patch", `/${id}`, data),
    deleteOne: (id: string) => request("delete", `/${id}`),
  };
};

export default generateApis;
