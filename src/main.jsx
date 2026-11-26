import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App';
import { store } from './app/store';
import { theme } from './theme/theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}><LocalizationProvider dateAdapter={AdapterDayjs}><CssBaseline /><App /></LocalizationProvider></ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
