import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Text,
  IconButton,
  Grid,
  GridItem,
  Center
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks'

import { Container, Heading } from '@chakra-ui/layout';
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis';
import { Auth } from './Auth';

import NFT from "./NFT";
import TokenBalance from "./TokenBalance";

import Page2Container from "./Page2";
import Swapper from "./Swapper";
import ConfirmDialog from "./ConfirmDialog";

import DefaultList from './tokenlists/tokens.json'
import DefaultList2 from './tokenlists/tokens2.json'

function App() {
  const { Moralis, isInitialized, isAuthenticated, logout, user, authenticate } = useMoralis()
  const { web3, enableWeb3, isWeb3Enabled, isWeb3EnableLoading, web3EnableError } = useMoralis();
  const Web3Api = useMoralisWeb3Api();

  const [ usingAPI, setUsingAPI ] = useState(false);
  const [ block, setBlock ] = useState('100000');

  const [ balance, setBalance ] = useState();
  const [ tokens, setTokens ] = useState();
  const [ nfts, setNFTs ] = useState();
  const [ gas, setGas ] = useState();
  const [ aTokens, setATokens ] = useState();

  const [ account, setAccounts ] = useState({
    address: null,
    chain: null
  });

  //console.log(Moralis)

  const bigNumber = 10**18;

  function printKeys(_obj) {
    let keys = Object.keys(_obj)
    for(let i = 0; i < keys.length; i++) {
      console.log(keys[i])
    }
  }

  //console.log(Moralis.Plugins)
  const trySwap = async (_address, _from, _to, _amount) => {
      /*

      Moralis.Plugins.oneInch.swap({
        chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: currentTrade.from.address, // The token you want to swap
        toTokenAddress: currentTrade.to.address, // The token you want to receive
        amount: amount,
        fromAddress: userAddress, // Your wallet address
        slippage: 1,
      });

      */
    return Moralis.Plugins.oneInch.swap({
      chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: _from, // The token you want to swap
      toTokenAddress: _to, // The token you want to receive
      amount: _amount,
      fromAddress: _address, // Your wallet address
      slippage: 1,
    });
  }
  
  const tryApprove = async (_token, _amount) => {
    const hasApproval = await hasAllowance(_token, _amount)
    if(!hasApproval){
      console.log(`Does not have allowance for ${_amount}`)
      return await Moralis.Plugins.oneInch.approve({
            chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
            tokenAddress: _token, // The token you want to swap
            fromAddress: account.address, // Your wallet address
          });
    }
    return true
  }

  const hasAllowance = async (_token, _amount) => {
    const p = Moralis.Plugins.oneInch.hasAllowance({
      chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: _token, // The token you want to swap
      fromAddress: account.address, // Your wallet address
      amount: _amount,
    })
    console.log(p)
    const allowance = await p
    return allowance
  }

  const getTokenBalances = async (_account) => {
    //console.log(_account)
    Moralis.Web3API.account.getTokenBalances(_account).then((_data) => {
      let data = _data.sort(function(a,b) {
        return b.balance - a.balance
      });
      localStorage.setItem('aTokens', data)
      setTokens(data)
    })
  }

  const getAvailableTokens = async () => {
    //console.log(Moralis.Plugins.oneInch)
    Moralis.Plugins.oneInch.getSupportedTokens({
      chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
    }).then((data) => {
      console.log(JSON.stringify(data.tokens))
      setATokens(data.tokens)
    })
  }
  const getSwapQuote = async (ad0, ad1, amount) => {
    if(amount == 0) {
      return({
        'error' : 1,
        'message' : 'amount must be more than 0'
      })
    }

    if(ad0 == ad1) {
      return({
        'error' : 1,
        'message' : 'you cannot trade to the same token'
      })
    }

    let thign = (DefaultList2.hasOwnProperty(ad0) ? DefaultList2[ad0].symbol : 'UNKNOWN')
    console.log(ad0)
    console.log(ad1)
    console.log(`GETTING QUOTE FOR ${amount} ${ad0} ${thign}`)
    return Moralis.Plugins.oneInch.quote({
      chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
      fromTokenAddress: ad0,
      toTokenAddress: ad1,
      amount: web3.utils.toWei(amount, 'ether')
    })
  }

  const getNFTs = async (_account) => {
    //console.log(_account)
    Moralis.Web3API.account.getNFTs(_account).then((_data) => {
      //console.log(_data)
      setNFTs(_data.result)
    })
  }

  const getAccounts = async () => {
    await Moralis.initPlugins();
    await Moralis.enable();
    //console.log(user)
    let _address = user.get('ethAddress');
    let _chain = 'polygon';

    setAccounts({
      address: _address,
      chain: _chain
    })
  }

  const getBalance = async () => {
    web3.eth.getBalance(account.address).then((value) => {
      setBalance(web3.utils.fromWei(value, 'ether'))
    })

  }

  const getGas = async () => {
    web3.eth.getGasPrice().then((value) => {
      setGas(web3.utils.fromWei(value, 'gwei'))
    })
  }

  const onConfirmSwap = () => {
    //onOpen()
  }

  const onSwapConfirmed = () => {
    //onClose()
  }

  const onCompleteSwap = () => {
    
  }

  //INIT USER
  if(user && !account.address) {
    let re = getAccounts()
  }

  if(isWeb3Enabled && account.address && !usingAPI) {
    let re2 = null;
    re2 = getGas()
    re2 = getBalance()

    if(!aTokens) {
      //getAvailableTokens()
    }
    if(!tokens) {
      getTokenBalances(account)
    }
    if(nfts) {
      getNFTs(account)
    }

    setUsingAPI(true)

  } else if (!isWeb3Enabled) {
    //enableWeb3()
  }

  if (isInitialized && isAuthenticated) {

    if(!isWeb3Enabled) {
      return (
        <Page2Container>
          <Stack m={5} p={5} backgroundColor="gray.700" borderRadius={5} spacing={5} isInline>
            <Text fontSize="2xl">Enable Web3</Text>
            <Button onClick={() => enableWeb3()} isLoading={isWeb3EnableLoading}>Enable</Button>
          </Stack>
        </Page2Container>
      )
    }
    return (
      <Page2Container>

        <Swapper
          aTokens={DefaultList2}
          balances={tokens}
          quote={getSwapQuote}
          hasAllowance={hasAllowance}
          tryApprove={tryApprove}
          trySwap={trySwap}
          userAddress={account.address}

          onConfirm={onConfirmSwap}
          onComplete={onCompleteSwap}
        />
      </Page2Container>
    )
  }

  return (
    <Page2Container>
      <Box width="100%" height="100vh">
        <Center width="100%" height="75%">
          <Box width="480px" p={5} backgroundColor="gray.600" borderRadius={10}>
            <Center>
            <Text fontSize="3xl">Please connect a wallet</Text>
            </Center>
            <Button
              width="100%"
              height="50px"
              colorScheme="yellow"
              borderRadius={10}
              onClick={() => authenticate({ signingMessage: "Test Authentication" })}
            >Connect to Metamask</Button>
          </Box>
        </Center>
      </Box>
    </Page2Container>
  )
}

export default App;
