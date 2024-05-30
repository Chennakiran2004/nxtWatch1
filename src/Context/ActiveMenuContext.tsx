import React from "react";

const ActiveMenuContext = React.createContext({
  activeMenu: "INITIAL",
  changeActiveMenu: (menu: string) => {},
});

export default ActiveMenuContext;
