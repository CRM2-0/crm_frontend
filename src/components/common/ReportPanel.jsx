import { Box, Paper, Typography } from "@mui/material";

export default function ReportPanel({ title, action, children, className = "" }) {
  return (
    <Paper variant="outlined" className={`min-w-0 rounded-lg p-3 sm:p-4 ${className}`}>
      <Box className="mb-3 flex items-center justify-between gap-2">
        <Typography variant="subtitle2" fontWeight={700}>{title}</Typography>
        {action}
      </Box>
      {children}
    </Paper>
  );
}
