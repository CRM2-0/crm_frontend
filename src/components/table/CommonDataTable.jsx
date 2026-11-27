import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PageNumberPagination from "./PageNumberPagination";

/**
 * Generic table for local or API pagination.
 * Set `serverSide` when `data` already contains only the rows for `page`.
 */
export default function CommonDataTable({
  columns,
  data = [],
  initialDataCount = data.length,
  page = 1,
  pageSize = 5,
  onPageChange,
  loading = false,
  serverSide = false,
  emptyMessage = "No records found.",
  minWidth = 720,
  onRowClick,
}) {
  const totalPages = Math.max(1, Math.ceil(initialDataCount / pageSize));
  const visibleRows = serverSide
    ? data
    : data.slice((page - 1) * pageSize, page * pageSize);
  return (
    <>
      <Paper
        elevation={0}
        className="w-full max-w-full overflow-hidden border border-slate-300"
      >
        <div className="table-scroll">
          <Table size="small" aria-label="Data table" sx={{ minWidth }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ py: 6 }}
                  >
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              )}
              {!loading && visibleRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{ py: 8 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {emptyMessage}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                visibleRows.map((row, rowIndex) => (
                  <TableRow
                    hover
                    key={row.id ?? rowIndex}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    onKeyDown={onRowClick ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onRowClick(row); } } : undefined}
                    tabIndex={onRowClick ? 0 : undefined}
                    role={onRowClick ? "button" : undefined}
                    sx={onRowClick ? { cursor: "pointer" } : undefined}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.key} align={column.align}>
                        {column.render
                          ? column.render(row, rowIndex)
                          : (row[column.key] ?? "—")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
      {initialDataCount > 0 && (
        <PageNumberPagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </>
  );
}
