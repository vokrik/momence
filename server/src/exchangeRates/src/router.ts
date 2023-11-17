import express from 'express'
import {getExchangeRates} from './exchangeRatesService'

const router = express.Router()


router.get('/', async (req, res) => {

    res.json({rates: await getExchangeRates()})
})

export {router}