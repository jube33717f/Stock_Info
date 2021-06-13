/**
 * file: Project Resolevers file
 * date: 2021-06-09
 * author: Jubi
 * lastModify: Jubi 2021-06-13
 */
const { resolveFieldValueOrError } = require('graphql/execution/execute');
const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        getStocks: async (_, { pageSize = 20, page }, { dataSources }) => {
            const allStocks = await dataSources.StockAPI.getAllStocks();
            // we want these in reverse chronological order
            //allStocks.reverse();
      
            const stocks = paginateResults({
              page,
              pageSize,
              results: allStocks,
            });

            return {
                stocks:stocks,
                total:allStocks.length>0?Math.ceil(allStocks.length/pageSize):0
            }
            
        },

        getOneStock: async (_, { Symbol }, { dataSources }) => 
            dataSources.StockAPI.getOneStock( Symbol ),
        
        getStocksBySector: async (_, { Sector }, { dataSources }) => 
            dataSources.StockAPI.getStocksBySector( Sector ),
        
        searchStockByName: async (_,{ keyword },{ dataSources }) =>
            dataSources.StockAPI.searchStockByName( keyword ),

        getSubscribes: async (_, { id  }, { dataSources }) => {

            const allStocks = await dataSources.UserAPI.getBookedStocks({ id });

            return allStocks
            
        },

        isStockBookedByUser: async (_, { id  , Symbol }, { dataSources }) => {

            const result = await dataSources.UserAPI.isBooked({ id , Symbol });
            // we want these in reverse chronological order
            // allStocks.reverse();
      
            

            return result
            
        },


    },

    Mutation: {
        login: async (_, { email, password }, { dataSources }) => {
            const user = await dataSources.UserAPI.login({ email, password });
            if (user) {
              user.token = Buffer.from(email).toString('base64');
              return user;
            }
        },

        booking: async (_, { id, Symbol }, { dataSources }) => {
            const result = await dataSources.UserAPI.bookStock({ id , Symbol });
            
            return {
                success: result,
                message: result?Symbol:'book failed',
            };
            
        },
        cancelSubscribe: async (_, { id , Symbol }, {  dataSources }) => {
            const result = dataSources.UserAPI.cancelStock({ id , Symbol });
            return {
                success: result,
                message: result?Symbol:'cancel subscribe',
            };
              
      
            
          },  
    }
}