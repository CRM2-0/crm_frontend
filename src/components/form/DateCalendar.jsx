import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { DateCalendar as MuiDateCalendar, PickersDay } from "@mui/x-date-pickers";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import dayjs from "dayjs";

function CustomDay(props) {
  const { day, outsideCurrentMonth, ...other } = props;
  const weekend = day.day() === 0 || day.day() === 6;
  return <PickersDay {...other} day={day} outsideCurrentMonth={outsideCurrentMonth} sx={{ borderRadius: 1, ...(weekend && { bgcolor: "#d9d9d98a", "&:hover": { bgcolor: "#d9d9d9" } }) }} />;
}

export default function DateCalendar({ value, onChange, minDate, maxDate, disabled = false, sx }) {
  const [currentDate, setCurrentDate] = useState(() => value && dayjs(value).isValid() ? dayjs(value) : dayjs());
  useEffect(() => {
    if (value && dayjs(value).isValid()) setCurrentDate(dayjs(value));
  }, [value]);
  const selectedDate = currentDate;
  const shiftMonth = (amount) => {
    const next = currentDate.add(amount, "month");
    setCurrentDate(next);
  };

  return <Box className="rounded-lg p-2 text-white" sx={{ bgcolor: "#07124e", ...sx }}>
    <Box className="mb-1 flex items-center justify-between rounded-md bg-[#1f2f6c] px-2 py-1">
      <Typography variant="subtitle1" fontWeight={700}>{selectedDate.format("MMMM, DD")}</Typography>
      <Box className="flex items-center gap-1"><IconButton aria-label="Previous month" size="small" onClick={() => shiftMonth(-1)} sx={{ color: "white" }}><EastRoundedIcon fontSize="small" sx={{ transform: "rotate(180deg)" }} /></IconButton><IconButton aria-label="Next month" size="small" onClick={() => shiftMonth(1)} sx={{ color: "white" }}><EastRoundedIcon fontSize="small" /></IconButton></Box>
    </Box>
    <MuiDateCalendar
      value={selectedDate}
      onChange={(date) => { setCurrentDate(date); onChange?.(date); }}
      onMonthChange={(month) => setCurrentDate(month)}
      showDaysOutsideCurrentMonth
      disabled={disabled}
      minDate={minDate ? dayjs(minDate) : undefined}
      maxDate={maxDate ? dayjs(maxDate) : undefined}
      slots={{ day: CustomDay, calendarHeader: () => null }}
      sx={{ width: "100%", m: 0, color: "white", "& .MuiTypography-root": { color: "white" }, "& .MuiDayCalendar-header": { justifyContent: "space-between", bgcolor: "#1f2f6c" }, "& .MuiDayCalendar-weekDayLabel": { color: "white", fontWeight: 700 }, "& .MuiPickersDay-root": { color: "white", borderRadius: 1, fontSize: ".9rem" }, "& .MuiPickersDay-root.Mui-selected": { bgcolor: "#efbd72", color: "#07124e" }, "& .MuiPickersDay-root.Mui-disabled": { color: "#9fa8da" }, "& .MuiPickersSlideTransition-root": { overflowX: "clip" } }}
    />
  </Box>;
}
