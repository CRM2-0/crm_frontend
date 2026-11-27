import { useEffect, useState } from "react";
import { Box, Slider, TextField, Tooltip, Typography } from "@mui/material";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Controlled dual-ended slider with accessible numeric bounds. */
export default function RangeSlider({
  onChange, rangeLabel, sliderValue = [0, 100], min = 0, max = 100,
  step = 1, rangeStyle, disabled = false, showInputs = true, unit = "%",
}) {
  const [value, setValue] = useState(sliderValue);
  useEffect(() => { setValue(sliderValue); }, [sliderValue]);

  const update = (event, nextValue) => {
    if (!Array.isArray(nextValue) || nextValue.length !== 2) return;
    const next = [clamp(nextValue[0], min, max), clamp(nextValue[1], min, max)];
    setValue(next);
    onChange?.(event, next);
  };
  const updateBound = (index) => (event) => {
    if (event.target.value === "") return;
    const entered = Number(event.target.value);
    if (!Number.isFinite(entered)) return;
    const next = [...value];
    next[index] = clamp(entered, min, max);
    next.sort((a, b) => a - b);
    setValue(next);
    onChange?.(event, next);
  };

  return <Box className="w-full">
    {rangeLabel && <Typography variant="body2" className="mb-1">{rangeLabel}</Typography>}
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <Box className="min-w-48 flex-1 px-2">
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={update}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}${unit}`}
          disableSwap
          disabled={disabled}
          slots={{ valueLabel: (props) => <Tooltip enterTouchDelay={0} placement="top" title={`${props.value}${unit}`}><span>{props.children}</span></Tooltip> }}
          sx={{ color: "#07124e", ...rangeStyle }}
        />
      </Box>
      {showInputs && <Box className="flex w-full items-center gap-2 sm:w-auto">
        <TextField size="small" label="Min" type="number" value={value[0] ?? ""} onChange={updateBound(0)} inputProps={{ min, max: value[1] }} disabled={disabled} sx={{ width: 86 }} />
        <Typography aria-hidden="true">–</Typography>
        <TextField size="small" label="Max" type="number" value={value[1] ?? ""} onChange={updateBound(1)} inputProps={{ min: value[0], max }} disabled={disabled} sx={{ width: 86 }} />
      </Box>}
    </div>
  </Box>;
}
