import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const asDayjs = (value) => {
  if (!value) return null;
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed : null;
};

/** Date picker that emits a stable date-only value and supports controlled ranges. */
export default function DateComponent({
  name, value, onChange, label, disabled = false, disablePreviousYears = false,
  minDate, maxDate, views, format = "DD-MM-YYYY", isRangeFilter = false,
  startDate, endDate, onRangeChange, startDateLabel = "Start date",
  endDateLabel = "End date", borderError = false, error = false, required = false,
  helperText, outputFormat = "YYYY-MM-DD", size = "small", sx,
}) {
  const min = asDayjs(minDate);
  const max = asDayjs(maxDate);
  const today = dayjs().startOf("year");
  const pickerSx = {
    width: "100%",
    "& .MuiOutlinedInput-root": { minHeight: 40, bgcolor: "#fff" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: borderError || error ? "error.main" : "#d9dfeb" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: borderError || error ? "error.main" : "#aab4c6" },
    ...sx,
  };
  const toOutput = (date) => date?.isValid() ? date.format(outputFormat) : null;
  const onSingleChange = (date) => onChange?.({ target: { name, value: toOutput(date) } });

  if (isRangeFilter) {
    const start = asDayjs(startDate);
    const end = asDayjs(endDate);
    const emitRange = (key, date) => {
      const nextStart = key === "startDate" ? toOutput(date) : startDate || null;
      const nextEnd = key === "endDate" ? toOutput(date) : endDate || null;
      onRangeChange?.({ startDate: nextStart, endDate: nextEnd });
    };
    return <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <DatePicker label={startDateLabel} value={start} onChange={(date) => emitRange("startDate", date)} disabled={disabled} minDate={min} maxDate={end ?? max} views={views} format={format} shouldDisableYear={disablePreviousYears ? (date) => date.year() < today.year() : undefined} slotProps={{ textField: { size, fullWidth: true, required, error: Boolean(error || borderError), helperText } }} sx={pickerSx} />
      <DatePicker label={endDateLabel} value={end} onChange={(date) => emitRange("endDate", date)} disabled={disabled} minDate={start ?? min} maxDate={max} views={views} format={format} shouldDisableYear={disablePreviousYears ? (date) => date.year() < today.year() : undefined} slotProps={{ textField: { size, fullWidth: true, required, error: Boolean(error || borderError), helperText } }} sx={pickerSx} />
    </div>;
  }

  return <DatePicker
    label={label}
    name={name}
    value={asDayjs(value)}
    onChange={onSingleChange}
    disabled={disabled}
    minDate={min}
    maxDate={max}
    views={views}
    format={format}
    shouldDisableYear={disablePreviousYears ? (date) => date.year() < today.year() : undefined}
    slotProps={{ textField: { size, fullWidth: true, required, error: Boolean(error || borderError), helperText } }}
    sx={pickerSx}
  />;
}
