import React from 'react';
import { useState } from "react";
import {
  ChakraProvider,
  Stack,
  Box,
  Text,
  Image,
  Grid,
  GridItem,
  Avatar,
  AvatarBadge,
} from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';

function TokenBalance(props) {
    const { web3 } = useMoralis();
    const [ open, setOpen ] = useState(false);

    const token = props.data;
    const address = token['token_address']
    const name = token.name
    const symbol = token.symbol
    const balance = token.balance
    const formatted_balance = web3.utils.fromWei(balance, 'ether')

    return(
        <Box>
            <Stack spacing={2}>
                <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <GridItem colSpan={1}>
                        <Stack spacing={2}>
                        <Avatar name={symbol} src="">
                            <AvatarBadge bg="yellow.500" boxSize="1.25rem" borderColor="white" />
                        </Avatar>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Stack spacing={2}>
                            <Text fontSize="2xl">{formatted_balance} {symbol}</Text>
                            <Text>{address}</Text>
                        </Stack>
                    </GridItem>
                </Grid>
            </Stack>
        </Box>
    )
}

export default TokenBalance