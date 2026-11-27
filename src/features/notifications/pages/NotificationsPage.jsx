import { useMemo, useState } from "react";
import { Avatar, Badge, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PageHeader from "@/components/common/PageHeader";
import { getReadNotificationIds, markNotificationRead, notifications } from "../notificationData";

export default function NotificationsPage() {
  const [readIds, setReadIds] = useState(() => getReadNotificationIds());
  const unreadCount = useMemo(() => notifications.filter((item) => !readIds.has(item.id)).length, [readIds]);
  const markAllRead = () => {
    notifications.forEach((item) => markNotificationRead(item.id));
    setReadIds(getReadNotificationIds());
  };
  return <>
    <PageHeader title="Alert & Notifications" showHeaderActions />
    <Box className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)]">
      <Stack spacing={1.5}>
        <Paper variant="outlined" className="rounded-lg p-4"><Stack direction="row" spacing={1.5} alignItems="center" className="mb-3"><Avatar sx={{ bgcolor: "#57b6b5" }}>S</Avatar><Box><Typography variant="subtitle2" fontWeight={700}>S. Sumathi</Typography><Typography variant="caption" color="text.secondary">+91 87956 37482</Typography></Box></Stack><Box className="border-t border-slate-100 pt-3"><Typography variant="subtitle2" fontWeight={700} className="mb-2">Follow-up details</Typography>{[["Date", "10 Oct 2026"], ["Time", "Tomorrow 10:00 AM"], ["Contact type", "Visit"], ["Purpose of visit", "Pending Due"], ["Chit application obtained", "Yes"], ["Chit ID", "MCSK/2025/0002"], ["Application type", "New"]].map(([label, value]) => <Box key={label} className="flex justify-between gap-2 border-b border-slate-100 py-2"><Typography variant="caption" color="text.secondary">{label}</Typography><Typography variant="caption" fontWeight={600} textAlign="right">{value}</Typography></Box>)}</Box></Paper>
        <Paper variant="outlined" className="rounded-lg p-4"><Typography variant="subtitle2" fontWeight={700} className="mb-2">Feedback</Typography><Typography variant="body2" color="text.secondary">“Customer has paid the due amount successfully.”</Typography></Paper>
      </Stack>
      <Paper variant="outlined" className="rounded-lg p-3 sm:p-5">
        <Box className="mb-3 flex items-center justify-between gap-2"><Box><Typography variant="subtitle1" fontWeight={700}>Alert & Notifications</Typography><Typography variant="caption" color="text.secondary">{unreadCount} unread</Typography></Box><Button size="small" onClick={markAllRead} disabled={unreadCount === 0}>Mark all as read</Button></Box>
        <Stack divider={<Box className="border-b border-slate-100" />}>
          {notifications.map((item) => <Box key={item.id} component={Link} to={`/notifications/${item.id}`} onClick={() => markNotificationRead(item.id)} className="flex items-start gap-3 rounded-md px-2 py-3 text-inherit no-underline hover:bg-slate-50">
            <Badge color="error" variant="dot" invisible={readIds.has(item.id)}><Box className="grid size-9 place-items-center rounded-full bg-indigo-50 text-[#07124e]"><AccessTimeRoundedIcon fontSize="small" /></Box></Badge>
            <Box className="min-w-0 flex-1"><Typography variant="body2" fontWeight={700}>{item.title}</Typography><Typography variant="body2" color="text.secondary">{item.description}</Typography><Typography variant="caption" color="text.secondary">{item.time}</Typography></Box>
            <ArrowForwardIosRoundedIcon sx={{ mt: 1, color: "#8a92a5", fontSize: 14 }} />
          </Box>)}
        </Stack>
      </Paper>
    </Box>
  </>;
}
