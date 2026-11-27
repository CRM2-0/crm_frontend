import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material';
import HeaderActions from './HeaderActions';

export default function Topbar({ isSidebarOpen, onMenuToggle }) {
  return (
    <AppBar
      elevation={0}
      color="inherit"
      className="border-b border-slate-200 bg-white"
      sx={{ display: { xs: 'flex', md: 'none' }, zIndex: (t) => t.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Tooltip title={isSidebarOpen ? 'Close navigation' : 'Open navigation'}>
          <IconButton
            onClick={onMenuToggle}
            aria-label={isSidebarOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isSidebarOpen}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Tooltip>
        <Box className="ml-auto"><HeaderActions /></Box>
      </Toolbar>
    </AppBar>
  );
}
