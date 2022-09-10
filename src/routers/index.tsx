import React, { Suspense, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router";
import App from "../App";
import { darkTheme, theme } from "../styles/theme";
import Loading from "./loading";
import { getThemeMode,setThemeMode as setStrogeThemeMode } from "../utils/stroge";
import { DevTool } from "./devTool";
import { IS_DEVELOPMENT_MODE } from "../references/constants/env";
import NotifProvider from "../components/Notification";
import lazyPages from "./LazyPages";

//Untuk development
// if (IS_DEVELOPMENT_MODE){
//   const devComponent=[{
//     path: "/design-system",
//     element: React.lazy(() => import("../pages/DesignSystem")),
//     name:"Design System"
//   }];
//   lazyPages.push(...devComponent)
// }

export default function Router() {
  const [themeMode,setThemeMode]=useState(getThemeMode());
  const handleThemeMode=(theme:"normal"|"dark")=>{
    setThemeMode(theme); setStrogeThemeMode(theme);
  };

  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : theme}>
        <NotifProvider>
          {IS_DEVELOPMENT_MODE && <DevTool handleThemeMode={handleThemeMode} />}
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<App />} />
              {lazyPages.map((item) => <Route key={item.path} path={item.path} element={<item.element />} />)}
            </Routes>
          </Suspense>
        </NotifProvider>
    </ThemeProvider>
  )
}
