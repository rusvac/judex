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
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Switch,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'

const TokenRow = (props) => {
    const { web3 } = useMoralis()
    const name = props.name
    const symbol = props.symbol
    const icon = props.icon
    const balance = (props.balance ? web3.utils.fromWei(props.balance, 'ether') : 0)
    return(
        <Flex m={2}>
          <Avatar src={icon} showBorder />
          <Stack spacing={0} ml={2}>
            <Text fontSize="lg">{symbol}</Text>
            <Text fontSize="xs">{name}</Text>
          </Stack>
          <Spacer />
          <Text fontSize="lg">{balance}</Text>
        </Flex>
    )
}

export default TokenRow