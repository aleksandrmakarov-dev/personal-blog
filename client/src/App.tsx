import { ThemeProvider, createTheme } from "@mui/material";
import QueryProvider from "./providers/QueryProvider";
import { Router } from "./providers/RouterProvider";

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2563eb",
        "50": "#eff6ff",
        "100": "#dbeafe",
        "200": "#bfdbfe",
        "300": "#93c5fd",
        "400": "#60a5fa",
        "500": "#3b82f6",
        "600": "#2563eb",
        "700": "#1d4ed8",
        "800": "#1e40af",
        "900": "#1e3a8a",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryProvider>
        <Router />
      </QueryProvider>
    </ThemeProvider>
  );
}
