import { createSlice } from "@reduxjs/toolkit";
import { demoCompanies } from "@/constants/companies";

const tenancySlice = createSlice({
  name: "tenancy",
  initialState: {
    companies: demoCompanies,
    activeCompanyId: demoCompanies[0].id,
  },
  reducers: {
    setActiveCompany: (state, { payload }) => {
      state.activeCompanyId = payload;
    },
  },
});

export const { setActiveCompany } = tenancySlice.actions;
export const selectCompanies = (state) => state.tenancy.companies;
export const selectActiveCompanyId = (state) => state.tenancy.activeCompanyId;
export const selectActiveCompany = (state) =>
  state.tenancy.companies.find(
    (company) => company.id === state.tenancy.activeCompanyId,
  ) ?? null;
export default tenancySlice.reducer;
