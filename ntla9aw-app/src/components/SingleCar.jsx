import { Card, CardBody, CardHeader, Heading, Image, Text } from "@chakra-ui/react";

export default function SingleCar({ modelName, description, coordinates, photo }) {
  return (
    <Card>
        <CardHeader w={"100%"}>
            <Image src={photo}  objectPosition={"center"} objectFit={'cover'} height={200} width={200}>

            </Image>
        </CardHeader>
        <CardBody>
            <Heading>
                {modelName}
            </Heading>
            <Text as={'p'}>
                {description}
            </Text>
            <Text as={'p'}>
                {coordinates.lat} --- {coordinates.lng}
            </Text>
        </CardBody>
    </Card>
  )
}
