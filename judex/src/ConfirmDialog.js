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
  Icon,
  Text,
  Flex,
  CloseButton,
  Center,
  Button,
  Spacer,
  Container
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { EmailIcon, CopyIcon } from '@chakra-ui/icons'
import { useMoralis } from 'react-moralis'

const ConfirmDialog = (props) => {

  const { web3 } = useMoralis();

  const token0 = props.token0
  const token1 = props.token1
  let token0Amt = "" + ((props.token0Amount) ? web3.utils.fromWei(props.token0Amount, 'ether') : 0)
  token0Amt = `~${token0Amt.substring(0,9)}`
  let token1Amt = "" + ((props.token1Amount) ? web3.utils.fromWei(props.token1Amount, 'ether') : 0)
  token1Amt = `~${token1Amt.substring(0,9)}`

  //const price = web3.utils.fromWei(props.token0Amount / props.token1Amount, 'ether')

  return(
    <div>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
          <ModalContent borderRadius={30}>
            <ModalHeader>Confirm Swap</ModalHeader>
            <ModalCloseButton m={2} />
            <ModalBody mb={4}>
              {token0 && (<Stack
                spacing={2}
                isInline
                width="100%"
                height="100%"
                justifyContent="flex-end"
                backgroundColor="gray.600"
                borderRadius={15}
                mb={1}
              >
                <Stack spacing={2} width="400px">
                
                  <Flex m={2}>
                    <Avatar src={token0.logoURI} />
                    <Stack spacing={0} ml={2}>
                      <Text fontSize="lg">{token0.symbol}</Text>
                      <Text fontSize="xs">{token0.name}</Text>
                    </Stack>
                    <Spacer />
                    <Text fontSize="2xl">{token0Amt}</Text>
                  </Flex>
  
                </Stack>
  
              </Stack>)}
              {token1 && (<Stack
                spacing={2}
                isInline
                width="100%"
                height="100%"
                justifyContent="flex-end"
                backgroundColor="gray.600"
                borderRadius={15}
                mb={1}
              >
                <Stack spacing={2} width="400px">
                
                  <Flex m={2}>
                    <Avatar src={token1.logoURI} />
                    <Stack spacing={0} ml={2}>
                      <Text fontSize="lg">{token1.symbol}</Text>
                      <Text fontSize="xs">{token1.name}</Text>
                    </Stack>
                    <Spacer />
                    <Text fontSize="2xl">{token1Amt}</Text>
                  </Flex>
  
                </Stack>
  
              </Stack>)}
              
              <Stack spacing={0} width="100%" height="100%" p={1} textAlign="center">
                  <Text fontSize="md" color="gray.400" fontStyle="italic">Output is estimated.</Text>
                  <Text fontSize="md" color="gray.400" fontStyle="italic">Use smart contracts at your own risk.</Text>
              </Stack>
            </ModalBody>
            
            <Container width="100%" height="100%" backgroundColor="gray.600" p={7} mb={-6}>
  
                <Flex
                  width="100%"
                  height="100%"
                  justifyContent="space-between"
                  alignItems="space-between"
                >
                  <Text fontSize="md" color="gray.400">
                    Price
                  </Text>
                  <Text fontSize="md">0</Text>
                </Flex>
                
                <Flex
                  width="100%"
                  height="100%"
                  justifyContent="space-between"
                  alignItems="space-between"
                >
                  <Text fontSize="md" color="gray.400">
                    S
                  </Text>
                  <Text fontSize="md">0</Text>
                </Flex>
  
            </Container>
            <Container width="100%" height="100%" backgroundColor="gray.600" borderRadius={30} p={7}>
              <Button
                p={5}
                width="100%"
                height="50px"
                colorScheme="messenger"
                borderRadius={10}
                onClick={props.onConfirm}
              >Confirm Swap</Button>
            </Container>
          </ModalContent>
        </Modal>
      </div>
  )
}

export default ConfirmDialog