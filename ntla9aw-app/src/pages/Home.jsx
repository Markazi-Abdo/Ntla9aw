import { Box, Button, Container, Heading, Icon, Image, Text, VStack } from "@chakra-ui/react";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  useGSAP(()=>{
    gsap.fromTo(".box", {
        opacity: 0,
        y: -50
    }, {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "back"
    })
  })

  return (
    <motion.div
      exit={{ opacity: 0, x: 50, transition: { duration: 0.5 } }}
    >
        <Box minH="100vh" minW="full" display={'flex'} justifyContent={"center"} alignItems={"center"} bgColor={'#F5F5F5 '}>
            <Container className="box" mb={100}>
                <VStack spacing={5}>
                    <Image src="/carphoto1.svg">
                    </Image>
                    <Heading as={'h1'}>
                        Welcome to <Text as={'span'} bgGradient={"linear(to-r, green.100, green.400)"} bgClip={'text'}>NTLA9AW</Text>
                    </Heading>
                    <Text as={"p"} textTransform={'capitalize'} fontSize={"xl"} fontWeight={"bold"}>
                        Rent the car closest to you now
                    </Text>
                    <Link to="/signup">
                        <Button colorScheme="green" fontFamily={"mono"} _hover={{transform: "translateY(-1px)"}} fontSize={"lg"}>
                            Start Now
                        </Button>
                    </Link>
                    <a href="https://storyset.com/app">App illustrations by Storyset</a>
                </VStack>
            </Container>
        </Box>
    </motion.div>
  )
}
