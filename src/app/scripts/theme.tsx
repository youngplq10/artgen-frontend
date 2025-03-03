"use client"

import { createTheme } from "@mui/material";

export const theme = createTheme ({
  palette: {
    primary: {
      main: '#456bcb',
    },
    secondary: {
      main: '##8aa7ef',
    },
    background: {
      paper: '#f7f8fb',
    },
    text: {
      primary: '#0c0d11',
      secondary: '#0c0d11',
    },
    info: {
      main: '##3c73fb',
    },
    error: {
        main: '#C60031'
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontSize: 64,
      fontWeight: 300,
      letterSpacing: '0em',
    },
    h2: {
      fontWeight: 300,
      fontSize: 48,
      letterSpacing: '0em',
    },
    h3: {
      fontSize: 36,
      fontWeight: 300,
    },
    h4: {
      fontSize: 24,
      fontWeight: 300,
      letterSpacing: '0em',
    },
    h5: {
      fontSize: 18,
      fontWeight: 300,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: 12,
      fontWeight: 300,
      letterSpacing: '0em',
    },
    body1: {
      fontSize: 16,
      fontWeight: 300,
      letterSpacing: '0em',
    },
    body2: {
      fontSize: 16,
      fontWeight: 100,
      letterSpacing: '0em',
    },
    subtitle1: {
      fontSize: 12,
      letterSpacing: '0em',
    },
    subtitle2: {
      fontSize: 12,
      fontWeight: 100,
      letterSpacing: '0em',
    },
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: '#f7f8fb',
            backgroundColor: '##456bcb',
            borderRadius: '10px',
            padding: '5px 20px 5px 20px',
          },
        },
        {
            props: { variant: 'outlined' },
            style: {
              color: '#0c0d11',
              borderRadius: '10px',
              padding: '05px 20px 5px 20px'
            },
        }
      ],


      styleOverrides: {
        contained: {
            color: '#fff',
        },
        outlined: {
            color: '#000'
        },
        sizeSmall: {
          fontSize: '0.55rem',
          padding: '2px 4px', 
          minWidth: '100%',  
        },
      }
    },
  },
});