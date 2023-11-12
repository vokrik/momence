import React from "react";
import {useQuery} from "@tanstack/react-query";
import {getExchangeRates} from "./model/ExchangeRatesService";

export function ExchangeRatesPage() {
    const query = useQuery({queryKey: ['todos'], queryFn: getExchangeRates})

    return (<div>
        <h1>Exchange Rates</h1>
        <div>
            {query.data?.map((item: any) => (
                <div key={item.id}>
                    <span>{item.id}</span>
                    <span>{item.name}</span>
                    <span>{item.symbol}</span>
                </div>
            ))}
        </div>
    </div>)
}