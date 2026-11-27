import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { Box, Button } from "@mui/material";
import DateComponent from "@/components/form/DateComponent";
import DropDown from "@/components/form/DropDown";

const emptyFilters = { search: "", dateFrom: "", dateTo: "", status: "", branch: "", person: "", source: "", sortOrder: "desc" };

export default function LeadFilters({ filters, onChange }) {
  const update = (field) => (event) => onChange({ ...filters, [field]: event.target.value });
  const reset = () => onChange(emptyFilters);
  return (
    <Box className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-3">
      <DateComponent label="From" name="dateFrom" value={filters.dateFrom} onChange={update("dateFrom")} size="small" sx={{ width: { xs: "calc(50% - 4px)", sm: 150 } }} />
      <DateComponent label="To" name="dateTo" value={filters.dateTo} onChange={update("dateTo")} size="small" sx={{ width: { xs: "calc(50% - 4px)", sm: 150 } }} />
      <DropDown label="Status" name="status" value={filters.status} onChange={update("status")} data={["", "PENDING", "IN_PROGRESS", "CONVERTED", "LOST", "NEW"].map((value, index) => ({ value, name: ["All status", "Pending", "In progress", "Converted", "Lost", "New"][index] }))} valueKey="value" sx={{ minWidth: 120 }} />
      <DropDown label="Branch" name="branch" value={filters.branch} onChange={update("branch")} data={[{ name: "All branches", value: "" }, ...["Chennai", "Salem", "Trichy", "Coimbatore", "Madurai"].map((value) => ({ value, name: value }))]} valueKey="value" sx={{ minWidth: 130 }} />
      <DropDown label="Sales person" name="person" value={filters.person} onChange={update("person")} data={[{ name: "All people", value: "" }, ...["A. Arun", "S. Devi", "M. Selvan"].map((value) => ({ value, name: value }))]} valueKey="value" sx={{ minWidth: 140 }} />
      <DropDown label="Source" name="source" value={filters.source} onChange={update("source")} data={[{ name: "All sources", value: "" }, ...["Canvasser", "Referral", "Digital", "Walk-in", "Entity customer"].map((value) => ({ value, name: value }))]} valueKey="value" sx={{ minWidth: 130 }} />
      <Button variant="outlined" size="small" startIcon={<FilterListOutlinedIcon />} onClick={() => onChange({ ...filters, sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" })}>{filters.sortOrder === "asc" ? "Low to High" : "High to Low"}</Button>
      <Button variant="text" size="small" startIcon={<CalendarMonthOutlinedIcon />} onClick={reset}>Reset filters</Button>
    </Box>
  );
}
