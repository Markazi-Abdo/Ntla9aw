import { Box, Container, Flex, FormControl, FormLabel, VStack, Heading, Text,Input, Button, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { User } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../store/AdminSlice';
import  toast ,{Toaster} from 'react-hot-toast'
import { motion  } from 'framer-motion';
import "../styles/BorderStyle.css";

export default function SignUp() {
  const [ user, setUser ] = useState({ email: "", pass: ""})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(user));
    navigate('/admin');
  }
  
  return (
    <motion.div
    initial={{opacity: 0, y: "-35%", transition: {duration: 1}}}
    animate={{ opacity: 1, y: 0, transition: { duration: 1}}}
    >
        <Box w={"full"} minH={'100vh'}>
            <Flex w={"full"} h={"full"}>
                <Box w={"45%"} bgColor={"green.300"} h={"100vh"} className='box' display={"flex"} justifyContent={'center'} alignItems={'center'}>
                    <Container mb={25}>
                        <VStack spacing={5}>
                            <Image src='/carphoto2.svg'>
                            </Image>
                            <Heading as={"h2"} fontSize={"7xl"}>
                                NTLA9AW
                            </Heading>
                            <Text fontWeight={"bold"} fontSize={"lg"}>Always with you</Text>
                            <a href="https://storyset.com/app">App illustrations by Storyset</a>
                        </VStack>
                    </Container>
                </Box>
                <Box w={"55%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Container w={"md"} p={6} alignItems={"center"} borderRadius={"16px"}>
                        <VStack align={'stretch'} spacing={5} alignItems={"center"}>
                            <User size={40}/>
                            <FormControl>
                                <FormLabel>E-mail:</FormLabel>
                                <Input  
                                borderColor={"blue.900"}
                                textAlign={"center"}
                                fontWeight={"bold"}
                                fontFamily={"monospace"}
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                />
                                <FormLabel>Password:</FormLabel>
                                <Input  
                                borderColor={"blue.900"}
                                textAlign={"center"}
                                fontWeight={"bold"}
                                fontFamily={"monospace"}
                                value={user.pass}
                                onChange={(e) => setUser({...user, pass: e.target.value})}
                                />
                            </FormControl>
                            <Button 
                            onClick={handleSubmit}
                            type='submit' w={"full"} _hover={{opacity: 0.8, transform: "translateY(-1px)"}}>Register</Button>
                        </VStack>
                    </Container>
                </Box>
            </Flex>
            <Toaster />
        </Box>
    </motion.div>
  )
}
