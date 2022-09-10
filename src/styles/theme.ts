// eslint-disable-next-line import/no-extraneous-dependencies
import { createTheme, useTheme } from '@mui/material';
import { getThemeMode } from '../utils/stroge';
// import { createBreakpoints } from '@mui/system';
// const breakpoints = createBreakpoints({});

export const theme = createTheme({
  typography: {
    fontFamily: 'Nunito',
    button: {
      textTransform: 'none',
      fontSize: 14,
      fontWeight: 700,
    },
    h1: {
      fontSize: 34,
      fontWeight: 700,
    },
    h2: {
      fontSize: 30,
      fontWeight: 700,
    },
    h3: {
      fontSize: 28,
      fontWeight: 600,
    },
    h4: {
      fontSize: 24,
      fontWeight: 600,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 16,
      fontWeight: 600,
    },
    overline: {
      fontSize: 16,
      fontWeight: 600,
    },
    caption: {
      fontSize: 16,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 400,
    },
    body1: {
      fontSize: 12,
      fontWeight: 600,
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  palette: {
    secondary: {
      contrastText: '#2863FA',
      main: 'rgba(40, 99, 250, 0.05)'
    },
    primary: {
      contrastText: '#FFFFFF',
      main: '#2863FA'
    },
    error: {
      contrastText: '#FFF8F0', //'#F5D8D6',
      main: '#FF5050' //'#CB3A31',
    },
    success: {
      contrastText: '#D9E9E2',
      main: '#43936C'
    },
    warning: {
      contrastText: '#4B4B4B',
      main: '#FCCE74' //'#FFAA67'
    },
    text: {
      primary: '#4B4B4B', //'#434343',
      secondary: '#6A6A6A',
      disabled: '#BFBFBF',
    },
    background: {
      default: '#FFFFFF',
      paper:'#faf9ff'
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: 'Nunito',
    button: {
      textTransform: 'none',
      fontSize: 14,
      fontWeight: 700,
    },
    h1: {
      fontSize: 34,
      fontWeight: 700,
    },
    h2: {
      fontSize: 30,
      fontWeight: 700,
    },
    h3: {
      fontSize: 28,
      fontWeight: 600,
    },
    h4: {
      fontSize: 24,
      fontWeight: 600,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 16,
      fontWeight: 600,
    },
    overline: {
      fontSize: 16,
      fontWeight: 600,
    },
    caption: {
      fontSize: 16,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 400,
    },
    body1: {
      fontSize: 12,
      fontWeight: 600,
    },
    body2: {
      fontSize: 12,
      fontWeight: 400,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      contrastText: '#326C94',
      main: '#FFFFFF'
    },
    secondary: {
      contrastText: '#CED9F3',
      main: '#3267E3'
    },
    error: {
      contrastText: '#F5D8D6',
      main: '#CB3A31'
    },
    success: {
      contrastText: '#D9E9E2',
      main: '#43936C'
    },
    warning: {
      contrastText: '#FFF8F0',
      main: '#FFAA67'
    },
    background: {
      default: '#FFFFFF',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
});

export const isDarkMode=()=> getThemeMode() === "dark";

export function isColorDark(color:any) {
  let r, g, b;

  if (color.match(/^rgb/)) {
    // jika rgb(number,number,number) ambil angkanya
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = color[1]; g = color[2]; b = color[3];
  } else {
    //jika hexadcimal ubah ke decimal lalu ubah ke rgb
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
    r = color >> 16; g = (color >> 8) & 255; b = color & 255;
  }

  //kepadatan warna kurang dr 255/2
  return Math.sqrt( 0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b) )<127.5;
}

export function getContrastText(color:any){
  // return isColorDark(color)?"#FFFFFF":"#000000";
  if(color==="#010101") return "#FFFFFF";
  return "#000000"
}
