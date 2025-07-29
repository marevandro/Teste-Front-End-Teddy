import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EC6724', 
      contrastText: '#FFFFFF', 
    },
    secondary: {
      main: '#363636'
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});