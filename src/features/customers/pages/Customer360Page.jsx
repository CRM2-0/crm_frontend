import { useMemo, useState } from "react";
import { Avatar, Box, Button, Chip, Dialog, DialogContent, DialogTitle, Grid2, Paper, Stack, Typography } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import InputComponent from "@/components/form/InputComponent";
import DropDown from "@/components/form/DropDown";
import RangeSlider from "@/components/form/RangeSlider";
import PageNumberPagination from "@/components/table/PageNumberPagination";

const people = [
  { id: 1, name: "S. Sumathi", branch: "Chennai", chit: "MCSK/2025/0002", value: "₹10,00,000", duration: "50 Months", monthly: "₹20,000", due: "22 Sep 2026", lot: "MFC-01", canvasser: "A. Arun", status: "Active", prize: true },
  { id: 2, name: "A. Selvan", branch: "Salem", chit: "MCSK/2026/0004", value: "₹5,00,000", duration: "40 Months", monthly: "₹12,500", due: "18 Dec 2026", lot: "MFC-12", canvasser: "S. Devi", status: "Active", prize: false },
  { id: 3, name: "K. Ramesh", branch: "Chennai", chit: "MFC/2025/0015", value: "₹10,00,000", duration: "50 Months", monthly: "₹20,000", due: "05 Jan 2027", lot: "MFC-03", canvasser: "M. Selvan", status: "Active", prize: true },
  { id: 4, name: "P. Kumar", branch: "Trichy", chit: "MFC/2026/0008", value: "₹2,50,000", duration: "25 Months", monthly: "₹10,000", due: "12 Feb 2027", lot: "MFC-07", canvasser: "A. Arun", status: "Pending", prize: false },
  { id: 5, name: "R. Devi", branch: "Madurai", chit: "MCSK/2025/0018", value: "₹5,00,000", duration: "40 Months", monthly: "₹12,500", due: "30 Nov 2026", lot: "MFC-08", canvasser: "K. Devi", status: "Active", prize: true },
  { id: 6, name: "M. Selvan", branch: "Salem", chit: "MFC/2026/0021", value: "₹10,00,000", duration: "50 Months", monthly: "₹20,000", due: "16 Mar 2027", lot: "MFC-11", canvasser: "S. Devi", status: "Active", prize: false },
  { id: 7, name: "V. Prakash", branch: "Trichy", chit: "MCSK/2025/0023", value: "₹2,50,000", duration: "25 Months", monthly: "₹10,000", due: "08 Dec 2026", lot: "MFC-14", canvasser: "K. Devi", status: "Active", prize: false },
  { id: 8, name: "J. Meena", branch: "Chennai", chit: "MFC/2026/0030", value: "₹5,00,000", duration: "40 Months", monthly: "₹12,500", due: "14 Jan 2027", lot: "MFC-16", canvasser: "A. Arun", status: "Active", prize: true },
  { id: 9, name: "D. Arjun", branch: "Madurai", chit: "MCSK/2025/0031", value: "₹10,00,000", duration: "50 Months", monthly: "₹20,000", due: "02 Feb 2027", lot: "MFC-18", canvasser: "M. Selvan", status: "Pending", prize: false },
  { id: 10, name: "R. Kavitha", branch: "Salem", chit: "MFC/2025/0019", value: "₹5,00,000", duration: "40 Months", monthly: "₹12,500", due: "21 Dec 2026", lot: "MFC-20", canvasser: "S. Devi", status: "Active", prize: true },
  { id: 11, name: "T. Suresh", branch: "Trichy", chit: "MCSK/2026/0013", value: "₹2,50,000", duration: "25 Months", monthly: "₹10,000", due: "19 Mar 2027", lot: "MFC-22", canvasser: "K. Devi", status: "Active", prize: false },
  { id: 12, name: "P. Nandhini", branch: "Chennai", chit: "MFC/2025/0027", value: "₹10,00,000", duration: "50 Months", monthly: "₹20,000", due: "27 Jan 2027", lot: "MFC-24", canvasser: "A. Arun", status: "Active", prize: true },
];

export default function Customer360Page() {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [chitValueRange, setChitValueRange] = useState([0, 10]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => people.filter((p) => {
    const chitValue = Number(String(p.value).replace(/[^\d.]/g, "")) / 100000;
    return (!branch || p.branch === branch) && chitValue >= chitValueRange[0] && chitValue <= chitValueRange[1] && `${p.name} ${p.chit}`.toLowerCase().includes(search.toLowerCase());
  }), [branch, search, chitValueRange]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / 6));
  const currentPage = Math.min(page, totalPages);
  return <>
    <PageHeader title="Customer 360° View" action={<Button href="/customer-360/family-chit" variant="outlined">Family chit</Button>} showHeaderActions />
    <Grid2 container spacing={1.5} className="mb-4">{[["Total customers", "48,712"], ["Active customers", "48,712"], ["Closed customers", "8,712"], ["Prize win customers", "4,712"]].map(([label, value]) => <Grid2 key={label} size={{ xs: 6, md: 3 }}><MetricCard label={label} value={value} /></Grid2>)}</Grid2>
    <Box className="mb-4 flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-3">
      <InputComponent size="small" label="Search name or chit ID" value={search} onChange={(e) => setSearch(e.target.value)} maxLength={100} sx={{ minWidth: 220 }} />
      <DropDown label="Branch" name="branch" value={branch} onChange={(e) => setBranch(e.target.value)} data={[{ name: "All branches", value: "" }, ...[...new Set(people.map((p) => p.branch))].map((value) => ({ name: value, value }))]} valueKey="value" sx={{ minWidth: 160 }} />
      <Box className="min-w-64 flex-1"><RangeSlider rangeLabel="Chit value (₹ lakhs)" min={0} max={10} step={0.5} unit="L" sliderValue={chitValueRange} onChange={(_, range) => setChitValueRange(range)} /></Box>
      <Button onClick={() => { setBranch(""); setSearch(""); setChitValueRange([0, 10]); }}>Reset filters</Button>
    </Box>
    <Grid2 container spacing={1.5}>{filtered.slice((currentPage - 1) * 6, currentPage * 6).map((person) => <Grid2 key={person.id} size={{ xs: 12, sm: 6, lg: 4 }}><Paper variant="outlined" className="rounded-lg p-3 sm:p-4">
      <Stack direction="row" justifyContent="space-between" alignItems="start"><Box className="flex items-center gap-2"><Avatar sx={{ bgcolor: "#55aaa6", width: 36, height: 36 }}>{person.name[0]}</Avatar><Box><Typography variant="subtitle2" fontWeight={700}>{person.name}</Typography><Typography variant="caption" color="text.secondary">{person.branch} · {person.chit}</Typography></Box></Box><Stack direction="row" spacing={.5}><Chip size="small" label={person.prize ? "Prize" : "Non prize"} color={person.prize ? "primary" : "default"} /><Chip size="small" label={person.status} color="success" /></Stack></Stack>
      <Box className="my-3 space-y-1">{[["Chit value", person.value], ["Duration", person.duration], ["Monthly dues", person.monthly], ["Next due date", person.due], ["Lot number", person.lot], ["Canvasser", person.canvasser]].map(([k, v]) => <Box key={k} className="flex justify-between gap-3"><Typography variant="caption" color="text.secondary">{k}</Typography><Typography variant="caption" fontWeight={600}>{v}</Typography></Box>)}</Box>
      <Box className="mb-2 flex justify-between"><Typography variant="caption" color="text.secondary">18/50 months completed</Typography><Typography variant="caption" color="success.main">36%</Typography></Box><Box className="h-1.5 rounded bg-slate-100"><Box className="h-full w-[36%] rounded bg-emerald-600" /></Box>
      <Button fullWidth size="small" variant="contained" className="mt-3" onClick={() => setSelected(person)}>View details →</Button>
    </Paper></Grid2>)}</Grid2>
    <PageNumberPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
    {filtered.length === 0 && <Typography className="p-8 text-center" color="text.secondary">No customers match your search.</Typography>}
    <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} fullWidth maxWidth="sm"><DialogTitle>Customer details</DialogTitle><DialogContent>{selected && <><Stack direction="row" spacing={2} alignItems="center" className="mb-4"><Avatar sx={{ width: 56, height: 56, bgcolor: "#55aaa6" }}>{selected.name[0]}</Avatar><Box><Typography variant="h6">{selected.name}</Typography><Typography color="text.secondary">{selected.branch} · {selected.chit}</Typography></Box></Stack><Grid2 container spacing={1.5}>{[["Customer phone", "+91 98765 67890"], ["Address", "Anna Nagar, Chennai"], ["Chit value", selected.value], ["Monthly dues", selected.monthly], ["Next due date", selected.due], ["Canvasser", selected.canvasser]].map(([k, v]) => <Grid2 key={k} size={6}><Typography variant="caption" color="text.secondary">{k}</Typography><Typography variant="body2" fontWeight={600}>{v}</Typography></Grid2>)}</Grid2></>}</DialogContent></Dialog>
  </>;
}
