/**
 * file: Login Page
 * date: 2021-06-12
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
import style from  './style.module.scss'
import Container from '../../Containers'
import StockCard from '../../Components/StockCard'
import { gql, useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";

/* <------------------------------------ **** GRAPH QUERY START **** ------------------------------------ */
const GET_ONE_STOCK = gql`
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
/* <------------------------------------ **** GRAPH QUERY START **** ------------------------------------ */
const ResultBySymbol =  ()=>{
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    const history = useHistory()
    const symbol = history.location.pathname.replace('/search-symbol/','')
    const { loading, error, data } = useQuery(GET_ONE_STOCK , {
        variables: { Symbol:symbol },
    });
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    if (loading) return <p>Loading</p>;
    if (error) return `Error! ${error}`;
    const result =data.getOneStock 
    return (<Container>
        <div className={style.wapper}>
            {loading?'Loading...':(error?<p>No results</p>:
            <StockCard>
            <div 
            className={style.cardContent} 
            onClick={()=>{
                history.replace(`/detail/${result.Symbol}`)
            }}
            >
                    <h2>{result.Name}</h2>
                    <h3>Symbol - {result.Symbol}</h3>
                    <div className={style.cardContentTable}>  
                        <div className={style.cardContentTableCell}>
                            <p>Price</p>
                            <span>{result.Price}</span>
                        </div>
                        <div className={style.cardContentTableCell}>
                            <p>52 Weeks High</p>
                            <span>{result.WeekHigh52}</span>
                        </div>
                        <div  className={style.cardContentTableCell}>
                            <p>52 Weeks Low</p>
                            <span>{result.WeekLow52}</span>
                        </div>
                    </div>             
            </div>
        </StockCard>)
            }
        </div>
    </Container>)
}
export default ResultBySymbol

