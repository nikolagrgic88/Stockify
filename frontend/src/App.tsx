import { Outlet } from "react-router";
import { GlobalLoader, MainFooter, MainHeader } from "./shared";
import { useThemeState } from "./state";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import GlobalErrorModal from "./shared/components/GlobalErrorModal";

function App() {
  const theme = useThemeState((state) => state.theme);

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      background: {
        default: theme === "light" ? "#cdcfd6ff" : "#0a0a0a",
      },
    },
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <main className={`flex flex-col mt-10 `}>
        <GlobalErrorModal />
        <GlobalLoader />
        <MainHeader />
        <div className="flex items-center justify-center grow  mt-10 ">
          <Outlet />
        </div>
        <MainFooter />
      </main>
    </ThemeProvider>
  );
}

export default App;
