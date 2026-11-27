import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import PageNumberPagination from "./PageNumberPagination";

/** Shared server pagination with 1-based pages and selectable page size. */
export default function ServerTablePagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(Math.max(0, total) / Math.max(1, limit)),
  );
  return (
    <Box className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-3 py-2">
      <Box className="flex items-center gap-2">
        <Typography variant="body2" color="text.secondary">
          Rows per page
        </Typography>
        <FormControl size="small">
          <Select
            value={limit}
            aria-label="Rows per page"
            onChange={(event) => onLimitChange(Number(event.target.value))}
            sx={{ minWidth: 76 }}
          >
            {[10, 25, 50, 100].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          {total} total
        </Typography>
      </Box>
      <PageNumberPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Box>
  );
}
