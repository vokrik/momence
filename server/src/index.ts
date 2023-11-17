//Importing project dependancies that we installed earlier
import * as dotenv from 'dotenv'
import errorHandlerMiddleware from "./errorHandlerMiddleware";
import express from 'express'

import cors from 'cors'
import helmet from 'helmet'

import {router as exchangeRatesRouter} from './exchangeRates'

//App Varaibles
dotenv.config()

//intializing the express app
const app = express();

//using the dependancies
app.use(helmet());
app.use(cors());
app.use(express.json())
app.use('/exchange-rates/',exchangeRatesRouter)


app.use(errorHandlerMiddleware)
//exporting app
export default app
