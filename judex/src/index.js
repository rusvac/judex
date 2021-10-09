import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import App2 from './App2';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { MoralisProvider } from 'react-moralis';
import { Moralis } from 'moralis';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
});

//MORALIS SERVER CREDENTIALS
//APPLICATION ID
const appId = '';
//APPLICATION SERVER URL
const serverUrl = '';

//Moralis.initialize(appId)
//Moralis.serverUrl = serverUrl;

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
