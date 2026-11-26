import httpClient from "@/api/httpClient";

export const leadApi = {
  list: ({ signal, ...params }) =>
    httpClient.get("/leads", { params, signal }),
  create: (payload) => httpClient.post("/leads", payload),
};
