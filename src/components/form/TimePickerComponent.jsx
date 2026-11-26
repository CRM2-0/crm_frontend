import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

dayjs.extend(customParseFormat);

function parseTime(value) {
  if (!value) return null;
  if (dayjs.isDayjs(value)) return value.isValid() ? value : null;
  const formats = ["hh:mm A", "h:mm A", "HH:mm", "H:mm", "HH:mm:ss"];
  const parsed = dayjs(value, formats, true);
  if (parsed.isValid()) return parsed;
  const fallback = dayjs(value);
  return fallback.isValid() ? fallback : null;
}

export default function TimePickerComponent({
  label = "Time", timeLabel, name, value, onChange, disabled = false,
  error = false, errorMessage, helperText, size = "small", format = "hh:mm A",
  required = false, sx,
}) {
  return <TimePicker
    label={timeLabel || label}
    value={parseTime(value)}
    onChange={(nextValue) => onChange?.({ target: { name, value: nextValue?.isValid() ? nextValue.format(format) : "" } })}
    disabled={disabled}
    format={format}
    viewRenderers={{ hours: renderTimeViewClock, minutes: renderTimeViewClock }}
    slotProps={{ textField: { fullWidth: true, size, required, error: Boolean(error), helperText: errorMessage || helperText, sx: { "& .MuiOutlinedInput-root": { bgcolor: "#fff" }, ...sx } } }}
  />;
}
