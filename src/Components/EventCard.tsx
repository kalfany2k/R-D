import { Card, CardFooter, Text } from "@chakra-ui/react";
import { Event } from "../Hooks/useEvent";

interface Props {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  return (
    <Card bg="transparent" variant="unstyled" position="relative">
      <CardFooter
        position="absolute"
        right="0"
        marginRight="4"
        marginBottom="4"
        marginTop="16"
      >
        <Text fontWeight="bold" fontSize="2xl">
          {event.title}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
