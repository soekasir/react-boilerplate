// import { App } from "./App/App";
import { HashRouter, Route, Routes } from "react-router-dom";
import React from "react"
import { observer } from "mobx-react";
import App from './App'

const pages = [
  {
    path: "/",
    element: <App/>,
  },
];

export const Router=observer(()=>{

  return(
    <HashRouter>
      <Routes>
        { pages.map((page)=><Route key={page.path} path={page.path} element={page.element}/>) }
      </Routes>
    </HashRouter>
  )
})
