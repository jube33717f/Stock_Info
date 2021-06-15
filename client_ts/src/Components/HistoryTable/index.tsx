/**
 * file: History Table
 * date: 2021-06-12
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
import React, { useState,useEffect } from 'react';

import style from './style.module.scss'
import { useHistory } from "react-router-dom";
import {getStockHistoryPrice} from '../../Apis'
import  LineChart  from '../LineChart'
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
interface Stocks{
    Date:string,
    Open: string,
    High: string,
    Low: string,
    Close: string,
    Volume: string,
}
interface coord{
    x:string,
    y:string
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
const HistoryTable = ()=>{
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    const [data,setData]=useState<Stocks[]>([])
    const [dataState,setDataState]=useState<coord[]>([])
    const [loading,setLoaidng] = useState(true)
    let history = useHistory();
    const symbol = history.location.pathname.replace('/detail/','')
    useEffect(()=>{
        fetchData()
    },[])
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */    
    /** fetch stock history data from 3rd party spi*/
    const fetchData =async ()=>{
        const req = await getStockHistoryPrice(symbol)

        let arr:Stocks[] = []
        let st:coord[] = []
        let i = 0
        for(let key in req.data["Time Series (Daily)"]){
            
            if(i <= 10){
                i++
                arr.push({
                    Date:key,
                    Open: req.data["Time Series (Daily)"][key]["1. open"],
                    High: req.data["Time Series (Daily)"][key]["2. high"],
                    Low: req.data["Time Series (Daily)"][key]["3. low"],
                    Close: req.data["Time Series (Daily)"][key]["4. close"],
                    Volume: req.data["Time Series (Daily)"][key]["5. volume"]
                })
            }
            
            st.push({
                x:key,
                y:req.data["Time Series (Daily)"][key]["4. close"]})
        }
        
        setData(arr)
        setDataState(st.reverse())
        setLoaidng(false)
    }
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    return(
        <div className={style.table}>
            <div className={style.tableBox}>
                <div className={style.tableBoxHeader}>
                    <h3>History</h3>
                </div>
                <div className={style.tableBoxContent}>
                    {loading?'Loading...':<>
                    <div className={style.tableBoxContentRow}>
                        <p>Date</p>
                        <p>Open</p>
                        <p>Close</p>
                        <p>High</p>
                        <p>Low</p>
                        <p>Volume</p>
                    </div>
                    {data&&data.map((i,index)=>{
                        return<div key={index} className={style.tableBoxContentRow}>
                        <p>{i.Date}</p>
                        <p>{i.Open}</p>
                        <p>{i.Close}</p>
                        <p>{i.High}</p>
                        <p>{i.Low}</p>
                        <p>{i.Volume}</p>
                        </div>
                    }
                        
                    )}
                    <section className={style.tableBoxContentLineChart}>
                    <LineChart state={dataState}/>
                    </section>
                    </>}
                    
                        
             
                </div>
            </div>
        </div>
    )
}
export default HistoryTable