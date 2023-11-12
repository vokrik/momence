import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ExchangeRatesPage} from "./ExchangeRatesPage";

const queryClient = new QueryClient()

function App() {


  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <ExchangeRatesPage />
        </QueryClientProvider>
    </div>
  );
}

export default App;
