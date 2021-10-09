import React from 'react'
import {
  ChakraProvider,
  Stack,
  Box,
  Text,
  Image,
  Grid,
  GridItem
} from '@chakra-ui/react';

function NFT(props) {
  
  const nft = props.data;
  const name = nft.name
  const address = nft.token_address
  const id = nft.id
  const metadata = (nft.metadata ? JSON.parse(nft.metadata) : '')
  console.log(metadata)
  const symbol = nft.symbol

  return(
    <Box>
        <Stack spacing={2}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                <GridItem colSpan={1}>
                    <Stack spacing={2}>
                    <Image height="100px" width="100px" />
                    </Stack>
                </GridItem>
                <GridItem colSpan={4}>
                    <Stack spacing={2}>
                        <Text fontSize="2xl">{name} {symbol}</Text>
                        <Text>{(metadata) && (metadata.description)}</Text>
                        <Text>{address}</Text>
                    </Stack>
                </GridItem>
            </Grid>
        </Stack>
    </Box>
  )
}

export default NFT