import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';

/** Shared, accessible loading state for route changes and blocking data requests. */
export default function FullScreenLoader({ label = 'Loading…', contained = false }) {
  return <Backdrop
    open
    sx={{
      position: contained ? 'absolute' : 'fixed',
      inset: contained ? 0 : undefined,
      zIndex: (theme) => theme.zIndex.modal + 1,
      color: 'common.white',
      backgroundColor: 'rgba(15, 23, 42, 0.48)',
    }}
    aria-live="polite"
    aria-busy="true"
  >
    <Stack alignItems="center" spacing={2}>
      <CircularProgress color="inherit" aria-label={label} />
      <Typography variant="body2" fontWeight={600}>{label}</Typography>
    </Stack>
  </Backdrop>;
}
