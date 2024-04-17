import { ThemeProvider } from "monday-ui-react-core";
import mondaySdk from "monday-sdk-js";
import { useEffect, useState } from "react";
import App from "./App";

const monday = mondaySdk();

const useGetContext = () => {
  const [context, setContext] = useState({});
  
  useEffect(() => {
    monday.listen("context", (res) => {
      setContext(res.data);
    });
  }, []);
  
  return context;
};

const AppWrapper = () => {
  const context = useGetContext();

  return (
    <ThemeProvider themeConfig={context.themeConfig} systemTheme={context.theme}>
      <App/>
    </ThemeProvider>
  );
};

export default AppWrapper;