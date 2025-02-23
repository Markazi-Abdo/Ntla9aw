import { Button, Container, Heading, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <Container>
        <VStack spacing={5} mt={10}>
            <Image src='/carphoto3.svg'></Image>
            <Heading>
                Page Not Found :(
            </Heading>
            <Link to={"/"}>
                <Button colorScheme='green'>
                    Go Home
                </Button>
            </Link>
            <a href="https://storyset.com/app">App illustrations by Storyset</a>
        </VStack>
    </Container>
  )
}
