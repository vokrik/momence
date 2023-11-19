import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import React, { ChangeEventHandler, useCallback, useState } from "react";
import { NumericFormat } from "react-number-format";
import type { OnValueChange } from "react-number-format";
import {
  convertToCurrency,
  ExchangeRateInfo,
  splitByPopularity,
} from "./model/exchangeRatesService";

type Props = {
  rates: Array<ExchangeRateInfo>;
};

export function Convertor({ rates }: Props) {
  const prioritizedRates = splitByPopularity(rates);
  const defaultRate = prioritizedRates.popular[0] || prioritizedRates.other[0];

  const [state, setState] = useState<{
    amountCzk?: number;
    rate?: ExchangeRateInfo;
  }>({
    amountCzk: undefined,
    rate: defaultRate,
  });

  const handleAmountCzkChange: OnValueChange = useCallback(
    (value) => {
      setState((prevState) => ({ ...prevState, amountCzk: value.floatValue }));
    },
    [setState],
  );

  const handleCurrencyChange: ChangeEventHandler<HTMLSelectElement> =
    useCallback(
      (e) => {
        const newRate = rates.find((rate) => rate.code === e.target.value);
        newRate && setState((prevState) => ({ ...prevState, rate: newRate }));
      },
      [setState, rates],
    );

  if (!rates.length) {
    return null;
  }

  return (
    <Grid data-testid="convertor" container spacing={0}>
      <Grid item xs={9}>
        <NumericFormat
          data-testid="input-czk"
          allowedDecimalSeparators={[",", "."]}
          decimalSeparator={","}
          customInput={AmountCZKField}
          onValueChange={handleAmountCzkChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField disabled fullWidth value={"CZK"} />
      </Grid>

      <Grid item xs={9}>
        <TextField
          data-testid={"convertor-result"}
          disabled
          fullWidth
          value={
            (state.amountCzk &&
              state.rate &&
              convertToCurrency(state.amountCzk, state.rate).toLocaleString(
                "cs-CZ",
                { maximumFractionDigits: 2 },
              )) ||
            ""
          }
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl variant="outlined" fullWidth>
          <NativeSelect
            data-testid="currency-select"
            variant={"outlined"}
            value={state.rate?.code}
            onChange={handleCurrencyChange}
          >
            {prioritizedRates.popular.map((rate) => (
              <option
                data-testid={`currency-popular-${rate.code}`}
                key={rate.code}
                value={rate.code}
              >
                {rate.code}
              </option>
            ))}
            <option disabled>──</option>
            {prioritizedRates.other.map((rate) => (
              <option
                data-testid={`currency-other-${rate.code}`}
                key={rate.code}
                value={rate.code}
              >
                {rate.code}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </Grid>
    </Grid>
  );
}

function AmountCZKField(props: any) {
  return (
    <TextField
      {...props}
      fullWidth
      label="Amount in CZK"
      variant="outlined"
      autoFocus
    />
  );
}
