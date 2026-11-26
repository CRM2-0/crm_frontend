import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customerApi } from './api/customerApi';

const initialState = {
  items: [],
  pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
  status: 'idle',
  error: null,
};

/** Expected API response: { data: Customer[], meta: { page, limit, total, totalPages } } */
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async ({ page, limit }, { rejectWithValue, signal }) => {
    try {
      return await customerApi.list({ page, limit, signal });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setPage: (state, { payload }) => { state.pagination.page = payload; },
    setLimit: (state, { payload }) => { state.pagination.limit = payload; state.pagination.page = 1; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchCustomers.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.items = payload.data ?? [];
        state.pagination = { ...state.pagination, ...(payload.meta ?? {}) };
      })
      .addCase(fetchCustomers.rejected, (state, { payload, meta }) => {
        if (meta.aborted) { state.status = 'idle'; return; }
        state.status = 'failed';
        state.error = payload ?? 'Unable to load customers.';
      });
  },
});

export const { setPage, setLimit } = customerSlice.actions;
export const selectCustomers = (state) => state.customers.items;
export const selectCustomerPagination = (state) => state.customers.pagination;
export const selectCustomerStatus = (state) => state.customers.status;
export const selectCustomerError = (state) => state.customers.error;
export default customerSlice.reducer;
