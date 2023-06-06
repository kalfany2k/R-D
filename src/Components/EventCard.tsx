import { Card, CardFooter, Flex, Text } from "@chakra-ui/react";
import { Event } from "../Hooks/useEvent";

interface Props {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  return (
    <Card bg="transparent" variant="unstyled">
      <CardFooter display="flex" justifyContent="flex-end">
        <Flex
          flexDirection="column"
          alignItems="flex-end"
          marginTop="10"
          marginRight="3"
        >
          <Text fontWeight="semibold" fontSize="1xl" marginBottom="-1">
            {event.location.city}
          </Text>
          <Text fontWeight="bold" fontSize="2xl">
            {event.title}
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
