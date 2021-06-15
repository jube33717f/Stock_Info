/**
 * file: Detail page
 * date: 2021-06-11
 * author: Jubi
 * lastModify: Jubi 2021-06-13
 */
import React from 'react'
import { useHistory } from "react-router-dom";
import { gql, useQuery,useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Container from '../../Containers'
import StockCard from '../../Components/StockCard'
import HistoryTable from '../../Components/HistoryTable'


import style from './style.module.scss'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { purple} from '@material-ui/core/colors';

import {booking} from './__generated__/booking'
import {getStocksBySymbol} from './__generated__/getStocksBySymbol'
import {isStockBookedByUser} from './__generated__/isStockBookedByUser'
/* <------------------------------------ **** GRAPH QUERY START **** ------------------------------------ */
export const GET_ONE_STOCK = gql`
        query getStocksBySymbol($Symbol: String!) {
            getOneStock(Symbol: $Symbol) {
                Name
                Symbol
                Price
                WeekHigh52
                WeekLow52
                PriceEarnings
            }
        }
`;
const GET_IS_BOOKED = gql`
    query isStockBookedByUser($id:Int,$Symbol: String!) {
        isStockBookedByUser(id: $id, Symbol: $Symbol) 
    }
`;

const SUBSCRIBE = gql`
    mutation booking($id: Int,$Symbol: String) {
        booking(id: $id, Symbol:$Symbol) {
            success
            message
        }
    }
`
/* <------------------------------------ **** GRAPH QUERY END **** ------------------------------------ */
/* <------------------------------------ **** STYLE COMPONENT START **** ------------------------------------ */
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      marginBottom:'1rem',
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Button);
/* <------------------------------------ **** STYLE COMPONENT END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
function GetOneStock(){
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    let history = useHistory();
    const symbol = history.location.pathname.replace('/detail/','')
    const [addTodo, { loading: mutationLoading, error: mutationError ,data:data_subscribe }] = useMutation<booking>(SUBSCRIBE);

    const { loading, error, data } = useQuery<getStocksBySymbol>(GET_ONE_STOCK , {
        variables: { Symbol:symbol },
    });

    const { loading:loading_booked, error:error_booked, data:data_booked } = useQuery<isStockBookedByUser>(GET_IS_BOOKED  , {
        variables: {id: parseInt(sessionStorage.getItem("userid")||''),Symbol:symbol },
    });
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    const subscribeStock = ()=>{
        addTodo({ variables: { 
            id: parseInt(sessionStorage.getItem("userid")||''), 
            Symbol:`${symbol}`} })
    }
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    let booked:boolean = false
   
    if(loading || loading_booked ){
        return <p>Loading</p>;
    }else if(error || error_booked){
        return <p>Something error..</p>;
    }else if(sessionStorage.getItem("userid") !== null && data_booked){     
        booked = data_booked.isStockBookedByUser    
    }

    if(!data ||!data_booked ) return <p> rendering...</p>
    return (
        <>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
        {!mutationLoading &&!mutationError&&<StockCard bg='https://cdn.wallpapersafari.com/26/89/2t05m8.jpg'>
            <div className={style.cardContent} >
                    <h2>{data.getOneStock.Name}</h2>
                    <h3>Symbol - {data.getOneStock.Symbol}</h3>
                    
                    {sessionStorage.getItem("userid") === null?<Link to='/login'>
                        <ColorButton variant="contained" color="primary" >
                            Subscribe
                        </ColorButton>
                    </Link>:(data_booked.isStockBookedByUser ?<ColorButton variant="contained" color="primary" >
                            Subscribed
                        </ColorButton>:<ColorButton variant="contained" color="primary" onClick={subscribeStock} >
                            {data_subscribe&&data_subscribe.booking.message===`${data.getOneStock.Symbol}`?'Subscribed':'Subscribe'}
                        </ColorButton>)}
                        
                    <div className={style.cardContentTable}>  
                        <div className={style.cardContentTableCell}>
                            <p>Price</p>
                            <span>{data.getOneStock.Price}</span>
                        </div>
                        <div className={style.cardContentTableCell}>
                            <p>52 Weeks High</p>
                            <span>{data.getOneStock.WeekHigh52}</span>
                        </div>
                        <div  className={style.cardContentTableCell}>
                            <p>52 Weeks Low</p>
                            <span>{data.getOneStock.WeekLow52}</span>
                        </div>
                    </div>             
            </div>
        </StockCard>}
    </>
    )
        
    
  
    
}
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Detail = ()=>{
    

    let history = useHistory();
    const symbol = history.location.pathname.replace('/detail/','')

    
    
    return (<>
        <Container>
            <div className={style.detail}>
                <section className={style.detailHeader}>
                    <GetOneStock/>
                </section>
                <section className={style.history}><HistoryTable /></section>
            </div>
            
        </Container></>
    )
}
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Detail;