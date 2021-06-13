/**
 * file: Login Page
 * date: 2021-06-12
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
 import React,{ useState }  from  'react'
 import style from  './style.module.scss'
 import Container from '../../Containers'
 import StockCard from '../../Components/StockCard'
 import { gql, useQuery } from '@apollo/client';
 import { useHistory } from "react-router-dom";
 import Pagination from '@material-ui/lab/Pagination';

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
    
    const { loading, error, data } = useQuery(GET_STOCKS , {
        variables: { page: page },
    });
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    const handleChange = (event, value) => {
        setPage(value);
      };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    if (loading) return <p>Loading</p>;
    if (error) return <p>No results</p>;

    const result = data.getStocks.stocks
    const count = data.getStocks.total
    return (<Container>
        <div className={style.wapper}>
            {result.map((i)=>{
                return <StockCard bg='#fff'>
                    <div 
                    className={style.cardContent} 
                    onClick={()=>{
                        history.replace(`/detail/${i.Symbol}`)
                    }}
                    >
                            <h2>{i.Name}</h2>
                            <h3>Symbol - {i.Symbol}</h3>
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
                </StockCard>
            })}
        </div>
        <div >   
            <Pagination count={count} page={page} onChange={handleChange} />
        </div>
    </Container>)
 }
 export default MoreStocks;