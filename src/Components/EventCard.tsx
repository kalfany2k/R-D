import { Card, CardFooter, Flex, Text } from "@chakra-ui/react";
import { Event } from "../Hooks/useEvent";
import CategoryMapper from "./CategoryMapper";

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
          <Flex
            width="600px"
            position="absolute"
            transform="scale(0.7)"
            justifySelf="flex-start"
            left="-90px"
          >
            <CategoryMapper maxCategories={2} eventId={event.id} />
          </Flex>
          {event.location && (
            <Text fontWeight="semibold" fontSize={15} marginBottom="-1">
              {event.location.address}
            </Text>
          )}
          <Text fontWeight="bold" fontSize={{ base: 16, sm: "2xl" }}>
            {event.title}
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
