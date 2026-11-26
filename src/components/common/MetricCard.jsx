import { Box, Card, CardContent, Typography } from "@mui/material";

export default function MetricCard({ label, value, icon: Icon, accent = "#efbd73", trend }) {
  return (
    <Card variant="outlined" className="h-full rounded-lg">
      <CardContent className="flex items-start justify-between gap-3 !p-3 sm:!p-4">
        <Box className="min-w-0">
          <Typography variant="caption" color="text.secondary" className="block leading-5">{label}</Typography>
          <Typography variant="h6" fontWeight={700} className="mt-1 truncate" sx={{ color: accent === "#27866b" ? accent : "#0a174e" }}>{value}</Typography>
          {trend && <Typography variant="caption" color="text.secondary">{trend}</Typography>}
        </Box>
        {Icon && <Box className="grid size-8 shrink-0 place-items-center rounded-md text-white" sx={{ bgcolor: accent }}><Icon fontSize="small" /></Box>}
      </CardContent>
    </Card>
  );
}
