/**
 * file: Login Page
 * date: 2021-06-12
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
import React from 'react'
import style from  './style.module.scss'
import Container from '../../Containers'
import StockCard from '../../Components/StockCard'
import { useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";
import {GET_ONE_STOCK } from '../Detail'
import {getStocksBySymbol,getStocksBySymbol_getOneStock } from '../Detail/__generated__/getStocksBySymbol'
const ResultBySymbol =  ()=>{
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    const history = useHistory()
    const symbol = history.location.pathname.replace('/search-symbol/','')
    const { loading, error, data } = useQuery<getStocksBySymbol>(GET_ONE_STOCK , {
        variables: { Symbol:symbol },
    });
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    if (loading) return <p>Loading</p>;
    if (error) return <p>No Matched result</p>;
    const result:getStocksBySymbol_getOneStock |null = data?data.getOneStock:null
    return (<Container>
        <>
        <div className={style.wapper}>
            {
            <StockCard>
            <div 
            className={style.cardContent} 
            onClick={()=>{
                history.replace(`/detail/${result&&result.Symbol}`)
            }}
            >
                    <h2>{result&&result.Name}</h2>
                    <h3>Symbol - {result&&result.Symbol}</h3>
                    <div className={style.cardContentTable}>  
                        <div className={style.cardContentTableCell}>
                            <p>Price</p>
                            <span>{result&&result.Price}</span>
                        </div>
                        <div className={style.cardContentTableCell}>
                            <p>52 Weeks High</p>
                            <span>{result&&result.WeekHigh52}</span>
                        </div>
                        <div  className={style.cardContentTableCell}>
                            <p>52 Weeks Low</p>
                            <span>{result&&result.WeekLow52}</span>
                        </div>
                    </div>             
            </div>
        </StockCard>
            }
        </div>
        </>
    </Container>)
}
export default ResultBySymbol

