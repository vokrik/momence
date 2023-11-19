import CurrencyExchangeOutlined from "@mui/icons-material/CurrencyExchangeOutlined";
import { Avatar, Box, Container, CssBaseline, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { Convertor } from "./Convertor";
import Table from "./Table";
import { getRates } from "./model/exchangeRatesService";

export function Page() {
  const { data } = useSuspenseQuery({
    queryKey: ["exchangeRates"],
    queryFn: getRates,
  });
  return (
    <div>
      <Container component="main" fixed maxWidth={"sm"}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ mb: 8, mt: 2, bgcolor: "secondary.main" }}>
            <CurrencyExchangeOutlined />
          </Avatar>
          <Typography component="h1" variant="h2">
            Czech Exchange
          </Typography>

          <Typography component="h2" variant="h5" fontWeight={300}>
            Get the latest exchange rates from Czech Crowns to other major
            currencies
          </Typography>
          <Container fixed sx={{ mt: 10, flexGrow: 1 }}>
            <Convertor rates={data} />
          </Container>
        </Box>
      </Container>
      <Container component="main" fixed maxWidth={"md"}>
        <CssBaseline />
        <Container fixed sx={{ mt: 10 }}>
          <Table rates={data} />
        </Container>
      </Container>
    </div>
  );
}
