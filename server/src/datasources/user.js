/**
 * file: User API file
 * date: 2021-06-09
 * author: Jubi
 * lastModify: Jubi 2021-06-09
 */
const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }


  // initialize(config) {
  //   this.context = config.context;
  // }


  /**login */
  async login({ email, password }) {
    if (!email || !isEmail.validate(email) || !password) return null;
    const user = await this.store.user.findAll({ where: { email, password}});
    return user && user.length ? user[0]:null;
  }

  /** booking a stock */
  async bookStock({ id , Symbol }) {

    const res = await this.store.subscribe.findOrCreate({ where: { id , Symbol } });
    console.log(res)
    return res?true:false;
  }

  /** cancel a stock booking */
  async cancelStock({ id ,Symbol }) {
    const res = await this.store.subscribe.destroy({ where: { id, Symbol } })
    return res===1?true:false;
  }

  /** get all booking stocks */
  async getBookedStocks({ id }) {

    let response = await this.store.subscribe.findAll({
        where: { id },
      });
    response = response.map(i=>i.dataValues)
    const stocks = response.map(async i=>{
       let  stock = await this.store.financials.findAll({ where: { Symbol: i.Symbol }});
       return stock[0]
    })

    return Array.isArray(stocks)?stocks:[];

  }

  /** check if a stock is been  booking by the login user */
  async isBooked({ id ,Symbol }) {

    const found = await this.store.subscribe.findAll({
      where: { id, Symbol },
    });
    return found && found.length > 0;
  }  
}

module.exports = UserAPI;