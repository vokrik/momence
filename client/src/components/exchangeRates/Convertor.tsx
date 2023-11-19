import styled from "@emotion/styled";
import {
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
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
      <Grid item xs={6}>
        <NumericFormat
          data-testid="input-czk"
          allowedDecimalSeparators={[",", "."]}
          decimalSeparator={","}
          customInput={AmountCZKField}
          onValueChange={handleAmountCzkChange}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          variant="standard"
          label="From"
          disabled
          fullWidth
          value={"CZK"}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="currency-select">
            To
          </InputLabel>
          <NativeSelect
            data-testid="currency-select"
            id="currency-select"
            aria-label={"To"}
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
      <Grid item xs={12} mt={5}>
        <Result>
          {state.amountCzk &&
            state.rate &&
            convertToCurrency(state.amountCzk, state.rate).toLocaleString(
              "cs-CZ",
              {
                maximumFractionDigits: 2,
                style: "currency",
                currency: state.rate.code,
              },
            )}
        </Result>
      </Grid>
    </Grid>
  );
}

function AmountCZKField(props: any) {
  return (
    <TextField
      {...props}
      fullWidth
      label="Convert"
      placeholder={"Enter amount"}
      variant="standard"
      autoFocus
    />
  );
}

const Result = styled.div`
  font-size: 3rem;
`;
