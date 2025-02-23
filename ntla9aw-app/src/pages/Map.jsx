import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Button, Container, HStack, Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import L from 'leaflet';
import BookCar from '../components/BookCar';
import axios from 'axios';
import MapController from '../components/MapController';

const Map = () => {
  const user = useSelector(state => state.auth.currentUser);
  const cars = useSelector(state => state.products.cars);
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: "", lng: "" });
  const [modelName, setModelName] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  const userIcon = new L.DivIcon({
    className: 'user-marker',
    html: '<div style="background-color: #FF5733; width: 30px; height: 30px; border-radius: 50%;"></div>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const searchUserLocation = async () => {
    if (search === "") return;
    try {
      const { data } = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: { q: search, format: "json", limit: 1 }
      });
      const location = data[0];
      setSearchLocation({
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lon),
        display: location.display_name
      });
    } catch (error) {
      console.error("Error fetching user's location", error.message);
    }
  };

  const resetSearch = () => {
    setSearch("");
    setSearchLocation(null);
  };

  const filteredCars = cars.filter(car => 
    (car.modelName.toLowerCase().includes(modelName.toLowerCase())) &&
    (car.price <= maxPrice)
  );

  return (
    <Box maxW={'full'} position={'relative'} h={"100vh"}>
      <Box position={"fixed"} top={0} zIndex={1000} display={'flex'} justifyContent={'center'} alignItems={'center'} w={"full"} mt={2}>
        <Container mt={3}>
          <HStack>
            <Input 
              w={"full"}
              rounded={"2xl"}
              bg={"whiteAlpha.900"}
              placeholder='Search for a place'
              textAlign={"center"}
              _focus={{ borderColor: "green" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button rounded={"2xl"} colorScheme='green' onClick={searchUserLocation}>Search</Button>
            <Button rounded={"2xl"} colorScheme='green' onClick={resetSearch}>Reset</Button>
          </HStack>
          <HStack mt={3} spacing={5}>
            <Input 
              placeholder='Filter by Model Name'
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
            <Text as={'span'}>Max Price: ${maxPrice}</Text>
            <Slider 
              min={0} 
              max={100000} 
              step={1000} 
              value={maxPrice} 
              onChange={(val) => setMaxPrice(val)}
            >
              <SliderTrack><SliderFilledTrack /></SliderTrack>
              <SliderThumb />
            </Slider>
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
          <MapController searchLocation={searchLocation} />
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
          {searchLocation && (
            <Marker position={[searchLocation.lat, searchLocation.lng]} icon={userIcon}>
              <Popup>{searchLocation.display}</Popup>
            </Marker>
          )}
          {filteredCars.map((car, index) => (
            <Marker key={index} position={[parseFloat(car.coordinates.lat), parseFloat(car.coordinates.lng)]}>
              <Popup>
                <BookCar modelName={car.modelName} description={car.description} photo={car.photo} price={car.price} userId={user.id} carId={car.userId} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>

      <Box pos={"fixed"} bottom={0} border={"1px black solid"} zIndex={1000} p={0.5} w={"full"} bg={"green.400"}>
        <HStack spacing={10} justifyContent={"space-around"}>
          <Link to={'/user'}><Button colorScheme="green">Dashboard</Button></Link>
          <Link to={'/createcar'}><Button colorScheme='green'>Add Car</Button></Link>
          <Link to={'/'}><Button colorScheme='green'>Home</Button></Link>
          <Link to={'/signup'}><Button colorScheme='green'>Signup</Button></Link>
          <Link to={'/login'}><Button colorScheme='green'>Login</Button></Link>
        </HStack>
      </Box>
    </Box>
  );
};

export default Map;
