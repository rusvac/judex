import React from 'react'
import { useState } from 'react'
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
  Icon,
  IconButton,
  Box,
  Center,
  Flex,
  Tag,
  Select,
  Button,
  Text,
  Spacer
} from '@chakra-ui/react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/hooks'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { useMoralis } from 'react-moralis'

import TokenSelector from './TokenSelector'
import ConfirmDialog from './ConfirmDialog'

const Swapper = (props) => {
  const [ loading, setLoading ] = useState(false)
  const [ token0, setToken0 ] = useState({
    address: false,
    balance: false,
    allowed: false,
    needsRechecked: true
  })
  const [ token1, setToken1 ] = useState({
    address: false,
    balance: false,
    allowed: false,
    needsRechecked: true
  })
  const [ token0Val, setToken0Val ] = useState(0)
  const [ token1Val, setToken1Val ] = useState(0)

  const [ token0Allowing, setToken0Allowing ] = useState(false)
  const [ token1Allowing, setToken1Allowing ] = useState(false)
  const [ swapAction, setSwapAction ] = useState(false)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { Moralis, web3 } = useMoralis()

  const getQuote = props.quote

  const availableTokens = props.aTokens
  const tokenBalances = props.balances
  let indexedBalances = false

  const hasAllowance = props.hasAllowance
  const tryApprove = props.tryApprove
  const trySwap = props.trySwap

  const userAddress = props.userAddress

  const onConfirmOpen = props.onConfirm
  const onCompleteOpen = props.onComplete

  if(tokenBalances) {
      indexedBalances = {}
      for(let i = 0; i < tokenBalances.length; i++) {
          let token = tokenBalances[i]
          indexedBalances[token.token_address] = token.balance
      }
  }

  const bal0 = (token0.balance ? web3.utils.fromWei(token0.balance, 'ether') : 0)
  const bal1 = (token1.balance ? web3.utils.fromWei(token1.balance, 'ether') : 0)

  const token0Symbol = (token0.address ? availableTokens[token0.address].symbol : false)
  const token1Symbol = (token1.address ? availableTokens[token1.address].symbol : false)

  const token0Prec = (token0.address ? availableTokens[token0.address].decimals : 18)
  const token1Prec = (token1.address ? availableTokens[token1.address].decimals : 18)

  const token0Allow = (token0.allowed ? token0.allowed : false)
  const token1Allow = (token1.allowed ? token1.allowed : false)

  const token0Value = (token0Val > 0 ? web3.utils.toWei(`${token0Val}`, 'ether') : 0)
  const token1Value = (token1Val > 0 ? web3.utils.toWei(`${token1Val}`, 'ether') : 0)

  if(token0Allowing) {
    console.log(token0Allowing)
    const res = (_r) => {
      console.log(_r)
      
      checkForQuote()
      setToken0Allowing(false)
    }
    const rej = (_r) => {
      console.log(_r)
      setToken0Allowing(false)
    }
    token0Allowing.then(res, rej)
  } else {
    //console.log('NOT ALLOWING')
  }

  const onTodoChange = (_slot, _value) => {
    if(_slot == '0') {
      setToken0Val(_value)
    }
    if(_slot == '1') {
      setToken1Val(_value)
    }
  }

  const hasApproval = (_token, _amount) => {
    return(hasAllowance(_token, _amount))
  }

  const awaitApproval = (_token, _amount) => {
    return(tryApprove(_token, _amount))
  }

  const gotQuote = (_data) => {
    //console.log(_data)
    setSwapAction(false)
    setLoading(false)

    if(_data.hasOwnProperty('statusCode')) {
      throw(_data)
    }
    if(_data.hasOwnProperty('error')) {
      throw(_data)
    }

    console.log(_data)

    const tFrom = _data.fromToken
    const tTo = _data.toToken
    const tAmount = _data.toTokenAmount
    console.log(`QUOTE: ${tAmount / (10 ** tTo.decimals)}`)

    if(tFrom.address == token0.address) {
      setToken1Val(tAmount / (10 ** tTo.decimals))
    } else if (tFrom.address == token1.address) {
      setToken0Val(tAmount / (10 ** tTo.decimals))
    }
  }

  const checkForQuote = (_v, _set='0', _t0=null, _t1=null) => {
    const t0a = (_t0 ? _t0 : token0.address)
    const t1a = (_t1 ? _t1 : token1.address)
    console.log(t0a, t1a)
    if (!t0a || !t1a) {
      return(false)
    }
    setLoading(true)

    if(loading) {
      return
    }

    console.log('FETCHING QUOTE')

    if (_set) {
      let re = null
      if(_set == '0') {
        re = getQuote(t0a, t1a, _v)
        
      }
      if(_set == '1') {
        re = getQuote(t1a, t0a, _v)
        
      }
      
      const rej = (r) => {
        setSwapAction(false)
        throw(r)
      }

      re.then(gotQuote, rej)

      setSwapAction( re )

    } else {
      return(false)
    }
  }

  const careForApproval = (_token, _amount) => {
    console.log(`CHECKING APPROVAL FOR ${_token}`)
    let result = hasAllowance(_token, 1).then((data) => {
      if(_token == token0.address) { 
        console.log(`token0 allowed: ${JSON.stringify(data)}`)
        setToken0({
          address: token0.address,
          balance: token0.balance,
          allowed: data,
          needsRechecked: false
        })
      }
      if(_token == token1.address) {  
        console.log(`token1 allowed: ${JSON.stringify(data)}`)
        setToken1({
          address: token1.address,
          balance: token1.balance,
          allowed: data,
          needsRechecked: false
        })
      }
    })
  }

  const setToken = (_slot, _t) => {
    let bal = (indexedBalances.hasOwnProperty(_t) ? indexedBalances[_t]: 0)
    if(_slot == '0') {
      setToken0({
        address: _t,
        balance: bal,
        allowed: token0.allowed,
        needsRechecked: true
      })
      checkForQuote(bal, '0', _t, null)
    }
    if(_slot == '1') {
      setToken1({
        address: _t,
        balance: bal,
        allowed: token1.allowed,
        needsRechecked: true
      })
      checkForQuote(bal, '1', null, _t)
    }
  }

  const switchTokens = () => {
    let _t0 = token1
    let _t1 = token0
    setToken('0', _t0.address)
    setToken('1', _t1.address)
  }

  const maxValue = (_slot) => {
    if(_slot == '0') {
      setToken0Val(bal0)
      checkForQuote(bal0, '0')
    }
    if(_slot == '1') {
      setToken1Val(bal1)
      checkForQuote(bal1, '1')
    }
  }

  const clickApproveTrade = () => {
    setToken0Allowing(awaitApproval(token0.address, token0.balance))
  }

    
  if(token0.address && token0.needsRechecked) {
    careForApproval(token0.address, token0.balance)
  }
  if(token1.address && token1.needsRechecked) {
    //careForApproval(token1.address, token1.balance)
    setToken1({
      address: token1.address,
      balance: token1.balance,
      allowed: true,
      needsRechecked: false
    })
  }

  const clickTrySwap = () => {
    let _address = userAddress
    let _from = token0.address
    let _to = token1.address
    let _amount = web3.utils.toWei(token0Val, 'ether')
    console.log(_amount)

    let swapRequest = trySwap(_address, _from, _to, _amount)

    console.log(swapRequest)

    const res = (rt) => {
      console.log(JSON.stringify(rt))

      /*
        blockHash: "0x7ab2f3ea6fb74f41f7d49c48db7713d99a834a6a33e5fb8ba3cbef2afc3cf388"
blockNumber: 20003460
contractAddress: null
cumulativeGasUsed: 2491961
effectiveGasPrice: "0x826299e00"
from: "0xc535e19eeed3f4a7f56819e77fb9d31e1a41a0bc"
gasUsed: 185550
logs: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
logsBloom: "0x00200000000000000000000080000000002000080000000000000000280000800000000000000400000000000001000800008000000800042000000000200000000008008000000000000008000000a00000000000000000000300000000000000000000000000000001400000000000000000000000004180004010000000001001000000000000000000000200000000000000000000080000004000000040220000000000000000000000000000000400000000000000000000000000004000000002004000000001000000001000080000000000001000100080000000000010008080000000000000000004000000000000010080000000000000100000"
status: true
to: "0x11111112542d85b3ef69ae05771c2dccff4faa26"
transactionHash: "0x3a2638f4f597def88f114da01372fb44aaacf42d80a57ec569a22f6af3e47e2c"
transactionIndex: 12
type: "0x0"
      */
      setSwapAction(false)
    }
    const rej = (rt) => {
      setSwapAction(false)
    }

    swapRequest.then(res, rej)

    setSwapAction(swapRequest)
  }

  return(
      <Box width="100%" height="100vh">
        
        <ConfirmDialog isOpen={isOpen} onClose={onClose} onConfirm={clickTrySwap}
          token0={availableTokens[token0.address]} token1={availableTokens[token1.address]}
          token0Amount={token0Value} token1Amount={token1Value}
        />

        <Center width="100%" height="50%">
          <Box width="480px" p={5} backgroundColor="gray.800" borderRadius={30}>
            <Flex p={5} justifyContent="flex-end">
              <Text>Swap between Tokens</Text>
              <Spacer />
              <Tag colorScheme="cyan">1INCH</Tag>
            </Flex>

            <Box backgroundColor="gray.700" p={1} borderRadius={10}>
              <Stack spacing={0} p={1} backgroundColor="gray.600" borderRadius={10}>    
                <Flex justifyContent="flex-end">
                  <Text ml={1}>From</Text>
                  <Spacer />
                  {(bal0) && (<Text>{bal0}</Text>)}
                  <Button colorScheme="teal" size="xs" ml={1} onClick={() => maxValue('0')}>MAX</Button>
                </Flex>
                <Stack spacing={2} isInline borderRadius={10}>
                    {(availableTokens && indexedBalances) && (
                      <TokenSelector
                      onSelect={(s) => setToken("0",s)}
                      value={token0.address}
                      tokens={availableTokens}
                      balances={indexedBalances}
                      />
                    )}
                    <NumberInput pt={1} onChange={v => setToken0Val(v)} value={token0Val} defaultValue={0} min={0.000000000000000001} max={1000000000000000000} precision={token0Prec} width="100%" height="100%">
                      <NumberInputField />
                    </NumberInput>
                </Stack>
              </Stack>
              <Center width="100%" height="100%" p={1}>
                <IconButton variant="ghost" aria-label="icon" icon={<ChevronDownIcon />} size="lg" onClick={() => switchTokens()}/>
              </Center>
              <Stack spacing={0} p={1} backgroundColor="gray.600" borderRadius={10}>    
                <Flex justifyContent="flex-end">
                  <Text ml={1}>To</Text>
                  <Spacer />
                  {(bal1) && (<Text>{bal1}</Text>)}
                  <Button colorScheme="teal" size="xs" ml={1} onClick={() => maxValue('1')}>MAX</Button>
                </Flex>
                <Stack spacing={2} isInline borderRadius={10}>
                    {(availableTokens && indexedBalances) && (
                      <TokenSelector
                      onSelect={(s) => setToken("1",s)}
                      value={token1.address}
                      tokens={availableTokens}
                      balances={indexedBalances}
                      />
                    )}
                    <NumberInput pt={1} onChange={v => setToken1Val(v)} value={token1Val} defaultValue={0} min={0.000000000000000001} max={1000000000000000000} precision={token1Prec} width="100%" height="100%">
                      <NumberInputField />
                    </NumberInput>
                </Stack>
              </Stack>
            </Box>

            <Box mt={3}>
              {((!token0Symbol && !token1Symbol) && (!token0Allow && !token1Allow)) && (
                <Button width="100%" variant="solid" size="lg" borderRadius={10} disabled={true} isLoading={loading}>
                  SWAP
                </Button>
              )}
              {((!token0Allow || !token1Allow)) && (<Stack width="100%" spacing={2} isInline>
                  {(!token0Allow && token0Symbol) && (<Button isLoading={(token0Allowing !== false)} width="100%" variant="solid" size="md" borderRadius={10} onClick={() => clickApproveTrade()}>
                  APPROVE {token0Symbol}
                  </Button>)}
                  {(!token1Allow && token1Symbol && false) && (<Button width="100%" variant="solid" size="md" borderRadius={10}>
                  APPROVE {token1Symbol}
                  </Button>)}
              </Stack>)}
              {(token0Allow && token1Allow) && (
                <Button width="100%" variant="solid" size="lg" borderRadius={10}
                  isLoading={(swapAction !== false)}
                  onClick={onOpen}
                >
                  SWAP
                </Button>
              )}
            </Box>
          </Box>
        </Center>
      </Box>
  )
}

export default Swapper