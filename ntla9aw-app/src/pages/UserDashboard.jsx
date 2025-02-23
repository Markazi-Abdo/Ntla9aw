import { Box, Button, Container, Flex, Heading, Table, VStack, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { MapIcon, User } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast, {Toaster} from 'react-hot-toast';
import SingleCar from '../components/SingleCar';
import SingleBook from '../components/SingleBook';
import { removeBooking} from '../store/RentSlice';
import { deleteCar, updateCar } from '../store/CarSlice';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const user = useSelector(state => state.auth.currentUser);
  const cars = useSelector(state => state.products.cars);
  const bookings = useSelector(state => state.books.bookings);
  const [carToUpdate, setCarToUpdate] = useState({ id: '', modelName: '', description: '', coordinates: {lat: '',lng: ''}});
  console.log(bookings)
  console.log(cars)
  const {isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const deleteBook = (index) =>{
    dispatch(removeBooking(index))
  }

  const handleDeleteCar = (id) => {
    dispatch(deleteCar(id));
  }

  const handleUpdateCar = (carId) => {
    dispatch(updateCar({id: carId, newCar: carToUpdate}));
    onClose();
    toast.success("Car updated successfully!");
  }

  return (
    <Box minH={'100vh'} w={'full'}>
        <Flex flexDir={'column'} gap={5}>
            <Box w={'full'} bg={'gray.100'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                 <Box pos={"absolute"}  left={5}>
                    <Link to={"/map"}>
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
            </Box>
            <Box w={'full'} minH={"100%"} display={'flex'} textAlign={'center'}>
                <Box w={"50%"} bg={"gray.50"} borderLeft={"1"}>
                    <Heading>
                        Cars
                    </Heading>
                    <Box mt={2} >
                        <VStack spacing={5}>
                        {
                            cars
                            .filter(item => item.userId === user.id)
                            .map((item, index) => (
                                <Box key={index}>
                                    <SingleCar modelName={item.modelName} description={item.description} photo={item.photo} coordinates={item.coordinates}/>
                                    <Button colorScheme='red' mt={2} onClick={()=>handleDeleteCar(index)}>
                                        Delete
                                    </Button>
                                    <Button colorScheme='blue'  mt={2} onClick={()=>{
                                        onOpen();
                                        setCarToUpdate(item);
                                        }}>
                                        Update
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
                            bookings
                            .filter(item => user.id === item.userId)
                            .map((item, index) => {
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
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={'center'}>
            <FormLabel>Model Name</FormLabel>
            <Input type='text' value={carToUpdate.modelName} onChange={(e) => setCarToUpdate({ ...carToUpdate, modelName: e.target.value })} />
            <FormLabel>Description</FormLabel>
            <Input type='text' value={carToUpdate.description} onChange={(e) => setCarToUpdate({ ...carToUpdate, description: e.target.value })} />
            <FormLabel>Coordinates</FormLabel>
            <Input type='text' value={carToUpdate.coordinates.lat} onChange={(e) => setCarToUpdate({ ...carToUpdate, coordinates: {lat: e.target.value} })} />
            <Input type='text' value={carToUpdate.coordinates.lng} onChange={(e) => setCarToUpdate({ ...carToUpdate, coordinates: {lng: e.target.value} })} />
          </ModalBody>
          <ModalFooter>
            <Button w={'full'} colorScheme='blue' onClick={()=>handleUpdateCar()}>Update</Button>
          </ModalFooter>
        </ModalContent>
        <Toaster />
      </Modal>
    </Box>
  )
}
