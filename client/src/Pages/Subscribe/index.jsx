/**
 * file: Subscribes Page
 * date: 2021-06-12
 * author: Jubi
 * lastModify: Jubi 2021-06-13
 */
import React,{useState,useCallback,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import style from './style.module.scss'
import Container from '../../Containers'
import StockCard from '../../Components/StockCard'
import { gql, useQuery, useMutation } from '@apollo/client';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
/* <------------------------------------ **** GRAPH QUERY START **** ------------------------------------ */
const GET_SUBSCRIBES = gql`
    query getSubscribes($id: Int!) {
        getSubscribes(id: $id) {
            Name
            Symbol
            Price
            WeekHigh52
            WeekLow52
            PriceEarnings
        }
    }
`;
const CANCEL_SUBSCRIBE = gql`
    mutation cancelSubscribe($id: Int!,$Symbol: String!) {
        cancelSubscribe(id: $id, Symbol: $Symbol) {
            success
            message
        }
    }
`;
/* <------------------------------------ **** GRAPH QUERY END **** ------------------------------------ */
/* <------------------------------------ **** STYLE COMPONENT START **** ------------------------------------ */
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      marginBottom:'1rem',
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);
/* <------------------------------------ **** STYLE COMPONENT END **** ------------------------------------ */
const Bookings = ()=>{
    /* <------------------------------------ **** STYLE COMPONENT START **** ------------------------------------ */
    const history = useHistory()
 
    const [ addTodo, { loading: loading_cancel, error: error_cancel,data: data_cancel}] = useMutation(CANCEL_SUBSCRIBE);
    const { loading, error, data } = useQuery(GET_SUBSCRIBES , {
        variables: { id:parseInt(sessionStorage.getItem('userid')) },
      });
    /* <------------------------------------ **** STYLE COMPONENT END **** ------------------------------------ */
    if (loading) return <p>Loading...</p>
    if (error) return `Error! ${error}`;
    console.log(data.getSubscribes)
    if(!data) return  <p>Loading...</p>
    const result =data.getSubscribes
    return  (<>
        
        
        <div className={style.header}> <p>Subscribes:</p></div>
           
        {result.length>0&&result.map((i)=>{
            console.log(i)
            return(<StockCard bg='#fff'>
            <div className={style.cardContent} >
                    <h2 onClick={()=>{
                        history.replace(`/detail/${i.Symbol}`)
                    }}>{i.Name}</h2>
                    <h3 onClick={()=>{
                        history.replace(`/detail/${i.Symbol}`)
                    }}>Symbol - {i.Symbol}</h3>
                    <ColorButton 
                    variant="contained" 
                    color="primary"
                    onClick={()=>{
                        addTodo({ variables: { id: parseInt(sessionStorage.getItem("userid")), Symbol:`${i.Symbol}`} })
                 
                    }}
                    >
                        {data_cancel&&data_cancel.cancelSubscribe.message===`${i.Symbol}`?'Removed':'Unsubscribe'}
                    </ColorButton>
                    <div className={style.cardContentTable}>  
                        <div className={style.cardContentTableCell}>
                            <p>Price</p>
                            <span>{i.Price}</span>
                        </div>
                        <div className={style.cardContentTableCell}>
                            <p>52 Weeks High</p>
                            <span>{i.WeekHigh52}</span>
                        </div>
                        <div  className={style.cardContentTableCell}>
                            <p>52 Weeks Low</p>
                            <span>{i.WeekLow52}</span>
                        </div>
                    </div>                            
            </div>
        </StockCard>)
            })
            }
        
                    
        </>)
}
const Subscribe = ()=>{
   
    
    return (<Container>
        <div className={style.wapper}>
        {sessionStorage.getItem("userid") === null?<>Please Login first</>:<Bookings  />}</div>
    </Container>)
}

export default Subscribe;

