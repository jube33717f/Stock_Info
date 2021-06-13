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
 const GET_SYMBOL_SEARCH_RESULT = gql`
    query searchStockByName($keyword: String!) {
        searchStockByName(keyword: $keyword) {
            Name
            Symbol
            Price
            WeekHigh52
            WeekLow52
            PriceEarnings
        }
    }
`;
/* <------------------------------------ **** GRAPH QUERY END **** ------------------------------------ */
 const ResultByKeyword =  ()=>{
     /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    const history = useHistory()
    const keyword = history.location.pathname.replace('/search-keyword/','')

    const { loading, error, data } = useQuery(GET_SYMBOL_SEARCH_RESULT, {
        variables: { keyword:keyword },
    });
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    if (loading) return <p>Loading</p>;
    if (error) return <p>No results</p>;
    const result =data.searchStockByName
    return (<Container>
        <div className={style.wapper}>
            {loading?'Loading...':((error||result.length<1)?<p>No results</p>:<>{result.map((i)=>{
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
            })}</>)}
        </div>
    </Container>)
 }
 export default ResultByKeyword;