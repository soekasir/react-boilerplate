import React from "react";

const lazyPages = [
  {
    path: "/login",
    element: React.lazy(() => import("../pages/Login")),
    name:"Login",
  },
  {
    path: "/product/create",
    element: React.lazy(() => import("../pages/Products/FormProduct")),
    name:"Create Product",
  },
  {
    path: "/product/category/create",
    element: React.lazy(() => import("../pages/Products/FormCategory")),
    name:"Create Category"
  },
  {
    path: "/product/list",
    element: React.lazy(() => import("../pages/Products/ListProduct")),
    name:"Product List",
  }
];

export default lazyPages;