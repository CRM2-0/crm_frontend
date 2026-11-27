import { Box, Stack, Typography } from "@mui/material";

const leadMetrics = [
  { label: "Total Leads", value: "48,712", percentage: "36%" },
  { label: "Pending", value: "912", percentage: "45%" },
  { label: "Converted", value: "768", percentage: "12%" },
  { label: "Lost", value: "48", percentage: "7%" },
];

const sourceMetrics = [
  { label: "Canvasser", value: "912", percentage: "36%" },
  { label: "Referral", value: "98", percentage: "45%" },
  { label: "Digital", value: "123", percentage: "12%" },
  { label: "Walk-in", value: "76", percentage: "7%" },
  { label: "Entity customer", value: "167", percentage: "7%" },
];

function MiniBar() {
  return <Box className="h-5 w-3 rounded-sm bg-slate-400" />;
}

function Donut() {
  return (
    <Box className="size-14 rounded-full border-[8px] border-slate-400 border-r-slate-200" />
  );
}

function SourceBars() {
  return (
    <Stack direction="row" alignItems="end" spacing={0.5} className="h-12">
      <Box className="h-7 w-2 rounded-sm bg-slate-400" />
      <Box className="h-9 w-2 rounded-sm bg-slate-400" />
      <Box className="h-11 w-2 rounded-sm bg-slate-400" />
      <Box className="h-12 w-2 rounded-sm bg-slate-400" />
      <Box className="h-10 w-2 rounded-sm bg-slate-400" />
    </Stack>
  );
}

function Metric({ metric }) {
  return (
    <Box className="min-w-24 flex-1">
      <Typography variant="caption" color="text.secondary">
        {metric.label}
      </Typography>
      <Typography variant="h6" fontWeight={700} className="text-slate-700">
        {metric.value}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="end">
        <Typography variant="caption" color="text.secondary">
          {metric.percentage}
        </Typography>
        <MiniBar />
      </Stack>
    </Box>
  );
}

export default function LeadSummaryStrip({ source = false }) {
  const metrics = source ? sourceMetrics : leadMetrics;
  return (
    <Box className="rounded-lg border border-slate-300 bg-[#fafbfc] p-4">
      <Box className="flex gap-5 overflow-x-auto">
        <Box className="min-w-16">
          <Typography variant="caption" color="text.secondary">
            {source ? "Source" : "Leads"}
          </Typography>
          <Box className="mt-2">{source ? <SourceBars /> : <Donut />}</Box>
        </Box>
        {metrics.map((metric) => (
          <Metric key={metric.label} metric={metric} />
        ))}
      </Box>
    </Box>
  );
}
