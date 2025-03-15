import apiClient from "./api-client";

const generateApis = (resourcePath: string, version?: string) => {
  const baseURL = `${version || process.env.NEXT_PUBLIC_API_VERSION}${resourcePath}`;

  const request = async (
    method: "get" | "post" | "patch" | "delete",
    url: string = "",
    data?: object
  ) => {
    try {
      const response = await apiClient({
        method,
        url: `${baseURL}${url}`,
        data,
      });
      return response.data ?? null;
    } catch (error) {
      throw error; // React Query will catch this
    }
  };

  return {
    getOne: (id?: string) => request("get", id ? `/${id}` : ""),
    getAll: (query = "") => request("get", query),
    create: (data: object) => request("post", "", data),
    createOne: (id: string, data: object) => request("post", `/${id}`, data),
    updateOne: (id: string, data: object) => request("patch", `/${id}`, data),
    deleteOne: (id: string) => request("delete", `/${id}`),
  };
};

export default generateApis;
