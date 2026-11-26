import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { leadApi } from "./api/leadApi";

const initialState = {
  items: [],
  pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  filters: {
    search: "",
    dateFrom: "",
    dateTo: "",
    status: "",
    branch: "",
    person: "",
    source: "",
    sortOrder: "desc",
  },
  status: "idle",
  error: null,
  createStatus: "idle",
  createError: null,
};

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (query, { rejectWithValue, signal }) => {
    try {
      const response = await leadApi.list({ ...query, signal });
      const data = Array.isArray(response) ? response : response?.data;
      const meta = response?.meta ?? {};
      return {
        items: Array.isArray(data) ? data : [],
        pagination: {
          page: Number(meta.page ?? query.page),
          limit: Number(meta.limit ?? query.limit),
          total: Number(meta.total ?? data?.length ?? 0),
          totalPages: Number(
            meta.totalPages ??
              Math.ceil((meta.total ?? data?.length ?? 0) / query.limit),
          ),
        },
      };
    } catch (error) {
      return rejectWithValue(error.message ?? "Unable to load leads.");
    }
  },
);

export const createLead = createAsyncThunk(
  "leads/createLead",
  async (payload, { rejectWithValue }) => {
    try {
      return await leadApi.create(payload);
    } catch (error) {
      return rejectWithValue(error.message ?? "Unable to create lead.");
    }
  },
);

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setPage(state, { payload }) {
      state.pagination.page = Math.max(1, Number(payload) || 1);
    },
    setLimit(state, { payload }) {
      state.pagination.limit = Math.max(1, Number(payload) || 10);
      state.pagination.page = 1;
    },
    setFilters(state, { payload }) {
      state.filters = { ...state.filters, ...payload };
      state.pagination.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.items = payload.items;
        state.pagination = payload.pagination;
      })
      .addCase(fetchLeads.rejected, (state, { payload, meta }) => {
        if (meta.aborted) {
          state.status = "idle";
          return;
        }
        state.status = "failed";
        state.error = payload ?? "Unable to load leads.";
      })
      .addCase(createLead.pending, (state) => { state.createStatus = "loading"; state.createError = null; })
      .addCase(createLead.fulfilled, (state) => { state.createStatus = "succeeded"; })
      .addCase(createLead.rejected, (state, { payload }) => { state.createStatus = "failed"; state.createError = payload ?? "Unable to create lead."; });
  },
});

export const { setPage, setLimit, setFilters } = leadSlice.actions;
export const selectLeads = (state) => state.leads.items;
export const selectLeadPagination = (state) => state.leads.pagination;
export const selectLeadFilters = (state) => state.leads.filters;
export const selectLeadStatus = (state) => state.leads.status;
export const selectLeadError = (state) => state.leads.error;
export const selectLeadCreateStatus = (state) => state.leads.createStatus;
export const selectLeadCreateError = (state) => state.leads.createError;
export default leadSlice.reducer;
