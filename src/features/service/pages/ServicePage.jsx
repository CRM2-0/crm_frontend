import { useMemo, useState } from "react";
import { Box, Button, Chip, Grid2, Paper, Stack, Typography } from "@mui/material";
import PageHeader from "@/components/common/PageHeader";
import MetricCard from "@/components/common/MetricCard";
import DateComponent from "@/components/form/DateComponent";
import DropDown from "@/components/form/DropDown";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ChatPanel from "../components/ChatPanel";

dayjs.extend(customParseFormat);

const tickets = [
  {
    id: "01111",
    customer: "K. Ramesh Kumar",
    chit: "MCSK/2025/0002 · MFC-01",
    phone: "+91 98765 32456",
    date: "12 Oct 2026",
    time: "10:00 AM",
    assignee: "M. Selvan",
    branch: "Chennai",
    priority: "Low",
    status: "In progress",
    message: "Installment payment issue.",
  },
  {
    id: "01112",
    customer: "S. Sumathi",
    chit: "MCSK/2025/0008 · MFC-01",
    phone: "+91 98765 67890",
    date: "13 Oct 2026",
    time: "11:30 AM",
    assignee: "A. Arun",
    branch: "Salem",
    priority: "High",
    status: "Open",
    message: "Payment receipt query.",
  },
  {
    id: "01113",
    customer: "P. Kumar",
    chit: "MFC/2026/0042 · MFC-12",
    phone: "+91 98765 45678",
    date: "15 Oct 2026",
    time: "02:00 PM",
    assignee: "K. Devi",
    branch: "Trichy",
    priority: "Low",
    status: "Resolved",
    message: "Request to update nominee details.",
  },
  {
    id: "01114",
    customer: "R. Banu",
    chit: "MCSK/2025/0015 · MFC-04",
    phone: "+91 98765 87654",
    date: "17 Oct 2026",
    time: "09:30 AM",
    assignee: "M. Selvan",
    branch: "Chennai",
    priority: "High",
    status: "In progress",
    message: "Unable to access payment history.",
  },
  {
    id: "01115",
    customer: "V. Selvan",
    chit: "MFC/2026/0021 · MFC-11",
    phone: "+91 98765 76543",
    date: "18 Oct 2026",
    time: "03:00 PM",
    assignee: "A. Arun",
    branch: "Salem",
    priority: "Low",
    status: "Open",
    message: "Clarification on upcoming due date.",
  },
  {
    id: "01116",
    customer: "M. Devi",
    chit: "MCSK/2025/0009 · MFC-02",
    phone: "+91 98765 64321",
    date: "19 Oct 2026",
    time: "10:00 AM",
    assignee: "K. Devi",
    branch: "Trichy",
    priority: "Low",
    status: "Resolved",
    message: "Need a copy of the agreement.",
  },
];

export default function ServicePage() {
  const [activeTicketId, setActiveTicketId] = useState(null);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const filtered = useMemo(
    () =>
      tickets.filter((ticket) => {
        const date = dayjs(ticket.date, "DD MMM YYYY", true);
        return (
          (!status || ticket.status === status) &&
          (!priority || ticket.priority === priority) &&
          (!dateFrom || !date.isBefore(dayjs(dateFrom), "day")) &&
          (!dateTo || !date.isAfter(dayjs(dateTo), "day"))
        );
      }),
    [status, priority, dateFrom, dateTo],
  );
  const activeTicket = tickets.find((ticket) => ticket.id === activeTicketId);
  if (activeTicket) {
    return <ChatPanel ticket={activeTicket} onBack={() => setActiveTicketId(null)} />;
  }
  return (
    <>
      <PageHeader title="Customer Service & Complaints" showHeaderActions />
      <Grid2 container spacing={1.5} className="mb-4">
        <Grid2 size={{ xs: 6, md: 3 }}>
          <MetricCard label="Total complaints" value="48,712" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <MetricCard label="Open" value="712" accent="#d98e20" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <MetricCard label="In progress" value="482" accent="#5578c5" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <MetricCard label="Resolved" value="487" accent="#27866b" />
        </Grid2>
      </Grid2>
      <Box className="mb-4 flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-3">
        <DropDown
          label="Complaint status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          data={[
            { name: "All statuses", value: "" },
            ...["Open", "In progress", "Resolved"].map((value) => ({
              name: value,
              value,
            })),
          ]}
          valueKey="value"
          sx={{ minWidth: 150 }}
        />
        <DropDown
          label="Priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          data={[
            { name: "All priorities", value: "" },
            ...["Low", "High"].map((value) => ({ name: value, value })),
          ]}
          valueKey="value"
          sx={{ minWidth: 130 }}
        />
        <DateComponent
          label="From"
          name="dateFrom"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <DateComponent
          label="To"
          name="dateTo"
          value={dateTo}
          minDate={dateFrom || undefined}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </Box>
      <Grid2 container spacing={1.5}>
        {filtered.map((ticket) => (
          <Grid2 key={ticket.id} size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" role="button" tabIndex={0} onClick={() => setActiveTicketId(ticket.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveTicketId(ticket.id); } }} className="h-full cursor-pointer rounded-lg p-3 transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:p-4">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="start"
                className="mb-3"
              >
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Ticket ID: {ticket.id}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Created {ticket.date}
                  </Typography>
                </Box>
                <Stack alignItems="end" spacing={0.5}>
                  <Chip
                    size="small"
                    color={ticket.priority === "High" ? "error" : "primary"}
                    label={`${ticket.priority} priority`}
                  />
                  <Typography variant="caption">{ticket.status}</Typography>
                </Stack>
              </Stack>
              <Typography variant="body2" fontWeight={700}>
                {ticket.customer}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {ticket.chit} · {ticket.phone}
              </Typography>
              <Grid2 container spacing={1} className="my-3">
                {[
                  ["Complaint date", ticket.date],
                  ["Time", ticket.time],
                  ["Assigned staff", ticket.assignee],
                  ["Branch", ticket.branch],
                ].map(([label, value]) => (
                  <Grid2 key={label} size={6}>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      fontWeight={600}
                    >
                      {value}
                    </Typography>
                  </Grid2>
                ))}
              </Grid2>
              <Box className="rounded-md bg-[#07124e] p-3 text-white">
                <Typography variant="caption" fontWeight={700}>
                  Complaint
                </Typography>
                <Typography variant="body2">{ticket.message}</Typography>
              </Box>
              <Typography variant="button" component="div" color="primary" textAlign="right" sx={{ mt: 1.5, textTransform: "none", fontWeight: 700 }}>Open conversation →</Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
      {filtered.length === 0 && (
        <Typography className="p-8 text-center" color="text.secondary">
          No complaints match your filters.
        </Typography>
      )}
    </>
  );
}
