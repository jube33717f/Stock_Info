/**
 * file: Project Schema file
 * date: 2021-06-09
 * author: Jubi
 * lastModify: Jubi 2021-06-10
 */
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        getStocks(
            pageSize: Int
            page: Int
        ):StocksResponse
        getOneStock( Symbol: String ): Stock!
        getStocksBySector( Sector: String):[Stock]
        getSubscribes( 
            id: Int
        ):[Stock]!
        searchStockByName( keyword: String):[Stock]
        isStockBookedByUser(
            id: Int
            Symbol: String
        ):Boolean!
    }
    
    type Mutation{
        login(
            email: String
            password: String
        ): User

        booking( 
            id: Int
            Symbol: String 
        ): SubscribeUpdateResponse!

        cancelSubscribe( 
            id: Int
            Symbol: String 
        ): SubscribeUpdateResponse!
    }
    type StocksResponse{
        stocks:[Stock],
        total:Int
    }
    type SubscribeUpdateResponse{
        success: Boolean!
        message: String
    }

    type Stock {
        Symbol: String,
        Name: String,
        Price: Float,
        WeekLow52: Float,
        WeekHigh52: Float,
        DividendYield: Float,
        EBITDA: Float,
        EarningsShare: Float,
        MarketCap: Float,
        PriceBook: Float,
        PriceEarnings: Float,
        PriceSales: Float,
        SECFilings: String,
    }
    type User{
        id: Int,
        firstName:String,
        lastName:String,
        email: String,
        password:String,
    }
    type Subscribe{
        idd:Int,
        id: Int,
        symbol: Int,
    }
`
module.exports = typeDefs;