import { Autocomplete, Checkbox, CircularProgress, TextField } from "@mui/material";

/** Searchable controlled select. onChange receives { target: { name, value } }. */
export default function DropDown({
  label, name, value, onChange, data = [], options, valueKey = "name",
  labelKey = "name", multiple = false, disabled = false, loading = false,
  error = false, validationMessage, helperText, placeholder = "Select an option",
  showCheckbox = false, itemsToShow, onScroll, size = "small", required = false,
  isSearch = true, fullWidth = true, sx,
}) {
  const availableOptions = options ?? data;
  const optionValue = (option) => typeof option === "string" ? option : option?.[valueKey] ?? "";
  const optionLabel = (option) => String(option?.[labelKey] ?? option ?? "");
  const selectedOption = (candidate) => availableOptions.find((option) => optionValue(option) === candidate) ?? null;
  const selected = multiple
    ? (Array.isArray(value) ? value : []).map(selectedOption).filter(Boolean)
    : selectedOption(value);

  return <Autocomplete
    multiple={multiple}
    disableCloseOnSelect={multiple}
    options={itemsToShow ? availableOptions.slice(0, itemsToShow) : availableOptions}
    value={selected}
    loading={loading}
    disabled={disabled}
    fullWidth={fullWidth}
    size={size}
    getOptionLabel={optionLabel}
    isOptionEqualToValue={(option, selectedValue) => optionValue(option) === optionValue(selectedValue)}
    onChange={(_, next) => onChange?.({ target: { name, value: multiple ? (next ?? []).map(optionValue) : next ? optionValue(next) : "" } })}
    ListboxProps={{ onScroll }}
    renderOption={(props, option, state) => <li {...props} key={String(optionValue(option))}>{showCheckbox && <Checkbox size="small" checked={state.selected} sx={{ mr: 1 }} />}{optionLabel(option)}</li>}
    renderInput={(params) => <TextField {...params} label={label} required={required} placeholder={multiple && selected.length ? "" : placeholder} error={Boolean(error)} helperText={validationMessage || helperText} InputProps={{ ...params.InputProps, endAdornment: <>{loading ? <CircularProgress color="inherit" size={18} /> : null}{params.InputProps.endAdornment}</> }} />}
    sx={sx}
    openOnFocus={isSearch}
  />;
}
