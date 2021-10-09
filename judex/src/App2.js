import React from 'react';
import { useEffect, useState } from "react";
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

import { Moralis } from 'moralis';
import NFT from "./NFT";
import TokenBalance from "./TokenBalance";

import Page2Container from "./Page2";
import Swapper from "./Swapper";

class App2 extends React.Component {
    constructor(props) {
        super(props)

        this.Moralis = Moralis

        this.state = {
            address : null,
            tokenList : null,
        }
    }

    componentDidMount() {   
        this.initMoralis()
        //console.log(Moralis.Plugins)
        
    }

    render() {
        if(!false) {
            return (
              <Page2Container>
                <Stack m={5} p={5} backgroundColor="gray.700" borderRadius={5} spacing={5} isInline>
                  <Text fontSize="2xl">Enable Web3</Text>
                  <Button onClick={() => {}} isLoading={false}>Enable</Button>
                </Stack>
              </Page2Container>
            )
        }
        return(
            <Page2Container>
                <Swapper />
            </Page2Container>
        )
    }
    printKeys(_obj) {
        let keys = Object.keys(_obj)
        for(let i = 0; i < keys.length; i++) {
          console.log(keys[i])
        }
      }

    initMoralis = async () => {

        await Moralis.initPlugins();
        await Moralis.enable();

        this.printKeys(Moralis.User)
        console.log(Moralis.User.get('ethAddress'))
        let _address = Moralis.User.get('ethAddress');
        this.setState({
            address: _address
        })
    }

    getAvailableTokens = async () => {
        Moralis.Plugins.oneInch.getSupportedTokens({
          chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
        }).then((data) => {
          this.setState({
              tokenList: data.tokens
          })
        })
    }
}

export default App2