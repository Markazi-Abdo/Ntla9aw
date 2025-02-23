import { Box, Container, Flex, FormControl, FormLabel, VStack, Image, Input, Button, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { CarFront } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addCarBook } from '../store/CarSlice';

export default function SignUp() {
  const user = useSelector(state => state.auth.currentUser); 
  const [ car, setCar ] = useState({userId: user.id, modelName: "", description: "", photo:"" ,coordinates: {lat: '', lng: ''}, isReserved: false, price : ""})
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCarBook(car))
    navigate('/user');
  }
  return (
    <Box w={"full"} minH={'100vh'}>
        <Flex w={"full"} h={"full"}>
            <Box w={"45%"} bg={"green.300"}>
                <Image src='/carphoto2.svg' w={"full"} h={"100vh"} objectFit={"cover"}/>
            </Box>
            <Box w={"55%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Container w={"md"} p={6} alignItems={"center"} borderRadius={"16px"} boxShadow={'dark-lg'}>
                    <VStack align={'stretch'} spacing={5} alignItems={"center"}>
                        <CarFront size={40}/>
                        <FormControl>
                            <FormLabel>Id for User:</FormLabel>
                            <Input  
                            borderRadius={'16px'}
                            borderColor={"blue.900"}
                            textAlign={"center"}
                            fontWeight={"bold"}
                            fontFamily={"monospace"}
                            value={car.userId}
                            disabled
                            cursor={"no-drop"}
                            />
                            <FormLabel>Model Name:</FormLabel>
                            <Input  
                            borderRadius={'16px'}
                            borderColor={"blue.900"}
                            textAlign={"center"}
                            fontWeight={"bold"}
                            fontFamily={"monospace"}
                            value={car.modelName}
                            onChange={(e) => setCar({...car, modelName: e.target.value})}
                            />
                            <FormLabel>Description</FormLabel>
                            <Textarea
                            borderRadius={'16px'}
                            borderColor={"chartreuse"}
                            value={car.description}
                            onChange={(e) => setCar({...car, description: e.target.value})}
                            >
                            </Textarea>
                        
                            <FormLabel>Coordinates:</FormLabel>
                            <Input  
                            placeholder='Lat'
                            borderRadius={'16px'}
                            borderColor={"blue.900"}
                            textAlign={"center"}
                            fontWeight={"bold"}
                            fontFamily={"monospace"}
                            value={car.coordinates.lat}
                            onChange={(e) => setCar({...car, coordinates: {...car.coordinates, lat: e.target.value}})}
                            />
                            <Input  
                            placeholder='Lng'
                            borderRadius={'16px'}
                            borderColor={"blue.900"}
                            textAlign={"center"}
                            fontWeight={"bold"}
                            fontFamily={"monospace"}
                            value={car.coordinates.lng}
                            onChange={(e) => setCar({...car, coordinates: {...car.coordinates, lng: e.target.value}})}
                            />
                            <FormLabel>Car Phtot:</FormLabel>
                            <Input 
                            borderRadius={'16px'} 
                            type='file'
                            borderColor={"blue.900"}
                            textAlign={"center"}
                            fontWeight={"bold"}
                            fontFamily={"monospace"}
                            onChange={(e) => setCar({...car, photo: URL.createObjectURL(e.target.files[0])})}
                            />
                            <FormLabel>Car Price for week:</FormLabel>
                            <Input 
                            borderRadius={'16px'} 
                            type='file'
                            borderColor={"blue.900"}
                            textAlign={"center"}
                            fontWeight={"bold"}
                            fontFamily={"monospace"}
                            onChange={(e) => setCar({...car, price: Number(e.target.value)})}
                            />
                        </FormControl>
                        <Button 
                        onClick={handleSubmit}
                        borderRadius={'16px'}
                        type='submit' w={"full"} _hover={{opacity: 0.8, transform: "translateY(-1px)"}}>Register</Button>
                    </VStack>
                </Container>
            </Box>
        </Flex>
       
    </Box>
  )
}
