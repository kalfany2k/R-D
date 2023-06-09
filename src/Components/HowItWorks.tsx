import React from 'react';
import { Box, Container,Heading, Text, VStack, Flex, Image } from '@chakra-ui/react';
import tickets from '../assets/tickets.png'
import gear from '../assets/gear.png'
import pricetag from '../assets/pricetag.png'
import debitcard from '../assets/debitcard.png'
import dancing from '../assets/dancing.png'


const HowItWorks = () => {
  return (
    <Box  paddingTop="2rem">
      <Container maxW="container.lg">
        <Heading as="h1" size="2xl" fontWeight="bold" textAlign="center" marginBottom="2rem">
          How it works:
        </Heading>

        <VStack spacing={10} alignItems="center">
          <Flex direction={["column", "row"]} alignItems="center">
            <Box as="span" pr="4" boxSize={{ base: "80px", md: "120px", lg: "150px" }}>
              <Image src={tickets} boxSize="100%" objectFit="contain" />
            </Box>
            <Box>
              <Heading size="lg" fontWeight="bold">Create an Event:</Heading>
              <Text fontSize="md" fontWeight="normal" marginTop="1rem">
              Start by clicking on the 'Create Event' button. You'll need to input details such as the event name, date, time, location, and any other relevant information. Once complete, click 'Submit' to post your event on our platform.  
              </Text>
            </Box>
          </Flex>

          <Flex direction={["column", "row"]} alignItems="center">
            <Box as="span" pr="4" boxSize={{ base: "80px", md: "120px", lg: "150px" }}>
              <Image src={pricetag} boxSize="100%" objectFit="contain" />
            </Box>
            <Box>
              <Heading size="lg" fontWeight="bold">Set Ticket Pricing:</Heading>
              <Text fontSize="md" fontWeight="normal" marginTop="1rem">
              After your event is posted, it's time to set up ticket pricing. You have the freedom to categorize your tickets based on seating arrangement, VIP access, or any other unique feature your event might offer.
              </Text>
            </Box>
          </Flex>

          <Flex direction={["column", "row"]} alignItems="center">
            <Box as="span" pr="4" boxSize={{ base: "80px", md: "120px", lg: "150px" }}>
              <Image src={gear} boxSize="100%" objectFit="contain" />
            </Box>
            <Box>
              <Heading size="lg" fontWeight="bold">Manage your event:</Heading>
              <Text fontSize="md" fontWeight="normal" marginTop="1rem">
              You can access your event dashboard at any time to manage your events. This includes monitoring ticket sales, editing event details, or even cancelling the event if necessary.
              </Text>
            </Box>
          </Flex>

          <Flex direction={["column", "row"]} alignItems="center">
            <Box as="span" pr="4" boxSize={{ base: "80px", md: "120px", lg: "150px" }}>
              <Image src={debitcard} boxSize="100%" objectFit="contain" />
            </Box>
            <Box>
              <Heading size="lg" fontWeight="bold">Purchase Tickets:</Heading>
              <Text fontSize="md" fontWeight="normal" marginTop="1rem">
              For buyers, purchasing tickets is a simple and straightforward process. Find the event you're interested in, select the number and type of tickets you want, then proceed to our secure checkout. After purchase, tickets will be digitally delivered to your registered email.

              </Text>
            </Box>
          </Flex>
          <Flex direction={["column", "row"]} alignItems="center">
            <Box as="span" pr="4" boxSize={{ base: "80px", md: "120px", lg: "150px" }}>
              <Image src={dancing} boxSize="100%" objectFit="contain" />
            </Box>
            <Box>
              <Heading size="lg" fontWeight="bold">Enjoy The Event:</Heading>
              <Text fontSize="md" fontWeight="normal" marginTop="1rem">
              On the event day, simply present your digital ticket at the entrance. Enjoy your event hassle-free with our platform's seamless and reliable ticketing service.

              </Text>
            </Box>
          </Flex>

        </VStack>
      </Container>
    </Box>
  );
};

export default HowItWorks;
