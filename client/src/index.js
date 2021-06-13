import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import RootRouter from './Route'
import './style.scss'
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  gql,
  useQuery
} from '@apollo/client';

import { cache } from './cache';
const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql',
  headers: {
    'client-name': 'Stock Info',
    'client-version': '1.0.0',
  },
  
});

ReactDOM.render(
  <React.StrictMode>

      <ApolloProvider client={client}>
        <RootRouter />
      </ApolloProvider>
      
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
