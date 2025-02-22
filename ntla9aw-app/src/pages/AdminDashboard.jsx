import { Box, Button, Container, Flex, Heading, Table, VStack, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { Map, MapIcon, User } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import SingleCar from '../components/SingleCar';
import SingleBook from '../components/SingleBook';
import { removeBooking } from '../store/RentSlice';
import { deleteCar } from '../store/CarSlice';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const user = useSelector(state => state.admin.admin);
  const cars = useSelector(state => state.products.cars);
  const bookings = useSelector(state => state.books.bookings);
  console.log(bookings)
  const {isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const deleteBook = (index) =>{
    dispatch(removeBooking(index))
  }

  const handleDeleteCar = (id) => {
    dispatch(deleteCar(id));
  }

  return (
    <Box minH={'100vh'} w={'full'}>
        <Flex flexDir={'column'} gap={5}>
            <Box w={'full'} bg={'gray.100'}  display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Box pos={"absolute"} left={10}>
                    <Link to={"/adminmap"}>
                        <Button colorScheme='green'>
                            <MapIcon /> Go To Map
                        </Button>
                    </Link>
                 </Box>
                <Container w={'container.xl'} bg={'gray.200'} display={"flex"} justifyContent={'center'} alignItems={'center'} gap={20} p={10}>
                    <User size={40}/>
                    <Heading fontWeight={"black"} fontSize={"2xl"}>
                        {user.username}
                    </Heading>
                </Container>
                <Box pos={"absolute"} right={10}>
                    <Link to={"/data"}>
                        <Button colorScheme='green'>
                            <MapIcon /> See Data
                        </Button>
                    </Link>
                 </Box>
            </Box>
            <Box w={'full'} minH={"100%"} display={'flex'} textAlign={'center'}>
                <Box w={"50%"} bg={"gray.50"} borderLeft={"1"}>
                    <Heading>
                        Cars
                    </Heading>
                    <Box mt={2} overflow={'scroll'}>
                        <VStack spacing={5}>
                        {
                            cars
                            .map((item, index) => (
                                <Box key={index}>
                                    <SingleCar modelName={item.modelName} description={item.description} photo={item.photo} coordinates={item.coordinates}/>
                                    <Button colorScheme='red' mt={2} onClick={()=>handleDeleteCar(index)} w={"full"}>
                                        Delete
                                    </Button>
                                </Box>
                            ))
                        }
                        </VStack>
                    </Box>
                </Box>
                <Box w={"50%"} bg={"gray.50"}>
                    <Heading>
                       Bookings
                    </Heading>
                    <VStack>
                        {
                            bookings.map((item, index) => {
                                return <Box key={index} mt={5}>
                                    <SingleBook startDate={item.startDate} endDate={item.endDate}/>
                                    <Button 
                                    onClick={()=>deleteBook(index)}
                                    colorScheme='red' mt={2} w={'full '}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            })
                        }
                    </VStack>
                </Box>
            </Box>
        </Flex>
            <Toaster />
    </Box>
  )
}
