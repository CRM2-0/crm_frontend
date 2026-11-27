import { NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import { navigationItems } from "@/constants/navigation";

const expandedWidth = 210;

function NavigationItem({ label, path, Icon, onNavigate }) {
  const button = (
    <ListItemButton
      component={NavLink}
      to={path}
      onClick={onNavigate}
      end={path === "/"}
      aria-label={label}
      className="sidebar-item mb-1 min-h-10 justify-start rounded-md px-2.5"
      sx={{
        color: "#fff",
        "&.active": { bgcolor: "#efbd72", color: "#07124e" },
        "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
        "&.active:hover": { bgcolor: "#efbd72" },
      }}
    >
      <ListItemIcon
        className="sidebar-icon"
        sx={{ minWidth: 30, color: "inherit" }}
      >
        <Icon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        className="sidebar-label"
        primary={label}
        primaryTypographyProps={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2, whiteSpace: "normal" }}
        sx={{ display: "block", opacity: 1 }}
      />
    </ListItemButton>
  );
  return (
    <Tooltip title={label} placement="right">
      {button}
    </Tooltip>
  );
}

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        "& .MuiDrawer-paper": {
          width: isDesktop || mobileOpen ? expandedWidth : 44,
          overflowX: "hidden",
          border: 0,
          boxSizing: "border-box",
          bgcolor: isDesktop || mobileOpen ? "#07124e" : "#33445d",
          transition: "width 180ms ease, background-color 180ms ease",
          zIndex: (t) => t.zIndex.drawer,
          "@media (max-width:899px)": {
            "&:hover, &:focus-within": { width: `${expandedWidth}px !important`, bgcolor: "#07124e" },
          },
        },
      }}
    >
      <Box className={`sidebar-rail flex h-full flex-col text-white ${isDesktop || mobileOpen ? "sidebar-expanded" : "sidebar-collapsed"}`}>
        <Toolbar className="sidebar-brand justify-start gap-2 px-3">
          <Box
            aria-label="CRM"
            className="grid size-7 shrink-0 place-items-center rounded-md bg-[#efbd72] text-[#07124e]"
          >
            <HubRoundedIcon fontSize="small" />
          </Box>
          <Typography
            className="sidebar-brand-name"
            variant="h6"
            fontWeight={700}
            sx={{
              display: "block",
              opacity: 1,
              whiteSpace: "nowrap",
            }}
          >
            CRM
          </Typography>
        </Toolbar>
        <List className="sidebar-nav px-1.5">
          {navigationItems.map(({ label, path, icon: Icon }) => (
            <NavigationItem key={path} label={label} path={path} Icon={Icon} onNavigate={onClose} />
          ))}
        </List>
        <Box className="sidebar-footer mt-auto border-t border-white/10 p-2">
          <Tooltip title="Sales Person" placement="right">
            <Box className="flex min-h-11 items-center justify-start gap-2 rounded-md px-3 text-slate-200">
              <AccountCircleOutlinedIcon fontSize="small" />
              <Typography
                className="sidebar-footer-label"
                variant="caption"
                sx={{
                  display: "block",
                  opacity: 1,
                  whiteSpace: "nowrap",
                }}
              >
                Sales Person
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Drawer>
  );
}
