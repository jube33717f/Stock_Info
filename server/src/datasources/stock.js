/**
 * file: Stocks API file
 * date: 2021-06-09
 * author: Jubi
 * lastModify: Jubi 2021-06-10
 */
const { DataSource } = require('apollo-datasource');
const { addResolveFunctionsToSchema } = require('graphql-tools');
const Sequelize = require('sequelize');
class StockAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }
  
  /** check if a stock is been  booking by the login user */
  async getAllStocks() {
    let response = await this.store.financials.findAll();
    response = response.map(i=>i.dataValues)

    return  Array.isArray(response)?response:[]
  }
  
  async getOneStock( Symbol ){
    const found = await this.store.financials.findAll({ where: { Symbol }});
    
    return found && found.length > 0? found[0].dataValues:null;
  }

  async getStocksBySector( Sector ){
     const found = await this.store.financials.findAll({ where: { Sector }});
     const response = found.map(i=>i.dataValues)
     return  Array.isArray(response)?response:[]
  }

  async searchStockByName( keyword ){
    const found = await this.store.financials.findAll({ 
      where:{
        Name:{
          [Sequelize.Op.like]: `%${keyword}%`
        }
        
      }
    })
    const response = found.map(i=>i.dataValues)
    return  Array.isArray(response)?response:[]
  }
}
module.exports = StockAPI;