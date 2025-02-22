import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button, Container,HStack, Input } from '@chakra-ui/react';
import { BookmarkPlus, CirclePlusIcon, HomeIcon, User, User2, User2Icon, UserRoundPlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import SingleCar from '../components/SingleCar';
import L from 'leaflet';
import BookCar from '../components/BookCar';
import axios from 'axios'
import MapController from '../components/MapController';

const Map = () => {
  const user = useSelector( state => state.auth.currentUser);
  const [ search, setSearch ] = useState("");
  const [ searchLocation, setSearchLocation ] = useState(null);
  console.log(user)
  const cars = useSelector(state => state.products.cars);
  const bookings = useSelector( state => state.books.bookings);
  console.log("Bookings :" + bookings)
  const [userLocation, setUserLocation ] = useState({lat: "",lng:""})
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({lat: position.coords.latitude, lng: position.coords.longitude})
    })
  }, [])
  console.log(cars);
  const userIcon = new L.DivIcon({
    className: 'user-marker', 
    html: '<div style="background-color: #FF5733; width: 30px; height: 30px; border-radius: 50%;"></div>', 
    iconSize: [30, 30], 
    iconAnchor: [15, 30], 
    popupAnchor: [0, -30], 
  });

  const searchUserLocation = async () => {
    if(search === "") return;
    try {
      const data = await axios.get(`https://nominatim.openstreetmap.org/search`,{
        params: {q: search, format: "json", limit: 1}
      });
      const location = data.data[0];
      setSearchLocation({
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon),
        display: data.data[0].display_name
      });
    } catch (error) {
      console.error("Error fetching user's location", error.message)
    }
  }

  const resetSearch = ()=>{
    setSearch("");
    setSearchLocation(null);
  }

  return (
    <Box maxW={'full'} position={'relative'} h={"100vh"}>
      <Box position={"fixed"} top={0} zIndex={1000} display={'flex'} justifyContent={'center'} alignItems={'center'} w={"full"} mt={2}>
        <Container mt={3}>
          <HStack>
            <Input 
            w={"full"}
            rounded={"2xl"}
            bg={"whiteAlpha.900"}
            placeholder='search for a place'
            textAlign={"center"}
            _focus={{borderColor: "green"}}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
            <Button
            rounded={"2xl"}
            colorScheme='green'
            onClick={searchUserLocation}
            >Search</Button>
            <Button
            rounded={"2xl"}
            colorScheme='green'
            onClick={resetSearch}
            >Reset</Button>
          </HStack>
        </Container>
      </Box>
      
      <Box w={"full"}>
        <MapContainer 
        center={[33.9213, -6.8999]} 
        zoom={7.5} 
        style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          continuousWorld={false}
          noWrap={true}  
          />
          <MapController searchLocation={searchLocation}/>
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup >You are here</Popup>
          </Marker>
          {
            searchLocation && (
              <Marker position={[searchLocation.lat, searchLocation.lng]} icon={userIcon}>
                <Popup>{searchLocation.display}</Popup>
              </Marker>
            )
          }
          {
            cars
              .filter(item => item.coordinates?.lat && item.coordinates?.lng)
              .map((item, index) => (
                <Marker key={index} position={[parseFloat(item.coordinates.lat), parseFloat(item.coordinates.lng)]}>
                  <Popup>
                    <BookCar modelName={item.modelName} description={item.description} photo={item.photo} userId={user.id}/>
                  </Popup>
                </Marker>
              ))
          }
        </MapContainer>
      </Box>

      
      <Box pos={"fixed"} bottom={0} border={"1px black solid"} zIndex={1000} p={0.5} w={"full"} bg={"green.400"}>
        <HStack spacing={10} justifyContent={"space-around"}>
            <Link to={'/user'}>
              <Button colorScheme="green">
                  <User2 size={17}/> Dashboard
              </Button>
            </Link>
            <Link to={'/createcar'}>
              <Button colorScheme='green'>
                  <CirclePlusIcon size={17}/> Add Car
              </Button>
            </Link>
            <Link to={'/'}>
              <Button colorScheme='green'>
                  <HomeIcon size={17}/> Home
              </Button>
            </Link>
            <Link to={'/signup'}>
              <Button colorScheme='green'>
                  <UserRoundPlusIcon size={17}/> Signup
              </Button>
            </Link>
            <Link to={'/login'}>
              <Button colorScheme='green'>
                <UserRoundPlusIcon size={17}/> Login
              </Button>
            </Link>
        </HStack>
      </Box>
    </Box>
  );
};

export default Map;
