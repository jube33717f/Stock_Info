/**
 * file: Stock Card
 * date: 2021-06-11
 * author: Jubi
 * lastModify: Jubi 2021-06-11
 */
import React,{useState} from 'react'
import style from './style.module.scss'

const StockCard = (props)=>{

    return(
    <div className={style.card} >
        <div className={style.cardBox} style={{backgroundImage:`url(${props.bg})`}}>
            <div className={style.cardBoxInside}>
                    {props.children}
            </div>
        </div>
    </div>)
}
export default StockCard