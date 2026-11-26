import { configureStore } from '@reduxjs/toolkit';
import authReducer, { signOut } from '@/features/auth/authSlice';
import customersReducer from '@/features/customers/customerSlice';
import tenancyReducer from '@/features/tenancy/tenancySlice';
import leadsReducer from '@/features/leads/leadSlice';
import { configureHttpClient } from '@/api/httpClient';

export const store = configureStore({
  reducer: { auth: authReducer, customers: customersReducer, tenancy: tenancyReducer, leads: leadsReducer },
  devTools: import.meta.env.DEV,
});

configureHttpClient({
  tokenProvider: () => store.getState().auth.token,
  companyProvider: () => store.getState().tenancy.activeCompanyId,
  unauthorizedHandler: () => store.dispatch(signOut()),
});
