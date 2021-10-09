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
  Button,
  Center,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Switch,
  InputGroup,
  InputRightElement,
  Icon,
  Grid,
  GridItem,
  IconButton,
  Text,
  Flex,
  Spacer,
  Tag,
  Tooltip
} from '@chakra-ui/react'

import { LinkIcon, CloseIcon, CopyIcon } from '@chakra-ui/icons'

import { useMoralis } from 'react-moralis';

import WalletAvatar from './WalletAvatar'

const Wallet = (props) => {
    const { authenticate, isAuthenticated, isAuthenticating, authError, user, logout } = useMoralis();

    if(!isAuthenticated) {
        return(
            <Stack spacing={2} isInline width="400px" backgroundColor="gray.600" borderRadius={10} p={2} mt={1}>
                <Flex
                    width="100%"
                    justifyContent="space-between"
                    alignItems="space-between"
                >
                <WalletAvatar seed={`${Math.random() * (10**4)}`}/>
                <Stack spacing={1} width="100%" ml={2}>
                    <Text fontSize="2xl">Not Connected</Text>
                    <Stack spacing={1} width="100%" ml={2} isInline>
                        <Text fontSize="sm">Chains:</Text>
                        <Tag colorScheme="blue">ETH</Tag>
                        <Tag colorScheme="cyan">POLYGON</Tag>
                    </Stack>
                </Stack>
                <Spacer />
                    <Tooltip hasArrow label="connect" bg="gray.100">
                    <IconButton
                        aria-label="icon"
                        icon={<LinkIcon />}
                        size="md"
                        variant="solid"
                        colorScheme="yellow"
                        borderRadius={10}
                        onClick={() => authenticate({ signingMessage: "Test Authentication" })}
                    />
                    </Tooltip>
                </Flex>
            </Stack>
        )
    }
    
    const address = user.get('ethAddress')

    return(
        <Stack spacing={2} isInline width="400px" backgroundColor="gray.600" borderRadius={10} p={2} mt={1}>
            <Flex
                width="100%"
                justifyContent="space-between"
                alignItems="space-between"
            >
                <WalletAvatar seed={address}/>
                <Stack spacing={1} width="100%" ml={2}>
                    <Text fontSize="2xl">{address.substring(0,6) + " . . . " + address.substring(37,42)}</Text>
                    <Stack spacing={2} width="100%" ml={2} isInline>
                        <Tag colorScheme="cyan">POLYGON</Tag>
                    </Stack>
                </Stack>
                <Spacer />
                <Stack spacing={1} ml={2}>
                    <Tooltip hasArrow label="copy" bg="gray.100">
                        <IconButton
                            aria-label="icon"
                            icon={<CopyIcon />}
                            size="sm"
                            variant="solid"
                            borderRadius={10}
                            onClick={() => {navigator.clipboard.writeText(address)}}
                        />
                    </Tooltip>
                    
                    <Tooltip hasArrow label="logout" bg="gray.100">
                    <IconButton aria-label="icon" icon={<CloseIcon />} size="sm" variant="solid" colorScheme="red" borderRadius={10} onClick={() => logout()}  />
                    </Tooltip>
                </Stack>
            </Flex>
        </Stack>
    )
}

export default Wallet