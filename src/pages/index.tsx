import Container from "typedi";
import { HashRouter, Route, Routes } from "react-router-dom";
import { GlobalOptionService } from "../modules/Option/GlobalOptionService";
import { useEffect, useState } from "react"
import { observer } from "mobx-react";
import { changeTheme, muiDarkTheme, muiLightTheme } from "../styles/theme";
import { ThemeProvider } from "@mui/material";

const pages = [
  {
    path: "/",
    element: <>Hello</>,
  },
];

export const Router = observer(() => {
  const globalOptions = Container.get(GlobalOptionService)

  useEffect(() => {
    changeTheme(globalOptions.appTheme)
  },
    [globalOptions.appTheme]);

  return (
    <ThemeProvider theme={globalOptions.appTheme.includes('Dark') ? muiDarkTheme : muiLightTheme}>
      <HashRouter>
        <Routes>
          {pages.map((page) => <Route key={page.path} path={page.path} element={page.element} />)}
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
})
