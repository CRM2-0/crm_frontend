import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  Select,
  TableSortLabel,
  Typography,
} from "@mui/material";
import InputComponent from "@/components/form/InputComponent";
import DropDown from "@/components/form/DropDown";
import DateComponent from "@/components/form/DateComponent";
import CommonDataTable from "./CommonDataTable";

/**
 * Shared filterable data table. Supports the CRM columns API and the legacy
 * heading/rows shape while keeping pagination in CommonDataTable.
 */
export default function TableComponent({
  columns,
  data,
  rows,
  heading,
  filterOptions = {},
  searchable = false,
  loading = false,
  serverSide = false,
  page = 1,
  pageSize = 10,
  total,
  initialDataCount,
  onPageChange,
  emptyMessage,
  minWidth = 720,
  onRowClick,
  selectable = false,
  selectedKeys: controlledSelectedKeys,
  onSelectionChange,
  rowKey = "id",
  onPageSizeChange,
  showPageSizeSelector = true,
}) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [internalSelectedKeys, setInternalSelectedKeys] = useState([]);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);
  useEffect(() => {
    if (onPageSizeChange) setInternalPageSize(pageSize);
  }, [pageSize, onPageSizeChange]);
  const visiblePageSize = onPageSizeChange ? pageSize : internalPageSize;
  const sourceRows = data ?? rows ?? [];
  const tableColumns =
    columns ??
    (heading ?? []).map((column) => ({
      key: column.key ?? column.head,
      label: column.label ?? column.title ?? column.head,
      align: column.align,
      render:
        column.render ??
        (column.transform
          ? (row, index) => column.transform(row[column.head], index)
          : undefined),
    }));
  const searchFields = filterOptions.searchFields ?? [];
  const dropdownFields = filterOptions.dropdownFields ?? [];
  const dateFields = filterOptions.datePickerFields ?? [];

  const filteredRows = useMemo(() => {
    if (serverSide) return sourceRows;
    return sourceRows.filter((row) => {
      const searchableValues = (
        searchFields.length
          ? searchFields.map(({ key }) => row?.[key])
          : Object.values(row ?? {})
      )
        .filter((value) => value != null && typeof value !== "object")
        .join(" ")
        .toLowerCase();
      if (
        query.trim() &&
        !searchableValues.includes(query.trim().toLowerCase())
      )
        return false;
      for (const field of dropdownFields) {
        const chosen = filters[field.key];
        if (chosen && row?.[field.key] !== chosen) return false;
      }
      for (const field of dateFields) {
        const chosen = filters[field.key];
        if (chosen && String(row?.[field.key] ?? "").slice(0, 10) !== chosen)
          return false;
      }
      return true;
    });
  }, [
    sourceRows,
    serverSide,
    searchFields,
    dropdownFields,
    dateFields,
    filters,
    query,
  ]);

  const sortedRows = useMemo(() => {
    if (serverSide || !sortConfig.key) return filteredRows;
    const column = tableColumns.find((item) => item.key === sortConfig.key);
    const valueFor = (row) =>
      column?.sortValue ? column.sortValue(row) : row?.[sortConfig.key];
    const numeric = (value) => {
      const normalized = String(value ?? "")
        .replace(/,/g, "")
        .trim();
      const match = normalized.match(/^[-+]?\d*\.?\d+/);
      return match ? Number(match[0]) : Number.NaN;
    };
    const isDateValue = (value) =>
      typeof value === "string" &&
      (/^\d{4}-\d{2}-\d{2}/.test(value) ||
        /^\d{1,2}\s+[a-z]{3,9}\s+\d{4}$/i.test(value));
    return [...filteredRows].sort((a, b) => {
      const av = valueFor(a);
      const bv = valueFor(b);
      const an = numeric(av);
      const bn = numeric(bv);
      const ad = isDateValue(av) ? Date.parse(av) : Number.NaN;
      const bd = isDateValue(bv) ? Date.parse(bv) : Number.NaN;
      const comparison =
        Number.isFinite(ad) && Number.isFinite(bd)
          ? ad - bd
          : Number.isFinite(an) && Number.isFinite(bn)
            ? an - bn
            : String(av ?? "").localeCompare(String(bv ?? ""), undefined, {
                numeric: true,
                sensitivity: "base",
              });
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredRows, sortConfig, serverSide, tableColumns]);
  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const rowId = (row) => row?.[rowKey] ?? row?.id;
  const selectableRows = sortedRows
    .map(rowId)
    .filter((id) => id !== undefined && id !== null);
  const allSelected =
    selectableRows.length > 0 &&
    selectableRows.every((id) => selectedKeys.includes(id));
  const updateSelection = (nextKeys) => {
    if (controlledSelectedKeys === undefined) setInternalSelectedKeys(nextKeys);
    onSelectionChange?.(
      sortedRows.filter((row) => nextKeys.includes(rowId(row))),
    );
  };
  const renderedColumns = tableColumns.map((column) => ({
    ...column,
    label:
      column.sortable === false || serverSide ? (
        column.label
      ) : (
        <TableSortLabel
          active={sortConfig.key === column.key}
          direction={
            sortConfig.key === column.key ? sortConfig.direction : "asc"
          }
          onClick={() =>
            setSortConfig((current) => ({
              key: column.key,
              direction:
                current.key === column.key && current.direction === "asc"
                  ? "desc"
                  : "asc",
            }))
          }
        >
          {column.label}
        </TableSortLabel>
      ),
  }));
  if (selectable)
    renderedColumns.unshift({
      key: "__selection",
      label: (
        <Checkbox
          size="small"
          checked={allSelected}
          indeterminate={selectedKeys.length > 0 && !allSelected}
          onChange={(event) =>
            updateSelection(
              event.target.checked
                ? [...new Set([...selectedKeys, ...selectableRows])]
                : selectedKeys.filter((id) => !selectableRows.includes(id)),
            )
          }
          inputProps={{ "aria-label": "Select all rows" }}
        />
      ),
      render: (row) => (
        <Checkbox
          size="small"
          checked={selectedKeys.includes(rowId(row))}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) =>
            updateSelection(
              event.target.checked
                ? [...selectedKeys, rowId(row)]
                : selectedKeys.filter((id) => id !== rowId(row)),
            )
          }
          inputProps={{ "aria-label": `Select row ${rowId(row)}` }}
        />
      ),
      sortable: false,
    });
  const resetFilters = () => {
    setQuery("");
    setFilters({});
  };
  const count = serverSide
    ? (total ?? initialDataCount ?? filteredRows.length)
    : filteredRows.length;
  const updatePageSize = (event) => {
    const nextSize = Number(event.target.value);
    if (onPageSizeChange) {
      onPageSizeChange(nextSize);
      onPageChange?.(1);
    } else {
      setInternalPageSize(nextSize);
      onPageChange?.(1);
    }
  };
  return (
    <>
      {(searchable || dropdownFields.length > 0 || dateFields.length > 0) && (
        <Box className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-3">
          {searchable && (
            <InputComponent
              label="Search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                onPageChange?.(1);
              }}
              size="small"
              sx={{ minWidth: 200, flex: "1 1 220px" }}
            />
          )}
          {dropdownFields.map((field) => {
            const options =
              field.options ??
              [
                ...new Set(
                  sourceRows.map((row) => row[field.key]).filter(Boolean),
                ),
              ].map((value) => ({ name: String(value), value }));
            const normalized = [
              { name: field.allLabel ?? "All", value: "" },
              ...options.map((option) =>
                typeof option === "object"
                  ? {
                      ...option,
                      name:
                        option.name ??
                        option.label ??
                        String(option[field.valueKey ?? "value"] ?? ""),
                    }
                  : { name: String(option), value: option },
              ),
            ];
            return (
              <DropDown
                key={field.key}
                label={field.label}
                name={field.key}
                value={filters[field.key] ?? ""}
                data={normalized}
                valueKey="value"
                onChange={(event) => {
                  setFilters((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }));
                  onPageChange?.(1);
                }}
                sx={{ minWidth: 150, flex: "1 1 150px" }}
              />
            );
          })}
          {dateFields.map((field) => (
            <DateComponent
              key={field.key}
              label={field.label}
              name={field.key}
              value={filters[field.key] ?? null}
              onChange={(event) => {
                setFilters((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                }));
                onPageChange?.(1);
              }}
              sx={{ minWidth: 160, flex: "1 1 160px" }}
            />
          ))}
          <Button color="inherit" onClick={resetFilters}>
            Reset
          </Button>
        </Box>
      )}
      <CommonDataTable
        columns={renderedColumns}
        data={sortedRows}
        initialDataCount={count}
        page={page}
        pageSize={visiblePageSize}
        onPageChange={onPageChange}
        loading={loading}
        serverSide={serverSide}
        emptyMessage={emptyMessage}
        minWidth={minWidth + (selectable ? 48 : 0)}
        onRowClick={onRowClick}
      />
      {showPageSizeSelector && (
        <Box className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <Typography variant="caption" color="text.secondary">
            {count > 0
              ? `Showing ${Math.min((page - 1) * visiblePageSize + 1, count)}–${Math.min(page * visiblePageSize, count)} of ${count}`
              : "No rows to show"}
          </Typography>
          <Box className="flex items-center gap-2">
            <Typography variant="caption" color="text.secondary">
              Rows per page
            </Typography>
            <FormControl size="small">
              <Select
                value={visiblePageSize}
                onChange={updatePageSize}
                inputProps={{ "aria-label": "Rows per page" }}
                sx={{ minWidth: 74, bgcolor: "white" }}
              >
                {[5, 10, 25, 50, 100].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
      {serverSide &&
        (searchable || dropdownFields.length || dateFields.length) && (
          <Typography
            variant="caption"
            color="text.secondary"
            className="mt-1 block"
          >
            Filters are applied to the current API request by the page using its
            Redux state.
          </Typography>
        )}
    </>
  );
}
