import useEvent from "../Hooks/useEvent";
import EventCard, { eventExamples } from "./EventCard";
import EventCardContainer from "./EventCardContainer";
import { SimpleGrid, Flex } from "@chakra-ui/react";

const EventGrid = () => {
  const { data, error, isLoading } = useEvent();

  return (
    <Flex
      flexDirection="column"
      justifyItems="center"
      alignItems="center"
      gap={5}
      paddingTop={5}
    >
      {eventExamples.map((event) => (
        <EventCardContainer key={event.id}>
          <EventCard event={event} />
        </EventCardContainer>
      ))}
    </Flex>
  );
};

export default EventGrid;
