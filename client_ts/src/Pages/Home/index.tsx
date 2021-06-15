/**
 * file: Home Page
 * date: 2021-06-10
 * author: Jubi
 * lastModify: Jubi 2021-06-12
 */
import React,{ useState } from 'react'
import { useHistory } from "react-router-dom";
import style from './style.module.scss'
import Container from '../../Containers'
import StockCard from '../../Components/StockCard'
import TextField from '@material-ui/core/TextField';
import { gql, useQuery } from '@apollo/client';
import {getStocksBySectorVariables,getStocksBySector,getStocksBySector_getStocksBySector} from './__generated__/getStocksBySector'
/* <------------------------------------ **** GRAPH QUERY START **** ------------------------------------ */
const GET_STOCKS = gql`
    query getStocksBySector($Sector: String!) {
        getStocksBySector(Sector: $Sector) {
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
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
function GetSectorStocks({Sector}:getStocksBySectorVariables): JSX.Element{
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    let history  = useHistory()
    const { loading, error, data } = useQuery<getStocksBySector>(GET_STOCKS, {
        variables: { Sector:Sector },
      });
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    if (loading) return <p>Loading</p>
    if (error) return <p>Something error</p>;
    

    if(!data)  return <p>rendering...</p>
    let arr:(getStocksBySector_getStocksBySector|null)[]|null  = data.getStocksBySector
    if(arr&&arr.length>5){
        arr =  arr.slice(0,5)
    }
    
    if(!arr) return <p>no stocks</p>
    return <>{
        arr.map((i,index)=>{
        return (
            <StockCard bg='#fff'>
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
        )
        })
    }</>
}
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */   
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const HomePage = (): JSX.Element =>{ 
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    const [ symbolValue , setSymbolValue ] = useState('')
    const [ keywordValue , setKeywordValue ] = useState('')
    const history = useHistory();
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    return <Container>
        <div className={style.sections}>
        <section className={style.section1} onMouseOver={()=>{document.documentElement.style.setProperty('--body-bg-color', 'rgb(154, 32, 28)')}}>
            
                  
                <div className={style.cardContainer}>
                <StockCard bg='https://img.onl/9T2MYo'> 
                    <h2>Search by symbol</h2>
                    <TextField id="standard-basic" 
                    label="Symbol" 
                    value={symbolValue}
                    onChange={(e)=>{
                        setSymbolValue(e.target.value)
                    }}
                    onKeyDown={(e)=>{
                        if(e.keyCode === 13){
                
                            history.replace(`/search-symbol/${symbolValue}`)
                        }
                    }}
                    />
                </StockCard>
                <StockCard bg='https://img.onl/taJGqh'>
                    <h2>Search by keyword</h2>
                    <TextField id="standard-basic" 
                    label="Keyword" 
                    value={keywordValue}
                    onChange={(e)=>{
                        setKeywordValue(e.target.value)
                    }}
                    onKeyDown={(e)=>{
                        if(e.keyCode === 13){
                            history.replace(`/search-keyword/${keywordValue}`)
                        }
                    }}
                    />
                </StockCard>
                </div>
                
         
        </section> 
        <section className={style.section2} onMouseOver={()=>{document.documentElement.style.setProperty('--body-bg-color', '#BF3E55')}}>

                <div className={style.header}>
                    <p>Financials</p>
                </div>
                <div className={style.cardContainer}>
                {GetSectorStocks({Sector:'Financials'}) }
                
                <div className={style.findMore} onClick={()=>{
                        history.replace(`/more-stocks`)
                    }}>
                    <div className={style.imgWrapper} >
                        <p> Find out more...</p>
                    </div>
                </div>
                </div>

        </section>
        <section className={style.section2} onMouseOver={()=>{document.documentElement.style.setProperty('--body-bg-color', 'rgb(199, 68, 97)')}}>      
  
                <div className={style.header}><p>Industrials</p></div>
                <div className={style.cardContainer}>
                {GetSectorStocks({Sector:'Industrials'}) }
                
                <div className={style.findMore} onClick={()=>{
                        history.replace(`/more-stocks`)
                    }}>
                    <div className={style.imgWrapper}>
                        <p> Find out more...</p>

                    </div>
                </div>
                </div>

        </section>
        <section className={style.section2} onMouseOver={()=>{document.documentElement.style.setProperty('--body-bg-color', ' rgb(149, 74, 88)')}}>        

                <div className={style.header}><p>Health Care</p></div>
                <div className={style.cardContainer}>
                {GetSectorStocks({Sector:'Health Care'}) }
                <div className={style.findMore}  onClick={()=>{
                        history.replace(`/more-stocks`)
                    }}>
                    <div className={style.imgWrapper}>
                        <p> Find out more...</p>

                    </div>
                </div>
                </div>

        </section>
        <section className={style.section2} onMouseOver={()=>{document.documentElement.style.setProperty('--body-bg-color', 'rgb(28, 89, 66)')}}>
  
                
                <div className={style.header}><p>Information Technology</p></div>
                <div className={style.cardContainer}>
                {GetSectorStocks({Sector:'Information Technology'}) } 
                
                <div className={style.findMore}  onClick={()=>{
                        history.replace(`/more-stocks`)
                    }}>
                    <div className={style.imgWrapper}>
                        <p> Find out more...</p>

                    </div>
                </div>
                </div>

        </section>
        <section className={style.section2} onMouseOver={()=>{document.documentElement.style.setProperty('--body-bg-color', ' rgb(107, 81, 195)')}}>

                <div className={style.header}><p>Consumer Discretionary</p></div>
                <div className={style.cardContainer}>
                {GetSectorStocks({Sector:'Consumer Discretionary'}) } 
                <div className={style.findMore} onClick={()=>{
                        history.replace(`/more-stocks`)
                    }}>
                    <div className={style.imgWrapper}>
                        <p> Find out more...</p>

                    </div>
                </div>
                </div>

        </section>
        <section className={style.section2} onMouseOver={()=>{document.documentElement.style.setProperty('--body-bg-color', '#24203F')}}>
                <div className={style.header}><p>Consumer Staples</p></div>
                <div className={style.cardContainer}>
                {GetSectorStocks({Sector:'Consumer Staples'}) } 
                    <div className={style.findMore}  onClick={()=>{
                        history.replace(`/more-stocks`)
                    }}>
                    <div className={style.imgWrapper}>
                        <p> Find out more...</p>

                    </div>
                </div>
                </div>
        </section>

    </div>
    </Container>
}
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default HomePage;