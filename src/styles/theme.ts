import { createTheme } from "@mui/material";

export interface AppTheme{
  [cssVariable: string]: string
}

/**
 *
 * @param cssVariable example: `--bg-main`
 * @param color example: `#1a1a1a`
 */

/** blueDark */
const blueDark={
  "--bg-primary": "#1a1a1a",
  "--bg-secondary": "#303030",
  "--bg-main": "rgba(48, 107, 176)",

  "--text-primary": "#FFFFFF",
  "--text-primary-contrast": "#000000",
  "--text-secondary": "#b9b9b9",
};

/** blueLight */
const blueLight={
  "--bg-primary": "#ffffff",
  "--bg-secondary": "#dbdbdb",
  "--bg-main": "rgba(48, 107, 176)",

  "--text-primary": "#000000",
  "--text-primary-contrast": "#ffffff",
  "--text-secondary": "#4e4e4e",
};

export const appTheme: {
  [themeName: string]: AppTheme;
} = {
  blueDark,
  blueLight,
  orangeDark: {
    ...blueDark,
    "--bg-main": "rgb(209, 72, 8)",
  },
  orangeLight: {
    ...blueLight,
    "--bg-main": "rgb(209, 72, 8)",
  },
};

export function changeTheme(themeName: string ) {
  const theme=appTheme[themeName];
  for (const key in theme) {
    document.body.style.setProperty(key, theme[key]);
  }
}


export const isPortrait=()=>{
  return window.screen.height>window.screen.width
}

export const fitContainer={ width: "100%", height: "100%" }

export const leftPanelWidth="36px";

export const muiDarkTheme = createTheme({ palette: { mode: 'dark' } });

export const muiLightTheme = createTheme({ palette: { mode: 'light' } });