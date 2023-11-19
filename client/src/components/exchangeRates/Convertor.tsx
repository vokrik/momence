import styled from "@emotion/styled";
import {
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";

import React, { ChangeEventHandler, useCallback, useState } from "react";
import { NumericFormat } from "react-number-format";
import type { OnValueChange } from "react-number-format";
import {
  convertToCurrency,
  ExchangeRateInfo,
  PrioritizedRates,
  splitByPopularity,
} from "./model/exchangeRatesService";

type Props = {
  rates: Array<ExchangeRateInfo>;
};

type State = {
  amountCzk?: number;
  rate?: ExchangeRateInfo;
};

export function Convertor({ rates }: Props) {
  const prioritizedRates = splitByPopularity(rates);
  const defaultRate = prioritizedRates.popular[0] || prioritizedRates.other[0];

  const [state, setState] = useState<State>({
    amountCzk: undefined,
    rate: defaultRate,
  });

  const handleAmountChange: OnValueChange = useCallback(
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
        <AmountField handleAmountChange={handleAmountChange} />
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
        <CurrencySelect
          handleCurrencyChange={handleCurrencyChange}
          prioritizedRates={prioritizedRates}
          selectedRate={state.rate}
        />
      </Grid>
      <Grid item xs={12} mt={5}>
        <Result {...state} />
      </Grid>
    </Grid>
  );
}

type CurrencySelectProps = {
  handleCurrencyChange: ChangeEventHandler<HTMLSelectElement>;
  prioritizedRates: PrioritizedRates;
  selectedRate?: ExchangeRateInfo;
};

function CurrencySelect({
  selectedRate,
  prioritizedRates,
  handleCurrencyChange,
}: CurrencySelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel variant="standard" htmlFor="currency-select">
        To
      </InputLabel>
      <NativeSelect
        data-testid="currency-select"
        id="currency-select"
        aria-label={"To"}
        value={selectedRate?.code}
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
  );
}

function AmountField({
  handleAmountChange,
}: {
  handleAmountChange: OnValueChange;
}) {
  return (
    <NumericFormat
      data-testid="input-czk"
      allowedDecimalSeparators={[",", "."]}
      decimalSeparator={","}
      customInput={AmountTextField}
      onValueChange={handleAmountChange}
    />
  );
}

function AmountTextField(props: TextFieldProps) {
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

function Result({ amountCzk, rate }: State) {
  const convertedValue =
    amountCzk && rate ? convertToCurrency(amountCzk, rate) : 0.0;

  return (
    <ResultWrapper data-testid="convertor-result">
      {convertedValue.toLocaleString("cs-CZ", {
        style: "currency",
        currency: rate?.code,
        maximumFractionDigits: 2,
      })}
    </ResultWrapper>
  );
}

const ResultWrapper = styled.div`
  font-size: 3rem;
`;
