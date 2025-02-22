import { Box, Button, VStack } from '@chakra-ui/react'
import AreaChartComponent from '../components/AreaChart'
import { Link } from 'react-router-dom'

export default function AppData() {
  return (
    <Box>
        <VStack>
            <AreaChartComponent />
            <Link to={"/admin"}>
                <Button>
                    Go Back
                </Button>
            </Link>
        </VStack>
    </Box>
  )
}
