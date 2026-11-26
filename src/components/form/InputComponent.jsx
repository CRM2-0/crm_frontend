import { useState } from "react";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

function formatValue(value, { number, capital, letter, pan, adhar, percent, numericspl, isSplLetter }) {
  let next = String(value ?? "");
  if (number || adhar) next = next.replace(/\D/g, "");
  if (adhar) next = next.slice(0, 12).replace(/(\d{4})(?=\d)/g, "$1 ");
  if (pan) next = next.replace(/[^a-z\d]/gi, "").toUpperCase().slice(0, 10);
  if (percent) next = next.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1");
  if (numericspl) next = next.replace(/[^\d/\\-]/g, "");
  if (letter) next = next.replace(/[^a-z\s.,'-]/gi, "");
  if (isSplLetter) next = next.replace(/[^a-z\s&]/gi, "");
  if (capital && next) next = next.charAt(0).toUpperCase() + next.slice(1);
  return next;
}

/** Controlled MUI input with optional, opt-in formatting helpers. */
export default function InputComponent({
  label, name, value, onChange, error = false, required = false,
  placeholder, type = "text", password = false, size = "small",
  capital = false, email = false, number = false, letter = false,
  maxLength, minLength, percent = false, pan = false, adhar = false, test_id,
  numericspl = false, isSplLetter = false, range, multiline = false, disabled = false,
  helperText, errorMessage, prefix, prefixEnd, inputProps = {}, style: inputStyle,
  sx, onKeyPress, onClick, autoComplete, rows = 4, fullWidth = true,
  ...textFieldProps
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const isPassword = password || type === "password";

  const handleChange = (event) => {
    const nextValue = formatValue(event.target.value, { number, capital, letter, pan, adhar, percent, numericspl, isSplLetter });
    const cappedValue = maxLength && !adhar && !pan ? nextValue.slice(0, maxLength) : nextValue;
    let validation = "";
    if (minLength && cappedValue.length > 0 && cappedValue.length < minLength) validation = `Enter at least ${minLength} characters.`;
    if (email && cappedValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cappedValue)) validation = "Enter a valid email address.";
    if (pan && cappedValue.length > 0 && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cappedValue)) validation = cappedValue.length < 10 ? "PAN must contain 10 characters." : "Enter a valid PAN number.";
    if (adhar && cappedValue.replace(/\s/g, "").length > 0 && cappedValue.replace(/\s/g, "").length < 12) validation = "Aadhaar must contain 12 digits.";
    if (Array.isArray(range) && range.length === 2 && cappedValue.length > 0 && (cappedValue.length < range[0] || cappedValue.length > range[1])) validation = `Enter between ${range[0]} and ${range[1]} characters.`;
    setLocalError(validation);
    onChange?.({ target: { name, value: cappedValue } });
  };

  return <TextField
    {...textFieldProps}
    sx={{ ...inputStyle, ...sx }}
    fullWidth={fullWidth}
    name={name}
    label={label}
    value={value ?? ""}
    onChange={handleChange}
    onClick={onClick}
    onKeyDown={onKeyPress}
    placeholder={placeholder}
    type={isPassword ? (showPassword ? "text" : "password") : email && type === "text" ? "email" : type}
    required={required}
    disabled={disabled}
    multiline={multiline}
    rows={multiline ? rows : undefined}
    size={size}
    autoComplete={autoComplete ?? (isPassword ? "current-password" : undefined)}
    error={Boolean(error || localError)}
    helperText={errorMessage || (typeof error === "string" ? error : "") || localError || helperText}
    inputProps={{ ...inputProps, "data-testid": test_id ?? inputProps["data-testid"], maxLength: adhar ? 14 : pan ? 10 : maxLength ?? inputProps.maxLength }}
    InputProps={{
      startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : undefined,
      endAdornment: <>
        {prefixEnd && <InputAdornment position="end">{prefixEnd}</InputAdornment>}
        {isPassword && <InputAdornment position="end"><Tooltip title={showPassword ? "Hide password" : "Show password"}><IconButton edge="end" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)} onMouseDown={(event) => event.preventDefault()} size="small">{showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}</IconButton></Tooltip></InputAdornment>}
      </>,
    }}
  />;
}
