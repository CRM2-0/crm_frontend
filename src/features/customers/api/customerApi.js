import httpClient from "@/api/httpClient";
export const customerApi = {
  list: ({ signal, ...params }) =>
    httpClient.get("/customers", { params, signal }),
  create: (payload) => httpClient.post("/customers", payload),
};
