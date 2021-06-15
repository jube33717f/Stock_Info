/**
 * file: Login Page
 * date: 2021-06-12
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
 import React,{ ChangeEvent, useState }  from  'react'
 import style from  './style.module.scss'
 import Container from '../../Containers'
 import StockCard from '../../Components/StockCard'
 import { gql, useQuery } from '@apollo/client';
 import { useHistory } from "react-router-dom";
 import Pagination from '@material-ui/lab/Pagination';
 import { getStocks } from './__generated__/getStocks'
/* <------------------------------------ **** GRAPH QUERY START **** ------------------------------------ */
 const GET_STOCKS = gql`
    query getStocks($page: Int) {
        getStocks(page: $page) {
            stocks{
                Name
                Symbol
                Price
                WeekHigh52
                WeekLow52
                PriceEarnings
            }
            total
        }
    }
`;
/* <------------------------------------ **** GRAPH QUERY END **** ------------------------------------ */
 const MoreStocks=  ()=>{
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    const [page, setPage] = useState(1);
    const history = useHistory()
    
    const { loading, error, data } = useQuery<getStocks>(GET_STOCKS , {
        variables: { page: page },
    });
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    const handleChange = (event: ChangeEvent<unknown>,value:number) => {
        setPage(value);
      };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    if (loading) return <p>Loading</p>;
    if (error) return <p>No results</p>;

    const result = data&&data.getStocks?data.getStocks.stocks:null
    const count: number | null= data&&data.getStocks?data.getStocks.total:1
    return (<Container>
        <>
        <div className={style.wapper}>
            {result&&result.map((i,index)=>{
                return <StockCard bg='#fff'>
                    <div 
                    key={index}
                    className={style.cardContent} 
                    onClick={()=>{
                        history.replace(`/detail/${i&&i.Symbol}`)
                    }}
                    >
                            <h2>{i&&i.Name}</h2>
                            <h3>Symbol - {i&&i.Symbol}</h3>
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
                </StockCard>
            })}
        </div>
        <div >   
            <Pagination count={count?count:1} page={page} onChange={handleChange} />
        </div>
        </>
    </Container>)
 }
 export default MoreStocks;