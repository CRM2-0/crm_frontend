import { Box, Stack, Typography } from "@mui/material";

export function PerformanceBars({ items = [], color = "#091650", accent = "#f0bd72", height = 130 }) {
  return (
    <Box className="overflow-x-auto">
      <Stack direction="row" alignItems="end" justifyContent="space-around" spacing={2} sx={{ minWidth: Math.max(320, items.length * 58), height }}>
        {items.map((item) => (
          <Stack key={item.label} alignItems="center" spacing={0.5} sx={{ height: "100%", justifyContent: "end", minWidth: 34 }}>
            <Typography variant="caption" color="text.secondary">{item.value}%</Typography>
            <Box className="flex items-end gap-1" sx={{ height: "65%" }}>
              <Box className="w-3 rounded-t-sm" sx={{ height: `${Math.max(12, item.value)}%`, bgcolor: color }} />
              <Box className="w-3 rounded-t-sm" sx={{ height: `${Math.max(8, item.compare ?? item.value * .65)}%`, bgcolor: accent }} />
            </Box>
            <Typography variant="caption" color="text.secondary" className="whitespace-nowrap">{item.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export function HorizontalBars({ items = [] }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return <Stack spacing={1.2}>{items.map((item) => <Box key={item.label} className="grid grid-cols-[38px_1fr_58px] items-center gap-2"><Typography variant="caption" color="text.secondary">{item.value}L</Typography><Box className="h-2.5 overflow-hidden rounded-full bg-slate-100"><Box className="h-full rounded-full bg-[#0a174e]" sx={{ width: `${(item.value / max) * 100}%` }} /></Box><Typography variant="caption" color="text.secondary" noWrap>{item.label}</Typography></Box>)}</Stack>;
}

export function DonutChart({ segments = [{ label: "Active", value: 72, color: "#0a174e" }, { label: "Pending", value: 28, color: "#f0bd72" }], center = "" }) {
  let cursor = 0;
  const gradient = segments.map(({ value, color }) => { const start = cursor; cursor += value; return `${color} ${start}% ${cursor}%`; }).join(", ");
  return <Box className="flex flex-wrap items-center justify-center gap-5 py-2">
    <Box className="grid size-32 shrink-0 place-items-center rounded-full" sx={{ background: `conic-gradient(${gradient})` }}><Box className="grid size-20 place-items-center rounded-full bg-white text-center"><Typography variant="caption" fontWeight={700}>{center}</Typography></Box></Box>
    <Stack spacing={1}>{segments.map((part) => <Box key={part.label} className="flex items-center gap-2"><Box className="size-2 rounded-full" sx={{ bgcolor: part.color }} /><Typography variant="caption">{part.label} · {part.value}%</Typography></Box>)}</Stack>
  </Box>;
}
