/**
 * file: History Table
 * date: 2021-06-12
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
/** collect data from 3rd party spi */
import axios from "axios";
const ALPHAVATAGE = 'https://www.alphavantage.co'

const ALPHAVATAGE_Key = 'BKCDEVXOJYETOG2M'


export const getStockHistoryPrice = async(symbol)=>
    axios.get(`${ALPHAVATAGE}/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHAVATAGE_Key}`)

export const getStockQuote = async(symbol)=>
    axios.get(`${ALPHAVATAGE}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHAVATAGE_Key}`)