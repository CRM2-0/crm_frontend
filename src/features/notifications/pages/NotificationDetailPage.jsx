import { useEffect } from "react";
import { Alert, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PageHeader from "@/components/common/PageHeader";
import { markNotificationRead, notifications } from "../notificationData";

export default function NotificationDetailPage() {
  const { notificationId } = useParams();
  const notification = notifications.find((item) => item.id === notificationId);
  useEffect(() => { if (notification) markNotificationRead(notification.id); }, [notification]);
  if (!notification) return <><PageHeader title="Notification" /><Alert severity="warning">This notification could not be found.</Alert><Button component={Link} to="/notifications" className="mt-3" startIcon={<ArrowBackRoundedIcon />}>Back to notifications</Button></>;
  return <>
    <PageHeader title="Notification details" action={<Button component={Link} to="/notifications" startIcon={<ArrowBackRoundedIcon />}>All notifications</Button>} showHeaderActions />
    <Paper variant="outlined" className="mx-auto max-w-2xl rounded-lg p-4 sm:p-6">
      <Stack direction="row" spacing={1.5} alignItems="start"><Box className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-50 text-[#07124e]"><AccessTimeRoundedIcon /></Box><Box><Typography variant="h6" fontWeight={700} color="#07124e">{notification.title}</Typography><Typography variant="caption" color="text.secondary">{notification.time} · {notification.type}</Typography></Box></Stack>
      <Box className="my-5 border-t border-slate-100" />
      <Typography variant="body2" className="leading-7">{notification.details}</Typography>
      <Box className="mt-5 grid grid-cols-1 gap-3 rounded-md bg-slate-50 p-3 sm:grid-cols-2"><Box><Typography variant="caption" color="text.secondary">Customer</Typography><Typography variant="body2" fontWeight={600}>{notification.customer}</Typography></Box><Box><Typography variant="caption" color="text.secondary">Due</Typography><Typography variant="body2" fontWeight={600}>{notification.due}</Typography></Box></Box>
    </Paper>
  </>;
}
