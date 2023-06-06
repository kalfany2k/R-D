import { Card, CardBody, Heading, Text, HStack } from "@chakra-ui/react";
import { Event } from "../Hooks/useEvent";
import CriticScore from "./CriticScore";

export const eventExamples: Event[] = [
  {
    id: 1,
    title: "Event 1",
    price: 10.99,
    category: ["Category 1", "Category 2"],
    location: {
      id: 1,
      name: "Location 1",
      address: "Address 1",
      rating: 4.5,
      city: "City 1",
    },
  },
  {
    id: 2,
    title: "Event 2",
    price: 15.99,
    category: ["Category 2", "Category 3"],
    location: {
      id: 2,
      name: "Location 2",
      address: "Address 2",
      rating: 3.8,
      city: "City 2",
    },
  },
  // Add more example events here...
];

interface Props {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  return (
    <Card>
      <CardBody>
        <Heading fontSize="2xl">Events</Heading>
        <Text fontSize="xl">{event.title}</Text>
        <HStack justifyContent="space-between">
          <CriticScore rating={event.location.rating} />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
