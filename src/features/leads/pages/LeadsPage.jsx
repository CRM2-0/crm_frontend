import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Slider, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PageHeader from "@/components/common/PageHeader";
import TableComponent from "@/components/table/TableComponent";
import InputComponent from "@/components/form/InputComponent";
import DropDown from "@/components/form/DropDown";
import DateComponent from "@/components/form/DateComponent";
import LeadFilters from "../components/LeadFilters";
import LeadSummaryStrip from "../components/LeadSummaryStrip";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeads,
  createLead,
  selectLeadCreateError,
  selectLeadCreateStatus,
  selectLeadError,
  selectLeadFilters,
  selectLeadPagination,
  selectLeads,
  selectLeadStatus,
  setFilters,
  setLimit,
  setPage,
} from "../leadSlice";

const previewLeads = [
  { id: "preview-1", branch: "Chennai", customer_name: "Anitha Selvan", enquiry_date: "01 Oct 2026", phone_no: "+91 98765 67890", source: "Walk-in", status: "CONVERTED", canvasser_name: "A. Arun", address: "Anna Nagar, Chennai", interested_chit_value: "₹5L", reason: "Customer is still deciding on the chit scheme." },
  { id: "preview-2", branch: "Chennai", customer_name: "S. Sumathi", enquiry_date: "03 Oct 2026", phone_no: "+91 98765 43210", source: "Digital", status: "PENDING", canvasser_name: "S. Devi", address: "Chennai", interested_chit_value: "₹10L", reason: "Requested a follow-up call." },
  { id: "preview-3", branch: "Salem", customer_name: "K. Ramesh", enquiry_date: "06 Oct 2026", phone_no: "+91 98765 61234", source: "Referral", status: "LOST", canvasser_name: "M. Selvan", address: "Salem", interested_chit_value: "₹5L", reason: "Not interested at this time." },
  { id: "preview-4", branch: "Coimbatore", customer_name: "P. Kumar", enquiry_date: "08 Oct 2026", phone_no: "+91 98765 65432", source: "Walk-in", status: "PENDING", canvasser_name: "A. Arun", address: "Coimbatore", interested_chit_value: "₹2L", reason: "Comparing available schemes." },
];

export default function LeadsPage() {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);
  const pagination = useSelector(selectLeadPagination);
  const filters = useSelector(selectLeadFilters);
  const status = useSelector(selectLeadStatus);
  const error = useSelector(selectLeadError);
  const createError = useSelector(selectLeadCreateError);
  const createStatus = useSelector(selectLeadCreateStatus);
  const usingPreview = status === "failed" && leads.length === 0;
  const tableData = usingPreview ? previewLeads : leads;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchInput, setSearchInput] = useState(filters.search);
  const [form, setForm] = useState({ customer_name: "", phone_no: "", enquiry_date: "", branch: "", address: "", interested_chit_value: 5, source: "", status: "PENDING", canvasser_name: "", reason: "" });

  useEffect(() => {
    const request = dispatch(fetchLeads({ ...pagination, ...filters }));
    return () => request.abort();
  }, [dispatch, pagination.page, pagination.limit, filters]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (searchInput !== filters.search) dispatch(setFilters({ search: searchInput }));
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [dispatch, searchInput, filters.search]);

  const columns = useMemo(() => [
    { key: "sno", label: "S.no", render: (_, index) => (pagination.page - 1) * pagination.limit + index + 1 },
    { key: "branch", label: "Branch" },
    { key: "customer_name", label: "Customer Name" },
    { key: "enquiry_date", label: "Enquiry Date" },
    { key: "phone_no", label: "Phone No" },
    { key: "source", label: "Source" },
    {
      key: "status",
      label: "Status",
      render: (row) => {
        const label = row.status ?? "Unknown";
        const value = String(label).toLowerCase();
        const color = value.includes("convert") ? "success" : value.includes("lost") ? "error" : value.includes("progress") || value.includes("pending") ? "info" : "warning";
        return <Chip label={label} size="small" color={color} />;
      },
    },
    { key: "canvasser_name", label: "Canvasser Name" },
    { key: "action", label: "Action", render: (row) => <Button size="small" variant="contained" onClick={() => setSelectedLead(row)}>View details</Button> },
  ], [pagination.page, pagination.limit]);

  const updateSearch = (event) => setSearchInput(event.target.value);
  const updateForm = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const submitLead = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createLead(form)).unwrap();
      setDialogOpen(false);
      setForm({ customer_name: "", phone_no: "", enquiry_date: "", branch: "", address: "", interested_chit_value: 5, source: "", status: "PENDING", canvasser_name: "", reason: "" });
      dispatch(fetchLeads({ ...pagination, ...filters }));
    } catch {
      // The rejected request is shown in the dialog through createError.
    }
  };

  return (
    <>
      <PageHeader title="Lead & Enquiry Management" action={<Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setDialogOpen(true)}>Add New Enquiry</Button>} showHeaderActions />
      <div className="space-y-3">
        <LeadSummaryStrip />
        <LeadSummaryStrip source />
      </div>
      <div className="mt-8 space-y-3">
        <InputComponent
          size="small"
          label="Search leads"
          value={searchInput}
          onChange={updateSearch}
          inputProps={{ maxLength: 100 }}
          sx={{ width: { xs: "100%", sm: 280 } }}
        />
        <LeadFilters filters={filters} onChange={(next) => { setSearchInput(next.search); dispatch(setFilters(next)); }} />
      </div>
      {error && <Alert severity="warning" className="my-3">Live lead data is unavailable: {error} Showing sample records so you can preview the screen.</Alert>}
      <div className="mt-4">
        <TableComponent
          columns={columns}
          data={tableData}
          initialDataCount={usingPreview ? tableData.length : pagination.total}
          page={pagination.page}
          pageSize={pagination.limit}
          onPageSizeChange={(limit) => dispatch(setLimit(limit))}
          onPageChange={(page) => dispatch(setPage(page))}
          loading={status === "loading"}
          serverSide={!usingPreview}
          emptyMessage="No enquiry records found."
          minWidth={1100}
        />
      </div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Enquiry</DialogTitle>
        <DialogContent><form id="lead-create-form" onSubmit={submitLead}><div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DropDown required label="Branch" name="branch" value={form.branch} onChange={updateForm("branch")} data={["Chennai", "Salem", "Trichy", "Coimbatore"].map((value) => ({ name: value, value }))} valueKey="value" />
          <InputComponent required label="Customer name" name="customer_name" value={form.customer_name} onChange={updateForm("customer_name")} maxLength={100} />
          <DateComponent required label="Enquiry date" name="enquiry_date" value={form.enquiry_date} onChange={updateForm("enquiry_date")} />
          <InputComponent required label="Phone number" name="phone_no" value={form.phone_no} onChange={updateForm("phone_no")} inputProps={{ inputMode: "tel", maxLength: 20, pattern: "[+0-9 ()-]{7,20}" }} />
          <InputComponent label="Address" name="address" multiline rows={2} value={form.address} onChange={updateForm("address")} maxLength={300} />
          <div className="px-2"><Typography variant="caption" color="text.secondary">Interested chit value · ₹{form.interested_chit_value}L</Typography><Slider aria-label="Interested chit value in lakhs" min={1} max={50} step={1} value={Number(form.interested_chit_value)} onChange={(_, value) => setForm((current) => ({ ...current, interested_chit_value: value }))} /></div>
          <DropDown required label="Source" name="source" value={form.source} onChange={updateForm("source")} data={["Walk-in", "Referral", "Website", "Canvasser"].map((value) => ({ name: value, value }))} valueKey="value" />
          <DropDown required label="Status" name="status" value={form.status} onChange={updateForm("status")} data={[{ name: "Pending", value: "PENDING" }, { name: "In progress", value: "IN_PROGRESS" }, { name: "Converted", value: "CONVERTED" }, { name: "Lost", value: "LOST" }]} valueKey="value" />
          <InputComponent label="Canvasser name" name="canvasser_name" value={form.canvasser_name} onChange={updateForm("canvasser_name")} maxLength={100} />
          <InputComponent label="Reason / notes" name="reason" value={form.reason} onChange={updateForm("reason")} maxLength={500} />
        </div></form>{createError && <Alert severity="error" className="mt-3">{createError}</Alert>}</DialogContent>
        <DialogActions className="px-3 pb-3"><Button onClick={() => setDialogOpen(false)}>Cancel</Button><Button type="submit" form="lead-create-form" variant="contained" disabled={createStatus === "loading"}>{createStatus === "loading" ? "Submitting…" : "Submit enquiry"}</Button></DialogActions>
      </Dialog>
      <Dialog open={Boolean(selectedLead)} onClose={() => setSelectedLead(null)} fullWidth maxWidth="sm">
        <DialogTitle>Enquiry details</DialogTitle>
        <DialogContent>{selectedLead && <>
          <Typography variant="subtitle2" fontWeight={700} className="mb-2">{selectedLead.customer_name}</Typography>
          <div className="mb-4 grid grid-cols-1 gap-2 rounded-md bg-slate-50 p-3 sm:grid-cols-2">{[["Branch", selectedLead.branch], ["Enquiry date", selectedLead.enquiry_date], ["Phone number", selectedLead.phone_no], ["Address", selectedLead.address], ["Interested chit value", selectedLead.interested_chit_value], ["Source", selectedLead.source], ["Status", selectedLead.status], ["Canvasser name", selectedLead.canvasser_name]].map(([label, value]) => <div key={label}><Typography variant="caption" color="text.secondary">{label}</Typography><Typography variant="body2" fontWeight={600}>{value || "—"}</Typography></div>)}</div>
          <Typography variant="caption" color="text.secondary">Reason</Typography><Typography variant="body2">{selectedLead.reason || "No reason provided."}</Typography>
        </>}</DialogContent>
        <DialogActions className="px-3 pb-3"><Button onClick={() => setSelectedLead(null)}>Close</Button></DialogActions>
      </Dialog>
    </>
  );
}
