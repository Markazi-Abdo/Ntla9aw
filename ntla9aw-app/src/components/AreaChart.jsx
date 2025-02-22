import { Container } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts'

export default function AreaChartComponent() {
  const users = useSelector(state => state.auth.users)?.length;
  const cars = useSelector(state => state.products.cars)?.length;
  const bookings = useSelector(state => state.books.bookings)?.length;
  const data = [
    { name: 'Users', value: users },
    { name: 'Cars', value: cars },
    { name: 'Bookings', value: bookings },
  ];
  return (
    <Container mt={250}>
        <ResponsiveContainer width={500} height={300}>
            <AreaChart  data={data}>
                <XAxis dataKey={"name"}/>
                <YAxis />
                <Tooltip />
                <Area dataKey={"value"}/>
            </AreaChart>
        </ResponsiveContainer>
    </Container>
  )
}
