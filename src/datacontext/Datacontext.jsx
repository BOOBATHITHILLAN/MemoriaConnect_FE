import React, { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme";

const Datacontext = createContext({});

export const DataProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme(themeSettings(mode)));
  const url = "https://memoriaconnect-be.onrender.com";
  // const url="http://localhost:3001"

  return (
    <Datacontext.Provider value={{ url, theme, mode, setMode }}>
      {children}
    </Datacontext.Provider>
  );
};

export default Datacontext;
