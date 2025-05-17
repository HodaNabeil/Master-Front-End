import { Helper, RoutingManager } from '@/Utility';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
export default function Error404() {
    const Navigate = useNavigate()
    const User = Helper.GetStorage("User") 
    return (
        <Stack
            h={'100vh'}
            textAlign="center"
            py={10} px={6}>
            <Box
                m={'auto'}
            >
                <Heading
                    display="inline-block"
                    as="h2"
                    size="2xl"
                    bgGradient="linear(to-r, teal.400, teal.600)"
                    backgroundClip="text">
                    404
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    Page Not Found
                </Text>
                <Text color={'gray.500'} mb={6}>
                    {"The page you're looking for does not seem to exist"}
                </Text>
                {User &&
                    User?.UserIsActive ?
                    <Button
                        colorScheme="teal"
                        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                        color="white"
                        variant="solid"
                        onClick={() => Navigate(RoutingManager.Client.Auth.Path)}
                    >
                        Go Main
                    </Button>
                    :
                    <Button
                        colorScheme="teal"
                        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                        color="white"
                        variant="solid"
                        onClick={() => Navigate(RoutingManager.Client.Data.Path)}
                    >
                        Back
                    </Button>
                }
            </Box>
        </Stack>
    );
}