"use client"

import { createTheme } from "@mui/material";

export const lightTheme = createTheme ({
  palette: {
    primary: {
      main: '#5374b2',
    },
    secondary: {
      main: '#d099d1',
    },
    background: {
      paper: '#f5f6fa',
    },
    text: {
      primary: '#07090e',
      secondary: '#07090e',
    },
    info: {
      main: '#c680a7',
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
            color: '#f5f6fa',
            backgroundColor: '#5374b2',
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
            color: '#f5f6fa',
        },
        outlined: {
            color: '#07090e'
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