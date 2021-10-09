import React from 'react'
import {
  ChakraProvider,
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
  Text
} from '@chakra-ui/react'

import Wallet from './Wallet'

import Judex from 'judex.svg'

const PageContainer = (props) => {

    return(
        <Box overflow="hidden" width="100vw" height="100vh" backgroundColor="gray.900">
            <Stack spacing={0} isInline>
                <Box width="30vw" height="10vh">
                    <Flex as="nav" flexDirection="column" alignItems="flex-end" backgroundColor="gray.700" p={5} height="100vh">
                        <Heading mb={6}><Image src={Judex} /></Heading>
                        <Text>nav</Text>
                        <Spacer />
                        <Wallet />
                    </Flex>
                </Box>
                <Box width="70vw">
                    {props.children}
                </Box>
            </Stack>
        </Box>
    )
}

export default PageContainer