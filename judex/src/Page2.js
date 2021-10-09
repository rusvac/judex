import React from 'react'
import {
  ChakraProvider,
  Center,
  Stack,
  Avatar,
  AvatarBadge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Flex,
  Spacer,
  Switch,
  InputGroup,
  InputRightElement,
  Icon,
  Heading,
  Grid,
  GridItem,
  Text,
  Image
} from '@chakra-ui/react'

import Wallet from './Wallet'

import Judex from './judex.svg'

const Page2Container = (props) => {

    return(
        <Box overflow="hidden" width="100vw" height="100vh" backgroundColor="gray.900">
            <Stack spacing={0}>
                    <Flex as="nav" flexDirection="row" alignItems="flex-start" backgroundColor="gray.700" p={2} width="100%" height="100%">
                        <Center width="100vw" height="100%">
                        <Heading m={3}><Image height="100%" width='200px' src={Judex} /></Heading>
                        <Spacer />
                        <Wallet />
                        </Center>
                    </Flex>
                <Box width="100vw" height="100%">
                    {props.children}
                </Box>
            </Stack>
        </Box>
    )
}

export default Page2Container