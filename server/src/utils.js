/**
 * file: Project Utils file - initial data store
 * date: 2021-06-09
 * author: Jubi
 * lastModify: Jubi 2021-06-09
 */
const {Sequelize} = require('sequelize');

module.exports.paginateResults = ({
  page = 1,
  pageSize = 20,
  results,
}) => {
  if (pageSize < 1) return [];

  if (!page) return results.slice(0, pageSize);
  const cursorIndex = ( page - 1 ) * pageSize

  return cursorIndex >= 0 ? results.slice(cursorIndex + 1, cursorIndex + 1 + pageSize ): results.slice(0, pageSize);
};

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: './new.sqlite'
  });

  const user = db.define('users', {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    firstName:Sequelize.STRING,
    lastName:Sequelize.STRING,
    email: Sequelize.STRING,
    password:Sequelize.STRING,
  }, {
    timestamps: false
  });
  
  const financials = db.define('financials', {
    Symbol:{
      type:Sequelize.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
    Name:Sequelize.STRING,
    Price:Sequelize.FLOAT,
    WeekLow52:Sequelize.FLOAT,
    WeekHigh52:Sequelize.FLOAT,
    DividendYield:Sequelize.FLOAT,
    EBITDA:Sequelize.FLOAT,
    EarningsShare:Sequelize.FLOAT,
    MarketCap:Sequelize.FLOAT,
    PriceBook:Sequelize.FLOAT,
    PriceEarnings:Sequelize.FLOAT,
    PriceSales:Sequelize.FLOAT,
    SECFilings:Sequelize.STRING,
  }, {
    timestamps: false
  })

  const subscribe = db.define('subscribes', {
    idd:{
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    id: Sequelize.INTEGER,
    Symbol: Sequelize.INTEGER,
  }, {
    timestamps: false
  });


  return { db, user, financials, subscribe };
};
