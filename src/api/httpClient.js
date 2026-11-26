import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  withCredentials: true,
});

// The client must not import the Redux store. Features import this client while
// the store is being assembled, so importing the store here creates a cycle.
let getAccessToken = () => null;
let getCompanyId = () => null;
let onUnauthorized = () => {};

export function configureHttpClient({ tokenProvider, companyProvider, unauthorizedHandler }) {
  getAccessToken = tokenProvider;
  getCompanyId = companyProvider;
  onUnauthorized = unauthorizedHandler;
}

httpClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  const companyId = getCompanyId();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (companyId) config.headers['X-Company-Id'] = companyId;
  return config;
});
httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) onUnauthorized();
    return Promise.reject({
      status: error.response?.status,
      message: error.response?.data?.message || "Something went wrong",
    });
  },
);
export default httpClient;
