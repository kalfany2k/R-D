import { Card, CardFooter, Flex, Text } from "@chakra-ui/react";
import { Event } from "../Hooks/useEvent";

interface Props {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  return (
    <Card bg="transparent" variant="unstyled" cursor="pointer">
      <CardFooter display="flex" justifyContent="flex-end">
        <Flex
          flexDirection="column"
          alignItems="flex-end"
          marginTop={{ base: "12", md: "10" }}
          marginRight="3"
        >
          <Text fontWeight="semibold" fontSize="1xl" marginBottom="-1">
            {event.location.city}
          </Text>
          <Text fontWeight="bold" fontSize={{ base: 16, sm: "2xl" }}>
            {event.title}
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
