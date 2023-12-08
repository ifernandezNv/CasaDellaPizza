import React from 'react'
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
} from '@apollo/client';
import ReactDOM from 'react-dom/client'
import { SWRConfig } from 'swr';

import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache({
    addTypename: false
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>
    <SWRConfig
      value={{
        refreshInterval: 500,
      }}
    >
      <ApolloProvider client={client}>
        <ToastContainer 
          theme="dark"
          autoClose={3000}
          pauseOnFocusLoss={false}
        />
        <App />
      </ApolloProvider>
    </SWRConfig >
  </React.StrictMode>,
)
