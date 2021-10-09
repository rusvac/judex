import React from 'react'
import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Container,
    Select,
    Flex,
    Spacer,
    Text,
    Avatar,
    Stack,
    Image
  } from "@chakra-ui/react"
import { useMoralis } from 'react-moralis'

import TokenRow from './TokenRow'

const TokenSelector = (props) => {
    
    const tokenAddress = props.value

    var tokens = props.tokens

    const token = tokens[tokenAddress]

    const balances = props.balances

    const onSelect = props.onSelect

    const initToken = (tokens ? tokens[tokenAddress] : null)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { web3 } = useMoralis()

    const [ balance, setBalance ] = useState()

    //console.log(tokens)
    //console.log(balances)

    const selectToken = (_t) => {

        if(onSelect) {
            onSelect(_t)
        }

        onClose()
    }

    return (
        <div>
            {(token) && (<Button onClick={onOpen} variant="ghost" size="lg" pl={6} pr={6}>
                <Image height="75%" width="auto" src={token.logoURI} borderRadius={50}/>
                <Text ml={1}>{token.symbol}</Text>
            </Button>)}
            {(!token) && (<Button onClick={onOpen} variant="ghost" size="lg" pl={6} pr={6}>
                <Image height="75%" width="auto" src={'https://tokens.1inch.io/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png'} />
                <Text ml={1}>{'Select'}</Text>
            </Button>)}

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select a Token</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {Object.keys(tokens).map((el, i) => {
                            const img = tokens[el].logoURI
                            const sym = tokens[el].symbol
                            const nme = tokens[el].name
                            const balance = (balances[el] ? web3.utils.fromWei(balances[el], 'ether') : 0)
                            return(
                                <div onClick={() => selectToken(el)} key={i}>
                                <Flex m={2}>
                                    <Avatar src={img} />
                                    <Stack spacing={0} ml={2}>
                                        <Text fontSize="lg">{sym}</Text>
                                        <Text fontSize="xs">{nme}</Text>
                                    </Stack>
                                    <Spacer />
                                    <Text fontSize="lg">{balance}</Text>
                                </Flex>
                                </div>
                            )
                        })}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" variant="ghost" onClick={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default TokenSelector;