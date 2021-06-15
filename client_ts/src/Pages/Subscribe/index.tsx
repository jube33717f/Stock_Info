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

import {getSubscribes} from './__generated__/getSubscribes'
import {cancelSubscribe} from './__generated__/cancelSubscribe'
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
    const [removed ,setRemoved]= useState<string[]>([])
    const [ addTodo, { loading: loading_cancel, error: error_cancel,data: data_cancel}] = useMutation<cancelSubscribe>(CANCEL_SUBSCRIBE);
    const { loading, error, data } = useQuery<getSubscribes>(GET_SUBSCRIBES , {
        variables: { id:parseInt(sessionStorage.getItem("userid")||'') },
      });
    /* <------------------------------------ **** STYLE COMPONENT END **** ------------------------------------ */
    if (loading || loading_cancel) return <p>Loading...</p>
    if (error||error_cancel) return <p>Something Error</p>;
    if(!data) return  <p>Loading...</p>
    const result =data.getSubscribes
    return  (<>
        
        
        <div className={style.header}> <p>Subscribes:</p></div>
           
        {result&&result.length>0&&result.map((i,index)=>{
            return(<StockCard bg='#fff'>
            <div key={index}  className={style.cardContent} >
                    <h2 onClick={()=>{
                        history.replace(`/detail/${i&&i.Symbol}`)
                    }}>{i&&i.Name}</h2>
                    <h3 onClick={()=>{
                        history.replace(`/detail/${i&&i.Symbol}`)
                    }}>Symbol - {i&&i.Symbol}</h3>
                    <ColorButton 
                    variant="contained" 
                    color="primary"
                    onClick={()=>{
                        addTodo({ variables: { id: parseInt(sessionStorage.getItem("userid")||''), Symbol:`${i&&i.Symbol}`} })
                        setRemoved([...removed,`${i&&i.Symbol}`])
                    }}
                    >
                        {removed.includes(`${i&&i.Symbol}`)?'Removed':'Unsubscribe'}
                    </ColorButton>
                    <div className={style.cardContentTable}>  
                        <div className={style.cardContentTableCell}>
                            <p>Price</p>
                            <span>{i&&i.Price}</span>
                        </div>
                        <div className={style.cardContentTableCell}>
                            <p>52 Weeks High</p>
                            <span>{i&&i.WeekHigh52}</span>
                        </div>
                        <div  className={style.cardContentTableCell}>
                            <p>52 Weeks Low</p>
                            <span>{i&&i.WeekLow52}</span>
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

