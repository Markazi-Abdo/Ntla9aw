import { Button, Card, CardBody, CardFooter, CardHeader, FormLabel, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import toast, {Toaster} from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { addBooking } from "../store/RentSlice";
import { reserveCar } from "../store/CarSlice";

export default function BookCar({ modelName, description, coordinates, photo, userId, carId, price }) {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const dispatch = useDispatch(); 
  const [ carToBook, setCarToBook ] = useState({userId: userId, startDate: "", endDate: "", confirmationDate: ""});
  console.log(typeof carToBook.userId)
  const bookCar = () => {
    if(userId !== carId){
        toast.success('Reserved succefsully');
        const currentDate = new Date();
        const formatt = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        setCarToBook({...carToBook, confirmationDate: formatt});
        dispatch(addBooking(carToBook));
        dispatch(reserveCar(carId));
        console.log(carToBook)

    }else{
        toast.error('Would you book your own car, stupid');
    }
  } 
   
  return (
    <>
        <Card>
            <CardHeader w={"full"} h={200}>
                <Image src={photo} objectPosition={"center"} objectFit={'cover'}  height={200} width={200}>
                </Image>
            </CardHeader>
            <CardBody w={"full"}>
                <Heading>
                    {modelName}
                </Heading>
                <Text as={'p'}>
                    {description}
                </Text>
                <Text as={'p'}>
                    {price}
                </Text>
            </CardBody>
            <CardFooter w={"full"}>
                <Button colorScheme="blue" w={"full"} onClick={onOpen}>Reserve</Button>
            </CardFooter>
        </Card>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent >
                <ModalHeader>{modelName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign={'center'}>
                    <Text as={'p'} fontWeight={'black'}>
                        {description}
                    </Text>
                    <FormLabel>Start Date</FormLabel>
                    <Input 
                    type="date" 
                    value={carToBook.startDate}
                    onChange={(e) => setCarToBook({...carToBook, startDate: e.target.value})}
                    />
                    <FormLabel>End Date</FormLabel>
                    <Input 
                    type="date"
                    value={carToBook.endDate}
                    onChange={(e) => setCarToBook({...carToBook, endDate: e.target.value})} 
                    />
                    <Input 
                    type="text"
                    value={userId}
                    disabled
                    cursor={'no-drop'} 
                    />
                </ModalBody>
                <ModalFooter>
                    <Button w={'full'} colorScheme="blue" onClick={bookCar}>Reserve</Button>
                </ModalFooter>
            </ModalContent>
            <Toaster />
        </Modal>
    </>
  )
}
