import CurrencyExchangeOutlined from "@mui/icons-material/CurrencyExchangeOutlined";
import {
    Avatar,
    Box,

    Container, createTheme,
    CssBaseline,
    ThemeProvider,
    Typography
} from "@mui/material";
import {useSuspenseQuery} from "@tanstack/react-query";
import React from "react";
import {Convertor} from "./Convertor";
import Table from "./Table";
import {getRates} from "./model/exchangeRatesService";

const theme = createTheme()

export function Page() {

    const {data} = useSuspenseQuery({queryKey: ['exchangeRates'], queryFn: getRates})
    return (<div>
        <ThemeProvider theme={theme}>
            <Container component="main" fixed maxWidth={"xs"}>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <CurrencyExchangeOutlined/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Convert Czech Crowns
                    </Typography>
                    <Container fixed sx={{mt: 1, flexGrow: 1}}>
                        <Convertor rates={data}/>
                    </Container>
                </Box>
            </Container>
        </ThemeProvider>
        <Table rates={data}/>
    </div>)
}