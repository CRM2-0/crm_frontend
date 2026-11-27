import { useMemo, useState } from "react";
import { Button, Chip, Grid2 } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import TableComponent from "@/components/table/TableComponent";
import DateComponent from "@/components/form/DateComponent";
import DropDown from "@/components/form/DropDown";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const renewals = [
  { id: 1, customer: "S. Sumathi", chit: "MCSK/2025/0002", branch: "Chennai", maturity: "30 Nov 2026", value: "₹10,00,000", phone: "+91 98765 67890", status: "Interested" },
  { id: 2, customer: "A. Selvan", chit: "MFC/2024/0021", branch: "Salem", maturity: "04 Dec 2026", value: "₹5,00,000", phone: "+91 98765 65432", status: "Contact pending" },
  { id: 3, customer: "K. Ramesh", chit: "MCSK/2025/0015", branch: "Chennai", maturity: "15 Dec 2026", value: "₹10,00,000", phone: "+91 98765 45678", status: "Renewed" },
  { id: 4, customer: "P. Kumar", chit: "MFC/2024/0038", branch: "Trichy", maturity: "28 Dec 2026", value: "₹2,50,000", phone: "+91 98765 54678", status: "Contact pending" },
  { id: 5, customer: "R. Devi", chit: "MFC/2024/0011", branch: "Madurai", maturity: "08 Jan 2027", value: "₹5,00,000", phone: "+91 98765 62587", status: "Interested" },
  { id: 6, customer: "M. Lakshmi", chit: "MCSK/2024/0021", branch: "Salem", maturity: "12 Jan 2027", value: "₹10,00,000", phone: "+91 98765 61128", status: "Contact pending" },
  { id: 7, customer: "V. Prakash", chit: "MFC/2024/0014", branch: "Trichy", maturity: "18 Jan 2027", value: "₹2,50,000", phone: "+91 98765 60314", status: "Interested" },
  { id: 8, customer: "J. Meena", chit: "MCSK/2024/0011", branch: "Chennai", maturity: "24 Jan 2027", value: "₹5,00,000", phone: "+91 98765 64321", status: "Renewed" },
  { id: 9, customer: "D. Arjun", chit: "MFC/2024/0018", branch: "Madurai", maturity: "02 Feb 2027", value: "₹10,00,000", phone: "+91 98765 67452", status: "Contact pending" },
  { id: 10, customer: "R. Kavitha", chit: "MCSK/2024/0030", branch: "Salem", maturity: "09 Feb 2027", value: "₹5,00,000", phone: "+91 98765 69841", status: "Interested" },
  { id: 11, customer: "T. Suresh", chit: "MFC/2024/0022", branch: "Trichy", maturity: "16 Feb 2027", value: "₹2,50,000", phone: "+91 98765 63210", status: "Renewed" },
  { id: 12, customer: "P. Nandhini", chit: "MCSK/2024/0016", branch: "Chennai", maturity: "23 Feb 2027", value: "₹10,00,000", phone: "+91 98765 61945", status: "Contact pending" },
];

export default function RenewalsPage() {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const rows = useMemo(() => renewals.filter((row) => {
    const maturity = dayjs(row.maturity, "DD MMM YYYY", true);
    return (!status || row.status === status) && (!dateFrom || !maturity.isBefore(dayjs(dateFrom), "day")) && (!dateTo || !maturity.isAfter(dayjs(dateTo), "day"));
  }), [status, dateFrom, dateTo]);
  const columns = [
    { key: "customer", label: "Customer" }, { key: "chit", label: "Chit ID" }, { key: "branch", label: "Branch" },
    { key: "maturity", label: "Maturity date" }, { key: "value", label: "Chit value" }, { key: "phone", label: "Mobile number" },
    { key: "status", label: "Status", render: (row) => <Chip size="small" label={row.status} color={row.status === "Renewed" ? "success" : row.status === "Interested" ? "info" : "warning"} /> },
    { key: "action", label: "Action", render: () => <Button size="small" variant="outlined">Follow up</Button> },
  ];
  return <>
    <PageHeader title="Renewal & Customer Retention" showHeaderActions />
    <Grid2 container spacing={1.5} className="mb-4"><Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Maturing in 30 days" value="186" /></Grid2><Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Renewal opportunities" value="124" accent="#efbd73" /></Grid2><Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Renewed this month" value="78" accent="#27866b" /></Grid2><Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="At risk" value="18" accent="#d95252" /></Grid2></Grid2>
    <div className="mb-4 flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-3"><DropDown label="Renewal status" name="status" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} data={[{ name: "All statuses", value: "" }, ...["Interested", "Contact pending", "Renewed"].map((value) => ({ name: value, value }))]} valueKey="value" sx={{ minWidth: 170 }} /><DateComponent label="Maturity from" name="dateFrom" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} /><DateComponent label="Maturity to" name="dateTo" value={dateTo} minDate={dateFrom || undefined} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} /></div>
    <TableComponent columns={columns} data={rows} initialDataCount={rows.length} page={page} pageSize={6} onPageChange={setPage} emptyMessage="No renewal opportunities found." minWidth={900} />
  </>;
}
