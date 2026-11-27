import { useState } from "react";
import { Avatar, Box, Button, Chip, Grid2, Popover, Stack, Tab, Tabs, Typography } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import ReportPanel from "@/components/common/ReportPanel";
import { HorizontalBars } from "@/components/common/BarChart";
import DateComponent from "@/components/form/DateComponent";
import DateCalendar from "@/components/form/DateCalendar";
import DropDown from "@/components/form/DropDown";

const dueCustomers = ["S. Sumathi", "K. Ramesh", "M. Selvan", "P. Kumar", "A. Banu", "R. Devi", "V. Kumar", "J. Anand"];
const arrears = [{ label: "Chennai", value: 32 }, { label: "Salem", value: 27 }, { label: "Trichy", value: 24 }, { label: "Madurai", value: 19 }, { label: "Erode", value: 16 }];

export default function CollectionsPage() {
  const [dueTab, setDueTab] = useState(0);
  const [branch, setBranch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [calendarAnchor, setCalendarAnchor] = useState(null);
  return <>
    <PageHeader title="Collection & Arrears" showHeaderActions />
    <Grid2 container spacing={1.5} className="mb-4">
      <Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Total pending amount" value="₹48L" accent="#d95252" /></Grid2>
      <Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Total current due" value="₹26.7L" /></Grid2>
      <Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Total next due" value="₹26.7L" /></Grid2>
      <Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Total long pending" value="₹13.5L" accent="#d95252" /></Grid2>
    </Grid2>
    <Box className="mb-4 flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-3">
      <DateComponent label="From" name="dateFrom" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} sx={{ width: 165 }} />
      <DateComponent label="To" name="dateTo" value={dateTo} onChange={(event) => setDateTo(event.target.value)} minDate={dateFrom || undefined} sx={{ width: 165 }} />
      <Button variant="outlined" onClick={(event) => setCalendarAnchor(event.currentTarget)}>Calendar</Button>
      <Popover open={Boolean(calendarAnchor)} anchorEl={calendarAnchor} onClose={() => setCalendarAnchor(null)} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}><DateCalendar value={dateTo || dateFrom || undefined} onChange={(date) => { const formatted = date.format("YYYY-MM-DD"); setDateTo(formatted); setCalendarAnchor(null); }} sx={{ width: 310 }} /></Popover>
      <DropDown label="Branch" name="branch" value={branch} onChange={(e) => setBranch(e.target.value)} data={[{ name: "All branches", value: "" }, ...["Chennai", "Salem", "Trichy", "Madurai"].map((value) => ({ name: value, value }))]} valueKey="value" sx={{ minWidth: 145 }} />
      <Button variant="outlined" onClick={() => { setBranch(""); setDateFrom(""); setDateTo(""); }}>Reset filters</Button>
    </Box>
    <Grid2 container spacing={1.5}>
      <Grid2 size={{ xs: 12, md: 5 }}><ReportPanel title="Customers due today & upcoming" action={<Button size="small">View all dues</Button>}>
        <Tabs value={dueTab} onChange={(_, value) => setDueTab(value)} variant="fullWidth" sx={{ mb: 1 }}><Tab label="Current dues" /><Tab label="Next dues" /><Tab label="Arrear dues" /></Tabs>
        <Grid2 container spacing={1}>{dueCustomers.slice(0, 6).map((customer, i) => <Grid2 key={customer} size={{ xs: 6 }}><Box className="flex items-center gap-2 rounded-md border border-slate-100 p-2"><Avatar sx={{ width: 30, height: 30, bgcolor: ["#4caba7", "#c65f5f", "#6a69bd"][i % 3] }}>{customer[0]}</Avatar><Box className="min-w-0"><Typography variant="caption" fontWeight={700} noWrap>{customer}</Typography><Typography display="block" variant="caption" color="text.secondary">Chennai · MFC-01 · ₹8,000</Typography></Box></Box></Grid2>)}</Grid2>
      </ReportPanel></Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}><ReportPanel title="Staff collected vs arrears"><div className="overflow-x-auto"><table className="w-full min-w-[420px] text-left text-sm"><thead><tr className="border-b text-slate-500"><th className="p-2">S.no</th><th className="p-2">Canvasser name</th><th className="p-2">Collected</th><th className="p-2">Arrears</th><th className="p-2">Progress</th></tr></thead><tbody>{["S. Sumathi", "A. Arun", "K. Devi", "R. Kumar", "M. Selvan", "P. Banu"].map((name, i) => <tr key={name} className="border-b border-slate-100"><td className="p-2">{i + 1}</td><td className="p-2">{name}</td><td className="p-2">₹3,00,000</td><td className="p-2">₹6,00,000</td><td className="p-2"><Stack direction="row" alignItems="center" spacing={1}><Box className="h-1.5 w-12 rounded bg-emerald-500" /><Typography variant="caption">50%</Typography></Stack></td></tr>)}</tbody></table></div></ReportPanel>
        <ReportPanel title="Branch wise arrears" className="mt-3"><HorizontalBars items={arrears} /></ReportPanel></Grid2>
      <Grid2 size={12}><ReportPanel title="Follow-up"><Box className="flex gap-2 overflow-x-auto py-1">{dueCustomers.slice(0, 6).map((name) => <Box key={name} className="min-w-48 rounded-md border border-indigo-200 bg-indigo-50 p-3"><Typography variant="caption" fontWeight={700}>{name} · MFC-01</Typography><Typography display="block" variant="caption">Chennai · Today 10:30am · Visit</Typography><Chip className="mt-2" size="small" label="View details" /></Box>)}</Box></ReportPanel></Grid2>
      <Grid2 size={12}><ReportPanel title="Long arrears"><Grid2 container spacing={1}>{dueCustomers.slice(0, 6).map((name) => <Grid2 key={name} size={{ xs: 6, sm: 4, lg: 2 }}><Box className="rounded-md border border-red-200 bg-red-50 p-3"><Typography variant="caption" fontWeight={700}>{name} · MFC-01</Typography><Typography display="block" variant="caption">Installments · 02 · ₹80,000</Typography><Button size="small" color="error">Contact</Button></Box></Grid2>)}</Grid2></ReportPanel></Grid2>
    </Grid2>
  </>;
}
