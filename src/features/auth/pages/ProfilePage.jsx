import { useState } from "react";
import { Alert, Avatar, Box, Button, Grid2, Paper, Stack, TextField, Typography } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";

export default function ProfilePage() {
  const [notice, setNotice] = useState("");
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const submit = (event) => {
    event.preventDefault();
    if (!passwords.current || passwords.next.length < 12 || passwords.next !== passwords.confirm) {
      setNotice("Enter your current password and a matching new password with at least 12 characters.");
      return;
    }
    setNotice("Password settings API is not configured yet. Your password was not changed.");
  };
  return <>
    <PageHeader title="My Profile" showHeaderActions />
    <Grid2 container spacing={1.5} className="mb-4">{[["Application count", "186"], ["Collection amount", "₹26.7L"], ["Balance collection amount", "₹26.7L"], ["Canvasser share", "₹13,000"]].map(([label, value]) => <Grid2 key={label} size={{ xs: 6, md: 3 }}><Paper variant="outlined" className="rounded-lg p-3"><Typography variant="caption" color="text.secondary">{label}</Typography><Typography variant="h6" fontWeight={700} className="mt-1">{value}</Typography></Paper></Grid2>)}</Grid2>
    <Paper variant="outlined" className="rounded-lg p-4 sm:p-6"><Typography variant="subtitle2" fontWeight={700} className="mb-4">Employee details</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "start", sm: "center" }} className="mb-5"><Avatar sx={{ width: 72, height: 72, bgcolor: "#0a174e", fontSize: 24 }}>AS</Avatar><Box><Typography variant="h6" fontWeight={700}>Anitha Selvan</Typography><Typography color="text.secondary">Sales staff · Employee ID EMP001</Typography></Box></Stack>
      <Grid2 container spacing={1.5} className="mb-6">{[["Employee ID", "EMP001"], ["Employee code", "CAN001"], ["Department", "Management"], ["Email address", "anitha@example.com"], ["Joining date", "29 Oct 2000"], ["Branch", "Chennai"], ["Contact number", "+91 98765 43210"]].map(([label, value]) => <Grid2 key={label} size={{ xs: 12, sm: 6, md: 4 }}><Typography variant="caption" color="text.secondary">{label}</Typography><Typography variant="body2" fontWeight={600}>{value}</Typography></Grid2>)}</Grid2>
      <Typography variant="subtitle2" fontWeight={700} className="mb-3">Account settings</Typography>
      {notice && <Alert severity={notice.startsWith("Password settings") ? "info" : "warning"} className="mb-3">{notice}</Alert>}
      <Box component="form" onSubmit={submit}><Grid2 container spacing={1.5}>{[["current", "Current password"], ["next", "New password"], ["confirm", "Re-type password"]].map(([key, label]) => <Grid2 key={key} size={{ xs: 12, md: 4 }}><TextField fullWidth size="small" type="password" label={label} autoComplete={key === "current" ? "current-password" : "new-password"} value={passwords[key]} onChange={(e) => setPasswords((current) => ({ ...current, [key]: e.target.value }))} /></Grid2>)}</Grid2><Grid2 container spacing={1.5} className="mt-2"><Grid2 size={{ xs: 12, md: 4 }}><TextField fullWidth size="small" label="Change mobile number" autoComplete="tel" /></Grid2><Grid2 size={{ xs: 12, md: 4 }}><TextField fullWidth size="small" label="Change email ID" autoComplete="email" /></Grid2><Grid2 size={{ xs: 12, md: 4 }}><Stack direction="row" spacing={1} className="mt-1"><Button type="submit" variant="contained">Update password</Button><Button type="reset" variant="outlined" onClick={() => { setPasswords({ current: "", next: "", confirm: "" }); setNotice(""); }}>Cancel</Button></Stack></Grid2></Grid2></Box>
    </Paper>
  </>;
}
