import { Box, Container, Flex, FormControl, FormLabel, VStack, Input, Button, Text, Heading, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { User } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../store/AuthSlice';
import  toast ,{Toaster} from 'react-hot-toast'
import { motion } from 'framer-motion';
import "../styles/BorderStyle.css";

export default function SignUp() {
  const users = useSelector((state) => state.auth.users.length);
  const [ user, setUser ] = useState({id: users + 1, username: "", email: "", tele: "", pass: ""})
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(user))
    toast.success(`${user.username} was created succesfully`);
    navigate('/map');
  }
  
  return (
    <motion.div
    initial={{ opacity: 0, y:"-35%"}}
    animate={{ opacity: 1, y:0, transition:{ duration: 1 }}}
    exit={{ opacity: 0, y: 50, transition: { duration: 1 }}}
    >
        <Box w={"full"} minH={'100vh'}>
            <Flex w={"full"} h={"full"}>
                <Box w={"47%"} bgColor={"green.300"} h={"100vh"} className='box' display={"flex"} justifyContent={'center'} alignItems={'center'}>
                    <Container mb={50}>
                        <VStack spacing={1}>
                            <Image src='/carphoto2.svg'>
                            </Image>
                            <Heading as={"h2"} fontSize={"7xl"} color={"whiteAlpha.900"}>
                                NTLA9AW
                            </Heading>
                            <Text fontWeight={"bold"} fontSize={"lg"} color={"whiteAlpha.900"}>Always with you</Text>
                            <a href="https://storyset.com/app">App illustrations by Storyset</a>
                        </VStack>
                    </Container>
                </Box>
                <Box w={"55%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Container w={"md"}  p={6} alignItems={"center"} borderRadius={"16px"}>
                        <VStack align={'stretch'} spacing={5} alignItems={"center"} textAlign={"center"}>
                            <User size={40}/>
                            <FormControl>
                                <FormLabel>ID</FormLabel>
                                <Input 
                                borderColor={"blue.900"}
                                value={user.id}
                                disabled
                                cursor={"no-drop"}
                                fontWeight={"bold"}
                                fontFamily={"monospace"}
                                textAlign={"center"}
                                />
                                <FormLabel>UserName:</FormLabel>
                                <Input 
                                borderColor={"blue.900"}
                                textAlign={"center"}
                                fontWeight={"bold"}
                                fontFamily={"monospace"}
                                value={user.username}
                                onChange={(e) => setUser({...user, username: e.target.value})}
                                />
                                <FormLabel>E-mail:</FormLabel>
                                <Input  
                                borderColor={"blue.900"}
                                textAlign={"center"}
                                fontWeight={"bold"}
                                fontFamily={"monospace"}
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                />
                                <FormLabel>Tele:</FormLabel>
                                <Input  
                                borderColor={"blue.900"}
                                textAlign={"center"}
                                fontWeight={"bold"}
                                fontFamily={"monospace"}
                                value={user.tele}
                                onChange={(e) => setUser({...user, tele: e.target.value})}
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
                                <Text as={'span'} fontWeight={'extrabold'} gap={2}>
                                    Already have an account ,<Link to='/login'> 
                                    <Text as={'span'} textDecoration={'underline'}>Login</Text>
                                    </Link>
                                </Text>
                                <Link to="/adminauth">
                                    <Button>Admin</Button>   
                                </Link>
                        </VStack>
                    </Container>
                </Box>
            </Flex>
            <Toaster />
        </Box>
    </motion.div>
  )
}
