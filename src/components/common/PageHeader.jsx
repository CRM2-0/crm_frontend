import { Box, Breadcrumbs, Typography } from "@mui/material";
import HeaderActions from "@/components/layout/HeaderActions";
import { Link, useLocation } from "react-router-dom";

export default function PageHeader({
  title,
  action,
  showHeaderActions = false,
  breadcrumbs,
}) {
  const location = useLocation();
  const resolvedBreadcrumbs = breadcrumbs ?? (location.pathname === "/customer-360/family-chit" ? [{ label: "Customer 360° View", to: "/customer-360" }, { label: "Family Chit" }] : []);
  return (
    <Box className="crm-page-header mb-4 flex min-h-14 flex-wrap items-center justify-between gap-3 border border-slate-200 bg-white px-3 py-2 sm:px-5">
      <Box className="min-w-0">
        {resolvedBreadcrumbs.length > 0 && <Breadcrumbs aria-label="Breadcrumb" separator="›" sx={{ mb: 0.25, fontSize: 11 }}>
          {resolvedBreadcrumbs.map((crumb, index) => crumb.to ? <Link key={crumb.label} to={crumb.to} className="text-slate-500 no-underline hover:text-slate-900">{crumb.label}</Link> : <Typography key={`${crumb.label}-${index}`} variant="caption" color="text.secondary">{crumb.label}</Typography>)}
        </Breadcrumbs>}
        <Typography variant="h5" fontWeight={700} sx={{ color: "#07124e", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: { xs: 17, sm: 20 }, lineHeight: 1.2 }}>
          {title}
        </Typography>
      </Box>
      <Box className="flex items-center gap-2">
        {action}
        {showHeaderActions && <HeaderActions />}
      </Box>
    </Box>
  );
}
