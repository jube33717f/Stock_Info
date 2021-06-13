/**
 * file: Project Index file
 * date: 2021-06-09
 * author: Jubi
 * lastModify: Jubi 2021-06-09
 */
require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const StockAPI = require('./datasources/stock');
const UserAPI = require('./datasources/user');

const internalEngineDemo = require('./engine-demo');

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
  StockAPI: new StockAPI({ store }),
  UserAPI: new UserAPI({ store }),
});


// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
 // context,
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    ...internalEngineDemo,
  },
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  server.listen({ port: process.env.PORT || 4000 }).then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Query at https://studio.apollographql.com/dev
    `);
  });
}else{
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`
      Server is running!
      Listening on port 4000
      Query at ${ url }
    `);
  });
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  //context,
  typeDefs,
  resolvers,
  ApolloServer,
  StockAPI,
  UserAPI,
  store,
  server,
};