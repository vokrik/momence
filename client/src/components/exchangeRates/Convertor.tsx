import {
    Divider,
    FormControl, Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";


import React, {useCallback, useState} from 'react';
import {NumericFormat} from 'react-number-format'
import type {OnValueChange} from "react-number-format";
import {convertToCurrency, ExchangeRateInfo} from "./exchangeRatesService";

import type {PrioritizedRates} from "./exchangeRatesService";

type Props = {
    rates: PrioritizedRates
}


export function Convertor({rates}: Props) {
    const [state, setState] = useState<{ amountCzk?: number, rate: ExchangeRateInfo }>({
        amountCzk: undefined,
        rate: rates.popular.length ? rates.popular[0] : rates.other[0]
    })

    const handleAmountCzkChange: OnValueChange = useCallback((value) => {
        setState((prevState) => ({...prevState, amountCzk: value.floatValue}))
    }, [setState])

    const handleCurrencyChange = useCallback((event: SelectChangeEvent<string>) => {
        const newRate = [...rates.popular, ...rates.other].find((rate) => rate.code === event.target.value)
        newRate && setState((prevState) => ({...prevState, rate: newRate}))
    }, [setState, rates])
    return (
        <Grid container spacing={0}>
        <Grid item xs={9}>
            <NumericFormat  allowedDecimalSeparators={[",", "."]} decimalSeparator={','}
                                   customInput={AmountCZKField} onValueChange={handleAmountCzkChange}/>
        </Grid>
            <Grid item xs={3}>
                <TextField disabled fullWidth value={"CZK"} />
            </Grid>

        <Grid item xs={9}>
            <TextField disabled fullWidth value={state.amountCzk && convertToCurrency(state.amountCzk, state.rate ).toLocaleString( 'cs-CZ', {maximumFractionDigits:2})} />
        </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={state.rate.code}
                        label="Currency"
                        onChange={handleCurrencyChange}
                    >
                        {rates.popular.map((rate) => <MenuItem key={rate.code} value={rate.code}>{rate.code}</MenuItem>)}
                        <Divider/>
                        {rates.other.map((rate) => <MenuItem key={rate.code} value={rate.code}>{rate.code}</MenuItem>)}
                    </Select>
                </FormControl>

            </Grid>
    </Grid>
    )
}

function AmountCZKField (props: any) {
    return <TextField {...props} fullWidth label="Amount in CZK" variant="outlined" autoFocus  />
}

