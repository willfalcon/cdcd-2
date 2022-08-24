import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import App from './App';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

const development = process?.env?.NODE_ENV === 'development';
const httpLink = new HttpLink({
  uri: development ? 'http://localhost:4000/api/graphql' : 'https://cdcd-keystone.herokuapp.com/api/graphql',
  // uri: 'https://cdcd-keystone.herokuapp.com/api/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  // uri: 'https://cdcd-server.creativedistillery.com',
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
