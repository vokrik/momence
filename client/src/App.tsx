import { createTheme, ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Page as ExchangeRatesPage } from "./components/exchangeRates/Page";

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ce93d8",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback={<div>Loading...</div>}>
              <ExchangeRatesPage />
            </Suspense>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
