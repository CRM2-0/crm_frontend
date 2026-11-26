import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: { primary: { main: '#070f50', contrastText: '#fff' }, secondary: { main: '#f0bd72' }, success: { main: '#27866b' }, warning: { main: '#df9c28' }, error: { main: '#ce4545' }, background: { default: '#f6f7fa', paper: '#fff' }, text: { primary: '#111a35', secondary: '#68728a' } },
  shape: { borderRadius: 10 },
  typography: { fontFamily: 'Inter, system-ui, sans-serif', h5: { fontWeight: 700 } },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiCard: { styleOverrides: { root: { borderColor: '#e8ebf1', boxShadow: '0 2px 8px rgba(18, 32, 69, .04)' } } },
    MuiPaper: { styleOverrides: { root: { borderColor: '#e8ebf1' } } },
    MuiTableCell: { styleOverrides: { head: { color: '#68728a', fontWeight: 700, whiteSpace: 'nowrap' }, body: { borderColor: '#edf0f5' } } },
  },
});
