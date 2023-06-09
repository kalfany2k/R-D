import React from 'react';
import { Box, Container, Heading, Text, VStack, Flex, Image } from '@chakra-ui/react';
import join from '../assets/join.png';
import working from '../assets/working.png';
import growth from '../assets/growth.png';
import celebrating from '../assets/celebrating.png';

const BecomeAPartner = () => {
  return (
    <Box  paddingTop="2rem">
      <Container maxW="container.lg">
        <Heading as="h1" size="2xl" fontWeight="bold" textAlign="center" marginBottom="2rem">
          Become a Partner
        </Heading>

        <VStack spacing={10} alignItems="center">
          <Flex direction={["column", "row"]} alignItems="center">
            <Box as="span" pr="4" boxSize={{ base: "80px", md: "120px", lg: "150px" }}>
              <Image src={join} boxSize="100%" objectFit="contain" />
            </Box>
            <Box>
              <Heading size="lg" fontWeight="bold">Join Our Platform:</Heading>
              <Text fontSize="md" fontWeight="normal" marginTop="1rem">
                The first step to becoming a partner is to join our platform. Register for an account and get access to our extensive network of event enthusiasts.
              </Text>
            </Box>
          </Flex>

          <Flex direction={["column", "row"]} alignItems="center">
            <Box as="span" pr="4" boxSize={{ base: "80px", md: "120px", lg: "150px" }}>
              <Image src={working} boxSize="100%" objectFit="contain" />
            </Box>
            <Box>
              <Heading size="lg" fontWeight="bold">Create Events:</Heading>
              <Text fontSize="md" fontWeight="normal" marginTop="1rem">
                As a partner, you're able to create and manage events. Use our intuitive tools to set up your event details, ticket pricing and seating arrangements.
              </Text>
            </Box>
          </Flex>

          <Flex direction={["column", "row"]} alignItems="center">
            <Box as="span" pr="4" boxSize={{ base: "80px", md: "120px", lg: "150px" }}>
              <Image src={growth} boxSize="100%" objectFit="contain" />
            </Box>
            <Box>
              <Heading size="lg" fontWeight="bold">Grow Your Audience:</Heading>
              <Text fontSize="md" fontWeight="normal" marginTop="1rem">
                Our platform helps you reach a larger audience. With each event you host, you have the opportunity to grow your audience and build brand recognition.
              </Text>
            </Box>
          </Flex>

          <Flex direction={["column", "row"]} alignItems="center">
            <Box as="span" pr="4" boxSize={{ base: "80px", md: "120px", lg: "150px" }}>
              <Image src={celebrating} boxSize="100%" objectFit="contain" />
            </Box>
            <Box>
              <Heading size="lg" fontWeight="bold">Enjoy Our Support:</Heading>
              <Text fontSize="md" fontWeight="normal" marginTop="1rem">
                As a partner, you have access to our dedicated support team. We're here to help you make the most of our platform and ensure your success.
              </Text>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default BecomeAPartner;
