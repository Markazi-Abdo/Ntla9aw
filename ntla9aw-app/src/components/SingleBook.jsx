import { Card, CardBody, CardHeader, Heading, Image, Text } from "@chakra-ui/react";

export default function SingleBook({ endDate, startDate }) {
  return (
    <Card>
        <CardHeader w={"100%"}>
            Reservation
        </CardHeader>
        <CardBody>
            {startDate} ---- {endDate}
        </CardBody>
    </Card>
  )
}
