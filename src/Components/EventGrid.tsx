import { useState } from "react";
import useEvent from "../Hooks/useEvent";
import EventCard from "./EventCard";
import EventCardContainer from "./EventCardContainer";
import { Button, Flex, Text } from "@chakra-ui/react";
import EventCardSkeleton from "./EventCardSkeleton";

const EventGrid = () => {
  const { data, error, isLoading } = useEvent();
  const [displayCount, setDisplayCount] = useState(5);
  const skeletons = [1, 2, 3, 4, 5];

  const handleShowMore = () => {
    setDisplayCount(displayCount + 5);
  };

  return (
    <Flex
      flexDirection="column"
      justifyItems="center"
      alignItems="center"
      gap={5}
      paddingTop={5}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <EventCardContainer>
            <EventCardSkeleton />
          </EventCardContainer>
        ))}
      {data.slice(0, displayCount).map((event) => (
        <EventCardContainer key={event.id}>
          <EventCard event={event} />
        </EventCardContainer>
      ))}
      {displayCount < data.length && (
        <Button onClick={handleShowMore} marginBottom={5}>
          Show more
        </Button>
      )}
    </Flex>
  );
};

export default EventGrid;
