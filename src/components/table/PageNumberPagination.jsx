import { Box, IconButton, PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

/** Accessible, bounded page controls for 1-based controlled pagination. */
export default function PageNumberPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const count = Math.max(1, Number(totalPages) || 1);
  const page = Math.min(Math.max(1, Number(currentPage) || 1), count);
  const siblingCount = 1;
  const boundaryCount = 1;
  if (count <= 1) return null;
  return (
    <Box
      component="nav"
      aria-label="Pagination"
      className="mt-3 flex items-center justify-center gap-1"
    >
      <IconButton
        aria-label="Go to previous page"
        disabled={page === 1}
        onClick={() => onPageChange?.(page - 1)}
        size="small"
      >
        <ChevronLeftRoundedIcon />
      </IconButton>
      <Pagination
        count={count}
        page={page}
        onChange={(_, nextPage) => onPageChange?.(nextPage)}
        boundaryCount={boundaryCount}
        siblingCount={siblingCount}
        hidePrevButton
        hideNextButton
        size="small"
        shape="rounded"
        renderItem={(item) => <PaginationItem {...item} />}
        sx={{ "& .MuiPagination-ul": { flexWrap: "nowrap" } }}
      />
      <IconButton
        aria-label="Go to next page"
        disabled={page === count}
        onClick={() => onPageChange?.(page + 1)}
        size="small"
      >
        <ChevronRightRoundedIcon />
      </IconButton>
    </Box>
  );
}
