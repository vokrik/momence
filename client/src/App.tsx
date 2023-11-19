import React, {Suspense} from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ErrorBoundary} from "react-error-boundary";
import {Page as ExchangeRatesPage} from "./components/exchangeRates/Page";

const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ExchangeRatesPage/>
                    </Suspense>
                </ErrorBoundary>
            </QueryClientProvider>
        </div>
    );
}

export default App;
