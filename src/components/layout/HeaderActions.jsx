import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { getReadNotificationIds, notifications } from '@/features/notifications/notificationData';

export default function HeaderActions() {
  const unreadCount = notifications.length - getReadNotificationIds().size;
  return <Stack direction="row" spacing={1} alignItems="center">
    <Tooltip title="Notifications"><IconButton component={Link} to="/notifications" aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`} size="small"><Badge color="error" variant="dot" invisible={unreadCount === 0}><NotificationsNoneRoundedIcon fontSize="small" /></Badge></IconButton></Tooltip>
    <Tooltip title="Help"><IconButton component={Link} to="/faqs" aria-label="Help and FAQs" size="small"><HelpOutlineRoundedIcon fontSize="small" /></IconButton></Tooltip>
    <Tooltip title="Settings"><IconButton aria-label="Settings" size="small"><SettingsOutlinedIcon fontSize="small" /></IconButton></Tooltip>
    <Box className="ml-1 flex items-center gap-2 border-l border-slate-200 pl-3">
      <IconButton component={Link} to="/profile" aria-label="Open profile" size="small"><Avatar sx={{ width: 30, height: 30, bgcolor: '#081454', fontSize: 12 }}>AS</Avatar></IconButton>
      <Typography variant="caption" fontWeight={700} sx={{ display: { xs: 'none', sm: 'block' } }}>Admin</Typography>
    </Box>
  </Stack>;
}
