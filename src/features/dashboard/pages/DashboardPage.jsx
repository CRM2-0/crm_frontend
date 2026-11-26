import { Grid2, Stack, Typography, LinearProgress, Button } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PageHeader from "@/components/common/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import ReportPanel from "@/components/common/ReportPanel";
import { DonutChart, HorizontalBars, PerformanceBars } from "@/components/common/BarChart";

const monthly = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((label, i) => ({ label, value: [58, 83, 67, 91, 72, 88][i], compare: [37, 49, 45, 61, 55, 64][i] }));
const branches = ["Chennai", "Salem", "Trichy", "Madurai", "Coimbatore", "Vellore"].map((label, i) => ({ label, value: [48, 41, 37, 32, 28, 23][i] }));

export default function DashboardPage() {
  return <>
    <PageHeader title="Overview" showHeaderActions />
    <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-4"><Typography variant="caption" color="text.secondary">Good morning, Admin · Performance overview</Typography><Button size="small" variant="outlined">November 2026⌄</Button></Stack>
    <Grid2 container spacing={1.5}>
      <Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Total Active Customers" value="48,712" icon={PeopleAltOutlinedIcon} /></Grid2>
      <Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Total Collection" value="₹80L" icon={PaymentsOutlinedIcon} accent="#efbd73" /></Grid2>
      <Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Total Pending Dues" value="₹90.5L" icon={PendingActionsOutlinedIcon} accent="#d85757" /></Grid2>
      <Grid2 size={{ xs: 6, md: 3 }}><MetricCard label="Active Chits" value="213" icon={GroupsOutlinedIcon} /></Grid2>
      <Grid2 size={{ xs: 12, lg: 7 }}><ReportPanel title="Sales performance" action={<Typography variant="caption" color="text.secondary">● Target　● Achievements</Typography>}><PerformanceBars items={monthly} /></ReportPanel></Grid2>
      <Grid2 size={{ xs: 12, lg: 5 }}><ReportPanel title="Collection and arrears"><DonutChart center="₹80L" segments={[{ label: "Collected · ₹72L", value: 72, color: "#0a174e" }, { label: "Pending · ₹8L", value: 28, color: "#f0bd72" }]} /></ReportPanel></Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}><ReportPanel title="Branch performance"><HorizontalBars items={branches} /></ReportPanel></Grid2>
      <Grid2 size={{ xs: 12, md: 7 }}><ReportPanel title="Employee performance"><PerformanceBars items={["A. Arun", "S. Devi", "K. Suresh", "R. Kumar", "M. Selvan", "P. Banu"].map((label, i) => ({ label, value: [90, 83, 77, 72, 65, 59][i], compare: [54, 49, 45, 42, 38, 35][i] }))} height={150} /></ReportPanel></Grid2>
      <Grid2 size={12}><ReportPanel title="Renewal opportunities" action={<Typography variant="caption" color="text.secondary">Next 30 days</Typography>}><LinearProgress variant="determinate" value={78} sx={{ height: 9, borderRadius: 8, bgcolor: "#e7ebf2", "& .MuiLinearProgress-bar": { bgcolor: "#0a174e" } }} /><Grid2 container spacing={1} className="mt-3">{[["Customer summary", "48,712"], ["Chits near maturity", "8,712"], ["Completed", "4,712"], ["Best customers", "30,000"]].map(([label, value]) => <Grid2 key={label} size={{ xs: 6, sm: 3 }}><div className="rounded-md border border-amber-100 p-2"><Typography variant="caption" color="text.secondary">{label}</Typography><Typography variant="subtitle2" fontWeight={700}>{value}</Typography></div></Grid2>)}</Grid2></ReportPanel></Grid2>
    </Grid2>
  </>;
}
