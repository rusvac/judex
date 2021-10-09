import React from 'react';
import { useState } from "react";
import {
  ChakraProvider,
  Stack,
  Box,
  Text,
  Image
} from '@chakra-ui/react';

function Transaction(props) {
    const [ open, setOpen ] = useState(false);

    return(
        <ChakraProvider resetCSS>
            <Box>
                <Stack m={5} p={5} spacing={2} backgroundColor="gray.700" borderRadius={10} isInline>
                    <Image height="100px" width="100px" />
                    <Text fontSize="2xl">0xc535e19eeed3f4a7f56819e77fb9d31e1a41a0bc</Text>
                    <Text>Token Information</Text>
                </Stack>
            </Box>
        </ChakraProvider>
    )
}

export default NFT