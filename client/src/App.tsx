import React, {Suspense} from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Page as ExchangeRatesPage} from "./components/exchangeRates/Page";

const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<div>Loading...</div>}>
                    <ExchangeRatesPage/>
                </Suspense>
            </QueryClientProvider>
        </div>
    );
}

export default App;
